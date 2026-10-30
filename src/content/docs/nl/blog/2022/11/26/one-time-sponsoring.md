---
date: 2022-11-26
title: "Sponsoring en verhuizingen"
description: "In november 2022 introduceerden we eenmalige sponsoring en contributor-tokens, legden we uit hoe evcc gefinancierd wordt en verhuisden GitHub-sponsoring en Docker-image."
authors: [naltatis]
tags: [sponsoring]
prev: false
next: false
translatedFrom: "0c199b1a29ca"
---

Sinds onze laatste update hier op de blog zijn er alweer zeventien releases verschenen.
Zoals altijd is er veel gebeurd.
Er zijn enkele bugfixes, maar ook veel nieuwe integraties en functies bijgekomen.
Meer over onze hoogtepunten van de afgelopen maanden in een latere blogpost.

<!-- excerpt -->

## 🌱 Duurzame open-sourceontwikkeling

evcc is begonnen als klein hobbyproject, omdat we ontevreden waren over de bestaande oplossingen voor laden met zonneoverschot en zelf iets beters wilden bouwen.
Inmiddels doet evcc echter meer dan alleen ons eigen laden op zonne-energie makkelijker maken.
Er zijn vermoedelijk enkele duizenden installaties die ’s ochtends de auto wekken zodra de zon op de eigen zonnepanelen schijnt.
Die gedachte maakt ons erg blij.

Exacte cijfers over onze gebruikersbasis hebben we niet.
We hechten aan dataminimalisatie en zijn daarom ook niet van plan om algemene tracking in onze website of de applicatie in te bouwen.
Toch laten cijfers van Docker (tot nu toe >1 mln. pulls) en Cloudsmith (momenteel ca. 4.500 pakketdownloads per dag) vrij duidelijk zien dat veel mensen dagelijks op evcc vertrouwen.

Om het project met voldoende focus te kunnen onderhouden en doorontwikkelen, is duurzame financiering een belangrijk onderwerp.
Achter evcc zit geen groot bedrijf en geen fabrikant van laders, en we hebben ook geen zin in het startupspel met investeerders.
Op dit moment is evcc een project dat we in onze vrije tijd vooruithelpen.
We zijn ervan overtuigd dat het een goed idee is om rechtstreeks voor u, de gebruikers, te werken en onafhankelijk te blijven van andere verplichtingen en beperkingen.

Met **GitHub-sponsoring** hebben we een zeer lichtgewicht en eenvoudige manier gevonden om financiële steun rechtstreeks van gebruikers te ontvangen.
Bovendien hebben we daardoor de mogelijkheid om **enkele functies exclusief voor sponsors** aan te bieden.
Momenteel zijn dat bepaalde typen laders en de telemetriefunctie, maar we kunnen ons goed voorstellen dat we dit model in de toekomst nog aanpassen.

## 💚 Dank aan alle sponsors

Op dit moment hebben we **meer dan 1.500 sponsors** 🥳 die maandelijks minstens $2 bijdragen.
Dat is best gaaf, een groot blijk van vertrouwen, en het moedigt ons aan om veel tijd in het project te blijven steken.

Naast het sponsortoken dat functies vrijschakelt, sturen we alle supporters ook graag stickers.
Daarmee kunt u uw laptop, Raspberry Pi, lader of laadapparatuur opfleuren.
De link naar het stickerformulier vindt u in de evcc-UI rechtsonder, als u op het zonsymbool klikt.

| [@evcc_io](https://twitter.com/evcc_io/status/1489667714411114502)                                                                                      | [@Ein_Klimawender](https://twitter.com/Ein_Klimawender/status/1589844295992819712)                                                                          | [@frd9900](https://twitter.com/frd9900/status/1591416016848162816)                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Tweet @evcc_io](../../../../../en/blog/2022/11/26/sticker_evcc.jpeg)](https://twitter.com/evcc_io/status/1489667714411114502)                        | [![Tweet @Ein_Klimawender](../../../../../en/blog/2022/11/26/sticker_Ein_Klimawender.jpeg)](https://twitter.com/Ein_Klimawender/status/1589844295992819712) | [![Tweet @frd9900](../../../../../en/blog/2022/11/26/sticker_frd9900.jpeg)](https://twitter.com/frd9900/status/1591416016848162816)                       |
| [@ABBolle](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333)                                                                  | [@rediculum](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)                                                                           | [@123aerox](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806)                                                                   |
| [![GitHub @ABBolle](../../../../../en/blog/2022/11/26/sticker_ABBolle.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333) | [![GitHub @rediculum](../../../../../en/blog/2022/11/26/sticker_rediculum.png)](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)        | [![GitHub @123aerox](../../../../../en/blog/2022/11/26/sticker_123aerox.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806) |

## 📮 Eenmalige sponsoring

We hebben herhaaldelijk gehoord dat sommige gebruikers zich niet prettig voelen bij maandelijkse betalingen en graag eenmalig willen betalen om een sponsortoken te krijgen.
Dat kan nu.
Op de [GitHub-sponsoringpagina](https://github.com/sponsors/evcc-io?frequency=one-time) staan nu naast de maandelijkse ook eenmalige niveaus.
Dit zijn de niveaus die we hebben bedacht:

- **🌱 $100 - Duurzame ontwikkeling**<br />U helpt ons om veel energie in de ontwikkeling van evcc te blijven steken. Daarnaast krijgt u **een sponsortoken zonder vervaldatum** waarmee u alle functies van evcc kunt gebruiken.
- ~~**☀️ $150 - Friends & Family**<br />U krijgt **drie sponsortokens zonder vervaldatum**. Eén voor uzelf en twee die u aan vrienden of familie kunt doorgeven. U wordt als sponsor vermeld op [evcc.io](https://evcc.io).~~
- **🚛 $1.000 - Multiplicator**<br />Voor elektriciens en zonnepaneleninstallateurs. Wilt u evcc bij meerdere klanten inzetten? Mail ons via [info@evcc.io](mailto:info@evcc.io) en we vinden een goede oplossing.

Sponsortokens zonder vervaldatum worden precies zoals nu uitgegeven via [sponsor.evcc.io](https://sponsor.evcc.io).
Het enige verschil is dat het token niet verloopt.

:::note[Update]
We hebben de sponsorniveaus in 2026 aangepast.
Meer daarover in onze [nieuwste blogpost](/nl/blog/2026/01/01/highlights-browser-config-ready#sponsoring).
:::

## 🎟️ Contributor-tokens

Communityleden die via GitHub-PR’s substantieel aan evcc hebben bijgedragen, kunnen ook een gratis token krijgen.
We zijn altijd blij met bugfixes, maar hebben ook dringend hulp nodig bij documentatie en [vertaling](https://github.com/evcc-io/evcc/discussions/5218).

Wat precies een substantiële bijdrage is, hebben we niet strikt vastgelegd.
Een verkeerd geplaatste komma verbeteren telt nog niet, maar het oplossen van een vervelende bug zeker wel.
Stuur ons gewoon een mail naar [info@evcc.io](mailto:info@evcc.io) en vermeld uw GitHub-gebruikersnaam.

## 🚚 GitHub-sponsoring verhuist

Momenteel loopt de GitHub-sponsoring via het account van [@andig](https://github.com/andig), de oprichter van evcc.
Het bedrag dat na aftrek van kosten (infrastructuur, stickers, ...) per maand overblijft, wordt via een verdeelsleutel over alle drie de leden van het kernteam verdeeld.
Om dit proces transparanter te maken, verhuizen we onze GitHub-sponsoring nu naar de [evcc-io-organisatie](https://github.com/sponsors/evcc-io).
Als u al sponsor bent, hoeft u niets te veranderen.
Uw token blijft gewoon werken en uw bijdrage komt nog steeds bij alle teamleden terecht.
We hebben wel alle sponsoringlinks omgezet naar de organisatie.
Eenmalige betalingen zijn alleen daar mogelijk.

[![Migratie GitHub-sponsoring](../../../../../en/blog/2022/11/26/migrate-sponsoring.png)](https://github.com/sponsors/evcc-io)

## 🐳 Docker-image verhuist

Tegelijk verhuizen we ook onze Docker-images.
Tot nu toe werden de pakketten gepubliceerd onder `andig/evcc`.
Nu vindt u de officiële versies onder `evcc/evcc`.

Ook hier nogmaals dank aan het Docker-team, dat evcc als [Docker-Sponsored Open Source-project](https://www.docker.com/community/open-source/application/) heeft erkend.
Daardoor krijgen we gratis toegang tot de teamfuncties van Docker Hub.

[![Migratie Docker Hub](../../../../../en/blog/2022/11/26/migrate-docker.png)](https://hub.docker.com/u/evcc)

---

**Bedankt voor uw steun!**
evcc-kernteam<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) en [@naltatis](https://github.com/naltatis)
