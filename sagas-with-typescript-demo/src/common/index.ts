export const actionIds = {
  GET_NUMBER_REQUEST_START:
    "[0] Request a new number to the NumberGenerator API",
  GET_NUMBER_REQUEST_COMPLETED: "[1] NumberGenerator API returned a new number",
};

export interface BaseAction {
  type: string;
  payload: any;
}
