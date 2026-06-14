# ⌨️ Commandes CobbleSafari

{% hint style="info" %}
<p align="center">
CobbleSafari ajoute plusieurs commandes destinées aux administrateurs et aux créateurs de serveurs.
Certaines permettent de recharger la configuration du mod, gérer les dimensions ou encore faire apparaître des portails et des PNJ.
</p>
{% endhint %}

---

# 🔄 Rechargement de la configuration

## `/cobblesafari refresh`

| Permission requise |
|---|
| Niveau 4 |

Recharge l'ensemble des fichiers de configuration du mod sans redémarrer le serveur.

### Fichiers concernés

- 📄 `dimensional_timer_config.json`
- 📄 `incubator_config.json`
- 📄 `safari_config.json`
- 📄 `encounter_boost_config.json`
- 📄 `dungeon_spawn_config.json`
- 📄 `dimensional_restrictions_config.json`
- 📄 `misc_config.json`
- 📄 `secretbase_pc_config.json`
- 📄 `randomizer_items_config.json`

---

# ♻️ Réinitialisation

## `/cobblesafari reset`

| Permission requise |
|---|
| Niveau 4 |

Permet de réinitialiser certaines fonctionnalités de CobbleSafari.

| Sous-commande | Description |
|---|---|
| `safari` | Réinitialise la Dimension Safari. |
| `dungeon` | Réinitialise les donjons et supprime les portails actifs. |

{% hint style="warning" %}
<p align="center">
Les donjons ne peuvent pas être réinitialisés si des joueurs se trouvent encore à l'intérieur.
</p>
{% endhint %}

---

# 🤝 Faire apparaître un Marchand

## `/cobblesafari summon`

## `/cobblesafari summon_template`

| Permission requise |
|---|
| Niveau 2 |

Ces commandes permettent de faire apparaître un marchand CobbleSafari.

### Paramètres disponibles

| Argument | Description |
|---|---|
| `name` | Identifiant du marchand |
| `variant` | Variante du marchand |

### Exemple

```
/cobblesafari summon hiker basic
```

{% hint style="info" %}
<p align="center">
Ces commandes doivent être exécutées par un joueur.
</p>
{% endhint %}

---

# ⏳ Gestion du temps du Safari

## `/cobblesafari timer safari`

Permet de modifier le temps restant d'un joueur dans le Safari.

### Sous-commandes disponibles

| Commande | Fonction |
|---|---|
| `add` | Ajoute du temps |
| `remove` | Retire du temps |
| `set` | Définit le temps restant |
| `get` | Affiche le temps restant |
| `toggle` | Active ou désactive le bypass |

### Exemple

```
/cobblesafari timer safari add PlayerName 300
```

---

# 🌍 Gestion des dimensions

## `/cobblesafari timer dimension`

Permet de modifier les limites de temps des dimensions configurées.

### Exemple

```
/cobblesafari timer dimension set PlayerName 600 cobblesafari:dungeon_distortion
```

---

# 🌀 Gestion des portails Hoopa

## `/cobblesafari dungeon`

| Permission requise |
|---|
| Niveau 2 |

Cette commande permet de gérer les donjons et les portails Hoopa.

## Faire apparaître un portail

```
/cobblesafari dungeon spawn
```

### Variantes disponibles

- 👤 Portail pour soi-même
- 👥 Portail pour un autre joueur
- ⚡ Apparition forcée
- 🎯 Choix du donjon à ouvrir

---

## Lister les portails actifs

```
/cobblesafari dungeon list
```

Affiche tous les portails actuellement présents.

---

## Afficher les dimensions enregistrées

```
/cobblesafari dungeon dimensions
```

Affiche :

- 🌍 Les dimensions disponibles
- ⏳ Leur durée maximale
- 🆔 Leur identifiant interne

---

{% hint style="success" %}
## Nous contacter

<p align="center">
Si vous avez des questions, des suggestions ou des modifications à proposer, n'hésitez pas à nous rejoindre sur <a href="https://discord.gg/kb8NSTF45n">Discord</a> et à contacter directement <strong>@FabLeKebab</strong> sur le serveur pour tout ce qui concerne le wiki, ou <strong>@Levels</strong> pour tout ce qui concerne le modpack.
</p>
{% endhint %}
