# 🌿 Rustling Spots

{% hint style="info" %}
<p align="center">
<strong>Rustling Spots</strong> is a mod inspired by the rustling grass mechanic from Pokémon Black & White. During exploration, temporary events can appear around you and trigger Pokémon encounters, rewards, or other surprises.
</p>
{% endhint %}

{% hint style="success" %}
<p align="center">
The mod does not modify world generation and remains fully compatible with existing saves.
</p>
{% endhint %}

---

# ✨ How Rustling Spots Work

When a player explores the world:

1. A Rustling Spot appears nearby.
2. Particles and sounds signal its presence.
3. The player approaches and interacts with it.
4. An event is triggered.
5. The spot automatically disappears.

## Possible Outcomes

- 🎯 Pokémon encounter  
- 📦 Themed reward  
- ❌ Empty spot  
- ✨ Shiny spot  

{% hint style="warning" %}
Shiny Rustling Spots are extremely rare. They guarantee a shiny reward and may be announced to the entire server.
{% endhint %}

---

# 🌍 Spot Families

The mod currently offers **9 Rustling Spot families**.

Each family has:

- compatible surfaces;
- biome restrictions;
- Pokémon pools;
- dedicated rewards.

| Family | Environment | Theme |
|----------|----------|----------|
| Grass | Grasslands and plains | Standard encounters |
| Sand | Deserts and sand | Desert species and fossils |
| Water | Aquatic areas | Water Pokémon |
| Snow | Snowy biomes | Ice species |
| Leaves | Forests and canopies | Light encounters |
| Cave | Caves and underground | Mining exploration |
| Flying | Sky and open spaces | Flying encounters |
| NetherFlame | Nether and lava | Fire and heat |
| SoulFlame | Soul Sand and Soul Soil | Dark atmosphere |

{% hint style="info" %}
Each family can be individually enabled, disabled, or rebalanced through configuration.
{% endhint %}

---

# 🎁 Rewards & Probabilities

## Default Settings

| Option | Value |
|----------|----------|
| Chance for a spot to be shiny | `0.25%` |
| Global shiny announcements | `true` |
| Empty spots enabled | `true` |
| Empty spot chance | `2%` |
| Pokémon encounter chance | `35%` |
| Min / Max Pokémon Level | `5 → 75` |
| Pokémon shiny chance | `5%` |
| Multiple rewards | Disabled |

---

# 📊 Important Parameters

| Parameter | Value |
|----------|----------|
| Radius around player | `200 blocks` |
| Minimum distance between spots | `16 blocks` |
| Maximum spots per player | `8` |
| Maximum server spots | `64` |
| Spot lifetime | `6000 ticks (~5 min)` |
| Interaction radius | `2 blocks` |
| Vertical tolerance | `3 blocks` |

## 🧬 Lifecycle

Spots:

- have a limited lifespan;
- disappear after interaction;
- disappear when no players are nearby;
- respect global limits to avoid server clutter.

---

# 🎯 Mod Purpose

Rustling Spots aims to:

- recreate the dynamic exploration experience of Generation 5;
- make environments feel more alive;
- encourage player movement and exploration;
- provide events directly visible in the world;
- avoid relying solely on passive Pokémon spawns.

---

# 🛠️ Configuration

The mod includes several configuration files:

| File | Purpose |
|----------|----------|
| `rustlingspots-server.json` | Global settings |
| `rustlingspots-pokemon.json` | Pokémon encounters |
| `rustlingspots-client.json` | Visual settings |
| `rustlingspots-sound.json` | Sounds and volume |
| `rustlingspots-families.json` | Family multipliers |

## 🌿 Default Multipliers

```text
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

# ⌨️ Commands

## Player Commands

```text
/rustlingspots messages
/rustlingspots messages on
/rustlingspots messages off
/rustlingspots messages pokemon on
/rustlingspots messages loot off
/rustlingspots messages empty on
```

## 🧑🏼‍🍳 Admin & Debug Commands

{% hint style="danger" %}
These commands are primarily intended for administrators and mod debugging.
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

### 🗒️ Useful Notes

- `spawn` accepts both native families and custom spots;
- `spawnshiny` forces a shiny spot;
- `reload` reloads all configurations;
- `scan` lists active nearby spots.

---

# 🧩 Advanced Customization

{% hint style="success" %}
The mod supports custom Rustling Spots through datapacks, with no Java addon required.
{% endhint %}

You can add:

- custom spots;
- custom families;
- biome-specific rules;
- weighted particles;
- dedicated loot tables;
- priority rules;
- weighting systems.

## 📥 Guide & Example

- [Rustling Spots - Addon Datapack](https://www.curseforge.com/minecraft/data-packs/rustling-spots-example-addon-datapack)

---

# 🔒 Compatibility

- ✅ No world generation changes  
- ✅ Compatible with existing saves  
- ✅ Multi-dimension compatible  
- ✅ Compatible with custom dimensions  
- ✅ Compatible with Cobblemon Raid Dens  
- ✅ Custom spots rely only on configurable data  

{% hint style="success" %}
Rustling Spots can be integrated into a modpack without impacting world generation or existing worlds.
{% endhint %}
