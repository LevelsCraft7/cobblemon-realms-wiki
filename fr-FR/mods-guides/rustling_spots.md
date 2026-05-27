# 🌿 Présentation - Rustling Spots

**Rustling Spots** est un mod *Cobblemon* inspiré du système d’**herbes frémissantes** de **Pokémon Noir & Blanc**.  
Il ajoute des événements dynamiques temporaires apparaissant autour des joueurs durant l’exploration, accompagnés de particules et d’ambiances sonores immersives.

Lorsqu’un joueur interagit avec un spot, celui-ci peut déclencher :
- une rencontre Pokémon,
- un loot thématique,
- ou parfois... rien du tout 👀

Le mod ne modifie **aucun worldgen**, ce qui le rend entièrement compatible avec les sauvegardes existantes.

---

# ✨ Fonctionnalités principales

## 🌍 Événements dynamiques

- Apparition aléatoire de spots autour des joueurs en exploration
- Effets visuels et sons ambiants pour signaler leur présence
- Rencontres exclusivement liées à *Cobblemon*
- Récompenses adaptées au type de spot rencontré
- Compatible avec les mondes déjà générés
- Système léger et configurable pour les serveurs

---

# 🌿 Familles de spots

Le mod propose actuellement **9 familles** distinctes.  
Chaque famille possède :
- ses propres surfaces compatibles,
- ses biomes,
- ses pools de Pokémon,
- ainsi que ses tables de loot dédiées.

| Famille | Environnement | Thématique | Capture |
|---|---|---|---|
| **Grass** | Herbes / plaines | Rencontres classiques | *(mettre image)* |
| **Sand** | Déserts / sable | Espèces désertiques & fossiles | *(mettre image)* |
| **Water** | Zones aquatiques | Pokémon aquatiques | *(mettre image)* |
| **Snow** | Biomes enneigés | Espèces glaciales | *(mettre image)* |
| **Leaves** | Forêts / canopées | Rencontres légères | *(mettre image)* |
| **Cave** | Grottes / sous-sol | Exploration minière | *(mettre image)* |
| **Flying** | Ciel / espaces ouverts | Rencontres aériennes | *(mettre image)* |
| **NetherFlamme** | Nether / lave | Thématique feu & chaleur | *(mettre image)* |
| **SoulFlame** | Soul Sand / Soul Soil | Ambiance sombre & maudite | *(mettre image)* |

> Chaque famille peut être activée, désactivée ou rééquilibrée indépendamment via la configuration.

---

# 🎯 Objectif du mod

Rustling Spots cherche à :

- recréer l’approche exploration/récompense de la Génération 5,
- rendre les environnements plus vivants,
- encourager le déplacement actif des joueurs,
- introduire des événements visibles directement dans le monde,
- éviter les simples apparitions passives de Pokémon.

---

# ⚙️ Fonctionnement en jeu

Lorsqu’un joueur explore le monde :

1. Un Rustling Spot peut apparaître à proximité.
2. Des particules et sons signalent sa présence.
3. Le joueur s’approche et interagit avec le spot.
4. Une rencontre, un loot ou un événement spécial peut être déclenché.
5. Le spot disparaît automatiquement après interaction.

---

## 🔄 Cycle de vie des spots

Les spots :

- possèdent une durée de vie limitée,
- disparaissent après interaction,
- disparaissent sans joueur à proximité,
- respectent des limites globales et par joueur afin d’éviter l’encombrement serveur.

---

## 📊 Valeurs par défaut importantes

| Paramètre | Valeur |
|---|---|
| Rayon autour du joueur | `200` blocs |
| Distance minimale entre spots | `16` blocs |
| Spots maximum par joueur | `8` |
| Spots maximum serveur | `64` |
| Durée de vie d’un spot | `6000` ticks (~5 min) |
| Rayon d’interaction | `2` blocs |
| Tolérance verticale | `3` blocs |

---

# 🎁 Variantes & récompenses

Le système ne se limite pas aux simples rencontres Pokémon.

## Résultats possibles

- 🎯 Rencontre Cobblemon
- 📦 Loot thématique
- ❌ Spot vide
- ✨ Spot shiny spécial

---

## 📈 Réglages par défaut

| Option | Valeur |
|---|---|
| Chance qu’un spot soit shiny | `0.0025` (0.25%) |
| Annonce globale des shinies | `true` |
| Spots vides activés | `true` |
| Chance de spot vide | `0.02` (2%) |
| Chance de rencontre Pokémon | `0.35` (35%) |
| Niveau Pokémon min / max | `5 → 75` |
| Chance shiny Pokémon | `0.05` (5%) |
| Récompenses multiples | Désactivées |

> Un spot shiny garantit une récompense shiny et peut annoncer la découverte à l’ensemble du serveur.

---

# 🛠️ Configuration

Le mod expose plusieurs fichiers JSON permettant un réglage précis du système.

| Fichier | Rôle |
|---|---|
| `rustlingspots-server.json` | Réglages globaux |
| `rustlingspots-pokemon.json` | Règles de rencontres Pokémon |
| `rustlingspots-client.json` | Préférences visuelles côté client |
| `rustlingspots-sound.json` | Volumes et sons ambiants |
| `rustlingspots-families.json` | Multiplicateurs des familles |

---

## 🌿 Multiplicateurs de spawn par défaut

```
grass: 1.0
sand: 1.0
water: 1.0
snow: 1.0
leaves: 0.7
cave: 1.0
flying: 0.25
netherflamme: 0.6
soulflame: 1.0
```

---

## 💬 Préférences de messages

Chaque joueur peut choisir quels messages afficher :

- rencontres Pokémon,
- récompenses,
- spots vides.

---

# ⌨️ Commandes utiles

## Commandes joueur

```
/rustlingspots messages
/rustlingspots messages on
/rustlingspots messages off
/rustlingspots messages pokemon on
/rustlingspots messages loot off
/rustlingspots messages empty on
```

---

## Commandes admin / debug

```
/rustlingspots spawn grass
/rustlingspots spawn rustlingspots:grass
/rustlingspots spawn <namespace:spot_id>

/rustlingspots spawnshiny rustlingspots:grass

/rustlingspots reload

/rustlingspots stats
/rustlingspots stats <player>

/rustlingspots scan 64
/rustlingspots scan 64 grass
```

### Notes utiles

- `spawn` accepte les familles natives et les spots custom
- `spawnshiny` force un spot shiny
- `reload` recharge toutes les configurations et pools
- `scan` permet de lister les spots actifs proches

---

# 🧩 Personnalisation avancée

Le mod supporte également les **Custom Spots via datapack**.

Il est possible d’ajouter :

- des spots personnalisés,
- des familles custom,
- des biomes spécifiques,
- des particules pondérées,
- des tables de loot dédiées,
- des règles de priorité et de poids.

Tout cela **sans addon Java** ni modification du worldgen.

---

## 📥 Guide & exemple

- [Custom Spot Definitions Guide](https://www.curseforge.com/minecraft/data-packs/rustling-spots-example-addon-datapack)

---

# 🔒 Compatibilité & sécurité

- ✅ Aucun changement de génération du monde
- ✅ Compatible avec les sauvegardes existantes
- ✅ Compatible multi-dimensions
- ✅ Support des dimensions custom
- ✅ Compatibilité prévue avec les dimensions de **Cobblemon Raid Dens**
- ✅ Les spots custom restent de simples ajouts de données configurables sans code supplémentaire
