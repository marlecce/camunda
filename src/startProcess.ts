import axios, { AxiosResponse } from "axios";
import { randomUUID } from "crypto";
import { ENGINE_API_URL, GROUP_PATIENT, GROUP_THERAPIST } from "./constants";

async function startProcess(): Promise<void> {
  try {
    const response: AxiosResponse = await axios.post(
      `${ENGINE_API_URL}/process-definition/key/demo_process/start`,
      {
        businessKey: randomUUID(),
        withVariablesInReturn: true,
        variables: {
          checkIssue: { value: false, type: "boolean" },
          userId: { value: 1, type: "integer" },
          userGroup: { value: GROUP_PATIENT, type: "string" },
          therapistId: { value: 2, type: "integer" },
          therapistGroup: { value: GROUP_THERAPIST, type: "string" },
        },
      }
    );

    console.log("Process started", response.data);
  } catch (error) {
    console.error("Failed to start process:", error);
  }
}

startProcess();
