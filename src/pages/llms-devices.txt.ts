import { getCollection } from "astro:content";
import {
  collectionName,
  deviceTitle,
  filterByType,
  sortDevices,
} from "@utils/devices";

// Index of every supported device (English, release channel) with a link to
// its markdown twin. Referenced from /llms.txt; device pages are custom
// routes the llms plugin cannot see.
const SECTIONS: Array<{
  heading: string;
  prefix: Parameters<typeof collectionName>[0];
  type: string;
  filterType?: "charger" | "smartswitch" | "heating";
}> = [
  {
    heading: "Chargers",
    prefix: "chargers",
    type: "chargers",
    filterType: "charger",
  },
  {
    heading: "Meters (grid, solar, battery)",
    prefix: "meters",
    type: "meters",
  },
  { heading: "Vehicles", prefix: "vehicles", type: "vehicles" },
  {
    heading: "Smart switches",
    prefix: "chargers",
    type: "smartswitches",
    filterType: "smartswitch",
  },
  {
    heading: "Heating devices",
    prefix: "chargers",
    type: "heating",
    filterType: "heating",
  },
  { heading: "Tariffs and forecasts", prefix: "tariffs", type: "tariffs" },
  { heading: "External limit (HEMS)", prefix: "hems", type: "external-limit" },
  {
    heading: "External limit (curtailment)",
    prefix: "curtailers",
    type: "external-limit",
  },
  { heading: "Notifications", prefix: "messengers", type: "notifications" },
];

export async function GET() {
  const out = [
    "# evcc supported devices",
    "",
    "> Every device evcc supports in the current release. Each link is the device's documentation as markdown (parameters and evcc.yaml example); drop the .md suffix for the HTML page.",
    "",
  ];
  for (const s of SECTIONS) {
    const all = (await getCollection(
      collectionName(s.prefix, "en", "release") as any,
    )) as any[];
    const devices = sortDevices(
      s.filterType ? filterByType(all, s.filterType) : all,
    );
    out.push(`## ${s.heading}`, "");
    for (const d of devices) {
      out.push(
        `- [${deviceTitle(d)}](https://docs.evcc.io/en/${s.type}/${d.id}.md)`,
      );
    }
    out.push("");
  }
  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
