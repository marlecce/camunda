import { Client, logger, Variables } from "camunda-external-task-client-js";

class CamundaClient extends Client {
  private static instance: CamundaClient;

  private constructor() {
    const config = {
      baseUrl: "http://localhost:8080/engine-rest",
      use: logger,
    };
    super(config);
  }

  public static getInstance(): CamundaClient {
    if (!CamundaClient.instance) {
      CamundaClient.instance = new CamundaClient();
    }
    return CamundaClient.instance;
  }

  public async handleBpmnError(
    task: any,
    errorCode: string,
    errorMessage: string,
    variables?: Variables
  ): Promise<void> {
    await this.handleBpmnError(task, errorCode, errorMessage, variables);
  }
}

export default CamundaClient;
