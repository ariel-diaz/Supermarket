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
  const [showModal, setShowModal] = useState(false);

  const deleteItem = (id) => {
    const newList = [...list].filter(x => x.id !== id);
    console.log(newList);
    setList(newList);
  }

  const addItem = (title) => {
    const newProduct = {
      id: list.length + 1,
      title,
    }
    const newList = [...list, newProduct];

    setList(newList);
    setShowModal(false);
  }

  console.log(list);

  return (
    <div className="Container">
      <span className="Container-title">
        Supermarket List
      </span>
      <span className="Container-description">
        {list.length} ITEMS
      </span>

      <List list={list} deleteItem={deleteItem} />
      <Button onClick={() => setShowModal(true)} title="Add item" theme="PRIMARY" />


      {showModal && <ModalAddItem addItem={addItem} onCloseClick={() => setShowModal(false)} />}
    </div>
  );
}



function List ({ list, deleteItem }) {
  return (
    <div className="Container-list">
      {list.length === 0 && 
        <div className="Container-list-message"> Oops! You dont have items in the list, But you can add one!</div>
      }
      {list.map(( { id, title }) => (
                    <div className="Container-list-item" key={id}>
                    <span className="Container-list-item-title">{title}</span>
                    <button type="button" className="Container-list-item-delete" 
                    onClick={() => deleteItem(id)}> Borrar </button>
                  </div>
       ))}
  </div>
  )
}



function Button ({ onClick, title, disabled, theme }) {
  return (
    <button 
    type="button"
    onClick={onClick}
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


function ModalAddItem ({ addItem, onCloseClick }) {
  const [title, setTitle] = useState('');
  return (
    <div className="Modal">
    <div className="ModalAddItem">
      <span className="ModalAddItem-title">Add item</span>
      <input className="ModalAddItem-input" type="text" onChange={({ target }) => setTitle(target.value)} />

      <div className="ModalAddItem-wrapper">
      <Button theme="SECONDARY" title="Cancel" onClick={onCloseClick} />
      <Button theme={title.length === 0 ? 'DISABLED' : 'PRIMARY'} title="Add"
       onClick={() => addItem(title)}
       disabled={title.length === 0}
        />
      </div>
    </div>
    </div>
  ) 
}

export default App;
