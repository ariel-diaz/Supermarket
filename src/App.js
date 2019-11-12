import React, { useState, useEffect, useRef } from 'react';
import PropTypes  from 'prop-types';
import API from './api';
import './App.scss';

function App() {
  const [list, setList] = useState(null);
  const [state, setState] = useState({
    loading: false,
    error: false,
  });
  const [showModal, setShowModal] = useState(false);


  const deleteItem = (id) => {
    setState({ loading: true, error: null});

    API.delete(id).then(() => {
      const newList = [...list].filter(x => x.id !== id);
      setList(newList);
      setState({ loading: false, error: null})
    }).catch(err => 
      setState({ loading: false, error: err.message}
    ));

  }

  const addItem = (title) => {
    setState({ loading: true, error: null});

    API.add(title).then( () => {
      const newList = [...list, {
        id: new Date().toISOString(),
        title,
      }];

      setList(newList);
      setShowModal(false);
      setState({ loading: false, error: null})

    }).catch(err => {
      setState({ loading: false, error: err.message})
    })
  }

  useEffect(() => {
    const oldList = localStorage.getItem('list');
    const listStore= (oldList && JSON.parse(oldList)) || [];
    setList(listStore);
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
        {`${list.length} ITEMS`}

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
      {list.length === 0 ? (
        <div className="Container-list-message">
           Oops! You dont have items in the list, But you can add one!
        </div>
): 
          list.map(({ id, title}) =>
            <Item key={id} id={id} title={title} deleteItem={deleteItem} />) }
    </div>
  )
}


function Item ({ id, title, deleteItem}) {
  return (
    <div className="Container-list-item" key={id}>
      <span className="Container-list-item-title">{title}</span>
      <button
        type="button"
        className="Container-list-item-btn" 
        onClick={() => deleteItem(id)}
      />
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
  const refInput = useRef(null);

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

  useEffect(() => {
    refInput.current.focus()
  },[])

  return (
    <div className="Modal">
      <div className="ModalAddItem" ref={ref}>
        <span className="ModalAddItem-title">Add item</span>
        <input className="ModalAddItem-input" type="text" onChange={(e) => setTitle(e.target.value)} onKeyUp={handleKeyUp} ref={refInput} />

        <div className="ModalAddItem-wrapper">
          <Button theme="SECONDARY" title="Cancel" onClick={onCloseClick} />
          <Button
            theme="PRIMARY"
            title="Add"
            onClick={() => addItem(title)}
            disabled={title.trim().length === 0}
          />
        </div>
      </div>
    </div>
  ) 
}

export default App;
