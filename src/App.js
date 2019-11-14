import React, { useState, useEffect } from 'react';
import ModalAddItem from './components/Modal';
import Button from './components/Button';
import List from './components/List';
import API from './api';
import './App.scss';

function App() {
  const [list, setList] = useState(null);
  const [state, setState] = useState({
    loading: false,
    error: false
  });
  const [showModal, setShowModal] = useState(false);

  const deleteItem = id => {
    setState({ loading: true, error: null });

    API.delete(id)
      .then(() => {
        const newList = [...list].filter(x => x.id !== id);
        setList(newList);
        setState({ loading: false, error: null });
      })
      .catch(err => setState({ loading: false, error: err.message }));
  };

  const validateIfExists = title => {
    return list.some(item => item.title.toLowerCase() === title.toLowerCase());
  };

  const addItem = title => {
    setState({ loading: true, error: null });

    if (validateIfExists(title)) {
      setState({ loading: false, error: 'the item already exists' });
      return;
    }

    API.add(title)
      .then(id => {
        const newList = [
          ...list,
          {
            id,
            title
          }
        ];
        setList(newList);
        setShowModal(false);
        setState({ loading: false, error: null });
      })
      .catch(err => {
        setState({ loading: false, error: err.message });
      });
  };

  useEffect(() => {
    const oldList = localStorage.getItem('list');
    const listStore = (oldList && JSON.parse(oldList)) || [];
    setList(listStore);
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  if (!list) {
    return <div className="Loading"> Loading ... </div>;
  }

  return (
    <div className="Container">
      <span className="Container-title">Supermarket List</span>

      <span className="Container-description" data-cy="label-items">
        {`${list.length} ITEM${list.length !== 1 ? 'S' : ''}`}
      </span>

      <List list={list} deleteItem={deleteItem} />
      <Button
        onClick={() => setShowModal(true)}
        title="Add item"
        className="PRIMARY FULL"
        disabled={state.loading}
        data-cy="button-addItem"
      />

      {showModal && (
        <ModalAddItem
          addItem={addItem}
          onCloseClick={() => setShowModal(false)}
          loading={state.loading}
        />
      )}
    </div>
  );
}

export default App;
