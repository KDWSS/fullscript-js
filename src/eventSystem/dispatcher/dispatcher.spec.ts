import { createDispatcher } from "./dispatcher";
import { Dispatcher } from "./types.d";

describe("dispatcher", () => {
  let dispatcher: Dispatcher;

  beforeEach(() => {
    dispatcher = createDispatcher();
  });

  describe("registerEventListener", () => {
    it("registers callbacks and invokes them when an event is dispatched", () => {
      const callback = jest.fn();
      const eventName = "12345.treatmentPlan.activated";
      const payload = "payload data";

      dispatcher.registerEventListener(eventName, callback);
      dispatcher.dispatch(eventName, payload);
      expect(callback).toHaveBeenCalledWith(payload);
    });
  });

  describe("dispatch", () => {
    it("does not invoke the callback that the event is registered to if a separate event is dispatched", () => {
      const callback = jest.fn();
      const eventName = "12345.treatmentPlan.activated";
      const anotherEventName = "treatmentPlan.updated";
      const payload = "payload data";

      dispatcher.registerEventListener(anotherEventName, callback);
      dispatcher.dispatch(eventName, payload);
      expect(callback).not.toHaveBeenCalled();
    });

    it("does not throw an error if an event is dispatched but no event registrations exist", () => {
      expect(() => dispatcher.dispatch("frameId.feature.action", "payload")).not.toThrow();
    });
  });

  describe("unregisterEventListener", () => {
    it("removes callbacks when calling unregisterEventListener", () => {
      const callback = jest.fn();
      const eventName = "12345.treatmentPlan.activated";
      const payload = "payload data";

      dispatcher.registerEventListener(eventName, callback);
      dispatcher.unregisterEventListener(eventName, callback);
      dispatcher.dispatch(eventName, payload);
      expect(callback).not.toHaveBeenCalled();
    });

    it("does not remove callbacks for the wrong eventName", () => {
      const callback = jest.fn();
      const eventName = "12345.treatmentPlan.activated";
      const payload = "payload data";

      dispatcher.registerEventListener(eventName, callback);
      dispatcher.unregisterEventListener("feature.action", () => null);
      dispatcher.dispatch(eventName, payload);
      expect(callback).toHaveBeenCalled();
    });

    it("does nothing if unregistering a callback for an event that does not exist", () => {
      const callback = jest.fn();
      const eventName = "12345.treatmentPlan.activated";

      expect(dispatcher.unregisterEventListener(eventName, callback)).toEqual(undefined);
    });
  });

  describe("unregisterFeatureEventListeners", () => {
    it("unregisters all events associated with a specific feature", () => {
      const callback = jest.fn();
      const callback2 = jest.fn();
      const frameId = "12345";
      const eventName = `${frameId}.treatmentPlan.activated`;
      const eventName2 = `${frameId}.patient.created`;
      dispatcher.registerEventListener(eventName, callback);
      dispatcher.registerEventListener(eventName2, callback2);

      dispatcher.unregisterAllFeatureEventListeners(frameId);
      dispatcher.dispatch(eventName, "");
      dispatcher.dispatch(eventName2, "");
      expect(callback).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });

    it("does not unregister events belonging to a different feature", () => {
      const callback = jest.fn();
      const frameId = "12345";
      const eventName = `${frameId}.treatmentPlan.activated`;
      dispatcher.registerEventListener(eventName, callback);

      dispatcher.unregisterAllFeatureEventListeners("another frame id");
      dispatcher.dispatch(eventName, "");
      expect(callback).toHaveBeenCalled();
    });
  });
});
