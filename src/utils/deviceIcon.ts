import { registry } from "@evcc/icons";

// Icon types in @evcc/icons. Our URL/category names use the plural form; this
// map converts to the singular registry key.
const TYPE_MAP: Record<string, string> = {
  chargers: "charger",
  meters: "meter",
  vehicles: "vehicle",
  smartswitches: "smartswitch",
  heating: "heating",
};

type IconLoader = () => Promise<{ default: string }>;
const REGISTRY = registry as unknown as Record<string, IconLoader>;

export async function deviceIconSvg(
  categoryType: string,
  slug: string,
): Promise<string | null> {
  const iconType = TYPE_MAP[categoryType];
  if (!iconType) return null;
  const loader = REGISTRY[`${iconType}/${slug}`];
  if (!loader) return null;
  const mod = await loader();
  return mod.default ?? null;
}
