---
title: "OCPP-videresendelse"
description: "Viser, hvordan du videresender en opladers OCPP-beskeder fra evcc til en ekstern backend som en afregningsplatform, mens evcc fortsat styrer opladningen."
translatedFrom: "df48634d807d"
---

Nogle gange skal opladningssessioner nå frem til en ekstern OCPP-backend, f.eks. en afregningsplatform til refusion fra arbejdsgiveren eller en ladeoperatør.
En oplader kan normalt kun kommunikere med én OCPP-server.
Med videresendelse forbliver opladeren forbundet til din evcc-installation, som også sender dens beskeder videre til den eksterne server.
evcc styrer fortsat opladningen.
Den eksterne server modtager opladningssessioner og målerværdier live og kan, hvis det er tilladt, også styre opladeren.

## Opsætning {#setup}

Videresendelse er tilgængelig for opladere, der er integreret via OCPP, dvs. opladere, der bruger evcc som deres OCPP-server.
Sæt først opladeren op, og konfigurer derefter videresendelsen for den.

1. Åbn **Opsætning → OCPP Server**.
2. Listen **Station ID'er** viser dine tilsluttede OCPP-opladere. Klik på skyknappen ved siden af opladeren for at åbne dialogboksen **OCPP videresend**.
3. Indtast **Ekstern server URL**, dvs. adressen på den server, der skal videresendes til, f.eks. `wss://billing.example.com/ocpp`.
4. Hvis den eksterne server kræver godkendelse, skal du indtaste **Brugernavn** og **Kodeord** (HTTP Basic Auth). Hvis den forventer en anden identifikator for opladeren, skal du angive **Stations ID**.
5. Klik på **Gem**. Videresendelsen starter med det samme, uden genstart.

Skyikonet ved siden af opladeren viser, om videresendelsen virker.
Forbindelsesproblemer vises i dialogboksen.

For at stoppe videresendelsen åbner du dialogboksen igen og klikker på **Fjern**.

## Kommandoer fra den eksterne server {#upstream-commands}

Som standard kan den eksterne server sende kommandoer til opladeren.
For at undgå konflikter med styringen af opladningen skal du aktivere **Bloker kommandoer fra den eksterne server** i de avancerede indstillinger.
Serveren modtager stadig alle beskeder fra opladeren, men evcc beholder eneretten til styringen.

## Certifikater {#certificates}

De avancerede indstillinger dækker også TLS.
Aktiver **Tillad selv-signerede certifikater** til testopsætninger uden et gyldigt certifikat.
Angiv et **Server certifikat (CA)**, hvis den eksterne server bruger et certifikat fra en privat certifikatudsteder.
