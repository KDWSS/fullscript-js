import { FULLSCRIPT_DOMAINS, FullscriptOptions } from "../fullscript";
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

  return `${FULLSCRIPT_DOMAINS[env]}/api/embeddable/session${FEATURE_PATHS[featureType]}${queryString}&target_origin=${window.location.origin}`;
};

export { getFeatureURL };
