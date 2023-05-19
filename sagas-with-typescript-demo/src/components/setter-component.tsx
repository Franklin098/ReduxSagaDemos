import { useState } from "react";
import { useAppDispatch } from "../reducers/hooks";
import {
  cancelOngoingNumberRequest,
  getNumberRequestStarted,
  numberRequestConfirmation,
} from "../reducers/number-collection.reducer";

export default function SetterComponent() {
  const [showModalConfirmation, setShowModalConfirmation] = useState(false);
  const dispatch = useAppDispatch();

  const onModalResult = (result: boolean) => {
    dispatch(numberRequestConfirmation(result));
    setShowModalConfirmation(false);
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowModalConfirmation(true);
          // Note that we are still dispatching the action to start the API request,
          // without checking the result of the confirmation:
          // the Saga is in charge of thar validation
          dispatch(getNumberRequestStarted());
        }}
      >
        Request new number
      </button>

      <button
        onClick={() => {
          console.log("dispatching cancelOngoingNumberRequest");
          dispatch(cancelOngoingNumberRequest());
        }}
      >
        Cancel Request
      </button>

      {showModalConfirmation && (
        <div>
          <span>Are you sure you want to get a new number?</span>
          <button
            onClick={() => {
              onModalResult(true);
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              onModalResult(false);
            }}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
}
