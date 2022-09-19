import { Dispatcher } from "../eventSystem";
import { getFeature, FeatureType, FeatureOptions, Feature } from "../feature";
import { FullscriptOptions } from "../fullscript";

type Create = <F extends FeatureType>(feature: F, options: FeatureOptions<F>) => Promise<Feature>;

interface Client {
  create: Create;
}
// TODO: Just adding comment in here
const createClient = (options: FullscriptOptions, dispatcher: Dispatcher): Client => {
  const handleCreateFeature: Create = async (featureType, featureOptions): Promise<Feature> => {
    return getFeature(featureType, featureOptions, options, dispatcher);
  };

  return {
    create: handleCreateFeature,
  };
};

export { Client, createClient };
