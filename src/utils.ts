import axios, { AxiosResponse } from "axios";
import { ProcessInstance } from "./types";
import {
  ENGINE_API_URL,
  TASK_NAME_ACTION_1,
  TASK_NAME_ACTION_2,
} from "./constants";
import { Task } from "camunda-external-task-client-js";

type IdentifyResponse = {
  userId: string;
  groupId: string;
  type: string;
};

/**
 *
 * @param taskId
 * @returns
 */
export async function getIdentityLinks(
  taskId: string | undefined
): Promise<IdentifyResponse | undefined> {
  try {
    if (!taskId) throw new Error("Task id is undefined");

    const response: AxiosResponse = await axios.get(
      `${ENGINE_API_URL}/task/${taskId}/identity-links`
    );

    return {
      userId: response.data.userId,
      groupId: response.data.groupId,
      type: response.data.type,
    };
  } catch (error) {
    console.error("Failed to start process:", error);
  }
}

/**
 * https://docs.camunda.org/rest/camunda-bpm-platform/7.21-SNAPSHOT/#tag/Task/operation/claim
 *
 * @param taskId
 * @param userId
 */
export async function claimTask(taskId: string, userId: number): Promise<void> {
  try {
    if (!taskId) throw new Error("Task id is undefined");

    await axios.post(`${ENGINE_API_URL}/task/${taskId}/claim`, {
      userId,
    });
  } catch (error) {
    const errorMessage = `Error claiming task ${taskId} for user ${userId}: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 *
 * @param taskId
 * @returns
 */
export async function completeTask(
  taskId: string,
  userId: number
): Promise<void> {
  try {
    if (!taskId) throw new Error("Task id is undefined");

    return await axios.post(`${ENGINE_API_URL}/task/${taskId}/complete`, {
      userId,
    });
  } catch (error) {
    const errorMessage = `Error completing task ${taskId}: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 *
 * @param userId
 * @param candidateGroup
 * @returns
 */
export async function getProcessInstancesByUserIdAndCandidateGroup(
  userId: number,
  candidateGroup: string
): Promise<ProcessInstance[] | undefined> {
  try {
    const processInstances: AxiosResponse = await axios.post(
      `${ENGINE_API_URL}/process-instance`,
      {
        variables: [
          {
            name: "userId",
            value: userId,
            operator: "eq",
          },
          {
            name: "userGroup",
            value: candidateGroup,
            operator: "eq",
          },
        ],
        headers: {
          Accept: "application/json",
        },
      }
    );

    return processInstances.data as ProcessInstance[];
  } catch (error) {
    const errorMessage = `Error fetching process instances: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function getProcessInstancesByTherapistIdAndCandidateGroup(
  therapistId: number,
  candidateGroup: string
): Promise<ProcessInstance[] | undefined> {
  try {
    const processInstances: AxiosResponse = await axios.post(
      `${ENGINE_API_URL}/process-instance`,
      {
        variables: [
          {
            name: "therapistId",
            value: therapistId,
            operator: "eq",
          },
          {
            name: "therapistGroup",
            value: candidateGroup,
            operator: "eq",
          },
        ],
        headers: {
          Accept: "application/json",
        },
      }
    );

    return processInstances.data as ProcessInstance[];
  } catch (error) {
    const errorMessage = `Error fetching process instances: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 *
 * @param processInstanceId
 * @param candidateGroup
 * @returns
 */
export async function getTasksByProcessInstanceAndGroup(
  processInstanceId: string,
  candidateGroup: string
): Promise<Task[]> {
  try {
    const response = await axios.get(`${ENGINE_API_URL}/task`, {
      params: {
        processInstanceId,
        candidateGroup,
      },
    });
    return response.data as Task[];
  } catch (error) {
    const errorMessage = `Error fetching tasks: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 *
 * @param processInstanceId
 * @param candidateGroup
 * @returns
 */
export async function getAction1TaskByProcessInstanceAndGroup(
  processInstanceId: string,
  candidateGroup: string
): Promise<Task> {
  try {
    const response = await axios.get(`${ENGINE_API_URL}/task`, {
      params: {
        processInstanceId,
        candidateGroup,
        name: TASK_NAME_ACTION_1,
      },
    });
    return response.data[0] as Task;
  } catch (error) {
    const errorMessage = `Error fetching task: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 *
 * @param processInstanceId
 * @param candidateGroup
 * @returns
 */
export async function getAction2TaskByProcessInstanceAndGroup(
  processInstanceId: string,
  candidateGroup: string
): Promise<Task> {
  try {
    const response = await axios.get(`${ENGINE_API_URL}/task`, {
      params: {
        processInstanceId,
        candidateGroup,
        name: TASK_NAME_ACTION_2,
      },
    });
    return response.data[0] as Task;
  } catch (error) {
    const errorMessage = `Error fetching task: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

/**
 *
 * @param processInstanceId
 * @param taskName
 * @param candidateGroup
 * @returns
 */
export async function getTaskByProcessInstanceAndTaskNameAndGroup(
  processInstanceId: string,
  taskName: string,
  candidateGroup: string
): Promise<Task> {
  try {
    const response = await axios.get(`${ENGINE_API_URL}/task`, {
      params: {
        processInstanceId,
        candidateGroup,
        name: taskName,
      },
    });
    return response.data[0] as Task;
  } catch (error) {
    const errorMessage = `Error fetching task: ${error}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
