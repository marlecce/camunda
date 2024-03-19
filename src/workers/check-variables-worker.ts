import CamundaClient from "../camunda-client";

async function startCheckVariablesWorker(): Promise<void> {
  CamundaClient.getInstance().subscribe(
    "checkVariables",
    async ({ task, taskService }) => {
      console.log("checking process variables....");
      try {
        await taskService.complete(task);
      } catch (error) {
        console.error(error);
      }
    }
  );
  console.log("CheckVariables Worker started.");
}

startCheckVariablesWorker();
