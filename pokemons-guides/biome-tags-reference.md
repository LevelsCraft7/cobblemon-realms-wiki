# 🌍 Biome Tags Reference

## 🌍 Biome Tags Reference

{% hint style="info" %}
<p align="center">
This page lists all biome tags used in Cobblemon Realms. Each tag groups together biomes sharing common characteristics and is used to define Pokémon spawn conditions.
</p>
{% endhint %}

---

## 📖 Table of Contents

- ❄️ [Snow & Ice](#snow-and-ice)
- ⛰️ [Mountains & Highlands](#mountains-and-highlands)
- ⛏️ [Caves & Underground](#caves-and-underground)
- 🌊 [Oceans, Rivers & Coasts](#oceans-rivers-and-coasts)
- 🌳 [Forests & Jungles](#forests-and-jungles)
- 🌾 [Plains & Grasslands](#plains-and-grasslands)
- 🏜️ [Deserts & Arid Areas](#deserts-and-arid-areas)
- 🌺 [Flower Biomes & Flower Fields](#flower-biomes-and-flower-fields)
- 🍄 [Mushrooms & Magical Biomes](#mushrooms-and-magical-biomes)
- 🌀 [Special Dimensions](#special-dimensions)
- 📦 [Other Tags](#other-tags)

---

## ❄️ Snow and Ice

* **`is_freezing`** : `frozen_river`, `jagged_peaks`, `snowy_beach`, `snowy_plains`, `snowy_slopes`, `cardinal_tundra`, `emerald_peaks`, `scarlet_mountains`, `skylands_winter`, `snowy_badlands`, `frosted_hills`, `#cobblemon:(is_frozen, is_glacial, is_snowy, is_frozen_ocean, is_snowy_forest)`, `#byg:is_snowy`, `#c:snowy`
* **`is_frozen`** / **`is_frozen_ocean`** : `deep_frozen_ocean`, `frozen_ocean`, `frozen_cliffs`
* **`is_glacial`** : `frozen_peaks`, `ice_spikes`, `frostfire_caves`, `frozen_cliffs`, `glacial_chasm`, `frosted_caves`, `spires`, `#byg:is_icy`, `#c:icy`
* **`is_nether_frozen`** : `subzero_hypogeal`
* **`is_snowy`** : `grove`, `snowy_taiga`, `alpha_islands_winter`, `alpine_grove`, `ice_marsh`, `siberian_grove`, `snowy_maple_forest`, `snowy_shield`, `wintry_forest`, `wintry_lowlands`, `#byg:is_snowy`
* **`is_snowy_forest`** : `grove`, `snowy_taiga`, `cold_boreal_taiga`, `cold_deciduous_forest`, `frozen_pine_taiga`, `alpha_islands_winter`, `alpine_grove`, `ice_marsh`, `siberian_grove`, `snowy_maple_forest`, `snowy_shield`, `wintry_forest`, `wintry_lowlands`, `snowy_coniferous_forest`, `glacarian_taiga`
* **`is_snowy_taiga`** : `cold_boreal_taiga`, `frozen_pine_taiga`, `spires`, `icy_heights`

---

## ⛰️ Mountains and Highlands

* **`is_highlands`** : `meadow`, `alpine_highlands`, `arid_highlands`, `blooming_plateau`, `highlands`, `highland_fields`
* **`is_mountain`** : `stony_spires`, `volcanic_peaks`, `windswept_spires`, `yosemite_cliffs`, `the_hallow`, `mountains`, `arid_mountains`, `towering_cliffs`, `#minecraft:is_mountain`, `#cobblemon:is_hills`, `#forge:is_mountain`
* **`is_nether_mountain`** : `basalt_deltas`, `volcanic_deltas`
* **`is_peak`** : `frozen_peaks`, `jagged_peaks`, `snowy_slopes`, `stony_peaks`, `emerald_peaks`, `rocky_mountains`, `scarlet_mountains`, `windswept_spires`, `icy_heights`, `#c:mountain_peak`, `#forge:is_peak`

---

## ⛏️ Caves and Underground

* **`is_cave`** : `dripstone_caves`, `lush_caves`, `andesite_caves`, `desert_caves`, `diorite_caves`, `fungal_caves`, `granite_caves`, `infested_caves`, `thermal_caves`, `underground_jungle`, `ancient_delta`, `bioshroom_caves`, `prismachasm`, `redstone_caves`, `scorching_caves`, `#c:(caves, underground)`, `#forge:is_underground`
* **`is_deep_dark`** : `deep_dark`, `blooming_caverns`, `deeplands`, `echoing_forest`, `overcast_columns`, `crystal_caves`, `deep_caves`, `frostfire_caves`, `mantle_caves`, `tuff_caves`, `sculk_overgrowth`
* **`is_dripstone`** : `dripstone_caves`, `fractured_savanna`, `stony_spires`, `prismachasm`, `redstone_caves`

---

## 🌊 Oceans, Rivers and Coasts

* **`is_beach`** : `lagoon`, `dead_coral_reef`, `rocky_reef`, `tropicraft:beach`, `grassy_beach`, `gravel_beach`, `#minecraft:is_beach`
* **`is_coast`** : `stony_shore`, `white_cliffs`, `basalt_cliffs`, `granite_cliffs`, `volcanic_island`, `rocky_reef`, `chalk_cliffs`, `#minecraft:is_beach`, `#cobblemon:is_beach`, `#c:stony_shores`
* **`is_cold_ocean`** : `cold_ocean`, `deep_cold_ocean`, `#cobblemon:is_frozen_ocean`
* **`is_deep_ocean`** : `hyacinth_deeps`, `volcanic_island`, `#minecraft:is_deep_ocean`, `#c:deep_ocean`
* **`is_lukewarm_ocean`** : `deep_lukewarm_ocean`, `lukewarm_ocean`, `rocky_reef`, `tropics`
* **`is_ocean`** : `tropicraft:ocean`, `hyacinth_deeps`, `#minecraft:is_ocean`, `#cobblemon:(is_coast, is_cold_ocean, is_deep_ocean, is_frozen_ocean, is_lukewarm_ocean, is_warm_ocean)`
* **`is_river`** : `warm_river`, `tropicraft:river`, `cold_river`, `muddy_river`, `tropical_river`, `#minecraft:is_river`
* **`is_warm_ocean`** : `warm_ocean`, `lush_stacks`, `#cobblemon:is_kelp`

---

## 🌳 Forests and Jungles

* **`is_forest`** : `cherry_grove`, `alpha_islands(_winter)`, `blooming_valley`, `forested_highlands`, `lavender_forest`, `lavender_valley`, `mirage_isles`, `sakura_grove`, `sakura_valley`, `temperate_highlands`, `woodlands`, `alpha_grove`, `autumnal_maple_forest`, `deciduous_forest`, `maple_forest`, `redwoods`, `sparse_redwoods`, `magnolia_woodland`, `mauve_hills`, `mountains`, `orchard`, `pine_slopes`, `silver_birch_forest`, `temperate_grove`, `willow_forest`, `#minecraft:is_forest`, `#c:(flower_forests, tree_deciduous)`
* **`is_jungle`** : `underground_jungle`, `tropics`, `osa_rainforest`, `rainforest`, `tropical_peaks`, `sparse_rainforest`, `eucalyptus_forest`, `#minecraft:is_jungle`
* **`is_nether_forest`** : `nether_jungle`, `nether_swampland(_terraces)`, `weeping_mire`, `withering_woods`

---

## 🌾 Plains and Grasslands

* **`is_grassland`** : `#cobblemon:(is_plains, is_savanna)`
* **`is_plains`** : `plains`, `sunflower_plains`, `brushland`, `steppe`, `valley_clearing`, `flatlands`, `barley_fields`, `shrubland`, `clover_plains`, `grassland`, `prairie`, `flower_fields`, `#cobblemon:is_highlands`, `#byg:is_plain`, `#c:plains`, `#forge:is_plains`

---

## 🏜️ Deserts and Arid

* **`is_arid`** : `#cobblemon:(is_sandy, is_savanna)`
* **`is_badlands`** : `ashen_savanna`, `red_oasis`, `warped_mesa`, `white_mesa`, `arid_mountains`, `outback`, `#minecraft:is_badlands`, `#c:mesa`
* **`is_desert`** : `desert`, `ancient_sands`, `desert_canyon`, `desert_caves`, `desert_oasis`, `desert_spires`, `lush_desert`, `red_oasis`, `sandstone_valley`, `lost_caves`, `saguaro_desert`, `joshua_desert`, `#byg:is_desert`
* **`is_nether_desert`** : `soul_sand_valley`, `gravel_desert`, `quartz_desert`, `warped_desert`, `infernal_dunes`, `weeping_valley`
* **`is_savanna`** : `arid_highlands`, `ashen_savanna`, `brushland`, `desert_oasis`, `fractured_savanna`, `hot_shrubland`, `red_oasis`, `savanna_badlands`, `savanna_slopes`, `shrubland`, `desert_shrubland`, `baobab_savanna`, `steppe`, `#minecraft:is_savanna`

---

## 🌺 Floral and Meadows

* **`is_floral`** : `flower_forest`, `meadow`, `sunflower_plains`, `cherry_grove`, `blooming_plateau`, `blooming_valley`, `lavender_forest`, `lavender_valley`, `sakura_grove`, `sakura_valley`, `blush_sakura_grove`, `cotton_sakura_grove`, `amaranth_fields`, `allium_fields`, `rose_fields`, `skyris_vale`, `cherry_blossom_forest`, `orchard`, `lavender_meadow`, `strawberry_fields`, `clover_fields`, `ecalyptus_forest`, `flower_fields`, `fungal_fen`, `highland_fields`, `magnolia_woodland`, `maple_forest`, `mauve_hills`, `poppy_fields`, `rocky_meadow`, `temperate_grove`, `#byg:is_floral`, `#c:(floral, flower_forests)`

---

## 🍄 Mushrooms and Magical

* **`is_magical`** : `dark_forest`, `skyris_vale`, `amethyst_canyon`, `amethyst_rainforest`, `mirage_isles`, `moonlight_grove`, `moonlight_valley`, `blackwood_taiga`, `bioshroom_caves`, `clover_field`, `eucalyptus_forest`, `fungal_fen`, `magnolia_woodland`, `mauve_hills`, `prismachasm`, `redwoods`, `rocky_meadow`, `silver_birch_forest`, `japanese_maple_forest`, `rainbow_forest`, `sakura_forest`, `enchanted_tangle`, `forgotten_forest`, `skyrise_vale`, `weeping_witch_forest`, `ancient_delta`, `#byg:is_magical`
* **`is_mushroom`** : `dark_forest`, `mushroom_fields`, `fungal_caves`, `mirage_isles`, `lichen_caves`, `deep_dark_forest`, `bioshroom_caves`, `blackwood_taiga`, `fungal_fen`, `#c:mushroom`, `#forge:is_mushroom`

---

## 🌀 Special Dimensions

* **`is_aether`** : `skyroot_forest`, `skyroot_grove`, `skyroot_meadow`, `skyroot_woodland`
* **`is_sky`** : `skylands_autumn`, `skylands_spring`, `skylands_summer`, `skylands_winter`

---

## 📦 Other Tags

| Tag | Main Content / Included Biomes |
| --- | --- |
| **`is_autumn`** | `autumnal_grove`, `autumnal_maple_forest`, `golden_boreal_taiga`, `maple_forest`, `orchard`, `skylands_autumn`, `autumnal_woods`, `carnelian_treeway`, `#cobblemon:(is_arid, is_cold_ocean, is_mountain, is_mushroom, is_taiga)` |
| **`is_bamboo`** | `bamboo_jungle`, `bamboo_blossom_forest`, `bamboo_forest`, `bamboo_rainforest` |
| **`is_cold`** | `cold_river`, `#cobblemon:(is_freezing, is_frigid, is_peak, is_taiga, is_tundra, is_cold_ocean)`, `#byg:is_cold`, `#c:climate_cold`, `#forge:is_cold/overworld` |
| **`is_crystal`** | `crystal_canyons`, `crystal_crags` |
| **`is_deep`** | `#minecraft:is_deep_ocean` |
| **`is_dense`** | `dark_forest`, `mangrove_swamp`, `#cobblemon:is_jungle`, `#c:vegetation_dense`, `#forge:is_dense(_overworld)` |
| **`is_freshwater`** | `#cobblemon:(is_river, is_swamp)` |
| **`is_frigid`** | `cold_ocean`, `deep_cold_ocean`, `#cobblemon:is_frozen` |
| **`is_haunted`** | *(Aucun biome spécifié)* |
| **`is_hills`** | `blooming_valley`, `forested_highlands`, `lavender_valley`, `lush_valley`, `moonlight_valley`, `sakura_valley`, `savanna_slopes`, `temperate_highlands`, `yosemite_lowlands`, `mauve_hills`, `poppy_fields`, `#minecraft:is_hill`, `#cobblemon:is_highlands`, `#c:mountain_slope`, `#forge:is_slope` |
| **`is_infested`** | `#byg:is_spooky` |
| **`is_island`** | `mushroom_fields`, `lush_stacks`, `alpha_islands(_winter)`, `mirage_isles`, `warped_mesa`, `volcanic_island`, `#cobblemon:is_tropical_island` |
| **`is_kelp`** | `kelp_forest` |
| **`is_lukewarm`** | `deep_lukewarm_ocean`, `lukewarm_ocean` |
| **`is_lush`** | `lush_caves`, `lush_stacks`, `underground_jungle`, `blooming_caverns`, `ancient_delta`, `#forge:is_lush` |
| **`is_nether_basalt`** | `basalt_deltas`, `blackstone_shales`, `ash_barrens`, `volcanic_deltas`, `withered_forest`, `blazing_dunes` |
| **`is_nether_crimson`** | `crimson_forest`, `crimson_glowing_woods`, `crimson_pinewood`, `nether_swampland(_terraces)`, `crimson_gardens`, `whistling_woods` |
| **`is_nether_fungus`** | `crimson_forest`, `warped_forest`, `crimson_glowing_woods`, `crimson_pinewood`, `mushroom_forest(_edge)`, `nether_jungle`, `old_fungiwoods`, `old_warped_woods`, `crimson_gardens`, `embur_bog`, `glowstone_garden`, `wailing_garth`, `luminous_grove`, `whistling_woods`, `soulblight_forest`, `inverted_forest` |
| **`is_nether_overgrowth`** | `bone_reef`, `nether_grasslands`, `soul_plain`, `sulfuric_bone_reef`, `sythian_torrids` |
| **`is_nether_quartz`** | `quartz_desert`, `quartz_cavern`, `quartz_flats` |
| **`is_nether_soul_fire`** | `soul_sand_valley`, `subzero_hypogeal`, `warped_desert`, `quartz_flats`, `weeping_valley` |
| **`is_nether_soul_sand`** | `soul_sand_valley`, `soul_plain`, `wart_forest(_edge)`, `wailing_garth`, `warped_desert`, `ashy_shoals`, `blackstone_shales`, `soulblight_forest`, `weeping_valley` |
| **`is_nether_toxic`** | `brimstone_caverns`, `wailing_garth`, `toxic_heap`, `mycotoxic_undergrowth`, `nether_jungle` |
| **`is_nether_warped`** | `warped_forest`, `nether_jungle`, `old_warped_woods`, `wailing_garth`, `warped_desert` |
| **`is_nether_wasteland`** | `nether_wastes`, `magma_land`, `poor_nether_grasslands`, `brimstone_caverns`, `magma_wastes`, `ashy_shoals`, `quartz_cavern`, `ash_barrens`, `toxic_heap`, `infernal_holt` |
| **`is_overworld`** | `#minecraft:is_overworld`, `#c:is_overworld`, `#cobblemon:(is_arid, is_cave, is_coast, is_deep_dark, is_floral, is_forest, is_freshwater, is_grassland, is_highlands, is_island, is_jungle, is_magical, is_mountain, is_mushroom, is_ocean, is_sky, is_spooky, is_temperate, is_thermal, is_volcanic)` |
| **`is_plateau`** | `savanna_plateau`, `barley_fields`, `prairie`, `steppe`, `#byg:is_plateau`, `#forge:is_plateau` |
| **`is_reef`** | `warm_ocean`, `lush_stacks` |
| **`is_salt`** | `pink_salt_caves`, `chalk_cliffs` |
| **`is_sandy`** | `#cobblemon:(is_badlands, is_desert)`, `#byg:is_sandy` |
| **`is_shrubland`** | `shrubland`, `dry_bushland` |
| **`is_sparse`** | `sparse_rainforest`, `sparse_redwoods`, `#cobblemon:(is_arid, is_grassland, is_tundra)`, `#c:vegetation_sparse`, `#forge:is_sparse(_overworld)` |
| **`is_spooky`** | `dark_forest`, `dead_coral_reef`, `eroded_haunted_forest`, `haunted_forest`, `ashen_woodland`, `blackwood_taiga`, `redwoods`, `willow_forest`, `ebony_woods`, `dark_amaranth_forest`, `tall_dark_amaranth_forest`, `pumpkin_fields`, `#byg:is_spooky`, `#forge:is_spooky` |
| **`is_spring`** | `skylands_spring`, `floral_meadow`, `#cobblemon:(is_floral, is_lukewarm, is_magical, is_plains)` |
| **`is_summer`** | `skylands_summer`, `ice_marsh`, `lush_swamp`, `mangroves`, `prismarine_forest`, `#cobblemon:(is_forest, is_jungle, is_lush, is_reef, is_warm_ocean, is_swamp)`, `#byg:is_swamp`, `#c:swamp`, `#forge:is_swamp` |
| **`is_swamp`** | `mangrove_swamp`, `swamp`, `ice_marsh`, `orchid_swamp`, `bayou`, `fen`, `marsh`, `muddy_river`, `old_growth_bayou`, `#byg:is_swamp` |
| **`is_taiga`** | `grove`, `alpine_grove`, `haze_mountain`, `ice_marsh`, `moonlight_grove`, `moonlight_valley`, `shield_clearing`, `siberian_grove`, `siberian_taiga`, `snowy_maple_forest`, `snowy_shield`, `wintry_lowlands`, `coniferous_forest`, `blackwood_taiga`, `boreal_taiga`, `golden_boreal_taiga`, `pine_taiga`, `#minecraft:is_taiga`, `#c:tree_coniferous`, `#forge:is_coniferous` |
| **`is_temperate`** | `#cobblemon:(is_forest, is_plains)` |
| **`is_thermal`** | `caldera`, `thermal_caves`, `yellowstone`, `scorching_caves`, `tropical_river` |
| **`is_tropical`** | `tropics`, `tropical_river`, `volcanic_island` |
| **`is_tropical_island`** | `volcanic_island`, `tropics`, `rocky_reef` |
| **`is_tundra`** | `ice_spikes`, `snowy_plains`, `cardinal_tundra`, `cold_shrubland`, `gravel_desert`, `rocky_shrubland`, `snowy_badlands`, `yellowstone`, `frozen_tundra`, `#c:snowy_plains` |
| **`is_void`** | `the_void`, `#byg:is_void` |
| **`is_volcanic`** | `mantle_caves`, `volcanic_crater`, `volcanic_peaks`, `scorching_caves`, `volcanic_island`, `ashen_woodland` |
| **`is_winter`** | `skylands_winter`, `#cobblemon:is_freezing` |
| **`is_abyss`** | `deep_dark`, `crystal_caves`, `deep_caves`, `frostfire_caves`, `mantle_caves`, `tuff_caves` |

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
