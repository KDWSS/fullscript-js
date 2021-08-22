describe("iframe util", () => {
  const initializeMocks = () => {
    jest.doMock("./loader", () => ({
      // eslint-disable-next-line
      __esModule: true,
      wrapWithLoader: element => element,
    }));
  };

  let mockSrc;
  beforeEach(() => {
    initializeMocks();
    mockSrc = "secure-iframe-url";
  });

  it("returns an iframe with a src string when createIframe is called", () => {
    return import("./iframe").then(({ createIframe }) => {
      const iframe = createIframe(mockSrc) as HTMLIFrameElement;
      expect(iframe.src).toEqual(`http://localhost/${mockSrc}`);
    });
  });

  it("returns an iframe of 100% width and height", () => {
    return import("./iframe").then(({ createIframe }) => {
      const iframe = createIframe(mockSrc) as HTMLIFrameElement;

      expect(iframe.style.width).toEqual("100%");
      expect(iframe.style.height).toEqual("100%");
    });
  });
});
