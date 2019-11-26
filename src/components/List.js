import React from 'react';
import Item from './Item';

function List({ list, deleteItem }) {
  return (
    <div className="Container-scrollbox">
      <div className="Container-list">
        {list.length === 0 ? (
          <div className="Container-list-message" date-testid="label-message">
            Oops! You dont have items in the list.
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
export default List;
