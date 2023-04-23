import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";
import './assignment.css';

// Single List Item
const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {
  const handleClick = () => {
    onClickHandler(index);
  };

  return (
    <li
      style={{ backgroundColor: isSelected ? "pink" : "yellow" }}
      onClick={handleClick}
    >
      {text}
    </li>
  );
});

SingleListItem.propTypes = {
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

// List Component
const List = memo(({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  
  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = (index) => {
    setSelectedIndex(index);
 
  };

  return (
    <>
    <ul style={{ textAlign: "center" }}>
      {items.map((item, index) => (
        <SingleListItem
          key={index}
          index={index}
          isSelected={selectedIndex === index}
          onClickHandler={handleClick}
          text={item.text}
        />
      ))}
    </ul>
    </>
  );
});

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired
    })
  )
};

List.defaultProps = {
  items: [
    { text: "Item1" },
    { text: "Item2" },
    { text: "Item3" },
    { text: "Item4" }
  ]
};

export default List;