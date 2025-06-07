import React from "react";
import "@evcc/icons";
import Link from "@docusaurus/Link";
import styles from "./DeviceCard.module.css";

interface DeviceCardProps {
  brand: string;
  description: string;
  thumbnail: string;
  capabilities?: string[];
  requirements?: string[];
  href: string;
  group?: string;
  type: string;
  name: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({
  brand,
  description,
  thumbnail,
  capabilities = [],
  requirements = [],
  href,
  group,
  type,
  name,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      // The Link component will handle the navigation
      (event.currentTarget as HTMLAnchorElement).click();
    }
  };

  // Use only capabilities since all features are now in capabilities
  const allFeatures = capabilities;

  // Simple string mapping for feature translations
  const featureTranslations: Record<string, string> = {
    "1p3p": "1P3P",
    rfid: "RFID",
    mA: "mA Regelung",
    iso151182: "ISO 15118",
    sponsorfree: "ohne Sponsoring",
    sponsorship: "Sponsorship",
    "battery-control": "aktive Batteriesteuerung",
    eebus: "EEBUS",
    skiptest: "Skip Test",
  };

  return (
    <Link
      to={href}
      className={styles.deviceCard}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${brand} ${description}`}
    >
      <div className={styles.thumbnailContainer}>
        <evcc-icon
          type={type}
          name={name}
          size="100%"
          alt={`${brand} ${description}`}
        ></evcc-icon>
      </div>

      <div className={styles.content}>
        {brand && <div className={styles.title}>{brand}</div>}
        {description && <div className={styles.title}>{description}</div>}

        {allFeatures.length > 0 && (
          <div className={styles.capabilities}>
            {allFeatures.slice(0, 3).map((feature, index) => (
              <span key={index} className={styles.capabilityTag}>
                {featureTranslations[feature] || feature}
              </span>
            ))}
            {allFeatures.length > 3 && (
              <span className={styles.moreCapabilities}>
                +{allFeatures.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.viewDetails}>View Details →</span>
      </div>
    </Link>
  );
};

export default DeviceCard;
