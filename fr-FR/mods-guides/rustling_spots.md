# Présentation Rustling Spots

**Rustling Spots** est un mod pour *Cobblemon* inspiré du système d'herbes frémissantes de **Pokémon Noir & Blanc**.
Il ajoute des événements temporaires dynamiques apparaissant autour des joueurs, accompagnés de particules et de sons ambiants.

Interagir avec un spot déclenche une rencontre Cobblemon ou l'obtention d'un loot thématique selon sa famille.
Le mod ne modifie pas la génération du monde, ce qui le rend sûr pour les sauvegardes existantes.

---
## Fonctionnalités principales

### Événements dynamiques

- Apparition temporaire de spots autour des joueurs pendant l'exploration
- Indices visuels et sonores pour signaler leur présence
- Rencontres exclusivement Cobblemon, sans mobs vanilla liés au système
- Récompenses thématiques selon la famille du spot
- Fonctionnement compatible avec les mondes déjà existants

### 🌍 Familles de spots :

Le mod propose **neuf familles** distinctes, chacune disposant de surfaces, biomes, pools de Pokémon et tables de loot spécifiques :

| Famille          | Environnement principal | Thématique                    | Capture      |
| ---------------- | ----------------------- | ----------------------------- | ------------ |
| **Grass**        | Herbes / plaines        | Rencontres classiques         | (mettre img) |
| **Sand**         | Déserts / sable         | Espèces désertiques, fossiles | (mettre img) |
| **Water**        | Zones aquatiques        | Pokémon aquatiques            | (mettre img) |
| **Snow**         | Biomes froids           | Espèces glaciales             | (mettre img) |
| **Leaves**       | Forêts / canopées       | Rencontres légères            | (mettre img) |
| **Cave**         | Grottes / souterrain    | Exploration minière           | (mettre img) |
| **Flying**       | Ciel / zones ouvertes   | Rencontres aériennes          | (mettre img) |
| **NetherFlamme** | Nether (lave)           | Thématique chaleur / feu      | (mettre img) |
| **SoulFlame**    | Soul Sand / Soul Soil   | Ambiance sombre / maudite     | (mettre img) |

> Chaque famille peut être activée, désactivée ou rééquilibrée via configuration.

---
## Objectif du mod

- Introduire une boucle d'exploration inspirée de la Génération 5 (*Pokémon Noir & Blanc*)
- Ajouter des événements interactifs visibles directement dans le monde
- Encourager le déplacement et l'observation active plutôt qu'un simple spawn passif
- Donner plus de personnalité aux environnements via des rencontres et récompenses contextualisées

---
## Fonctionnement en jeu

Lorsqu'un joueur explore le monde :

1. Un Rustling Spot peut apparaître à proximité quand le joueur progresse dans de nouveaux chunks.
2. Des particules et sons ambiants signalent sa présence.
3. Le joueur s'approche et interagit avec le spot.
4. Le spot déclenche une rencontre Cobblemon, un loot, ou parfois aucun résultat selon la configuration.
5. Le spot disparaît ensuite automatiquement.

Le système respecte aussi un cycle de vie simple :

- les spots ont une durée de vie limitée
- ils disparaissent après interaction
- ils disparaissent aussi s'il n'y a plus de joueur à proximité
- ils respectent des limites par joueur et globales pour éviter l'encombrement du serveur

### Valeurs par défaut importantes

| Paramètre | Valeur par défaut |
| --- | --- |
| Rayon de présence autour du joueur | `200` blocs |
| Distance minimale entre deux spots | `16` blocs |
| Nombre maximum de spots par joueur | `8` |
| Nombre maximum de spots sur le serveur | `64` |
| Duree de vie d'un spot | `6000` ticks (~5 minutes) |
| Rayon d'interaction | `2` blocs |
| Tolérance verticale d'interaction | `3` blocs |

---
## Variantes et récompenses

Le système ne se limite pas a un simple spawn Pokémon.

### Types de résultats possibles

- **Rencontre Cobblemon**
- **Loot thématique**
- **Spot vide** si cette option est activée
- **Spot shiny** avec annonce globale possible

### Réglages par défaut

| Option | Valeur par défaut |
| --- | --- |
| Chance qu'un spot soit shiny | `0.0025` (0.25%) |
| Annonce globale des trouvailles shiny | `true` |
| Spots vides activés | `true` |
| Chance d'un spot vide | `0.02` (2%) |
| Chance de rencontre Pokémon | `0.35` (35%) |
| Niveau Pokémon min / max | `5` a `75` |
| Chance shiny Pokémon par défaut | `0.05` (5%) |
| Récompenses multiples | desactivées par défaut |

Un spot shiny garantit un résultat shiny côté recompense, et peut en plus annoncer la découverte a tout le serveur si l'option est laissée active.

---
## Configuration

Le mod expose plusieurs fichiers JSON pour ajuster précisément son comportement :

| Fichier | Rôle |
| --- | --- |
| `config/rustlingspots/rustlingspots-server.json` | Activation globale, rayon, durée de vie, limites, shiny, spots vides, récompenses multiples |
| `config/rustlingspots/rustlingspots-pokemon.json` | Chances de rencontre, niveaux, règles de spawn Pokémon |
| `config/rustlingspots/rustlingspots-client.json` | Ombres, préférences d'affichage des messages côté client |
| `config/rustlingspots/rustlingspots-sound.json` | Volumes des sons ambiants et de recompense |
| `config/rustlingspots/rustlingspots-familiés.json` | Taux d'apparition par famille |

### Multiplicateurs de spawn par famille

Les multiplicateurs par défaut sont actuellement :

- `grass`: `1.0`
- `sand`: `1.0`
- `water`: `1.0`
- `snow`: `1.0`
- `leaves`: `0.7`
- `cave`: `1.0`
- `flying`: `0.25`
- `netherflamme`: `0.6`
- `soulflame`: `1.0`

### Preferences de messages joueur

Chaque joueur peut aussi choisir quels messages il souhaite voir :

- messages de rencontre Pokémon
- messages de loot
- messages de spot vide

---
## Commandes utiles

### Commandes joueur

```mcfunction
/rustlingspots messages
/rustlingspots messages on
/rustlingspots messages off
/rustlingspots messages pokemon on
/rustlingspots messages loot off
/rustlingspots messages empty on
```

### Commandes admin / debug

```mcfunction
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

Notes utiles :

- `spawn` accepte les familles intégrées (`grass`, `water`, etc.) mais aussi les IDs complets de spots custom
- `spawnshiny` force une version shiny pour les tests
- `reload` recharge les configs, règles de familles, pools de loot, pools Pokémon et définitions de spots custom
- `scan` sert au debug pour lister les spots actifs proches

---
## Personnalisation avancée

Le mod supporte aussi des **custom spots via datapack** :

- spots personnalisés par biome / bloc / dimension
- familles Pokémon custom
- familles de loot custom
- particules pondérées personnalisées
- priorité et poids de sélection

Un datapack peut donc ajouter ses propres spots sans addon Java ni modification du worldgen.

Guide détaillé + Download :

- [Custom Spot Definitions Guide](https://www.curseforge.com/minecraft/data-packs/rustling-spots-example-addon-datapack)

---
## Compatibilité et sécurité

- Aucun changement de worldgen
- Compatible avec les sauvegardes existantes
- Fonctionne dans plusieurs dimensions tant qu'une famille ou un spot custom peut correspondre
- Compatibilité prévue avec la dimension de **Cobblemon Raid Dens**, activable ou désactivable via config
- Les spots custom restent des ajouts de données, sans besoin de code additionnel
