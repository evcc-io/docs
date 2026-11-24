---
title: "eebus"
description: "Configurez EEBUS dans evcc.yaml avec votre propre certificat, vos interfaces réseau et votre SHIP-ID, et transférez la configuration vers l’interface web."
sidebar:
  order: 14
translatedFrom: "0d970a6e61a6"
---

:::tip[Recommandation]
Configurez EEBUS dans l’interface sous **Configuration → EEBUS**.
Le certificat et les identifiants sont générés automatiquement au premier démarrage.
:::

**Par exemple** :

```yaml
eebus:
  shipid: EVCC-1234567890abcdef
  interfaces:
    - eth0
  certificate:
    public: |
      -----BEGIN CERTIFICATE-----
      1234567890abcdef==
      -----END CERTIFICATE-----
    private: |
      -----BEGIN EC PRIVATE KEY-----
      1234567890abcdef
      -----END EC PRIVATE KEY-----
```

:::note[Migration du YAML vers l’interface]
Supprimez le bloc `eebus:` de votre `evcc.yaml` et redémarrez.
Un nouveau certificat est généré automatiquement et tous les appareils EEBUS doivent être appairés à nouveau.

Pour conserver votre certificat existant, saisissez-le dans la boîte de dialogue EEBUS sous **Afficher les paramètres avancés**.
C’est utile si le SKI (qui fait partie du certificat public) est déjà enregistré auprès de votre gestionnaire de réseau pour la [commande externe](/fr/external-limit).
:::

---

## Paramètres obligatoires

### `certificate`

Définit le certificat et sa clé privée utilisés pour la connexion HTTPS requise.

Lors de la configuration dans l’interface, le certificat est généré automatiquement.

**Par exemple** :

```yaml
certificate:
  public: |
    -----BEGIN CERTIFICATE-----
    1234567890abcdef==
    -----END CERTIFICATE-----
  private: |
    -----BEGIN EC PRIVATE KEY-----
    1234567890abcdef
    -----END EC PRIVATE KEY-----
```

---

### `certificate.public`

Le certificat public.

**Par exemple** :

```yaml
public: |
  -----BEGIN CERTIFICATE-----
  1234567890abcdef==
  -----END CERTIFICATE-----
```

---

### `certificate.private`

La clé privée du certificat.

**Par exemple** :

```yaml
private: |
  -----BEGIN EC PRIVATE KEY-----
  1234567890abcdef
  -----END EC PRIVATE KEY-----
```

---

## Paramètres facultatifs

### `interfaces`

Définit une liste d’interfaces réseau par lesquelles EEBUS doit communiquer. Par défaut, toutes les interfaces sont utilisées, ce qui peut toutefois entraîner des problèmes de communication.

**Par exemple** :

```yaml
interfaces:
  - eth0
```

### `shipid`

Définit la SHIP-ID à utiliser.
Cela ne devrait être nécessaire qu’à des fins de développement.

Normalement, evcc génère automatiquement la SHIP-ID à partir du `machine-id` (sur du matériel réel) ou d’un identifiant d’installation généré aléatoirement (dans les environnements de conteneurs comme Docker), qui est enregistré dans la base de données.
Vous pouvez définir un identifiant d’installation explicite via `plant` dans `evcc.yaml` ou la variable d’environnement `EVCC_PLANT`, ce qui est recommandé pour une meilleure portabilité.
La SHIP-ID est liée au certificat : si l’un des deux change, l’appairage avec les appareils doit être refait.

:::caution[Avertissement]
Ne modifiez pas cette valeur manuellement, sauf si vous savez exactement ce que vous faites.
:::

**Par exemple** :

```yaml
shipid: EVCC-1234567890abcdef
```
