import FeatureFlags from "../FeatureFlags";
import config from "../config";

export default function DevPage() {
  if (!FeatureFlags.dev) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Dev route is disabled.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8">
      <h1 className="text-3xl font-bold mb-4">Dev Mode</h1>
      <div className="w-full max-w-md p-8 bg-[var(--background)] rounded shadow-lg flex flex-col items-center">
        <pre className="w-full text-left bg-gray-900 text-green-300 p-4 rounded overflow-x-auto">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>
    </div>
  );
}
