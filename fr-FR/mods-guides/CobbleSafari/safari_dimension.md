# 🏝️ Safari Dimension

{% hint style="warning" %}
<p align="center">
Le <strong>Safari Dimension</strong> est une zone instanciée composée de <strong>18 biomes Pokémon</strong>, avec exploration limitée dans le temps.
</p>
{% endhint %}

---

# 🎯 Objectif

Explorer un biome, capturer des Pokémon rares et optimiser votre run avant expiration du temps.

👉 Chaque session est :
- ⏳ limitée dans le temps
- 🎲 générée de manière aléatoire
- ⚠️ dangereuse (fuites fréquentes)

---

# ⚡ TL;DR (à lire avant d’entrer)

- ⏳ 15 minutes par run
- ⚪ uniquement Safari Balls
- ❌ pas de combats
- ❌ pas de Pokémon envoyés
- 💨 les Pokémon peuvent fuir
- 📍 spawn aléatoire dans le biome
- 🎯 objectif : capturer le plus de valeur possible

---

# 🚪 Accès au Safari

Le Safari est accessible via un **Téléporteur de Safari** :

1. Activation du téléporteur
2. Interface de confirmation
3. Affichage de la destination
4. Téléportation dans la dimension

---

# ⏱️ Gestion du temps

- Durée maximale : **15 minutes**
- Sortie possible à tout moment : `/safariexit`
- Le temps restant est **conservé pour la journée**

---

# 🧭 Règles générales

Dans le Safari :

- ⚪ Seules les Safari Balls sont autorisées
- ❌ Aucun combat Pokémon
- ❌ Aucun Pokémon actif utilisable
- 🎣 Pêche désactivée
- 💨 Les Pokémon peuvent fuir
- 📍 Spawn aléatoire dans un rayon défini

> ⚠️ Zone dangereuse : mort ou expulsion entraîne une perte de progression locale

---

# 💨 Système de fuite

Les Pokémon peuvent fuir à tout moment lors d’une interaction.

### 🎲 Probabilité de base
- 23.6% de chance (valeur de base)
- équivalent à un tirage ≤ 60 / 254

### 🔁 Déclencheurs de fuite
- utilisation d’objet
- tentative de capture échouée
- interaction agressive

---

## ⏱️ Phase de fuite

Lorsqu’un Pokémon commence à fuir :

- ⚠️ alerte affichée
- ⏳ 5 secondes restantes
- 🎯 dernière tentative possible

Sinon :
> 💨 le Pokémon disparaît définitivement

---

# 📊 Modificateurs

## 💨 Fuite / Capture

| Niveau | Fuite | Capture |
|:--:|:--:|:--:|
| -6 | 71% | x3 |
| -3 | 47% | x2 |
| 0 | 24% | x1 |
| +3 | 12% | x0.5 |
| +6 | 8% | x0.33 |

👉 Les valeurs intermédiaires suivent une progression continue.

---

# 🎯 Objets

## 🍖 Appâts
- ↓ réduit les chances de fuite
- ↓ augmente la difficulté de capture

👉 risque plus élevé mais Pokémon plus stable

## 🪨 Boue-Boule
- ↑ augmente les chances de fuite
- ↑ facilite la capture

👉 capture plus facile mais risque de disparition rapide

---

# 🌍 Pokémon & biomes

Chaque biome contient 4 niveaux de rareté :

- 🟢 Commun
- 🔵 Peu commun
- 🟣 Rare
- ⭐ Ultra-rare

📖 Spawn list : (à compléter)

---

## ⚙️ Configuration

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
