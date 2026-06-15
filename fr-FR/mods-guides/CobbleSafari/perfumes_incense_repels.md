# 🌿 Parfums, Encens et Repousse

{% hint style="info" %}
<p align="center">
Les <strong>Encens</strong> et <strong>Parfums</strong> vous permettent d’influencer les rencontres de Pokémon sauvages afin de favoriser certains types ou conditions rares. Ces objets augmentent la probabilité d’apparition de Pokémon possédant des caractéristiques spécifiques.
</p>
{% endhint %}

{% hint style="success" %}
<p align="center">
Contrairement aux potions classiques de Minecraft, utiliser plusieurs parfums ou encens successivement <strong>prolonge la durée totale</strong> au lieu de réinitialiser l’effet.
</p>
{% endhint %}

---

## ✨ Encens (bonus Shiny)

Les encens sont connus pour augmenter les chances de rencontrer des Pokémon shiny dans la nature.
<br>
Ne s’applique que sur les **nouvelles apparitions de Pokémon** autour du joueur affecté.

{% hint style="info" %}
<p align="center">
Les Pokémon déjà présents ne peuvent pas être reroll par l’encens.
</p>
{% endhint %}

### 🧪 Tiers disponibles

- ✨ Encens → x4 (défaut configurable)
- 💫 Super Encens → x8
- 🌟 Hyper Encens → x12

---

### ⚠️ Règles d’utilisation

- ❌ Les encens ne se cumulent pas entre eux ;
- 🔁 Un nouvel encens remplace toujours l’ancien ;
- ✅ Un encens peut être combiné avec un parfum ;
- ✨ Les effets se cumulent entre catégories différentes.

{% hint style="warning" %}
<p align="center">
Les bonus shiny ne se cumulent pas avec d’autres systèmes de boost issus d’autres mods.
</p>
{% endhint %}

---

## 🌸 Parfums (bonus de rareté)

Les parfums augmentent la probabilité d’apparition de Pokémon plus rares dans la nature.
<br>
Comme les encens, ils n’agissent que sur les **nouvelles apparitions** autour du joueur.

### 🧴 Types disponibles

- 🌸 Parfum Peu Commun  
- 🌺 Parfum Rare  
- 🌼 Parfum Ultra-Rare  

Chaque parfum augmente les chances d’apparition de sa table de spawn avec un bonus de x16 (configurable).

---

### ⚠️ Règles d’utilisation

- ❌ Les parfums ne se cumulent pas entre eux ;
- 🔁 Un nouveau parfum remplace toujours l’ancien ;
- ✅ Un parfum peut être combiné avec un encens ;
- ⚠️ Les effets restent séparés mais actifs simultanément.

{% hint style="info" %}
<p align="center">
Le PokéNav n’affiche pas l’influence des parfums sur les taux d’apparition.
</p>
{% endhint %}

---

## 🚫 Repousse

Le Repousse empêche les nouveaux Pokémon d’apparaître autour de vous.

Il n’affecte pas :
- les Pokémon déjà présents ;
- les apparitions déclenchées par d’autres joueurs.

Simple, efficace… et un peu radical.

---

{% hint style="danger" %}
<p align="center">
Utiliser Repousse + Encens + Parfum en même temps est fortement déconseillé.
<br>
Le Repousse bloque les apparitions, annulant totalement les effets des boosts.
</p>
{% endhint %}

---

## ⚙️ Configuration

Les paramètres de ces systèmes sont définis dans :

`config/cobblesafari/encounter_boost_config.json`

### 🔧 Catégories principales

- ⚙️ **Paramètres d'effet** → `effectSettings`  
  Définit le fonctionnement des effets (y compris ceux d’autres systèmes comme le Secret Base PC).

- ⏱️ **Paramètres de durée** → `durationSettings`  
  Définit la durée des objets donnant les effets.

👉 [Configuration complète](https://cobblesafari.maxigregrze.fr/en/addons/config_encounter_boost_config)

{% hint style="info" %}
<p align="center">
Certaines valeurs présentes dans le fichier de configuration ne sont pas encore actives en jeu.
<br>
Elles seront utilisées dans de futures mises à jour.
</p>
{% endhint %}
