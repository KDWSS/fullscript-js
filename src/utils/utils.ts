/* eslint-disable prefer-const */
import { FULLSCRIPT_DOMAINS } from "../fullscript";

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

const buildQueryString = async (params: Params): Promise<string> => {
  if (!Object.keys(params) || Object.keys(params).length === 0) return "";

  let { patient: patientInfo, fullscriptOptions, ...exposedParams } = params;

  let startingQueryString = "?";

  if (patientInfo) {
    try {
      const { env, domain } = fullscriptOptions;
      const fsDomain = domain ?? FULLSCRIPT_DOMAINS[env];

      const tokenizedInfo = await fetch(`${fsDomain}/api/embeddable/tokenize`, {
        method: "POST",
        body: JSON.stringify({ data: patientInfo }),
        headers: { "Content-Type": "application/json" },
      }).then(res => res.json());

      startingQueryString += `encrypted_patient=${encodeURIComponent(tokenizedInfo.data_token)}&`;
    } catch (error) {
      startingQueryString = "?";
      exposedParams = { patient: patientInfo, ...exposedParams };
    }
  }

  return Object.keys(exposedParams).reduce((queryString, key) => {
    let newParam = `${snakeCase(key)}=${exposedParams[key]}`;

    if (typeof exposedParams[key] !== "string") {
      newParam = Object.keys(exposedParams[key]).reduce(
        (objectParams, attribute, currentIndex): string => {
          const objectParam = `${snakeCase(key)}[${snakeCase(attribute)}]=${encodeURIComponent(
            exposedParams[key][attribute]
          )}`;

          if (currentIndex === 0) {
            return objectParam;
          }
          return `${objectParams}&${objectParam}`;
        },
        ""
      );
    }

    if (queryString !== startingQueryString) {
      newParam = `&${newParam}`;
    }

    return `${queryString}${newParam}`;
  }, startingQueryString);
};

export { removeChildren, buildQueryString };
