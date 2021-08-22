import { FEATURE_TYPES, EVENT_TYPES } from "./feature";

const common = {
  availableFeatureTypes: Object.values(FEATURE_TYPES).join(", "),
  availableEventTypes: Object.values(EVENT_TYPES).join(", "),
};

const errorMessage = {
  invalidEnv:
    "You must provide a valid env value. Valid env values include: 'us', 'ca', 'us-snd', and 'ca-snd'",
  invalidFeatureType: (featureType: string): string =>
    `${featureType} is not a valid featureType. Valid featureType values include: ${common.availableFeatureTypes}`,
  invalidEventType: (eventType: string): string =>
    `${eventType} is not a valid eventType. Valid feature eventType values include: ${common.availableEventTypes}`,
  invalidMountPoint:
    "Could not find the mount point for the iframe. Please check that the elementId provided in .mount() matches the one that's used in the DOM",
};

export { errorMessage, common };
