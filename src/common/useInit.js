import { useState } from 'react';

/**
 * Custom hook for initializing a component once.
 * This hook allows you to execute an initialization callback only once when the component mounts.
 * @param {function} initCallback - Callback function to be executed for initialization.
 */
export const useInit = initCallback => {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    initCallback();
    setInitialized(true);
  }
};