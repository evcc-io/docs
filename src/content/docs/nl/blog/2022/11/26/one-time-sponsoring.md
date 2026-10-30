---
date: 2022-11-26
title: "Sponsoring en verhuizingen"
description: "In november 2022 introduceerden we eenmalige sponsoring en contributor-tokens, lichtten we de financiering toe en verhuisden we de GitHub-sponsoring en Docker-images."
authors: [naltatis]
tags: [sponsoring]
prev: false
next: false
translatedFrom: "1447dca21a1e"
---

Sinds onze laatste update hier op de blog zijn er alweer zeventien releases verschenen. Zoals altijd is er veel gebeurd. Er zijn enkele bugfixes, maar ook veel nieuwe integraties en functies bijgekomen. Meer over onze hoogtepunten van de afgelopen maanden in een latere blogpost.

<!-- excerpt -->

## 🌱 Duurzame open-sourceontwikkeling

evcc is begonnen als klein hobbyproject, omdat we ontevreden waren over de bestaande oplossingen voor laden met overschot aan zonne-energie en zelf iets beters wilden bouwen. Inmiddels maakt evcc echter niet alleen ons eigen laden op zonne-energie makkelijker. Er zijn vermoedelijk enkele duizenden installaties die ’s ochtends de auto wekken zodra de zon op de eigen zonnepanelen schijnt. Die gedachte maakt ons erg blij.

Exacte cijfers over onze gebruikersbasis hebben we niet. We houden van dataminimalisatie en hebben daarom ook geen ambitie om algemene tracking in onze website of de applicatie in te bouwen. Toch kunnen we aan de hand van cijfers van Docker (tot nu toe >1 mln. pulls) en Cloudsmith (momenteel ca. 4.500 pakketdownloads per dag) vrij goed zien dat velen in het dagelijks leven op evcc vertrouwen.

Om het project met voldoende focus te kunnen onderhouden en doorontwikkelen, is duurzame financiering een belangrijk onderwerp. Achter evcc zit geen groot bedrijf en geen fabrikant van laders, en we hebben ook geen zin in het startupspel met investeerders. Op dit moment is evcc een project dat we in onze vrije tijd vooruithelpen. We zijn ervan overtuigd dat het een goed idee is om rechtstreeks voor u, de gebruikers, te werken en onafhankelijk te zijn van andere belangen en verplichtingen.

Met **GitHub Sponsors** hebben we een zeer lichtgewicht en eenvoudige oplossing gevonden om financiële steun rechtstreeks van gebruikers te kunnen ontvangen. Bovendien hebben we daardoor de mogelijkheid om **enkele functies exclusief voor sponsors** beschikbaar te stellen. Momenteel zijn dat bepaalde typen laders en de telemetriefunctie, maar we kunnen ons goed voorstellen dat we dit model in de toekomst nog aanpassen.

## 💚 Dank aan alle sponsors

Op dit moment hebben we **meer dan 1.500 sponsors** 🥳 die maandelijks minstens $2 bijdragen. Dat is best gaaf, een groot blijk van vertrouwen en het sterkt ons in de keuze om veel tijd in het project te blijven steken.

Naast het sponsortoken om functies vrij te schakelen sturen we alle supporters ook graag stickers. Daarmee kunt u uw laptop, Raspberry, lader of laadapparatuur opfleuren. De link naar het stickerformulier vindt u in de evcc-UI rechtsonder door op het zonsymbool te klikken.

| [@evcc_io](https://twitter.com/evcc_io/status/1489667714411114502)                                                                                      | [@Ein_Klimawender](https://twitter.com/Ein_Klimawender/status/1589844295992819712)                                                                          | [@frd9900](https://twitter.com/frd9900/status/1591416016848162816)                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Tweet @evcc_io](../../../../../en/blog/2022/11/26/sticker_evcc.jpeg)](https://twitter.com/evcc_io/status/1489667714411114502)                        | [![Tweet @Ein_Klimawender](../../../../../en/blog/2022/11/26/sticker_Ein_Klimawender.jpeg)](https://twitter.com/Ein_Klimawender/status/1589844295992819712) | [![Tweet @frd9900](../../../../../en/blog/2022/11/26/sticker_frd9900.jpeg)](https://twitter.com/frd9900/status/1591416016848162816)                       |
| [@ABBolle](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333)                                                                  | [@rediculum](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)                                                                           | [@123aerox](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806)                                                                   |
| [![GitHub @ABBolle](../../../../../en/blog/2022/11/26/sticker_ABBolle.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333) | [![GitHub @rediculum](../../../../../en/blog/2022/11/26/sticker_rediculum.png)](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)        | [![GitHub @123aerox](../../../../../en/blog/2022/11/26/sticker_123aerox.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806) |

## 📮 Eenmalige sponsoring

We hebben al meermaals de feedback gekregen dat gebruikers moeite hebben met maandelijkse betalingen en graag een eenmalige betaling willen doen om een sponsortoken te krijgen. Dat kan nu. Op de [GitHub-sponsoringpagina](https://github.com/sponsors/evcc-io?frequency=one-time) staan nu naast de maandelijkse ook eenmalige niveaus. We hebben de volgende prijsniveaus bedacht:

- **🌱 $100 - Duurzame ontwikkeling**<br />U draagt eraan bij dat we ook in de toekomst veel energie in de doorontwikkeling van evcc kunnen steken. Daarnaast krijgt u **een onbeperkt geldig sponsortoken** waarmee u alle functies van evcc kunt gebruiken.
- ~~**☀️ $150 - Friends & Family**<br />U krijgt **drie onbeperkt geldige sponsortokens**. Eén voor uzelf en twee die u aan vrienden of familie kunt doorgeven. U wordt als sponsor vermeld op [evcc.io](https://evcc.io).~~
- **🚛 $1.000 - Multiplicator**<br />Voor elektriciens en zonnepaneleninstallateurs. Wilt u evcc bij meerdere klanten inzetten? Mail ons via [info@evcc.io](mailto:info@evcc.io) en we vinden een goede oplossing.

Het uitgeven van de onbeperkt geldige sponsortokens werkt precies zoals het huidige proces via [sponsor.evcc.io](https://sponsor.evcc.io). Het enige verschil is dat het token niet verloopt.

:::note[Update]
We hebben de sponsorniveaus in 2026 aangepast. Meer daarover in onze [actuele blogpost](/nl/blog/2026/01/01/highlights-browser-config-ready#sponsoring).
:::

## 🎟️ Contributor-token

Communityleden die via GitHub-PR’s substantieel aan evcc hebben bijgedragen, kunnen ook een gratis token krijgen. We zijn altijd blij met bugfixes, maar hebben ook dringend hulp nodig op het gebied van documentatie en [vertaling](https://github.com/evcc-io/evcc/discussions/5218).

Wat precies een substantiële bijdrage is, hebben we niet duidelijk vastgelegd. Een kommafout verbeteren telt nog niet, maar het oplossen van een vervelende bug is zeker genoeg. Stuur ons gewoon een mail naar [info@evcc.io](mailto:info@evcc.io) met uw GitHub-gebruikersnaam.

## 🚚 GitHub-sponsoring verhuist

Momenteel loopt de GitHub-sponsoring via het account van [@andig](https://github.com/andig), de oprichter van evcc. Het bedrag dat na aftrek van kosten (infrastructuur, stickers, ...) per maand overblijft, wordt via een verdeelsleutel over alle drie de leden van het kernteam verdeeld. Om dit proces transparanter te maken, verhuizen we onze GitHub-sponsoring nu naar de [evcc-io-organisatie](https://github.com/sponsors/evcc-io). Als u al sponsor bent, hoeft u niets te veranderen. Uw token blijft gewoon geldig en ook de bijdrage komt bij alle teamleden terecht. We hebben wel alle links naar de sponsoring omgezet naar de organisatie. Eenmalige betalingen zijn ook alleen daar mogelijk.

[![Migratie GitHub-sponsoring](../../../../../en/blog/2022/11/26/migrate-sponsoring.png)](https://github.com/sponsors/evcc-io)

## 🐳 Docker-image verhuist

Tegelijk verhuizen we ook onze Docker-images. Tot nu toe werden de pakketten gepubliceerd onder `andig/evcc`. Nu vindt u de officiële versies onder `evcc/evcc`.

Ook hier nogmaals dank aan het Docker-team, dat evcc als [Docker-Sponsored Open Source-project](https://www.docker.com/community/open-source/application/) heeft aangemerkt. Daardoor krijgen we gratis toegang tot de teamfuncties van Docker Hub.

[![Migratie Docker Hub](../../../../../en/blog/2022/11/26/migrate-docker.png)](https://hub.docker.com/u/evcc)

---

**Bedankt voor uw steun!**
evcc-kernteam<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) en [@naltatis](https://github.com/naltatis)
