import React from 'react';

function Button({ onClick, title, disabled = false, className }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={`Button ${className}`}>
      {title}
    </button>
  );
}

export default Button;
