import { redirect } from "next/navigation";
import { MAPS } from "./mapConfigs";

export default function MapRootRedirect() {
  redirect(`/map/${MAPS[0].id}`);
}
