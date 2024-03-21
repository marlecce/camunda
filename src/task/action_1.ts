import { GROUP_PATIENT } from "../constants";
import {
  claimTask,
  completeTask,
  getAction1TaskByProcessInstanceAndGroup,
  getProcessInstancesByUserIdAndCandidateGroup,
} from "../utils";

async function manageAction1(): Promise<void> {
  try {
    // context
    const userId = 1;
    const candidateGroup = GROUP_PATIENT;

    // GET the process instance of the specific user / candidate group
    const processInstances = await getProcessInstancesByUserIdAndCandidateGroup(
      userId,
      candidateGroup
    );

    if (processInstances && processInstances.length > 0) {
      // GET the "action1" task for the process instance with the candidate group specified
      const task = await getAction1TaskByProcessInstanceAndGroup(
        processInstances[0].id,
        candidateGroup
      );

      if (task && task.id) {
        // User claims the task
        await claimTask(task.id, userId);

        // something happens....

        // resolve the task
        await completeTask(task.id, userId);

        console.log("Task completed");
      }
    }
  } catch (error) {
    console.error("Failed to manage action 1 task:", error);
  }
}

manageAction1();
