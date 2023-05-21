import { BaseAction } from "../common";

export const numberRequestStartAction: () => BaseAction = () => ({
  type: "GET_NUMBER_REQUEST_START",
  payload: null,
});

export const numberRequestCompletedAction = (number: number): BaseAction => ({
  type: "GET_NUMBER_REQUEST_COMPLETED",
  payload: number,
});
