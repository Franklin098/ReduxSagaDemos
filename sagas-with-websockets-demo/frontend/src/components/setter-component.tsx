import { useAppDispatch } from "../reducers/hooks";
import { getNumberRequestStarted } from "../reducers/number-collection.reducer";

export default function SetterComponent() {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button
        onClick={() => {
          dispatch(getNumberRequestStarted());
        }}
      >
        Request new number
      </button>
    </div>
  );
}
