import { useAppSelector } from "../reducers/hooks";

export default function NumbersViewer() {
  const { list, isLoading } = useAppSelector((state) => state.numberCollection);

  return (
    <div>
      <h2>Generated numbers collection:</h2>
      <ul>
        {list.map((number, index) => (
          <li key={number}>
            <h2>{number}</h2>
          </li>
        ))}
      </ul>
      {isLoading && <h2>Loading...</h2>}
    </div>
  );
}
