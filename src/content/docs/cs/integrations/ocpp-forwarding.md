---
title: "Přeposílání OCPP zpráv"
description: "Ukazuje, jak z evcc přeposílat OCPP zprávy nabíječky do externího backendu, např. platformy pro vyúčtování, zatímco nabíjení dál řídí evcc."
translatedFrom: "df48634d807d"
---

Někdy se nabíjecí relace musí dostat do externího OCPP backendu, např. na platformu pro vyúčtování náhrad od zaměstnavatele nebo k provozovateli nabíjecích stanic.
Nabíječka obvykle dokáže komunikovat jen s jedním OCPP serverem.
Při přeposílání zůstává nabíječka připojená k vaší instanci evcc, která její zprávy předává také externímu serveru.
evcc nadále řídí nabíjení.
Externí server průběžně dostává nabíjecí relace a hodnoty měřiče, a pokud je to povoleno, může nabíječku také řídit.

## Nastavení {#setup}

Přeposílání je dostupné pro nabíječky připojené přes OCPP, tj. nabíječky, které používají evcc jako svůj OCPP server.
Nejprve nabíječku nastavte, potom pro ni můžete nakonfigurovat přeposílání.

1. Otevřete **Konfigurace → Server OCPP**.
2. Seznam **ID stanice** zobrazuje vaše připojené OCPP nabíječky. Kliknutím na tlačítko s obláčkem vedle nabíječky otevřete dialogové okno **Přeposílání OCPP zpráv**.
3. Zadejte **URL Upstream serveru**, tedy adresu serveru, na který se má přeposílat, např. `wss://billing.example.com/ocpp`.
4. Pokud externí server vyžaduje ověření, zadejte **Uživatelské jméno** a **Heslo** (HTTP Basic Auth). Pokud očekává jiný identifikátor nabíječky, nastavte **ID stanice**.
5. Klikněte na **Uložit**. Přeposílání začne okamžitě, restart není potřeba.

Ikona obláčku vedle nabíječky ukazuje, zda přeposílání funguje.
Problémy s připojením se zobrazují v dialogovém okně.

Chcete-li přeposílání ukončit, otevřete dialogové okno znovu a klikněte na **Odebrat**.

## Příkazy z externího serveru {#upstream-commands}

Ve výchozím nastavení může externí server posílat nabíječce příkazy.
Abyste předešli konfliktům s řízením nabíjení, zapněte v pokročilých nastaveních volbu **Zablokovat řízení externím serverem**.
Server dál dostává všechny zprávy nabíječky, ale řízení má výhradně evcc.

## Certifikáty {#certificates}

V pokročilých nastaveních najdete také volby pro TLS.
Pro testovací prostředí bez platného certifikátu zapněte **Povolit self-signed certifikáty**.
Pokud externí server používá certifikát od soukromé certifikační autority, zadejte **Certifikát serveru (CA)**.
