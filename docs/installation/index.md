---
sidebar_position: 1
hide_table_of_contents: true
---

import NavCard from '@site/src/components/NavCard';
import NavCardGrid from '@site/src/components/NavCardGrid';

# Erste Schritte

In diesem Abschnitt findest du Anleitungen für die Installation von evcc auf verschiedenen Plattformen.
Falls du mehr über die Funktionsweise von Wallboxen und E-Auto-Laden erfahren möchtest, schau dir zuerst die [Vorüberlegungen](./installation/considerations) an.

<NavCardGrid>
  <NavCard 
    to="/docs/installation/linux-image" 
    title="Raspberry Pi & Co." 
    description="Einfachste Installation. Fertiges SD-Karten-Image." 
    fullWidth={true}
    highlight={true}
  />
</NavCardGrid>

<NavCardGrid>
  <NavCard 
    to="/docs/installation/docker" 
    title="Docker" 
    description="Synology, QNAP, Unraid und andere NAS Systeme" 
  />
  <NavCard 
    to="/docs/installation/home-assistant" 
    title="Home Assistant" 
    description="Als Add-on über HACS." 
  />
  <NavCard 
    to="/docs/installation/proxmox" 
    title="Proxmox" 
    description="LXC-Container via Helper-Script." 
  />
  <NavCard 
    to="/docs/installation/linux" 
    title="Linux" 
    description="Debian/Ubuntu und andere Distributionen." 
  />
  <NavCard 
    to="/docs/installation/macos" 
    title="macOS" 
    description="Via Homebrew." 
  />
  <NavCard 
    to="/docs/installation/windows" 
    title="Windows" 
    description="Manuelle Installation. Nicht empfohlen aber geht." 
  />
</NavCardGrid>

Nach der Installation: [evcc.yaml erstellen](./installation/configuration)
