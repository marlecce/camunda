import axios, { AxiosResponse } from "axios";
import path from "path";
import fs from "fs";
import { ENGINE_API_URL } from "./constants";

async function deployProcess(): Promise<void> {
  try {
    const bpmnPath: string = path.join(__dirname, "../demo.bpmn");
    const bpmnContent: string = fs.readFileSync(bpmnPath, "utf-8");
    const bpmnBlob = new Blob([bpmnContent], { type: "application/xml" });

    const formData = new FormData();
    formData.append("deployment-name", "Demo process");
    formData.append("data", bpmnBlob, "demo.bpmn");

    const headers = {
      "Content-Type": "multipart/form-data",
    };

    const response: AxiosResponse = await axios.post(
      `${ENGINE_API_URL}/deployment/create`,
      formData,
      { headers }
    );

    console.log("Process deployed", response.data);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
}

deployProcess();
