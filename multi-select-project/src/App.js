import MultiSelect from "./components/MultiSelect";

function App() {
  const options = [
    { id: 1, value: "Option 1" },
    { id: 2, value: "Option 2" },
    { id: 3, value: "Option 3" },
    { id: 4, value: "Option 4" },
    { id: 5, value: "Option 5" },
    { id: 6, value: "Option 6" },
    { id: 7, value: "Option 7" },
    { id: 8, value: "Option 8" },
    { id: 9, value: "Option 9" },
  ];
  return (
    <div className='App'>
      <MultiSelect options={options} />
    </div>
  );
}

export default App;
