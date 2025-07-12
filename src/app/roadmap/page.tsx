"use client";

import FeatureFlags from "../FeatureFlags";
import { notFound } from "next/navigation";

export default function RoadmapPage() {
  if (!FeatureFlags.roadmap) {
    notFound();
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">🚧 2025 Roadmap</h1>
        <ul className="space-y-4 w-full">
          <li>
            <span className="font-bold">🚀 Infrastructure</span>
            <ul className="ml-4 mt-1 list-disc text-base">
              <li>✅ Domain registration</li>
              <li>✅ Initial landing page</li>
              <li>✅ SES Configuration / Email setup</li>
              <li>✅ API Gateawy</li>
              <li>✅ GraphQL Service</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Community & Town Engagement</span>
            <ul className="ml-4 mt-1 list-disc text-base">
              <li>✅ Set up github organization</li>
              <li>
                ⏳ Solicit any community members interested in contributing
              </li>
              <li>➡️ Plan first community event</li>
              <li>➡️ Volunteer onboarding process</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Governance & Operations</span>
            <ul className="ml-4 mt-1 list-disc text-base">
              <li>✅ Draft vision statement</li>
              <li>⏳ Register as a non-profit</li>
              <li>➡️ Establish review process</li>
            </ul>
          </li>
          <li>
            <span className="font-bold">Initial Features</span>
            <ul className="ml-4 mt-1 list-disc text-base">
              <li>⏳ Mapbox Integration</li>
              <li>➡️ AI Chatbot UX & GPT Integration</li>
              <li>➡️ Automated data retrieval / data scraping</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
