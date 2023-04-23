SteelEye assignment --->

Q1-Explain what a simple List component does.

This is a React component that renders a list of items, with each item represented by a

element. List items are passed as an array of objects, with each object having a text property that represents the text to display for that item.
The component consists of two sub-components, "SingleListItem" and "ListComponent".

"SingleListItem" is a functional component that renders a single list item. He gets four props:

"index": a number representing the index of an item in the list
"isSelected": boolean indicating whether the item is currently selected or not
"onClickHandler": function that will be called when an item is clicked
"text": a string representing the text to display for the item
"ListComponent" is also a functional component that renders the entire list. He gets one prop:

"items": an array of objects representing list items
Inside the "ListComponent" the "useEffect" hook is used to reset the "selectedIndex" state variable whenever the item prop changes. This is to ensure that if the list is re-rendered with new items, all previously selected items will be deselected.

The "handleClick" function is a callback that will be called every time an item is clicked. It takes an "index" parameter representing the index of the item that was clicked and sets the state variable "selectedIndex" to that index.

Finally, the "items" array is mapped to the "SingleListItem" component array, passing each component the necessary props to render the corresponding list item. The "memo" function is used to optimize performance by storing components in memory and preventing unnecessary redraws when props have not changed.

Overall, this component provides basic list functionality that allows users to select one item at a time. When an item is selected, it is highlighted with a green background color, otherwise it is shown with a red background color.

Q2- What problems / warnings are there with the code?

There are several problems with the code:

1- use of useState: In WrappedListComponent the state is declared incorrectly. const String [setSelectedIndex, selectedIndex] = useState(); should be changed to const [selectedIndex, setSelectedIndex] = useState(null);

2- Using onClickHandler: In WrappedSingleListItem the onClickHandler prop is called immediately with the index argument instead of passing a function to be called when the element is clicked. To fix this, we can change onClick={onClickHandler(index)} to onClick={() => onClickHandler(index)}.

3- Use of PropTypes: In WrappedListComponent, prop items are not properly defined in propTypes object. Instead of items: PropTypes.array(PropTypes.shapeOf({ text: PropTypes.string.isRequired })) it should be defined as items: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string.isRequired })) . This ensures that the item prop is an array of objects with the text property being a required string.

4- Using DefaultProps: In the WrappedListComponent, the prop item defaults to null. This can cause problems in the items.map function later in the code. Instead, we can give it a default value of an empty field by changing items: null to items: [].

Question 3 - Fix, optimize and/or modify the component as you think is necessary.

import React, { useState, useEffect, useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';

const SingleListItem = memo(({ index, isSelected, onClickHandler, text }) => {

const handleClick = useCallback(() => {

onClickHandler(index);
}, [index, onClickHandler]);

return (

<li
    
  style={{ backgroundColor: isSelected ? 'green' : 'red' }}
    
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

text: PropTypes.string.isRequired,

};

const List = memo(({ items }) => {

const [selectedIndex, setSelectedIndex] = useState(null);

useEffect(() => {

setSelectedIndex(null);
}, [items]);

const handleClick = useCallback((index) => {

setSelectedIndex(index);
}, []);

const listItems = useMemo(() => {

return items.map((item, index) => (

  <SingleListItem
  
    key={index}
    
    onClickHandler={handleClick}
    
    text={item.text}
    
    index={index}
    
    isSelected={selectedIndex === index}
    
  />
 
));
}, [handleClick, items, selectedIndex]);

return <ul style={{ textAlign: 'left' }}>{listItems};

});

List.propTypes = {

items: PropTypes.arrayOf(

PropTypes.shape({

  text: PropTypes.string.isRequired,
  
}).is required
),

};

export default list;

Changes made:

• In the SingleListItem component, the onClick handler is updated to use the useCallback hook to remember the function and avoid unnecessary re-rendering. Also updated propTypes definitions to require index, isSelected, onClickHandler and text props.

• State variables setSelectedIndex and selectedIndex are correctly defined in the List component. The useEffect hook is updated to reset the selectedIndex state variable when item support changes. The handleClick function is also updated to use the useCallback hook to remember. Finally, a useMemo hook is added to remember the list items to avoid unnecessary redraws.

• The propTypes definitions for the List component are updated to require an object array with a text property.

• DefaultProps for WrappedListComponent are removed as they are not necessary

