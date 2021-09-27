import { getDomain } from "../fullscript";
import type {} from "./";
import { validateFeatureType } from "../fullscriptJsValidator";
import { buildQueryString } from "../utils";

import { FEATURE_PATHS } from "./featurePath";
import { FeatureType, FeatureOptions } from "./featureType";

const getFeatureURL = <F extends FeatureType>(
  featureType: F,
  featureOptions: FeatureOptions<F>,
  fullscriptOptions: FullscriptOptions,
  frameId: string
): string => {
  const { publicKey, env } = fullscriptOptions;
  const queryString = buildQueryString({ ...featureOptions, publicKey, frameId });
  validateFeatureType(featureType);

  return `${getDomain(fullscriptOptions)}/api/embeddable/session${
    FEATURE_PATHS[featureType]
  }${queryString}&target_origin=${window.location.origin}`;
};

export { getFeatureURL };
