import { NODE_ENV } from "./config";

export type Feature = 'chat' | 'roadmap' | 'ideas' |  'dev' | 'map';
export type FeatureFlagConfig = Record<Feature, boolean>;

const localFeatureFlags: FeatureFlagConfig = {
  chat: true,
  roadmap: true,
  ideas: true,
  dev: true,
  map: true,
};

const productionFeatureFlags: FeatureFlagConfig = {
  chat: false,
  roadmap: true,
  ideas: false,
  dev: false,
  map: true, 
};

const FeatureFlags =
  NODE_ENV === "production"
    ? productionFeatureFlags
    : localFeatureFlags;

export default FeatureFlags; 