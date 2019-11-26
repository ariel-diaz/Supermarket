import React from 'react';

function Item({ id, title, deleteItem }) {
  return (
    <div className="Container-list-item" key={id}>
      <span className="Container-list-item-title">{title}</span>
      <button
        type="button"
        className="Container-list-item-btn"
        onClick={() => deleteItem(id)}
        aria-label="Delete"
      />
    </div>
  );
}

export default Item;
