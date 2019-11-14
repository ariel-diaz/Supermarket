import React, { useState, useEffect, useRef } from 'react';
import Button from './Button';

function Modal({ addItem, onCloseClick, loading }) {
  const [title, setTitle] = useState('');
  const ref = useRef(null);
  const refInput = useRef(null);

  const handleKeyUp = e => {
    if (e.keyCode === 13 && title.length > 0) {
      addItem(title.trim());
      onCloseClick();
    }
  };

  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      onCloseClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  useEffect(() => {
    refInput.current.focus();
  }, []);

  return (
    <div className="Modal">
      <div className="ModalAddItem" ref={ref} data-testid="modal-addItem">
        <span className="ModalAddItem-title">Add item</span>
        <input
          className="ModalAddItem-input"
          type="text"
          onChange={e => setTitle(e.target.value)}
          onKeyUp={handleKeyUp}
          ref={refInput}
          data-cy="input-item"
        />
        <div className="ModalAddItem-wrapper">
          <Button className="SECONDARY" title="Cancel" onClick={onCloseClick} />
          <Button
            className="PRIMARY"
            title="Add"
            onClick={() => addItem(title.trim())}
            disabled={title.trim().length === 0 || loading}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
