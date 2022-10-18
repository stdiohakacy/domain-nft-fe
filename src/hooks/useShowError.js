import React from 'react';
import AppContext from '../AppContext';

const useShowError = () => {
  const context = React.useContext(AppContext);
  return { showError: context.showError};
}
export default useShowError;