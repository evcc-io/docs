# UI Configuration Release - Documentation Update TODO

## Context

With PR https://github.com/evcc-io/evcc/pull/25762, UI configuration is being released as the new recommended way to configure evcc. The experimental flag is being removed and users no longer need to create an evcc.yaml file to get started.

## Status: IN PROGRESS

Started: 2025-12-16

---

## 🔴 IMMEDIATE PRIORITY - Critical for Release

### 1. Installation Landing Pages

- [x] Update `/docs/installation/index.md`
  - [x] Change "Nach der Installation: evcc.yaml erstellen" to new UI-first approach
  - [x] Add note that UI configuration is now recommended (restructured configuration page instead)
- [x] Update `/i18n/en/docusaurus-plugin-content-docs/current/installation/index.md`
  - [x] Change "After installation: Create evcc.yaml" to new UI-first approach
  - [x] Add note that UI configuration is now recommended (restructured configuration page instead)

### 2. Linux Image Documentation (Remove Experimental Warnings)

- [x] Update `/docs/installation/linux-image.mdx`
  - [x] Remove experimental warning box (lines 10-15)
  - [x] Update text to emphasize UI-first approach
  - [x] Remove "Experimentell aktivieren" instruction (line 61)
- [x] Update `/i18n/en/docusaurus-plugin-content-docs/current/installation/linux-image.mdx`
  - [x] Remove experimental warning box (lines 10-15)
  - [x] Remove "activate experimental" instruction (line 61)

### 3. Create New UI Setup Guide

- [ ] Create `/docs/installation/ui-setup.mdx`
  - [ ] Opening evcc for the first time
  - [ ] Setting admin password
  - [ ] Configuration wizard overview
  - [ ] Adding first loadpoint/charging station
  - [ ] Configuring meters (grid, PV, battery)
  - [ ] Adding vehicles
  - [ ] Setting up integrations (tariffs, etc.)
  - [ ] Backup/restore functionality
- [ ] Create `/i18n/en/docusaurus-plugin-content-docs/current/installation/ui-setup.mdx`
  - [ ] English translation of above

### 4. Update Configuration Documentation

- [x] Update `/docs/installation/configuration.mdx`
  - [x] Add prominent note at top: UI configuration is now recommended
  - [x] Restructure to show UI method first, file-based as alternative
  - [x] Update title to reflect both methods
- [x] Update `/i18n/en/docusaurus-plugin-content-docs/current/installation/configuration.mdx`
  - [x] Same changes as German version

---

## 🟡 SECONDARY PRIORITY - Should be done soon after release

### 5. Platform-Specific Installation Guides

- [ ] Update `/docs/installation/docker.mdx`
  - [ ] Remove requirement for evcc.yaml in prerequisites
  - [ ] Add note about UI configuration option
  - [ ] Update volumes section to clarify evcc.yaml is optional
- [ ] Update `/docs/installation/linux.mdx`
  - [ ] Update first-start instructions to mention UI setup
  - [ ] De-emphasize evcc.yaml creation
- [ ] Update `/docs/installation/macos.md`
  - [ ] Update first-start instructions
- [ ] Update `/docs/installation/windows.mdx`
  - [ ] Update first-start instructions
- [ ] Update `/docs/installation/home-assistant.mdx`
  - [ ] Mention UI configuration as primary method
- [ ] Update all English translations of above

### 6. FAQ Updates

- [ ] Update `/docs/faq.mdx`
  - [ ] Add Q&A about UI vs file configuration
  - [ ] Update troubleshooting sections for UI-based solutions
  - [ ] Add migration information
  - [ ] Update sections mentioning evcc.yaml as required
- [ ] Update `/i18n/en/docusaurus-plugin-content-docs/current/faq.mdx`

### 7. Sponsorship Documentation

- [ ] Update `/docs/sponsorship.mdx` if needed
  - [ ] Check if token entry via UI needs documentation
- [ ] Update English version

---

## 🟢 GOOD TO HAVE - Can be done after release

### 8. Device Documentation Templates

- [ ] Update device page generators if they mention configuration
- [ ] Add notes about UI configuration option in:
  - `/docs/devices/chargers.mdx`
  - `/docs/devices/meters.mdx`
  - `/docs/devices/vehicles.mdx`
  - All English translations

### 9. Reference Documentation

- [ ] Update `/docs/reference/configuration/index.md`
  - [ ] Add clear distinction between UI and file configuration
  - [ ] Update introduction to mention both methods
- [ ] Update all configuration reference pages as needed

### 10. Blog Post

- [ ] Consider writing announcement blog post about UI configuration release
  - [ ] Highlight ease of use
  - [ ] Migration guide for existing users
  - [ ] New features overview

### 11. Migration Guide

- [ ] Create `/docs/guides/migrate-to-ui.mdx`
  - [ ] How to migrate from evcc.yaml to UI
  - [ ] Backup existing configuration
  - [ ] Import/export options
  - [ ] Troubleshooting common issues

### 12. Video Tutorials

- [ ] Plan video content for UI setup
- [ ] Record walkthrough videos
- [ ] Embed in relevant documentation pages

---

## 📝 NOTES

### Important Considerations

1. **Both configuration methods remain supported** - evcc.yaml is not deprecated, just no longer the primary method
2. **Maintain German and English in sync** - All changes must be made in both languages
3. **Screenshots need updating** - Remove experimental badges and update UI screenshots
4. **Backwards compatibility** - Ensure existing users aren't confused by changes

### Files with "experimental" mentions to check:

- `/docs/installation/linux-image.mdx` - Main experimental warning
- `/docs/sponsorship.mdx` - May reference experimental features
- `/docs/features/loadmanagement.mdx` - Check for UI config mentions
- Various blog posts - Leave historical content as-is

### Key Messages to Communicate

1. UI configuration is now the recommended way to get started
2. No evcc.yaml needed for new installations
3. Existing evcc.yaml configurations continue to work
4. File-based configuration remains available for advanced use cases
5. Backup/restore functionality available for UI configurations

---

## Progress Tracking

- Total Items: ~50
- Completed: 0
- In Progress: 0
- Remaining: 50

Last Updated: 2025-12-16
