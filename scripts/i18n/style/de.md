# Style Sheet: German (de)

- Address the reader with "du", lowercase, consistent with the evcc UI; never "Sie".
- Use the imperative for steps the reader performs („Öffne **Konfiguration**“) and impersonal phrasing for technical requirements („Das Plugin muss den Zählerstand liefern“, not „Liefere den Zählerstand“).
- Headings use sentence case: only the first word and nouns are capitalised („Häufige Fragen“).
- Compounds follow Duden, with a hyphen after abbreviations and symbols: PV-Anlage, PV-Überschuss, Smart-Modus, CO₂-Limit, OCPP-Verbindung, MQTT-Broker, Lastmanagement-Kachel; „Sponsortoken“ is one word.
- Numbers: decimal comma and thousands period (1,4 kW, 11.200 W), a space between number and unit, no space before percent (50%), a space after the paragraph sign in body text (§ 14a EnWG).
- Quotation marks „…“ for actual quotations, italics rather than quotes for technical terms.
- Abbreviations with a space: z. B., d. h., u. a., inkl., usw.; never „beispielsweise“ where „z. B.“ does.
- Dates in prose: „18. Februar 2026“; times 14:30 Uhr.
- Mode names come from the UI: **Smart**, **Schnell**, **Aus**, **Ein**, **Boost**.
- UI panels are „Kacheln“, not „Karten“; energy is „geladen“ and „entladen“, grid energy „Netzbezug“ and „Netzeinspeisung“, as in the UI.
- Refer to a running instance as „deine evcc-Instanz“; "evcc" stays lowercase, also at the start of a sentence.
- Use the glossary terms (`../evcc/i18n/glossary/de.json`): Ladepunkt, Wallbox, Zähler, Hausbatterie, Ladestand (never SoC), benutzerdefinierte Geräte (not „eigene Geräte“).
- Keep English only for UI strings that the UI itself leaves in English (**Smart**, **Boost**) and for protocol names; prefer the German word where it is established (Einstellungen, Benachrichtigungen, Ladeleistung).
- Keep the docs' direct, friendly tone: complete sentences, no marketing words (bequem, nahtlos), no em or en dashes as sentence connectors.
