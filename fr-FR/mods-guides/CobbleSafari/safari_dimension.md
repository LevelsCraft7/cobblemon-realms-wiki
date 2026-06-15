# 🏝️ Safari Dimension

{% hint style="warning" %}
<p align="center">
La <strong>Safari Dimension</strong> est une dimension instanciée composée de <strong>18 biomes Pokémon</strong>, chacun basé sur un type élémentaire.
</p>
{% endhint %}

🎯 **Objectif :** explorer des habitats uniques et capturer des Pokémon rares dans un environnement à temps limité.

---

# 🚪 Accéder au Safari

## 🔹 Téléporteur de Safari

L’entrée se fait via un **Safari Teleporter** :

1. Activation du téléporteur
2. Interface de confirmation
3. Affichage de la destination
4. Téléportation dans la dimension

{% hint style="info" %}
📍 Chaque entrée est <strong>unique</strong> : vous n’apparaissez jamais au même endroit.
{% endhint %}

{% hint style="warning" %}
<p align="center">
Dans <strong>Cobblemon Realms</strong>, la fabrication du téléporteur n’est pas possible. Pour y accéder, rendez-vous au spawn avec <strong>/spawn</strong> : le téléporteur se trouve sur votre droite.
</p>
{% endhint %}

---

## 🔹 Sortie

- Commande : `/safariexit`
- Sortie possible à tout moment
- Le temps restant est **conservé pour la journée**

---

# ⏱️ Règles générales

Dans la Safari Dimension :

- ⏳ Vous disposez de **15 minutes maximum**
- ⚪ Seules les Safari Balls sont utilisables
- ❌ Aucun combat autorisé
- ❌ Impossible de sortir ses Pokémon
- 🎣 La pêche est désactivée
- 💨 Les Pokémon peuvent fuir
- 📍 Spawn totalement aléatoire

{% hint style="warning" %}
<p align="center">
Mourir dans le Safari peut entraîner une perte de progression locale.
</p>
{% endhint %}

---

# 💨 Système de fuite Pokémon

{% hint style="info" %}
Les Pokémon du Safari peuvent fuir lorsqu’ils sont trop perturbés.
{% endhint %}

## 🔹 Déclenchement

À chaque interaction critique :

- rupture de Safari Ball
- utilisation d’un objet
- action sur le Pokémon

👉 Il y a **23.6% de chance** de déclencher une fuite.

---

## 🔹 Phase de fuite

Quand un Pokémon commence à fuir :

- ⚠️ alerte affichée à l’écran
- ⏳ 5 secondes de délai
- 🎯 une dernière tentative de capture possible

Sinon :
> 💨 le Pokémon disparaît <strong>définitivement</strong> !

---

## 🔹 Logique technique

Le système est basé sur le **Great Marsh (DPPt)** :

- un nombre entre **0 et 254** est tiré
- si ≤ taux de fuite → le Pokémon fuit

📌 Valeur de base :
> 60 → 23.6% de fuite

---

# 📊 Modificateurs de fuite & capture

| Niveau | -6 | -3 | 0 | +3 | +6 |
|--------|----|----|---|----|----|
| 💨 Fuite | 71% | 47% | 24% | 12% | 8% |
| 🎯 Capture | x3 | x2 | x1 | x0.5 | x0.33 |

👉 Les valeurs intermédiaires suivent une progression graduelle.

---

# 🎯 Objets du Safari

## 🍖 Bait (Appât)

Effet :
- ↓ réduit les chances de fuite
- ↑ diminue les chances de capture

👉 Rend le Pokémon plus “calme”, mais plus difficile à capturer.

---

## 🪨 Mud Ball (Boue-Boule)

Effet :
- ↑ augmente les chances de fuite
- ↑ améliore les chances de capture

👉 Rend la capture plus facile mais plus risquée.

---

## 🔧 Obtention

- objets gratuits quotidiens
- loot via Safari Balloon
- craft possible

---

# 🌍 Biomes & Pokémon

La Safari Dimension contient **18 biomes**, chacun basé sur un type Pokémon.

Chaque biome contient :

- 🟢 Commun
- 🔵 Peu commun
- 🟣 Rare
- ⭐ Ultra-rare

📖 Liste complète des spawns : ![ici]()

---

# 💰 Entrée au Safari (optionnel)

Par défaut :
- Entrée gratuite

Mais configurable par serveur/modpack :

## 🔹 Types de paiement possibles
- 🎟️ item (ex: Safari Ticket)
- 💰 Realms Coins (ex: 5000)

## 🔹 Options avancées
- Paiements multiples autorisés
- Recharge de temps + entrées supplémentaires
- Reset des récompenses quotidiennes par paiement

---

# ⚙️ Configuration

## 📁 Configuration principale

- `config/cobblesafari/safari_config.json`

### Paramètres :

- `dailySafariBallsCount` → nombre de Safari Balls gratuites (défaut : 16)
- `enableEntryFee` → active les frais d’entrée

https://cobblesafari.maxigregrze.fr/en/addons/config_safari_config

---

## 📁 Autres configurations

---

### 🔒 Restrictions dimensionnelles

📄 `config/cobblesafari/dimensional_restrictions_config.json`

Définit les règles de gameplay appliquées dans la Safari Dimension :

- objets autorisés / interdits
- règles de combat
- restrictions d’actions

ℹ️ Documentation complète :
https://cobblesafari.maxigregrze.fr/en/addons/config_dimensional_restrictions_config

---

### ⏱️ Timer & téléportation

📄 `config/cobblesafari/dimensional_timer_config.json`

Gère la logique temporelle et de téléportation :

- durée des sessions
- cooldown entre entrées
- gestion du teleport / exit

ℹ️ Documentation complète :
https://cobblesafari.maxigregrze.fr/en/addons/config_dimensional_timer_config

---

{% hint style="success" %}
## 🧠 Notes de design

Le Safari est conçu comme un système de <strong>risk / reward</strong> basé sur la pression temporelle et la prise de décision rapide.

- une expérience <strong>courte mais intense</strong>
- un système de <strong>risque / récompense</strong>
- une boucle centrée sur :
  - gestion du temps ⏳
  - gestion du risque 💨
  - optimisation de capture 🎯
{% endhint %}
