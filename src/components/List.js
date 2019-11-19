import React from 'react';

function List({ list, deleteItem }) {
  return (
    <div className="Container-scrollbox">
      <div className="Container-list">
        {list.length === 0 ? (
          <div className="Container-list-message" date-testid="label-message">
            Oops! You dont have items in the list, But you can add one!
          </div>
        ) : (
          list.map(({ id, title }) => (
            <Item key={id} id={id} title={title} deleteItem={deleteItem} />
          ))
        )}
      </div>
    </div>
  );
}

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

export default List;
