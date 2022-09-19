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
  const { env, domain } = params.fullscriptOptions;

  const fsDomain = domain ?? FULLSCRIPT_DOMAINS[env];

  if (!Object.keys(params) || Object.keys(params).length === 0) return "";

  const { patient: patientInfo, ...exposedParams } = params;

  let startingQueryString;

  try {
    if (!patientInfo) throw new Error("patient info not provided");

    const encryptedPatientInfo = await fetch(`${fsDomain}/api/embeddable/encrypt`, {
      method: "POST",
      body: JSON.stringify({ data: patientInfo }),
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json());

    startingQueryString = `?encrypted_patient=${encodeURIComponent(
      encryptedPatientInfo.encrypted_value
    )}&`;
  } catch (error) {
    startingQueryString = "?";
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
