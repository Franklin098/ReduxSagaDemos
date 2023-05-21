import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import {
  startSocketSubscription,
  stopSocketSubscription,
} from "../reducers/number-collection.reducer";

export default function CurrencyTableComponent() {
  const dispatch = useAppDispatch();
  const { currencyList } = useAppSelector((state) => state.numberCollection);
  useEffect(() => {
    console.log("send StartSocket Event Sub");
    dispatch(startSocketSubscription());

    return () => {
      dispatch(stopSocketSubscription());
    };
  }, []);

  return (
    <div>
      <h2>Currencies Streaming: </h2>
      {currencyList.map((currency, index) => (
        <div key={index + currency.id}>
          <p>{`${currency.currency} ${currency.change}`}</p>
        </div>
      ))}
    </div>
  );
}
