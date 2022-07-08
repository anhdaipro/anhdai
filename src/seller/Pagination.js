import React, { useState} from "react";
import { render } from "react-dom";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";

const DragHandle = sortableHandle(() => (
  <span tabIndex={0}>
    <button
      tabIndex={-1}
      style={{ pointerEvents: "none" }}
     
    >
      Drag me
    </button>
  </span>
));

const SortableItem = sortableElement(({ value }) => (
  <li>
    <DragHandle />
    {value}
  </li>
));

const SortableContainer = sortableContainer(({ children }) => {
  return <ul>{children}</ul>;
});

const  Sortitem =()=>{
  const [state,setState] = useState({
    items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"]
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setState(({ items }) => ({
      items: arrayMove(items, oldIndex, newIndex)
    }));
  };

 
    const { items } = state;

    return (
      <SortableContainer onSortEnd={onSortEnd} useDragHandle>
        {items.map((value, index) => (
          <SortableItem key={`item-${value}`} index={index} value={value} />
        ))}
      </SortableContainer>
    );
  
}

export default Sortitem


