import { createDispatcher, Dispatcher } from "../dispatcher";

import { initializeMessageListener } from "./messageListener";

describe("initializeMessageListener", () => {
  let dispatcher: Dispatcher;

  beforeEach(() => {
    dispatcher = createDispatcher();
  });

  it("registers a message event listener", () => {
    const addEventListener = jest.fn();
    window.addEventListener = addEventListener;

    initializeMessageListener("us", dispatcher);
    expect(addEventListener).toHaveBeenCalled();
  });

  it("dispatches events if message origin and fullscript-js origin match", () => {
    let mockCallback;
    const addEventListener = jest.fn((_, callback) => {
      mockCallback = callback;
    });
    window.addEventListener = addEventListener;
    dispatcher.dispatch = jest.fn();
    initializeMessageListener("us", dispatcher);

    const mockEvent = {
      origin: "https://us.fullscript.com",
      data: {
        type: "treatmentPlan.activated",
        payload: "treatmentPlanData",
      },
    };

    mockCallback(new MessageEvent("message", mockEvent));
    expect(dispatcher.dispatch).toHaveBeenCalledWith(mockEvent.data.type, mockEvent.data.payload);
  });

  it("does not dispatch events if message origin does not match fullscript-js origin", () => {
    let mockCallback;
    const addEventListener = jest.fn((_, callback) => {
      mockCallback = callback;
    });
    window.addEventListener = addEventListener;
    dispatcher.dispatch = jest.fn();
    initializeMessageListener("us", dispatcher);

    const mockEvent = {
      origin: "https://malicious.com",
      data: {
        type: "treatmentPlan.activated",
        payload: "treatmentPlanData",
      },
    };

    mockCallback(new MessageEvent("message", mockEvent));
    expect(dispatcher.dispatch).not.toHaveBeenCalled();
  });

  it("throws an error if data type is 'error'", () => {
    let mockCallback;
    const addEventListener = jest.fn((_, callback) => {
      mockCallback = callback;
    });
    window.addEventListener = addEventListener;
    initializeMessageListener("us", dispatcher);

    const mockEvent = {
      origin: "https://us.fullscript.com",
      data: {
        type: "serverError",
        payload: "error message!",
      },
    };

    expect(() => mockCallback(new MessageEvent("message", mockEvent))).toThrow();
  });
});
