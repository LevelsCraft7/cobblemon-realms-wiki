# 🌿 Rustling Spots

## 🧑🏼‍🔧 Fonctionnement de Rustling Spots

{% hint style="info" %}
<strong>Rustling Spots</strong> est un mod inspiré des herbes frémissantes de Pokémon Noir & Blanc. Lors de votre exploration, des événements temporaires peuvent apparaître autour de vous et déclencher des rencontres Pokémon, des récompenses ou d'autres surprises.
{% endhint %}

{% hint style="success" %}
Le mod ne modifie pas la génération du monde et reste entièrement compatible avec les sauvegardes existantes.
{% endhint %}

---

# ✨ Fonctionnement

Lorsqu'un joueur explore le monde :

1. Un Rustling Spot apparaît à proximité.
2. Des particules et sons signalent sa présence.
3. Le joueur s'en approche et interagit avec lui.
4. Un événement est déclenché.
5. Le spot disparaît automatiquement.

## Résultats possibles

- 🎯 Rencontre Pokémon
- 📦 Récompense thématique
- ❌ Spot vide
- ✨ Spot shiny

{% hint style="warning" %}
Les Rustling Spots shiny sont extrêmement rares. Ils garantissent une récompense shiny et peuvent être annoncés à l'ensemble du serveur.
{% endhint %}

---

# 🌍 Familles de spots

Le mod propose actuellement **9 familles** de Rustling Spots.

Chaque famille possède :

- ses surfaces compatibles ;
- ses biomes ;
- ses Pokémon ;
- ses récompenses dédiées.

| Famille | Environnement | Thématique |
|----------|----------|----------|
| Grass | Herbes et plaines | Rencontres classiques |
| Sand | Déserts et sable | Espèces désertiques et fossiles |
| Water | Zones aquatiques | Pokémon aquatiques |
| Snow | Biomes enneigés | Espèces glaciales |
| Leaves | Forêts et canopées | Rencontres légères |
| Cave | Grottes et sous-sol | Exploration minière |
| Flying | Ciel et espaces ouverts | Rencontres aériennes |
| NetherFlamme | Nether et lave | Feu et chaleur |
| SoulFlame | Soul Sand et Soul Soil | Ambiance sombre |

{% hint style="info" %}
Chaque famille peut être activée, désactivée ou rééquilibrée indépendamment via la configuration.
{% endhint %}

---

# 🎁 Récompenses & probabilités

## Réglages par défaut

| Option | Valeur |
|----------|----------|
| Chance qu'un spot soit shiny | `0.25 %` |
| Annonce globale des shinies | `true` |
| Spots vides activés | `true` |
| Chance de spot vide | `2 %` |
| Chance de rencontre Pokémon | `35 %` |
| Niveau Pokémon min / max | `5 → 75` |
| Chance shiny Pokémon | `5 %` |
| Récompenses multiples | Désactivées |

---

# 📊 Paramètres importants

| Paramètre | Valeur |
|----------|----------|
| Rayon autour du joueur | `200 blocs` |
| Distance minimale entre spots | `16 blocs` |
| Spots maximum par joueur | `8` |
| Spots maximum serveur | `64` |
| Durée de vie d'un spot | `6000 ticks (~5 min)` |
| Rayon d'interaction | `2 blocs` |
| Tolérance verticale | `3 blocs` |

## 🧬 Cycle de vie

Les spots :

- possèdent une durée de vie limitée ;
- disparaissent après interaction ;
- disparaissent lorsqu'aucun joueur n'est proche ;
- respectent des limites globales afin d'éviter l'encombrement serveur.

---

# 🎯 Objectif du mod

Rustling Spots cherche à :

- recréer l'exploration dynamique de la génération 5 ;
- rendre les environnements plus vivants ;
- encourager les déplacements ;
- proposer des événements visibles directement dans le monde ;
- éviter les simples apparitions passives de Pokémon.

---

# 🛠️ Configuration

Le mod dispose de plusieurs fichiers de configuration :

| Fichier | Rôle |
|----------|----------|
| `rustlingspots-server.json` | Réglages globaux |
| `rustlingspots-pokemon.json` | Rencontres Pokémon |
| `rustlingspots-client.json` | Options visuelles |
| `rustlingspots-sound.json` | Sons et volumes |
| `rustlingspots-families.json` | Multiplicateurs des familles |

## 🌿 Multiplicateurs par défaut

```yaml
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

# ⌨️ Commandes

## Commandes joueur

```text
/rustlingspots messages
/rustlingspots messages on
/rustlingspots messages off
/rustlingspots messages pokemon on
/rustlingspots messages loot off
/rustlingspots messages empty on
```

## 🧑🏼‍🍳 Commandes admin & debug

{% hint style="danger" %}
Ces commandes sont principalement destinées aux administrateurs et au débogage du mod.
{% endhint %}

```text
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

### 🗒️ Notes utiles

- `spawn` accepte les familles natives et les spots personnalisés ;
- `spawnshiny` force un spot shiny ;
- `reload` recharge les configurations ;
- `scan` liste les spots actifs à proximité.

---

# 🧩 Personnalisation avancée

{% hint style="success" %}
Le mod prend en charge les Rustling Spots personnalisés via datapack, sans aucun addon Java.
{% endhint %}

Il est possible d'ajouter :

- des spots personnalisés ;
- des familles personnalisées ;
- des biomes spécifiques ;
- des particules pondérées ;
- des tables de loot dédiées ;
- des règles de priorité ;
- des systèmes de pondération.

## 📥 Guide & exemple

- https://www.curseforge.com/minecraft/data-packs/rustling-spots-example-addon-datapack

---

# 🔒 Compatibilité

- ✅ Aucun changement de génération du monde
- ✅ Compatible avec les sauvegardes existantes
- ✅ Compatible multi-dimensions
- ✅ Compatible avec les dimensions personnalisées
- ✅ Compatible avec Cobblemon Raid Dens
- ✅ Les spots personnalisés reposent uniquement sur des données configurables

{% hint style="success" %}
Rustling Spots peut être intégré à un modpack sans impact sur le worldgen ni sur les mondes déjà existants.
{% endhint %}
