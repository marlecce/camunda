import CamundaClient from "../camunda-client";

async function startSetupWorker(): Promise<void> {
  CamundaClient.getInstance().subscribe(
    "wrapUp",
    async ({ task, taskService }) => {
      console.log("Running wrapUp");

      console.log(JSON.stringify(task.variables.getAll()));

      await taskService.complete(task);
    }
  );
  console.log("WrapUp worker started.");
}

startSetupWorker();
