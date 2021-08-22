import { Dispatcher, createDispatcher } from "../eventSystem";
import { FeatureOptions } from "../feature";
import { FullscriptOptions } from "../fullscript";

let getFeature;
const initializeMocks = () => {
  jest.doMock("../feature", () => {
    // explicitly avoiding hoisting
    return {
      // eslint-disable-next-line
      __esModule: true,
      getFeature,
    };
  });
};

describe("Fullscript client creation", () => {
  let dispatcher: Dispatcher;
  let mockFullscriptOptions: FullscriptOptions;

  beforeEach(() => {
    dispatcher = createDispatcher();
    getFeature = jest.fn();
    mockFullscriptOptions = {
      publicKey: "mockPublicKey",
      env: "us",
    };
    initializeMocks();
  });

  it("calls getFeature with proper arguments when create is called", () => {
    return import("./client").then(({ createClient }) => {
      const client = createClient(mockFullscriptOptions, dispatcher);

      const mockFeatureType = "treatmentPlan";
      const mockFeatureOptions: FeatureOptions<"treatmentPlan"> = {
        patient: {
          id: "asdasd",
        },
        secretToken: "xxxx",
      };

      client.create(mockFeatureType, mockFeatureOptions);

      expect(getFeature).toBeCalledWith(
        mockFeatureType,
        mockFeatureOptions,
        mockFullscriptOptions,
        dispatcher
      );
    });
  });
});
