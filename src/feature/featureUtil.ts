import { FULLSCRIPT_DOMAINS, FullscriptOptions } from "../fullscript";
import { validateFeatureType } from "../fullscriptJsValidator";
import { buildQueryString } from "../utils";

import { FEATURE_PATHS } from "./featurePath";
import { FeatureType, FeatureOptions } from "./featureType";

const getFeatureURL = async <F extends FeatureType>(
  featureType: F,
  featureOptions: FeatureOptions<F>,
  fullscriptOptions: FullscriptOptions,
  frameId: string
): Promise<string> => {
  const { publicKey, env, domain } = fullscriptOptions;
  const queryString = await buildQueryString({
    ...featureOptions,
    fullscriptOptions,
    publicKey,
    frameId,
  });
  validateFeatureType(featureType);
  const fsDomain = domain ?? FULLSCRIPT_DOMAINS[env];

  return `${fsDomain}/api/embeddable/session${FEATURE_PATHS[featureType]}${queryString}&target_origin=${window.location.origin}`;
};

export { getFeatureURL };
