---
title: "interval"
description: "Réglez la fréquence à laquelle evcc lit les compteurs et ajuste les courants de charge, et découvrez pourquoi un intervalle trop court fait osciller la régulation."
sidebar:
  order: 10
translatedFrom: "2def99480cbc"
---

Définit à quel intervalle evcc lit les nouvelles valeurs de tous les compteurs et réajuste les courants de charge des chargeurs.

**Valeurs possibles** : une valeur numérique suivie de l’unité de temps

**Par exemple** :

```yaml
interval: 30s # every 30 seconds
```

:::caution
Un intervalle trop court (< 30 s) peut entraîner un comportement indésirable (oscillations de la régulation) si les composants concernés n’ont pas le temps de réagir avant le début du cycle de régulation suivant. L’expérience montre qu’un intervalle de 10 s à 15 s est possible si tous les composants réagissent assez rapidement. Cela doit être testé au cas par cas.
:::
