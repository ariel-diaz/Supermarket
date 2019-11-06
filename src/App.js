import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.scss';


const LIST = [
  {
    id: 1,
    title: 'Titulo',
  },
  {
    id: 2,
    title: 'Titulo Dos',
  },
  {
    id: 3,
    title: 'Titulo Tres',
  }
];

function App() {
  const [list, setList] = useState(LIST);
  const [loading, setLoading] = useState(false);

  const deleteItem = (id) => {
    const newList = [...list].filter(x => x.id !== id);
    setList(newList);
  }

  const addItem = (title) => {
    const newProduct = {
      id: list.length + 1,
      title,
    }
    const newList = [...list, newProduct];

    setList(newList);
  }

  const openModal = () => {

  };

  return (
    <div className="Container">
      <span className="Container-title">
        Supermarket List
      </span>
      <span className="Container-description">
        3 ITEMS
      </span>

      <List list={LIST} deleteItem={deleteItem} />
      <Button handleClick={openModal} title="Add item" theme="PRIMARY" />
    </div>
  );
}



function List ({ list, deleteItem }) {
  return (
    <div className="Container-list">
      {list.map(( { id, title }, i) => (
                    <div className="Container-list-item" key={id}>
                    <span className="Container-list-item-title">{title}</span>
                    <button type="button" className="Container-list-item-delete" 
                    onClick={() => deleteItem(i)}> Borrar </button>
                  </div>
       ))}
  </div>
  )
}



function Button ({ handleClick, title, disabled, theme }) {
  return (
    <button 
    type="button"
    onClick={handleClick}
    disabled={disabled}
    className={`Button ${theme}`}
    >
      {title}
    </button>
  )
}

Button.propTypes = {
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  disabled: false,
}


function ModalAddProduct ({ addProduct }) {
  const [title, setTitle] = useState('');
  return (
    <div className="ModalAddProduct">
      <span className="ModalAddProduct-title">Add Product</span>
      <input type="text" onChange={({ target }) => setTitle(target.value)} />

      <Button theme="PRIMARY" />
      <Button theme={title.length === 0 ? 'DISABLED' : 'PRIMARY'} />
    </div>
  ) 
}

export default App;
