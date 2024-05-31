import React from "react";

const ColorPalette = ({ colors, onSelect, stopPropagation }) => {
  const handleClick = (color, event) => {
    onSelect(color);
    if (stopPropagation) {
      event.stopPropagation();
    }
  };

  return (
    <div className="color-palette">
      {colors.map((color) => (
        <button
          key={color}
          className="color-button"
          style={{ backgroundColor: color }}
          onClick={(event) => handleClick(color, event)}
        />
      ))}
    </div>
  );
};

export default ColorPalette;
