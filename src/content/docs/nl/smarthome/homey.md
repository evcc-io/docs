---
title: "Homey"
description: "De evcc-communityapp voor Homey toont laadpunten, locatie en thuisbatterij als apparaten en laat u via flows laadmodi en limieten wijzigen, alles lokaal."
translatedFrom: "d711ce90c00c"
---

[Homey](https://homey.app) is een smarthomehub die apparaten van veel fabrikanten verbindt en via flows automatiseert.
De [evcc-app voor Homey](https://homey.app/en-us/app/com.evcc.io/) verbindt Homey met uw lokale evcc-installatie.
Het is een communityproject van [rdvnit](https://github.com/rdvnit) en geen onderdeel van evcc.

## Functies

De app biedt drie apparaattypen:

- **Charging point** met laadmodus, laadlimiet, laadvermogen, energie van de laadsessie, laadniveau en actieradius van het voertuig, en verbindings- en laadstatus
- **Site** met productie van zonne-energie, netvermogen en huisverbruik
- **Home battery** met batterijvermogen, laadniveau en instellingen voor batterijsturing

Met flowkaarten kunt u de laadmodus, de laadlimiet en de minimale en maximale laadstroom instellen.
Flowvoorwaarden reageren op laadmodus, laadstatus en verbindingsstatus.

De app vraagt periodiek gegevens op bij uw evcc-installatie in het lokale netwerk en is niet afhankelijk van een clouddienst.

## Instellen

1. Installeer de app **evcc** vanuit de [Homey App Store](https://homey.app/en-us/app/com.evcc.io/).
2. Voeg een apparaat toe en kies **Charging point**, **evcc site** of **Home battery**.
3. Voer de URL van uw evcc-installatie in (bijv. `http://192.168.1.50:7070`) en, indien ingesteld, het wachtwoord.

Details en ondersteuning vindt u in de [GitHub-repository](https://github.com/rdvnit/com.evcc.io).
