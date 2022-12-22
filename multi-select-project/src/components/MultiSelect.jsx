import { useState } from "react";
import MultiSelectOption from "./MultiSelectOption";

const MultiSelect = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const multiSelectOptionClickHandler = (id) => {
    setSelectedOptions((prev) => {
      if (prev.filter((prevOption) => prevOption.id === id).length > 0) {
        return [...prev.filter((prevOption) => prevOption.id !== id)];
      } else {
        return [...prev, ...options.filter((option) => option.id === id)];
      }
    });
  };

  return (
    <div>
      Form :
      <div
        style={{
          backgroundColor: "wheat",
          borderWidth: "2px",
          borderColor: "black",
          padding: "5px",
          display: "flex",
          flexDirection: "row",
        }}>
        {selectedOptions.map((selectedOption) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                border: "1px solid black",
                borderRadius: "5px",
                width: "100px",
                padding: "3px",
                margin: "3px",
              }}>
              <div>{selectedOption.value}</div>
              <div
                onClick={() => multiSelectOptionClickHandler(selectedOption.id)}
                style={{
                  cursor: "pointer",
                  paddingRight: "5px",
                  color: "black",
                }}>
                {" "}
                x
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {options.map((option, index) => {
          return (
            <MultiSelectOption
              key={option.id}
              id={option.id}
              value={option.value}
              clickHandler={multiSelectOptionClickHandler}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelect;
