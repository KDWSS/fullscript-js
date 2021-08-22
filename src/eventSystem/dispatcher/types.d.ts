type Callback = (data: any) => void;
type DispatcherRegisterFunction = (eventName: string, callback: Callback) => void;

interface Dispatcher {
  dispatch: (eventName: string, data: string) => void;
  registerEventListener: DispatcherRegisterFunction;
  unregisterEventListener: DispatcherRegisterFunction;
  unregisterAllFeatureEventListeners: (frameId: string) => void;
}

export { Dispatcher, Callback };
