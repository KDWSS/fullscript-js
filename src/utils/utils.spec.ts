import { removeChildren, buildQueryString, Params } from "./utils";

describe("utils", () => {
  let elem: HTMLElement;
  let mockParams: Params;
  const mockKey = "pupper";
  const mockValue = "nessa";

  beforeEach(() => {
    elem = document.createElement("div");
    document.getElementById = jest.fn(() => elem);

    mockParams = {
      key: mockKey,
      value: mockValue,
    };
  });
  describe("removeChildren", () => {
    it("removes all children elements if there is any", () => {
      const textNode = document.createTextNode("helloo");
      elem.appendChild(textNode);
      elem.appendChild(textNode);
      removeChildren(elem);

      expect(elem.childNodes.length).toBe(0);
    });

    it("does nothing if there are no children", () => {
      removeChildren(elem);
      expect(elem.childNodes.length).toBe(0);
    });
  });

  describe("buildQueryString", () => {
    it("returns an empty string if params have no keys", () => {
      mockParams = {};
      const builtQueryString = buildQueryString(mockParams);
      expect(builtQueryString).toHaveLength(0);
    });

    it("properly builds a query string with proper key and param values", () => {
      const builtQueryString = buildQueryString(mockParams);

      expect(builtQueryString).toEqual(`?key=${mockKey}&value=${mockValue}`);
    });

    it("converts keys into snakecase", () => {
      mockParams = { fooBar: "foobar" };
      const builtQueryString = buildQueryString(mockParams);
      expect(builtQueryString).toEqual(`?foo_bar=${mockParams.fooBar}`);
    });

    it("accept object params", () => {
      mockParams = { something: "else", foo: { bar: "foobar" } };
      const queryString = buildQueryString(mockParams);
      expect(queryString).toEqual(`?something=else&foo[bar]=${mockParams.foo.bar}`);
    });
  });
});
