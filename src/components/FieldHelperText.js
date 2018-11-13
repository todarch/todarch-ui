import React from 'react';

const FieldHelperText = ({ error, touched, info }) => {
  const showError = error && touched;

  return (
    <div className={showError ? 'field error' : ''}>
      <small className="helper">{showError ? error : info}</small>
    </div>
  );
};

export default FieldHelperText;
