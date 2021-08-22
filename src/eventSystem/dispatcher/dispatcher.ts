import { Dispatcher, Callback } from "./types.d";

const createDispatcher = (): Dispatcher => {
  let callbacks: { [key: string]: Callback[] } = {};

  const dispatch = (eventName: string, data: string) => {
    // Create a cloned version of the original events array
    // This is required to prevent race conditions when adding/removing event callbacks
    [...(callbacks[eventName] || [])].forEach(callback => {
      callback(data);
    });
  };

  const registerEventListener = (eventName: string, callback: Callback) => {
    callbacks[eventName] = [...(callbacks[eventName] || []), callback];
  };

  const unregisterEventListener = (eventName: string, callback: Callback) => {
    if (!callbacks[eventName]) return;
    callbacks[eventName] = callbacks[eventName].filter(cb => cb !== callback);
  };

  const unregisterAllFeatureEventListeners = (frameId: string) => {
    callbacks = Object.keys(callbacks).reduce((updatedCallbacks, eventName) => {
      if (!eventName.startsWith(frameId)) {
        updatedCallbacks[eventName] = callbacks[eventName];
      }

      return updatedCallbacks;
    }, {});
  };

  return {
    dispatch,
    registerEventListener,
    unregisterEventListener,
    unregisterAllFeatureEventListeners,
  };
};

export { createDispatcher };
