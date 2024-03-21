import CamundaClient from "../camunda-client";

async function startSetupWorker(): Promise<void> {
  CamundaClient.getInstance().subscribe(
    "setup",
    async ({ task, taskService }) => {
      console.log("Running setup");
      await taskService.complete(task);
    }
  );
  console.log("Setup worker started.");
}

startSetupWorker();
