# 🏝️ Safari Dimension

{% hint style="warning" %}
<p align="center">
Le <strong>Safari</strong> est une dimension personnalisée composée de <strong>18 biomes différents</strong>, chacun basé sur un type Pokémon.
</p>
{% endhint %}

Son objectif est simple : explorer, capturer des Pokémon rares et découvrir des mécaniques uniques... mais avec une contrainte majeure :
**le temps est limité, et l’accès est très restrictif !**

---

## ⚠️ Règles générales

Dans le Safari :

- ⏳ Vous disposez de **15 minutes maximum**
- ❌ Interdiction de sortir ses Pokémon
- ❌ Interdiction de combattre
- ⚪ Seules les **Safari Balls** sont utilisables
- 🎣 La pêche est interdite
- 🏃 Les Pokémon peuvent **fuir**
- 📍 Chaque entrée est **unique et aléatoire**

> 💡 Vous pouvez apparaître dans un rayon de **5000 blocs** autour du centre du Safari.

{% hint style="warning" %}
<p align="center">
Mourir ou être expulsé dans cette zone est fortement déconseillé...</p>
{% endhint %}

---

# 🚪 Comment y accéder ?

L’accès au Safari se fait via un **Téléporteur de Safari**.

En l’activant :

- Une interface de confirmation apparaît
- La destination est affichée avant validation
- Vous êtes téléporté dans la dimension si vous acceptez

---

## 🧭 Sortir du Safari

Vous pouvez quitter à tout moment avec la commande : `/safariexit`

> 💡 Votre temps restant est conservé pour une utilisation future dans la même journée.

---

## 💥 Les Pokémon peuvent fuir

Oui... et souvent.

À chaque événement critique :

- fuite d’une Safari Ball
- interaction agressive
- utilisation d’objet

👉 Il y a **23.6% de chance** que le Pokémon commence à fuir.

### ⏱️ Phase de fuite

Quand un Pokémon commence à fuir :

- un message d’alerte apparaît
- vous avez **5 secondes**
- une dernière tentative de capture est possible

Sinon :
> 💨 Le Pokémon disparaît définitivement.

---

## 🎯 Appâts & Boue-Boule

Deux objets influencent les comportements :

### 🍖 Appâts
- ↓ réduit les chances de fuite
- ↑ rend la capture plus difficile

### 🪨 Boue-Boule
- ↑ augmente les chances de fuite
- ↑ améliore la capture

---

## 📊 Mécanique de fuite

Le système est basé sur Pokémon DPPt (Great Marsh).

À chaque tour :

- un nombre entre 0 et 254 est tiré
- si ≤ taux de fuite → le Pokémon s’enfuit

Base :
- **60 = 23.6% de fuite**

---

## 📈 Modificateurs

| Niveau | -6 | -5 | -4 | -3 | -2 | -1 | 0 | +1 | +2 | +3 | +4 | +5 | +6 |
|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| Fuite | 71% | 63% | 55% | 47% | 39% | 31% | 24% | 18% | 14% | 12% | 10% | 9% | 8% |
| Capture | x3 | x2.6 | x2.3 | x2 | x1.6 | x1.3 | x1 | x0.75 | x0.6 | x0.5 | x0.43 | x0.375 | x0.33 |

---

# 🌍 Pokémon disponibles

Chaque biome contient 4 raretés :

- 🟢 Commun
- 🔵 Peu commun
- 🟣 Rare
- ⭐ Ultra-rare

📖 Liste complète : À éditer![](https://cobblesafari.maxigregrze.fr/en/wiki/safari-dimension-spawnpool)

---

## 💰 Frais d’entrée

Le Safari peut être :

- gratuit
- ou payant

{% hint style="info" %}
<p align="center">
Tout dépend de la configuration du serveur.
</p>
{% endhint %}

Exemples :

- 🎟️ Ticket Safari (customisable)
- 💰 5000 CobbleDollars

Option :
- paiement multiple possible (temps + entrées supplémentaires)

---

# ⚙️ Configuration

📁 `config/cobblesafari/safari_config.json`

Paramètres :

- `dailySafariBallsCount` → nombre de Safari Balls gratuites (16)
- `enableEntryFee` → active les frais d’entrée

---

## 🔧 Autres configs

- Restrictions :
  📁 `config/cobblesafari/dimensional_restrictions_config.json`

- Timer :
  📁 `config/cobblesafari/dimensional_timer_config.json`
