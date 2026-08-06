# 🐾 Pokémon and Spawns

{% hint style="info" %}
<p align="center">
<strong>Cobblemon Realms</strong> uses the custom <strong>Biome Expanded Spawns v6.0</strong> datapack to provide coherent, varied, and environment-specific encounters across the modpack. Pokémon can react to biomes, dimensions, time, weather, light, structures, nearby blocks, elevation, and several other world conditions.
</p>
{% endhint %}

---

## 📚 What This Guide Covers

| 📌 Topic | 📋 Content |
|:---:|---|
| 🌍 Spawn regions | Overworld, Nether, End, Aether, and The Otherside |
| 🧭 Environmental rules | Biomes, biome tags, height, light, weather, and time |
| 🏛️ Special encounters | Structures, nearby blocks, fishing, and other requirements |
| ✨ Rarity | Common, Uncommon, Rare, and Ultra Rare encounters |
| 🔎 Search tools | In-game and Discord methods for finding Pokémon |

---

## 🌍 How the Spawn System Works

A Pokémon is not assigned to only one biome. Each species can have several independent spawn rules, allowing it to appear in different environments, at different levels, or under different conditions.

For example, one Pokémon may have:

- a common daytime spawn in forests
- a rarer nighttime spawn in another biome
- a structure-exclusive encounter
- an Ultra Rare spawn in a special dimension

{% hint style="warning" %}
A biome alone does not always guarantee that a Pokémon can appear. Time, weather, light level, height, nearby blocks, structures, and spawn position may also be required.
{% endhint %}

---

## 🗺️ Main Spawn Regions

| World or dimension | General role in the spawn system |
|---|---|
| 🌎 **Overworld** | The primary hunting world, with encounters spread across natural biomes, caves, oceans, structures, and modified terrain |
| 🔥 **Nether** | Fire-, lava-, fossil-, ruin-, and structure-related encounters, including several rare species |
| 🌌 **End** | Rare, unusual, and late-game encounters across End biomes, islands, and structures |
| ☁️ **The Aether** | Large custom pools across the four Skyroot biomes, including starters, fossils, Paradox Pokémon, Ultra Beasts, and Legendary Pokémon |
| 🌑 **The Otherside** | Ghost-, Dark-, Dragon-, Psychic-, and late-game encounters across the four Deeper and Darker biomes |

### 📖 Dimension Guides

- [☁️ The Aether Spawn Guide](mods-guides/worlds_and_dimensions/aether.md)
- [🌑 The Otherside Spawn Guide](mods-guides/worlds_and_dimensions/deeper_and_darker.md)

{% hint style="info" %}
The dedicated dimension guides contain complete biome-by-biome encounter lists, including Ultra Rare levels and important conditions.
{% endhint %}

---

## 🧭 Biomes and Biome Tags

The datapack primarily organizes environments through biome tags such as:

- `#cobblemon:is_forest`
- `#cobblemon:is_ocean`
- `#cobblemon:is_cave`
- `#cobblemon:is_mountain`
- `#cobblemon:is_floral`
- `#cobblemon:is_otherside`
- `#aether:is_aether`

A biome tag can group Vanilla biomes and compatible modded biomes under the same environmental category. This allows similar locations to share appropriate Pokémon without requiring every biome to be configured separately in every spawn file.

⮕ Open the [Biome Tags Reference](pokemons-guides/biome-tags-reference.md) to view the tags and supported biomes used by the modpack.

---

## ⚙️ Conditions That Can Affect a Spawn

<details>
<summary><strong>🌤️ Time, weather, and moon phases</strong></summary>

Some Pokémon are restricted to:

- daytime
- nighttime
- dusk
- rain
- clear weather
- specific moon phases

These conditions are especially important for Ghost-types, nocturnal Pokémon, weather-related forms, and several rare encounters.

</details>

<details>
<summary><strong>💡 Light, sky access, and elevation</strong></summary>

A spawn rule may check:

- minimum or maximum sky light
- total local light
- whether the Pokémon can see the sky
- minimum or maximum Y level
- underground or surface positioning

This is why entering the correct biome may not be enough for cave, mountain, deep underground, or low-light encounters.

</details>

<details>
<summary><strong>🏛️ Structures and special locations</strong></summary>

Some Pokémon can appear only inside or near particular structures, including examples such as:

- villages
- ruins
- shipwrecks and shipwreck coves
- Ocean Monuments
- Strongholds
- Ancient Cities
- the Otherside Ancient Temple
- Aether dungeons

Structure encounters may use different levels or rarity buckets from the same Pokémon's normal wilderness spawns.

</details>

<details>
<summary><strong>🧱 Nearby blocks and terrain</strong></summary>

Certain encounters depend on nearby blocks or the surface beneath the spawn. Examples include:

- flowers and special trees
- water or lava
- ores and gemstones
- redstone components
- Lightning Rods
- Cobblemon PCs and machines
- natural stone, deepslate, foliage, or dimension-specific blocks

These rules are used for environmental storytelling and special hunts such as technological, mineral, floral, or elemental Pokémon.

</details>

<details>
<summary><strong>🌊 Water, fishing, treetops, and other positions</strong></summary>

Pokémon may use different spawn position types:

- grounded
- submerged
- water surface
- seafloor
- fishing
- treetop or elevated foliage encounters

Fishing rules can also depend on the rod, lure level, or bait being used.

</details>

---

## ✨ Understanding Rarity

Cobblemon Realms uses four main encounter buckets:

| Rarity | General meaning |
|:---:|---|
| Common | Frequently available when the required conditions are met |
| Uncommon | Less frequent encounters that may still be found through regular exploration |
| Rare | Scarce encounters, often with narrower environmental requirements |
| Ultra Rare | The most difficult natural encounters, including many starters, fossils, Paradox Pokémon, Ultra Beasts, Legendary Pokémon, and Mythical Pokémon |

{% hint style="info" %}
The same Pokémon can appear in more than one rarity bucket when it has several separate spawn rules. Always check the exact environment and conditions rather than relying only on its name.
{% endhint %}

---

## 🔎 Using `/checkspawns`

Use `/checkspawns` in-game to inspect the Pokémon that can currently spawn around your position.

This is useful because the result reflects your current environment, including the biome and active world conditions.

{% hint style="warning" %}
A listed Pokémon may still require a specific time, light level, weather condition, structure, nearby block, height, or spawn position before it can actually appear.
{% endhint %}

---

## 🤖 Discord Integration

The **@Our Story** Discord bot can search the spawn data remotely, allowing you to find a Pokémon without travelling through every biome in-game.

### 📋 Available Commands

| Language | Command |
|:---:|---|
| 🇬🇧 English | `/where <pokemon_name>` |
| 🇫🇷 French | `/tesou <pokemon_name>` |
| 🇩🇪 German | `/wobistdu <pokemon_name>` |
| 🇯🇵 Japanese, Rōmaji | `/doko <pokemon_name>` |

The result can include dimensions, biome tags, direct biome IDs, levels, rarity, and special conditions when available. Pokémon with broad habitat coverage may return very long lists.

{% hint style="success" %}
Use the bot before travelling to plan rare hunts, compare dimensions, and identify the most suitable biome for a target Pokémon.
{% endhint %}

---

## 🧠 Hunting Tips

- Check the dedicated Aether or Otherside guide before hunting in those dimensions.
- Verify both the biome and the time of day.
- Explore vertically when searching for cave, mountain, or deep underground encounters.
- Inspect structures and unusual block formations instead of searching only in open terrain.
- Remember that fishing, submerged, seafloor, and treetop encounters use different spawn positions.
- Use `/checkspawns` for your current location and the Discord bot for global research.
- Consult the [Biome Tags Reference](pokemons-guides/biome-tags-reference.md) when a spawn result uses a tag instead of a direct biome name.

⮕ Learn more about improved wild encounters in [Spawn Improvements](pokemons-guides/wild-boost-mechanics.md).

⮕ Discover custom species and variants in the [Exclusive Forms](pokemons-exclusives/mewtwo-exclusive-forms.md) section.

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
