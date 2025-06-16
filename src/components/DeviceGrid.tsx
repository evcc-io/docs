import React, { useState, useMemo } from "react";
import DeviceSearch from "./DeviceSearch";

interface DeviceGridProps {
  children: React.ReactElement[];
  searchPlaceholder?: string;
}

interface DeviceCardProps {
  brand: string;
  description: string;
  group?: string;
  [key: string]: any;
}

const DeviceGrid: React.FC<DeviceGridProps> = ({
  children,
  searchPlaceholder = "Search devices...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
  };

  const getGroupDisplayName = (
    group: string | undefined,
    deviceType: string,
  ): string => {
    if (!group) {
      // Determine device type from URL or default naming
      const typeMap: Record<string, string> = {
        vehicle: "Unterstützte Fahrzeuge",
        charger: "Unterstützte Ladegeräte",
        meter: "Unterstützte Zähler",
        tariff: "Unterstützte Tarife",
      };
      return typeMap[deviceType] || "Unterstützte Geräte";
    }
    return group;
  };

  const filteredAndGroupedDevices = useMemo(() => {
    // First filter by search term
    const filtered = searchTerm.trim()
      ? children.filter((child) => {
          const props = child.props as DeviceCardProps;
          const brand = normalizeText(props.brand || "");
          const description = normalizeText(props.description || "");
          const normalizedSearch = normalizeText(searchTerm);

          return (
            brand.includes(normalizedSearch) ||
            description.includes(normalizedSearch)
          );
        })
      : children;

    // Then group by group field
    const groups = new Map<string, React.ReactElement[]>();

    filtered.forEach((child) => {
      const props = child.props as DeviceCardProps;
      const groupKey = props.group || "";

      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(child);
    });

    // Sort devices within each group by display name (Brand + Description)
    groups.forEach((devices, groupKey) => {
      devices.sort((a, b) => {
        const aProps = a.props as DeviceCardProps;
        const bProps = b.props as DeviceCardProps;
        const aDisplayName =
          `${aProps.brand || ""} ${aProps.description || ""}`.trim();
        const bDisplayName =
          `${bProps.brand || ""} ${bProps.description || ""}`.trim();
        return aDisplayName.localeCompare(bDisplayName);
      });
    });

    // Sort groups: empty group first, then alphabetically
    const sortedGroups = Array.from(groups.entries()).sort(([a], [b]) => {
      if (a === "" && b !== "") return -1;
      if (a !== "" && b === "") return 1;
      return a.localeCompare(b);
    });

    return sortedGroups;
  }, [children, searchTerm]);

  const handleSearchChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  };

  // Determine device type from the current URL or context
  const deviceType =
    typeof window !== "undefined"
      ? window.location.pathname.split("/").slice(-2, -1)[0]?.slice(0, -1) ||
        "device"
      : "device";

  const totalDevices = filteredAndGroupedDevices.reduce(
    (sum, [, devices]) => sum + devices.length,
    0,
  );

  return (
    <>
      <DeviceSearch
        onSearchChange={handleSearchChange}
        placeholder={searchPlaceholder}
      />

      {totalDevices === 0 && searchTerm.trim() ? (
        <div
          style={{
            textAlign: "center",
            padding: "48px 16px",
            color: "var(--ifm-color-emphasis-600)",
            fontSize: "1.1rem",
          }}
        >
          No devices found matching "{searchTerm}"
        </div>
      ) : (
        <>
          {filteredAndGroupedDevices.map(([groupKey, devices]) => (
            <div key={groupKey} style={{ marginBottom: "48px" }}>
              <h2>{getGroupDisplayName(groupKey, deviceType)}</h2>
              <div className="device-grid">{devices}</div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default DeviceGrid;
