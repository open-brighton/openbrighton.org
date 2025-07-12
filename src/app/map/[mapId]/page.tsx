import MapPageContent from "../MapPageContent";
import { MAPS } from "../mapConfigs";

export default function MapDynamicPage() {
  return <MapPageContent initialMapId={MAPS[0].id} />;
}

export function generateStaticParams() {
  return MAPS.map((map) => ({ mapId: map.id }));
}
