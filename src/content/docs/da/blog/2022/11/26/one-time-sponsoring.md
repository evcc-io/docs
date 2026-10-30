---
date: 2022-11-26
title: "Sponsorat og flytninger"
description: "I november 2022 introducerede vi engangssponsorat og contributor-tokens, forklarede, hvordan vi finansierer evcc, og flyttede GitHub-sponsoratet og Docker-imaget."
authors: [naltatis]
tags: [sponsoring]
prev: false
next: false
translatedFrom: "1447dca21a1e"
---

Der er allerede gået sytten udgivelser siden vores sidste opdatering her på bloggen. Som altid er der sket en masse. Der er kommet nogle fejlrettelser, men også mange nye integrationer og funktioner. Mere om vores højdepunkter fra de seneste måneder i et senere blogindlæg.

<!-- excerpt -->

## 🌱 Bæredygtig open source-udvikling

evcc startede som et lille hobbyprojekt, fordi vi var utilfredse med de eksisterende løsninger til opladning med soloverskud og ville bygge noget bedre til os selv. I dag gør evcc dog ikke kun vores egen opladning med solenergi lettere. Der findes formentlig flere tusinde installationer, der vækker bilen om morgenen, så snart solen skinner på solcelleanlægget derhjemme. Den tanke gør os meget glade.

Præcise tal for vores brugerbase har vi ikke. Vi går ind for dataminimering og har derfor heller ingen ambition om at bygge generel tracking ind i vores hjemmeside eller applikationen. Alligevel kan vi ud fra tal fra Docker (indtil nu >1 mio. pulls) og Cloudsmith (aktuelt ~4,5k pakkedownloads om dagen) ret tydeligt se, at mange stoler på evcc i hverdagen.

For at vi kan vedligeholde og videreudvikle projektet med tilstrækkeligt fokus, er bæredygtig finansiering et vigtigt emne. Bag evcc står hverken en stor virksomhed eller en opladerproducent, og vi har heller ikke lyst til startupspillet med investorer. Lige nu er evcc et projekt, vi driver i vores fritid. Vi er overbeviste om, at det er en god idé at arbejde direkte for jer, brugerne, og være uafhængige af andre forpligtelser og begrænsninger.

Med **GitHub Sponsors** har vi fundet en meget let og enkel løsning til at tage imod økonomisk støtte direkte fra brugerne. Derudover giver det os mulighed for at stille **nogle funktioner eksklusivt til rådighed for sponsorer**. Lige nu er det bestemte opladertyper og telemetrifunktionen, men vi kan sagtens forestille os at tilpasse denne model i fremtiden.

## 💚 Tak til alle sponsorer

Lige nu har vi **over 1.500 sponsorer** 🥳, der betaler et månedligt bidrag på mindst 2 $. Det er ret fedt og et stort tillidsbevis, og det giver os lyst til fortsat at investere meget tid i projektet.

Ud over sponsortokenet til at låse funktioner op sender vi også gerne klistermærker til alle, der støtter os. Dem kan du pynte din laptop, Raspberry, oplader eller dit ladeudstyr med. Linket til klistermærkeformularen finder du i evcc-brugerfladen nederst til højre, når du klikker på solsymbolet.

| [@evcc_io](https://twitter.com/evcc_io/status/1489667714411114502)                                                                                      | [@Ein_Klimawender](https://twitter.com/Ein_Klimawender/status/1589844295992819712)                                                                          | [@frd9900](https://twitter.com/frd9900/status/1591416016848162816)                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Tweet @evcc_io](../../../../../en/blog/2022/11/26/sticker_evcc.jpeg)](https://twitter.com/evcc_io/status/1489667714411114502)                        | [![Tweet @Ein_Klimawender](../../../../../en/blog/2022/11/26/sticker_Ein_Klimawender.jpeg)](https://twitter.com/Ein_Klimawender/status/1589844295992819712) | [![Tweet @frd9900](../../../../../en/blog/2022/11/26/sticker_frd9900.jpeg)](https://twitter.com/frd9900/status/1591416016848162816)                       |
| [@ABBolle](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333)                                                                  | [@rediculum](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)                                                                           | [@123aerox](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806)                                                                   |
| [![GitHub @ABBolle](../../../../../en/blog/2022/11/26/sticker_ABBolle.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333) | [![GitHub @rediculum](../../../../../en/blog/2022/11/26/sticker_rediculum.png)](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)        | [![GitHub @123aerox](../../../../../en/blog/2022/11/26/sticker_123aerox.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806) |

## 📮 Engangssponsorat

Vi har flere gange fået den feedback, at brugere har det svært med månedlige betalinger og ønsker sig en mulighed for en engangsbetaling for at få et sponsortoken. Det er nu muligt. På [GitHubs sponsoratside](https://github.com/sponsors/evcc-io?frequency=one-time) findes der nu engangsniveauer ud over de månedlige. Vi har valgt følgende prisniveauer:

- **🌱 100 $: Bæredygtig udvikling**<br />Du er med til at sikre, at vi også fremover kan investere meget energi i videreudviklingen af evcc. Derudover får du **et tidsubegrænset sponsortoken**, som du kan bruge alle evcc-funktioner med.
- ~~**☀️ 150 $: Friends & Family**<br />Du får **tre tidsubegrænsede sponsortokens**. Et til dig selv og to mere, som du kan give videre til venner eller familie. Du bliver nævnt som sponsor på [evcc.io](https://evcc.io).~~
- **🚛 1.000 $: Multiplikator**<br />Til elektrikere og solcelleinstallatører. Vil du bruge evcc hos flere kunder? Skriv til os på [info@evcc.io](mailto:info@evcc.io), så finder vi en god løsning.

Udstedelsen af de tidsubegrænsede sponsortokens fungerer præcis som den nuværende proces via [sponsor.evcc.io](https://sponsor.evcc.io). Den eneste forskel er, at tokenet ikke udløber.

:::note[Opdatering]
Vi har tilpasset sponsorniveauerne i 2026. Mere om det i vores [aktuelle blogindlæg](/da/blog/2026/01/01/highlights-browser-config-ready#sponsoring).
:::

## 🎟️ Contributor-token

Community-medlemmer, der har bidraget væsentligt til evcc via GitHub-PR'er, kan også få et gratis token. Vi er altid glade for fejlrettelser, men har også hårdt brug for hjælp med dokumentation og [oversættelse](https://github.com/evcc-io/evcc/discussions/5218).

Hvad der præcis er et væsentligt bidrag, har vi ikke fastlagt klart. En rettet kommafejl er endnu ikke nok, men en løst grim fejl tæller helt sikkert. Skriv bare en mail til os på [info@evcc.io](mailto:info@evcc.io) med en henvisning til dit GitHub-brugernavn.

## 🚚 GitHub-sponsoratet flytter

Lige nu kører GitHub-sponsoratet via kontoen hos [@andig](https://github.com/andig), grundlæggeren af evcc. Det beløb, der er tilbage hver måned efter udgifter (infrastruktur, klistermærker, ...), fordeles efter en fordelingsnøgle mellem alle tre medlemmer af kerneteamet. For at gøre denne proces mere gennemsigtig flytter vi nu vores GitHub-sponsorat til [evcc-io-organisationen](https://github.com/sponsors/evcc-io). Hvis du allerede er sponsor, behøver du ikke ændre noget. Dit token virker fortsat som hidtil, og bidraget finder også vej til alle teammedlemmer. Vi har dog ændret alle links til sponsoratet, så de peger på organisationen. Engangsbetalinger findes også kun dér.

[![Flytning af GitHub-sponsorat](../../../../../en/blog/2022/11/26/migrate-sponsoring.png)](https://github.com/sponsors/evcc-io)

## 🐳 Docker-imaget flytter

Samtidig flytter vi også vores Docker-images. Hidtil blev pakkerne udgivet under `andig/evcc`. Nu finder du de officielle versioner under `evcc/evcc`.

Endnu en gang tak til Docker-teamet, som har optaget evcc i programmet [Docker-Sponsored Open Source](https://www.docker.com/community/open-source/application/). Det giver os gratis adgang til teamfunktionerne i Docker Hub.

[![Flytning til Docker Hub](../../../../../en/blog/2022/11/26/migrate-docker.png)](https://hub.docker.com/u/evcc)

---

**Tak for jeres støtte!**
evcc-kerneteamet<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) og [@naltatis](https://github.com/naltatis)
