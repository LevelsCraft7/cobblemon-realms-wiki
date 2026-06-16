# 🏝️ Safari Dimension

{% hint style="warning" %}
<p align="center">
La <strong>Safari Dimension</strong> est une dimension composée de <strong>18 biomes Pokémon</strong>, chacun basé sur un type élémentaire. Explorer des habitats uniques et capturer des Pokémon rares dans un environnement à temps limité.
</p>
{% endhint %}

---

# 🚪 Accéder au Safari

## 🔹 Téléporteur de Safari

L’entrée se fait via un **Téléporteur Safari** :

1. Activation du téléporteur
2. Interface de confirmation
3. Affichage de la destination
4. Téléportation dans la dimension

{% hint style="info" %}
<p align="center">
📍 Chaque entrée est <strong>unique</strong> : vous n’apparaissez jamais au même endroit.
</p>
{% endhint %}

{% hint style="warning" %}
<p align="center">
Dans <strong>Cobblemon Realms</strong>, la fabrication du téléporteur n’est pas possible. Pour y accéder, rendez-vous au spawn avec <strong>/spawn</strong> : le téléporteur se trouve sur votre droite.
</p>
{% endhint %}

---

## 🔹 Sortir du Safari

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

---

## ⚡ Déclenchement des fuites

Une fuite peut se déclencher lors d’une interaction critique :

- ❗ rupture d’une Safari Ball  
- 🎒 utilisation d’un objet sur le Pokémon  
- 🎯 action directe sur le Pokémon  

👉 Chaque événement possède **23,6% de chances** de déclencher une fuite.

---

## ⏳ Phase de fuite

Lorsqu’un Pokémon commence à fuir :

- ⚠️ un avertissement s’affiche à l’écran
- ⏱️ vous disposez de **5 secondes**
- 🎯 une dernière action de capture est possible

Si aucune capture n’aboutit :

> 💨 Le Pokémon s’échappe définitivement.

---

## 🧠 Fonctionnement technique

Le système est basé sur le **Great Marsh (DPPt)** :

- un nombre aléatoire entre **0 et 254** est généré à chaque tour
- si la valeur est ≤ au taux de fuite → le Pokémon fuit

📌 Base du système :
> 60 → environ **23,6% de chance de fuite**

---

## 📊 Système de modificateurs (fuite & capture)

Les niveaux vont de **-6 à +6** et influencent à la fois la fuite et la capture.

### 🎮 Vue simplifiée

| Niveau | -6 | -3 | 0 | +3 | +6 |
|--------|----|----|---|----|----|
| 💨 Fuite | 71% | 47% | 24% | 12% | 8% |
| 🎯 Capture | x3 | x2 | x1 | x0.5 | x0.33 |

👉 Plus le niveau est élevé, plus les Pokémon sont faciles à capturer et moins ils fuient.

<details>
<summary>📈 Voir les valeurs détaillées</summary>

| Niveau | -6 | -5 | -4 | -3 | -2 | -1 | 0 | +1 | +2 | +3 | +4 | +5 | +6 |
|--------|----|----|----|----|----|----|---|----|----|----|----|----|----|
| 💨 Modificateur de fuite | 9/3 | 8/3 | 7/3 | 6/3 | 5/3 | 4/3 | 3/3 | 3/4 | 3/5 | 3/6 | 3/7 | 3/8 | 3/9 |
| 💨 Taux de fuite calculé | 180 | 160 | 140 | 120 | 100 | 80 | 60 | 45 | 36 | 30 | ~25 | ~22 | 20 |
| 💨 Pourcentage de fuite | 71% | 63% | 55% | 47% | 39% | 31% | 24% | 18% | 14% | 12% | 10% | 9% | 8% |
| 🎯 Modificateur de capture | 9/3 | 8/3 | 7/3 | 6/3 | 5/3 | 4/3 | 3/3 | 3/4 | 3/5 | 3/6 | 3/7 | 3/8 | 3/9 |
| 🎯 Bonus de capture | x3 | x2.6 | x2.3 | x2 | x1.6 | x1.3 | x1 | x0.75 | x0.6 | x0.5 | x0.43 | x0.375 | x0.33 |

</details>

{% hint style="info" %}
Les valeurs intermédiaires suivent une progression continue entre chaque niveau.
{% endhint %}

---

# 🎯 Objets du Safari

## 🍖 Bait (Appât)

Effet :
- ↓ réduit les chances de fuite
- ↑ diminue les chances de capture

![Recette de fabrication de l'Appât](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/app%C3%A2t.png)

<p align="center">
ℹ️ Vous pouvez utilisez n'importe quel baie Cobblemon.
</p>
👉 Rend le Pokémon plus "calme", mais plus difficile à capturer.

---

## 🪨 Mud Ball (Boue-Boule)

Effet :
- ↑ augmente les chances de fuite
- ↑ améliore les chances de capture

![Recette de fabrication de la Boue-Boule](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/boue_boule.gif)

👉 Rend la capture plus facile mais plus risquée.

---

# 🌍 Biomes & Pokémon

La Safari Dimension contient **18 biomes**, chacun basé sur un type Pokémon.

Chaque biome contient :

- 🟢 Commun
- 🔵 Peu commun
- 🟣 Rare
- ⭐ Ultra-rare

📖 Liste complète des spawns : ![Pokémon sauvages de la Dimension Safari](wild_pokemon_safari.md)

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

La plupart des paramètres du Safari sont regroupés dans :
<br>
➡️ `config/cobblesafari/safari_config.json`

Quelques options utiles :

- `dailySafariBallsCount` → nombre de Safari Balls gratuites quotidiennes (défaut : `16`)
- `enableEntryFee` → active les frais d'entrée

{% hint style="info" %}
## Plus d'informations

<p align="center">
Vous trouverez une description complète du fichier de configuration sur la page officielle du mod :
<a href="https://cobblesafari.maxigregrze.fr/en/addons/config_safari_config">Safari_config</a>
</p>
{% endhint %}

---

## 🔒 Restrictions dimensionnelles

Les objets autorisés, les règles de combat et certaines restrictions du Safari sont définis dans :
<br>
➡️ `config/cobblesafari/dimensional_restrictions_config.json`

{% hint style="info" %}
## Plus d'informations

<p align="center">
Le détail complet de cette configuration est disponible sur la page officielle du mod :
<a href="https://cobblesafari.maxigregrze.fr/en/addons/config_dimensional_restrictions_config">Configuration des Restrictions Dimensionnelles</a>
</p>
{% endhint %}

---

## ⏱️ Minuteur et téléportation

La durée des sessions, les délais entre les entrées et la logique de téléportation sont définis dans : 
<br>
➡️ `config/cobblesafari/dimensional_timer_config.json`

{% hint style="info" %}
## Plus d'informations

<p align="center">
Le détail complet de cette configuration est disponible sur la page officielle du mod :
<a href="https://cobblesafari.maxigregrze.fr/en/addons/config_dimensional_timer_config">Configuration du Minuteur Dimensionnel</a>
</p>
{% endhint %}

---

{% hint style="success" %}
## Nous contacter

<p align="center">
Si vous avez des questions, des suggestions ou des modifications à proposer, n'hésitez pas à nous rejoindre sur <a href="https://discord.gg/kb8NSTF45n">Discord</a> et à contacter directement <strong>@FabLeKebab</strong> sur le serveur pour tout ce qui concerne le wiki, ou <strong>@Levels</strong> pour tout ce qui concerne le modpack.
</p>
{% endhint %}
