import { Dispatcher } from "../eventSystem";
import { getFeature, FeatureType, FeatureOptions, Feature } from "../feature";
import { FullscriptOptions } from "../fullscript";

type Create = <F extends FeatureType>(feature: F, options: FeatureOptions<F>) => Feature;

interface Client {
  create: Create;
}

const createClient = (options: FullscriptOptions, dispatcher: Dispatcher): Client => {
  const handleCreateFeature: Create = (featureType, featureOptions): Feature => {
    return getFeature(featureType, featureOptions, options, dispatcher);
  };

  return {
    create: handleCreateFeature,
  };
};

export { Client, createClient };
