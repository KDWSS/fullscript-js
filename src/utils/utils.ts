export type Params = { key: string; value: any } | any;

const removeChildren = (element: HTMLElement): void => {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};

const snakeCase = (word: string): string => {
  return word
    .split(/(?=[A-Z])/g)
    .map(w => w.toLowerCase())
    .join("_");
};

const buildQueryString = (params: Params): string => {
  if (!Object.keys(params) || Object.keys(params).length === 0) return "";
  return Object.keys(params).reduce((queryString, key) => {
    let newParam = `${snakeCase(key)}=${params[key]}`;

    if (typeof params[key] !== "string") {
      newParam = Object.keys(params[key]).reduce(
        (objectParams, attribute, currentIndex): string => {
          const objectParam = `${snakeCase(key)}[${snakeCase(attribute)}]=${encodeURIComponent(
            params[key][attribute]
          )}`;

          if (currentIndex === 0) {
            return objectParam;
          }
          return `${objectParams}&${objectParam}`;
        },
        ""
      );
    }

    if (queryString !== "?") {
      newParam = `&${newParam}`;
    }

    return `${queryString}${newParam}`;
  }, "?");
};

export { removeChildren, buildQueryString };
