import { GROUP_THERAPIST } from "../constants";
import {
  claimTask,
  completeTask,
  getAction1TaskByProcessInstanceAndGroup,
  getAction2TaskByProcessInstanceAndGroup,
  getProcessInstancesByTherapistIdAndCandidateGroup,
} from "../utils";

async function manageAction2(): Promise<void> {
  try {
    // context
    const therapistId = 2;
    const candidateGroup = GROUP_THERAPIST;

    // GET the process instance of the specific user / candidate group
    const processInstances =
      await getProcessInstancesByTherapistIdAndCandidateGroup(
        therapistId,
        candidateGroup
      );

    if (processInstances && processInstances.length > 0) {
      // GET the "action1" task for the process instance with the candidate group specified
      const task = await getAction2TaskByProcessInstanceAndGroup(
        processInstances[0].id,
        candidateGroup
      );

      if (task && task.id) {
        // User claims the task
        await claimTask(task.id, therapistId);

        // something happens....

        // resolve the task
        await completeTask(task.id, therapistId);

        console.log("Task completed");
      }
    }
  } catch (error) {
    console.error("Failed to manage action 1 task:", error);
  }
}

manageAction2();
