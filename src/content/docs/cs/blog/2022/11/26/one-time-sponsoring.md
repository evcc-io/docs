---
date: 2022-11-26
title: "Sponzorství a stěhování"
description: "V listopadu 2022 jsme zavedli jednorázové sponzorství a tokeny pro přispěvatele, vysvětlili financování a převedli sponzorství na GitHubu i obraz Dockeru pod evcc-io."
authors: [naltatis]
tags: [sponsoring]
prev: false
next: false
translatedFrom: "0c199b1a29ca"
---

Od naší poslední aktualizace zde na blogu už zase vyšlo sedmnáct verzí.
Jako vždy se toho stalo hodně.
Přibyly opravy chyb, ale také mnoho nových integrací a funkcí.
O našich hlavních novinkách z posledních měsíců napíšeme víc v některém z dalších článků.

<!-- excerpt -->

## 🌱 Udržitelný vývoj open source

evcc začalo jako malý hobby projekt, protože jsme nebyli spokojeni s existujícími řešeními pro nabíjení ze solárního přebytku a chtěli jsme postavit něco lepšího.
Dnes ale evcc neusnadňuje jen naše vlastní nabíjení ze slunce.
Existuje pravděpodobně několik tisíc instalací, které ráno probudí auto, jakmile slunce začne svítit na domácí fotovoltaickou elektrárnu.
Ta představa nás moc těší.

Přesná čísla o naší uživatelské základně nemáme.
Záleží nám na minimalizaci dat, a proto ani nemáme ambici zabudovat do našeho webu nebo aplikace jakékoli plošné sledování.
Přesto nám čísla z Dockeru (dosud >1 mil. pullů) a Cloudsmith (aktuálně ~4,5 tis. stažení balíčků denně) docela jasně ukazují, že na evcc každý den spoléhá mnoho lidí.

Abychom mohli projekt udržovat a dále rozvíjet s dostatečným soustředěním, je udržitelné financování důležitým tématem.
Za evcc nestojí žádná velká firma ani výrobce nabíječek a nemáme ani chuť hrát startupovou hru s investory.
V současnosti je evcc projekt, který posouváme kupředu ve svém volném čase.
Jsme přesvědčeni, že je dobrý nápad pracovat přímo pro vás, uživatele, a zůstat nezávislí na jiných závazcích a omezeních.

Ve **sponzorství přes GitHub** jsme našli velmi nenáročný a jednoduchý způsob, jak přijímat finanční podporu přímo od uživatelů.
Navíc tím máme možnost nabídnout **některé funkce exkluzivně sponzorům**.
V současnosti jde o určité typy nabíječek a funkci telemetrie, dokážeme si ale docela dobře představit, že tento model v budoucnu upravíme.

## 💚 Děkujeme všem sponzorům

Aktuálně máme **více než 1 500 sponzorů** 🥳, kteří měsíčně přispívají alespoň 2 $.
To je docela super, je to velký projev důvěry a povzbuzuje nás to, abychom do projektu dál investovali hodně času.

Kromě sponzorského tokenu, který odemyká funkce, rádi posíláme všem, kdo nás podporují, také samolepky.
Můžete si s nimi ozdobit notebook, Raspberry Pi, nabíječku nebo nabíjecí vybavení.
Odkaz na formulář pro samolepky najdete v rozhraní evcc vpravo dole po kliknutí na ikonu slunce.

| [@evcc_io](https://twitter.com/evcc_io/status/1489667714411114502)                                                                                      | [@Ein_Klimawender](https://twitter.com/Ein_Klimawender/status/1589844295992819712)                                                                          | [@frd9900](https://twitter.com/frd9900/status/1591416016848162816)                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Tweet @evcc_io](../../../../../en/blog/2022/11/26/sticker_evcc.jpeg)](https://twitter.com/evcc_io/status/1489667714411114502)                        | [![Tweet @Ein_Klimawender](../../../../../en/blog/2022/11/26/sticker_Ein_Klimawender.jpeg)](https://twitter.com/Ein_Klimawender/status/1589844295992819712) | [![Tweet @frd9900](../../../../../en/blog/2022/11/26/sticker_frd9900.jpeg)](https://twitter.com/frd9900/status/1591416016848162816)                       |
| [@ABBolle](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333)                                                                  | [@rediculum](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)                                                                           | [@123aerox](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806)                                                                   |
| [![GitHub @ABBolle](../../../../../en/blog/2022/11/26/sticker_ABBolle.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4069333) | [![GitHub @rediculum](../../../../../en/blog/2022/11/26/sticker_rediculum.png)](https://github.com/evcc-io/evcc/discussions/4446#discussion-4393578)        | [![GitHub @123aerox](../../../../../en/blog/2022/11/26/sticker_123aerox.jpg)](https://github.com/evcc-io/evcc/discussions/4446#discussioncomment-4013806) |

## 📮 Jednorázové sponzorství

Opakovaně jsme slyšeli, že někteří uživatelé nemají z měsíčních plateb dobrý pocit a přáli by si možnost získat sponzorský token jednorázovou platbou.
To je nyní možné.
Na [stránce sponzorství na GitHubu](https://github.com/sponsors/evcc-io?frequency=one-time) jsou teď vedle měsíčních úrovní také jednorázové.
Vymysleli jsme tyto úrovně:

- **🌱 100 $ – Udržitelný vývoj**<br />Pomáháte nám, abychom mohli dál vkládat hodně energie do vývoje evcc. Navíc dostanete **sponzorský token s neomezenou platností**, se kterým můžete využívat všechny funkce evcc.
- ~~**☀️ 150 $ – Přátelé a rodina**<br />Dostanete **tři sponzorské tokeny s neomezenou platností**. Jeden pro sebe a dva další, které můžete předat přátelům nebo rodině. Budete uvedeni jako sponzor na [evcc.io](https://evcc.io).~~
- **🚛 1 000 $ – Multiplikátor**<br />Pro elektrikáře a firmy instalující fotovoltaiku. Chcete nasadit evcc u více zákazníků? Napište nám na [info@evcc.io](mailto:info@evcc.io) a najdeme dobré řešení.

Sponzorské tokeny s neomezenou platností se vydávají přesně jako dosud přes [sponsor.evcc.io](https://sponsor.evcc.io).
Jediný rozdíl je, že token nevyprší.

:::note[Aktualizace]
V roce 2026 jsme sponzorské úrovně upravili.
Více se dočtete v našem [nejnovějším příspěvku na blogu](/cs/blog/2026/01/01/highlights-browser-config-ready#sponsoring).
:::

## 🎟️ Tokeny pro přispěvatele

Členové komunity, kteří přes pull requesty na GitHubu podstatně přispěli do evcc, mohou také získat token zdarma.
Opravy chyb nás vždy potěší, naléhavě ale potřebujeme i pomoc s dokumentací a [překlady](https://github.com/evcc-io/evcc/discussions/5218).

Co přesně je podstatný příspěvek, jsme striktně nestanovili.
Oprava jedné špatně umístěné čárky ještě nestačí, oprava zákeřné chyby ale rozhodně ano.
Stačí nám napsat e-mail na [info@evcc.io](mailto:info@evcc.io) a uvést své uživatelské jméno na GitHubu.

## 🚚 Sponzorství na GitHubu se stěhuje

V současnosti běží sponzorství na GitHubu přes účet [@andig](https://github.com/andig), zakladatele evcc.
Částka, která po výdajích (infrastruktura, samolepky atd.) každý měsíc zbude, se podle rozdělovacího klíče dělí mezi všechny tři členy základního týmu.
Abychom tento proces zprůhlednili, přesouváme nyní naše sponzorství na GitHubu do [organizace evcc-io](https://github.com/sponsors/evcc-io).
Pokud už jste sponzorem, nemusíte nic měnit.
Váš token funguje dál jako obvykle a váš příspěvek se i nadále dostane ke všem členům týmu.
Všechny odkazy na sponzorství jsme ale přepnuli na organizaci.
Jednorázové platby jsou k dispozici jen tam.

[![Přesun sponzorství na GitHubu](../../../../../en/blog/2022/11/26/migrate-sponsoring.png)](https://github.com/sponsors/evcc-io)

## 🐳 Obraz Dockeru se stěhuje

Zároveň stěhujeme i naše obrazy Dockeru.
Dosud se balíčky zveřejňovaly pod `andig/evcc`.
Oficiální verze nyní najdete pod `evcc/evcc`.

Na tomto místě ještě jednou děkujeme týmu Dockeru, který evcc zařadil mezi [open source projekty sponzorované Dockerem](https://www.docker.com/community/open-source/application/).
Díky tomu máme bezplatný přístup k týmovým funkcím Docker Hubu.

[![Přesun na Docker Hub](../../../../../en/blog/2022/11/26/migrate-docker.png)](https://hub.docker.com/u/evcc)

---

**Děkujeme za vaši podporu!**
Základní tým evcc<br />
[@andig](https://github.com/andig), [@premultiply](https://github.com/premultiply) a [@naltatis](https://github.com/naltatis)
