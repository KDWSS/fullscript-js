import { EventType, EVENT_TYPES } from "../feature/eventType";
import { FeatureType, FEATURE_TYPES } from "../feature/featureType";
import { getDomain, FullscriptOptions } from "../fullscript";
import { errorMessage } from "../staticMessages";

export const validateFullscriptOptions = (options: FullscriptOptions): void => {
  if (!getDomain(options)) {
    throw new Error(errorMessage.invalidEnv);
  }
};

export const validateFeatureType = (featureType: FeatureType): void => {
  if (!Object.values(FEATURE_TYPES).includes(featureType)) {
    throw new Error(errorMessage.invalidFeatureType(featureType));
  }
};

export const validateFeatureEventType = (eventType: EventType): void => {
  if (!Object.values(EVENT_TYPES).includes(eventType)) {
    throw new Error(errorMessage.invalidEventType(eventType));
  }
};

export const validateMountPoint = (element: HTMLElement): void => {
  if (!element) {
    throw new Error(errorMessage.invalidMountPoint);
  }
};
