---
sidebar_position: 1
hide_table_of_contents: true
---

import NavCard from '@site/src/components/NavCard';
import NavCardGrid from '@site/src/components/NavCardGrid';

# Getting Started

In this section you will find installation guides for evcc on various platforms.
If you want to learn more about how wallboxes and EV charging work, first check out the [preliminary considerations](./installation/considerations).

<NavCardGrid>
  <NavCard 
    to="/docs/installation/linux-image" 
    title="Raspberry Pi & Co." 
    description="Easiest installation. Ready-made SD card image." 
    fullWidth={true}
    highlight={true}
  />
</NavCardGrid>

<NavCardGrid>
  <NavCard 
    to="/docs/installation/docker" 
    title="Docker" 
    description="Synology, QNAP, Unraid and other NAS systems" 
  />
  <NavCard 
    to="/docs/installation/home-assistant" 
    title="Home Assistant" 
    description="As add-on via HACS." 
  />
  <NavCard 
    to="/docs/installation/proxmox" 
    title="Proxmox" 
    description="LXC container via helper script." 
  />
  <NavCard 
    to="/docs/installation/linux" 
    title="Linux" 
    description="Debian/Ubuntu and other distributions." 
  />
  <NavCard 
    to="/docs/installation/macos" 
    title="macOS" 
    description="Via Homebrew." 
  />
  <NavCard 
    to="/docs/installation/windows" 
    title="Windows" 
    description="Manual installation. Not recommended but works." 
  />
</NavCardGrid>

After installation: [Configure evcc](./installation/configuration)
