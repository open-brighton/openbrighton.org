import { NODE_ENV } from "./config";

export type Feature = 'chat' | 'roadmap' | 'ideas' | 'contact' | 'dev';
export type FeatureFlagConfig = Record<Feature, boolean>;

const localFeatureFlags: FeatureFlagConfig = {
  chat: true, // Enable chat in local
  roadmap: true,
  ideas: true,
  contact: true,
  dev: true, // Enable dev route in local
};

const productionFeatureFlags: FeatureFlagConfig = {
  chat: false, // Disable chat in production
  roadmap: true,
  ideas: false,
  contact: true,
  dev: false, // Disable dev route in production
};

const FeatureFlags =
  NODE_ENV === "production"
    ? productionFeatureFlags
    : localFeatureFlags;

export default FeatureFlags; 