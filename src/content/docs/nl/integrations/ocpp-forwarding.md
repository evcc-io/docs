---
title: "OCPP-doorsturen"
description: "Laat zien hoe u de OCPP-berichten van een lader via evcc doorstuurt naar een externe backend, zoals een afrekenplatform, terwijl evcc het laden blijft regelen."
translatedFrom: "df48634d807d"
---

Soms moeten laadsessies bij een externe OCPP-backend terechtkomen, bijv. een afrekenplatform waarmee de werkgever de laadkosten vergoedt, of de backend van een laadpuntexploitant.
Een lader kan normaal gesproken maar met één OCPP-server communiceren.
Met doorsturen blijft de lader verbonden met uw evcc-installatie, die de berichten ook doorgeeft aan de externe server.
evcc blijft het laden regelen.
De externe server ontvangt laadsessies en meterwaarden live en kan, als dat is toegestaan, de lader ook aansturen.

## Instellen {#setup}

Doorsturen is beschikbaar voor laders die via OCPP zijn gekoppeld, d.w.z. laders die evcc als OCPP-server gebruiken.
Stel eerst de lader in, daarna kunt u het doorsturen ervoor configureren.

1. Open **Configuratie → OCPP Server**.
2. De lijst **Laadstation IDs** toont uw verbonden OCPP-laders. Klik op de wolkknop naast de lader om het venster **OCPP Doorsturen** te openen.
3. Vul de **Upstream server URL** in, het adres van de server waarnaar wordt doorgestuurd, bijv. `wss://billing.example.com/ocpp`.
4. Als de externe server authenticatie vereist, vul dan **Gebruikersnaam** en **Wachtwoord** in (HTTP Basic Auth). Als de server een andere identificatie van de lader verwacht, stel dan de **Laadstation ID** in.
5. Klik op **Opslaan**. Het doorsturen start direct; een herstart is niet nodig.

Het wolkpictogram naast de lader laat zien of het doorsturen werkt.
Verbindingsproblemen worden in het venster weergegeven.

Om het doorsturen te stoppen, opent u het venster opnieuw en klikt u op **Verwijderen**.

## Upstream-commando’s {#upstream-commands}

Standaard kan de externe server commando’s naar de lader sturen.
Om conflicten met de laadregeling te voorkomen, schakelt u in de geavanceerde instellingen **Blokkeer commando's van de upstream server** in.
De server ontvangt nog steeds elk bericht van de lader, maar alleen evcc stuurt de lader aan.

## Certificaten {#certificates}

In de geavanceerde instellingen vindt u ook de TLS-opties.
Schakel **Sta zelf ondertekende (self-signed) certificaten toe** in voor testopstellingen zonder geldig certificaat.
Geef een **Server certificaat (CA)** op als de externe server een certificaat van een private certificaatautoriteit gebruikt.
