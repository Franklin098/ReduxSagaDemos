import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import NumbersViewer from "./components/numbers-viewer";
import SetterComponent from "./components/setter-component";
import CurrencyTableComponent from "./components/currency-table-component";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SetterComponent />
        <NumbersViewer />
        <CurrencyTableComponent />
      </div>
    </Provider>
  );
}

export default App;
