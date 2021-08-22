describe("loader", () => {
  const initializeMocks = () => {
    jest.doMock("./containers", () => ({
      // eslint-disable-next-line
      __esModule: true,
      createWrapper: () => document.createElement("div"),
      createLoaderContainer: () => document.createElement("div"),
      createIframeContainer: () => document.createElement("div"),
    }));
  };
  beforeEach(() => {
    jest.resetModules(); // required when there are multiple mocks (mockCreateIframe, mockRemoveChildren )
    initializeMocks();
  });

  describe("wrapWithLoader", () => {
    it("removes loaderContainer at iframe onload", () => {
      return import("./loader").then(({ wrapWithLoader }) => {
        const iframe = document.createElement("iframe");
        const mockLoaderContainer = document.createElement("div");

        document.getElementById = jest.fn(() => mockLoaderContainer);

        wrapWithLoader(iframe);
        iframe.onload(new Event("Nessa"));

        expect(mockLoaderContainer.style.display).toEqual("none");
      });
    });

    it("appends loaderContainer and iframeContainer to the iframe", () => {
      return import("./loader").then(({ wrapWithLoader }) => {
        const iframe = document.createElement("iframe");
        const mockLoaderContainer = document.createElement("div");

        document.getElementById = jest.fn(() => mockLoaderContainer);

        const wrapper = wrapWithLoader(iframe);
        expect(wrapper.childElementCount).toEqual(2);
      });
    });
  });
});
