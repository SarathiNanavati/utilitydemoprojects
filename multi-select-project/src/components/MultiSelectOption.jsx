import { useState } from "react";

const MultiSelectOption = ({ id, value, clickHandler }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  return (
    <div
      id={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        margin: "3px",
        cursor: "pointer",
        width: "100px",
        borderRadius: "5px",
        backgroundColor: isHovering ? "#1111ee" : "#dddddd",
        color: isHovering ? "#ffffff" : "#222222",
        hover: {
          background: "#0000ff",
        },
      }}
      onClick={() => clickHandler(id)}>
      {value}
    </div>
  );
};

export default MultiSelectOption;
