# ⌨️ Commandes CobbleSafari

{% hint style="info" %}
<p align="center">
Cette page répertorie les différentes commandes ajoutées par <strong>CobbleSafari</strong>, permettant notamment de gérer la Dimension Safari, les portails Hoopa, les marchands et plusieurs fonctionnalités du mod.
</p>
{% endhint %}

{% hint style="warning" %}
<p align="center">
Cette page s'adresse principalement aux administrateurs et propriétaires de serveurs.
</p>
{% endhint %}

---

# 🔄 Gestion de la configuration

Ces commandes permettent de recharger ou réinitialiser certains systèmes de CobbleSafari.

## `/cobblesafari refresh`

```
/cobblesafari refresh
```

ℹ️ Recharge les fichiers de configuration du mod sans redémarrer le serveur.

---

## `/cobblesafari reset safari`

```
/cobblesafari reset safari
```

ℹ️ Réinitialise la Dimension Safari.

---

## `/cobblesafari reset dungeon`

```
/cobblesafari reset dungeon
```

ℹ️ Réinitialise les donjons et supprime les portails actifs.

{% hint style="danger" %}
<p align="center">
Les donjons ne peuvent pas être réinitialisés si des joueurs sont encore présents à l'intérieur.
</p>
{% endhint %}

---

# 🤝 Gestion des Marchands

Permet de faire apparaître les marchands CobbleSafari.

## `/cobblesafari summon`

```
/cobblesafari summon <name> <variant>
```

ℹ️ Fait apparaître un marchand à votre position.

## `/cobblesafari summon_template`

```
/cobblesafari summon_template <name> <variant>
```

ℹ️ Fait apparaître un marchand modèle destiné aux structures.

---

# ⏳ Gestion des timers

## Safari

```
/cobblesafari timer safari add <joueur> <secondes>
```

ℹ️ Ajoute du temps à un joueur dans la Dimension Safari.

```
/cobblesafari timer safari remove <joueur> <secondes>
```

ℹ️ Retire du temps à un joueur.

```
/cobblesafari timer safari set <joueur> <secondes>
```

ℹ️ Définit le temps restant.

```
/cobblesafari timer safari get <joueur>
```

ℹ️ Affiche le temps restant.

```
/cobblesafari timer safari toggle <joueur>
```

ℹ️ Active ou désactive le bypass du timer.

---

## Dimensions personnalisées

```
/cobblesafari timer dimension set <joueur> <secondes> <dimension>
```

ℹ️ Permet de modifier le temps restant d'une dimension configurée.

---

# 🌀 Portails Hoopa et Donjons

## Faire apparaître un portail

```
/cobblesafari dungeon spawn
```

ℹ️ Crée un portail Hoopa près du joueur.

## Voir les portails actifs

```
/cobblesafari dungeon list
```

ℹ️ Affiche tous les portails actuellement présents.

## Afficher les dimensions enregistrées

```
/cobblesafari dungeon dimensions
```

ℹ️ Affiche les dimensions de donjons disponibles ainsi que leur durée configurée.

---

{% hint style="success" %}
## Nous contacter

<p align="center">
Si vous avez des questions, des suggestions ou des modifications à proposer, n'hésitez pas à nous rejoindre sur <a href="https://discord.gg/kb8NSTF45n">Discord</a> et à contacter directement <strong>@FabLeKebab</strong> sur le serveur pour tout ce qui concerne le wiki, ou <strong>@Levels</strong> pour tout ce qui concerne le modpack.
</p>
{% endhint %}
