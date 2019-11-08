import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import TrashIcon from './trash.svg';

import './App.scss';

function App() {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteItem = (id) => {
    const newList = [...list].filter(x => x.id !== id);
    setList(newList);
  }

  const addItem = (title) => {
    const newList = [...list, {
      id: uniqid(),
      title,
    }];
    setList(newList);
    setShowModal(false);
  }

  useEffect(() => {
    const listStore = localStorage.getItem('list');
    const list = (listStore && JSON.parse(listStore)) || [];
    setList(list);
  }, [])

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list])


  if(!list) {
    return <div className="Loading"> Loading ... </div>
  }

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
                    onClick={() => deleteItem(id)}>    
                     {/* <img src={TrashIcon} />  */}
                    
                    </button>
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
  const ref = useRef(null);

  const handleKeyUp = (e) => {
    if(e.keyCode === 13 && title.length > 0) {
      addItem(title);
      onCloseClick();
    }
  }

  const handleClick = e => {
    if(ref.current && !ref.current.contains(e.target)) {
      onCloseClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  });

  return (
    <div className="Modal">
    <div className="ModalAddItem" ref={ref}>
      <span className="ModalAddItem-title">Add item</span>
      <input className="ModalAddItem-input" type="text" onChange={(e) => setTitle(e.target.value)} onKeyUp={handleKeyUp} />

      <div className="ModalAddItem-wrapper">
      <Button theme="SECONDARY" title="Cancel" onClick={onCloseClick} />
      <Button theme="PRIMARY" title="Add"
       onClick={() => addItem(title)}
       disabled={title.length === 0}
        />
      </div>
    </div>
    </div>
  ) 
}

export default App;
