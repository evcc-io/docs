# UI Configuration Release - Documentation Update TODO

## Context

With PR https://github.com/evcc-io/evcc/pull/25762, UI configuration is being released as the new recommended way to configure evcc. The experimental flag is being removed and users no longer need to create an evcc.yaml file to get started.

## Status: IN PROGRESS

Started: 2025-12-16

---

## Tasks

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

### 3. Update Configuration Documentation

- [x] Update `/docs/installation/configuration.mdx`
  - [x] Add prominent note at top: UI configuration is now recommended
  - [x] Restructure to show UI method first, file-based as alternative
  - [x] Update title to reflect both methods
- [x] Update `/i18n/en/docusaurus-plugin-content-docs/current/installation/configuration.mdx`
  - [x] Same changes as German version

### 4. Platform-Specific Installation Guides

- [x] Update `/docs/installation/docker.mdx`
  - [x] Remove requirement for evcc.yaml in prerequisites
  - [x] Add note about UI configuration option
  - [x] Update volumes section to clarify evcc.yaml is optional
- [x] Update `/docs/installation/linux.mdx`
  - [x] Update first-start instructions to mention UI setup
  - [x] De-emphasize evcc.yaml creation
- [x] Update `/docs/installation/macos.md`
  - [x] Update first-start instructions
- [x] Update `/docs/installation/windows.mdx`
  - [x] Update first-start instructions
  - [x] Add UI configuration as primary method
  - [x] De-emphasize evcc.yaml creation
- [x] Update `/docs/installation/home-assistant.mdx`
  - [x] Mention UI configuration as primary method
  - [x] Restructure to show UI method first
  - [x] Make evcc.yaml optional
- [x] Update English translations of windows.mdx and home-assistant.mdx
- [x] Update English translations of docker.mdx, linux.mdx and macos.md

### 5. FAQ Updates

- [x] Update `/docs/faq.mdx`
  - [x] Add Q&A about UI vs file configuration
  - [x] Update troubleshooting sections for UI-based solutions
  - [x] Add migration information
  - [x] Update sections mentioning evcc.yaml as required
  - [x] Remove "Experimentell aktivieren" from backup/restore section
- [x] Update `/i18n/en/docusaurus-plugin-content-docs/current/faq.mdx`

### 6. Sponsorship Documentation

- [x] Update `/docs/sponsorship.mdx` if needed
  - [x] Check if token entry via UI needs documentation
- [x] Update English version

### 7. Device Documentation Templates

- [ ] Update device page generators if they mention configuration
- [ ] Add notes about UI configuration option in:
  - `/docs/devices/chargers.mdx`
  - `/docs/devices/meters.mdx`
  - `/docs/devices/vehicles.mdx`
  - All English translations

### 8. Reference Documentation

- [ ] Update `/docs/reference/configuration/index.md`
  - [ ] Add clear distinction between UI and file configuration
  - [ ] Update introduction to mention both methods
- [ ] Update all configuration reference pages as needed

---

## 📝 NOTES

### Important Considerations

1. **Both configuration methods remain supported** - evcc.yaml is not deprecated, just no longer the primary method
2. **Maintain German and English in sync** - All changes must be made in both languages
3. **Screenshots need updating** - Remove experimental badges and update UI screenshots
4. **Backwards compatibility** - Ensure existing users aren't confused by changes

### Terminology

- **German UI menu**: **Konfiguration** (not "Einstellungen")
- **English UI menu**: **Configuration** (not "Settings")

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

Last Updated: 2025-12-17
