# 🗂️ Complete Version History

{% hint style="info" %}
This page tracks the public **Cobblemon Realms** releases published on CurseForge. It separates client releases, patches, and server packs. **Every published version is treated as important**, including intermediate patches such as 5.9.1, 5.9.2, 5.9.3b, and 5.9.4.
{% endhint %}

---

## ✅ Current Official Status

**Last manually verified: August 7, 2026**

| Item | Version | Minecraft | Loader | Published |
| --- | --- | --- | --- | --- |
| Client modpack | **5.9.4** | 1.21.1 | NeoForge | June 14, 2026 |
| Server pack | **5.9.4b** | 1.21.1 | NeoForge | June 14, 2026 |

[**Open version 5.9.4 →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/8249569)

[**Browse the complete CurseForge archive →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/all)

{% hint style="warning" %}
Version **6.0** will only be shown as the current official release after its public client file is published on CurseForge.
{% endhint %}

---

## 🧭 Understanding Version Names

- **Release**: file marked as stable on CurseForge.
- **Beta**: public release still undergoing validation.
- **HF / hf**: hotfix published after a main release.
- **a, b, c, bis**: rebuild, patch, or revision within the same release branch.
- **+1 / +2 on CurseForge**: associated additional files, usually a server pack or related patch.

CurseForge currently displays **65 public entries**, and several releases also contain additional files. The timeline below identifies **57 client releases**. Official numbering is not always continuous.

Unless stated otherwise, every release below targets **Minecraft 1.21.1 with NeoForge**.

---

## 📅 Complete Client Release Timeline

### 5.x Series

| Version | Published | Type |
| --- | --- | --- |
| **5.9.4** | June 14, 2026 | Release |
| **5.9.3b** | June 12, 2026 | Release |
| **5.9.2** | June 2, 2026 | Release |
| **5.9.1** | May 31, 2026 | Release |
| **5.9** | May 30, 2026 | Beta |
| 5.8.2 | April 5, 2026 | Release |
| 5.8.1 | March 30, 2026 | Release |
| 5.8hf | March 30, 2026 | Hotfix |
| 5.7HF | March 13, 2026 | Hotfix |
| 5.6 | February 8, 2026 | Release |
| 5.5 | January 22, 2026 | Release |
| 5.4 | January 21, 2026 | Release |
| 5.3 | January 1, 2026 | Release |
| 5.2 | December 23, 2025 | Release |
| 5.1 | December 10, 2025 | Release |
| 5.0c | December 2, 2025 | Release |

### 4.x Series

| Version | Published | Type |
| --- | --- | --- |
| 4.9.1 | November 4, 2025 | Patch |
| 4.9 | November 3, 2025 | Release |
| 4.8 | October 25, 2025 | Release |
| 4.7 | October 16, 2025 | Release |
| 4.6 | October 7, 2025 | Release |
| 4.5 | September 30, 2025 | Release |
| 4.4hf2 | September 24, 2025 | Hotfix |
| 4.4 | September 21, 2025 | Release |
| 4.3 | September 11, 2025 | Release |
| 4.2 | August 31, 2025 | Release |
| 4.1 | August 24, 2025 | Release |
| 4.0 | August 17, 2025 | Release |

### 3.x Series

| Version | Published | Type |
| --- | --- | --- |
| 3.9 | August 4, 2025 | Release |
| 3.8a | July 26, 2025 | Revision |
| 3.7 | July 20, 2025 | Release |
| 3.6 | July 10, 2025 | Release |
| 3.5 | July 5, 2025 | Release |
| 3.4 | June 23, 2025 | Release |
| 3.3 | June 18, 2025 | Release |
| 3.2 | June 8, 2025 | Release |
| 3.1 | June 2, 2025 | Release |
| 3.0 | June 1, 2025 | Release |

### 2.x Series

| Version | Published | Type |
| --- | --- | --- |
| 2.8 | April 30, 2025 | Release |
| 2.6 | April 14, 2025 | Release |
| 2.5 | April 9, 2025 | Release |
| 2.4.2 | April 2, 2025 | Patch |
| 2.4 | April 1, 2025 | Release |
| 2.3 | March 26, 2025 | Release |
| 2.2 bis | March 24, 2025 | Revision |
| 2.2 | March 20, 2025 | Release |
| 2.1 | March 15, 2025 | Release |

### 1.x Series

| Version | Published | Type |
| --- | --- | --- |
| 1.9 | March 3, 2025 | Release |
| 1.8 | February 25, 2025 | Release |
| 1.7 | February 22, 2025 | Release |
| 1.6 | February 17, 2025 | Release |
| 1.5 | February 13, 2025 | Release |
| 1.4 | February 5, 2025 | Release |
| 1.3 | January 27, 2025 | Release |
| 1.2 | January 19, 2025 | Release |
| 1.1 | January 17, 2025 | Release |
| 1.0 | January 12, 2025 | Initial release |

---

## 🚀 5.9 Branch, Release by Release

{% hint style="success" %}
Versions **5.9.4, 5.9.3b, 5.9.2, 5.9.1, and 5.9 are five distinct public releases**. This section always lists them from **newest to oldest**.
{% endhint %}

### 5.9.4 · June 14, 2026 · Release

Version 5.9.4 is the latest official 5.9 branch release and a maintenance update focused on reliability.

- Added the `/arena admin regenerate <type>` admin command to manually regenerate existing arena instances by type.
- Bumped the arena placement version so existing slots can be rebuilt correctly after updating.
- Fixed spawn NPC duplication on world join.
- Static NPC duplicates are automatically cleaned using their unique IDs.
- Fixed arena instances generating only partially when the full placement area was not loaded before schematic placement.
- Added another stability fix for **Cobbreeding**.

[**Official 5.9.4 changelog →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/8249569)

### 5.9.3b · June 12, 2026 · Release

The public file is named **5.9.3b**. It is the additional revision of the 5.9.3 maintenance branch.

- Refreshed the spawn island.
- Significant arena stability and generation work.
- World generation improvements.
- Music and audio enhancements.
- Performance optimizations.
- Additional quality-of-life improvements and fixes.

{% hint style="info" %}
The **b** suffix is part of the public file name. For bug reports, specify **5.9.3b**, not only 5.9.3.
{% endhint %}

[**Find 5.9.3b in the CurseForge archive →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/all)

### 5.9.2 · June 2, 2026 · Release

Version 5.9.2 continued stabilization while changing several important modpack rules.

- Accessory items can no longer be lost on death.
- Arena dimensions now keep their own fixed time without affecting the Overworld.
- Spawn and hub worlds automatically restore the normal day/night cycle.
- Removed the old Meltan charge system.
- Meltan now evolves into Melmetal at **level 70** while holding a **Minecraft Anvil**.
- Added and updated several textures and visual assets.

[**Find 5.9.2 in the CurseForge archive →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/all)

### 5.9.1 · May 31, 2026 · Release

**5.9.1 is a distinct official client release**, published one day after the 5.9 beta and marked as a **Release** on CurseForge.

- It represents the first stable public revision of the 5.9 branch.
- It should be distinguished from the 5.9 beta when reporting bugs, maintaining backups, or requesting support.
- The full detailed changelog is not reproduced here when it cannot be confirmed cleanly from the currently accessible CurseForge source. The release remains explicitly documented instead of being merged into 5.9.

[**Find 5.9.1 in the CurseForge archive →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/all)

### 5.9 · May 30, 2026 · Beta

Version 5.9 is the major feature foundation of this branch.

- Added the **Gym World Tour** progression through RCT.
- Added the full **Gym Arena** system with dedicated arena types.
- Improved starter onboarding and guidance toward Professor Oak / Professor Chen.
- Improved Spawn Guide dialogue and spawn island onboarding.
- The spawn island regenerates on the first join in version 5.9.
- Included broad Pokémon model, rideability, economy, portal, spawn, structure, and performance changes.

[**Official 5.9 changelog →**](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/8169072)

---

## 🌟 Major Modpack Milestones

### 5.x Releases

- **5.9.4**: arena maintenance, regeneration command, duplicate NPC cleanup, schematic placement fixes, and Cobbreeding stability.
- **5.9.3b**: spawn refresh, arena stability, world generation, music, performance, and QoL.
- **5.9.2**: accessory death rules, arena time handling, and the new Meltan evolution method.
- **5.9.1**: first distinct public Release following the 5.9 beta.
- **5.9**: Gym World Tour, complete arena system, improved starter onboarding, new spawns, structures, and optimizations.
- **5.8hf through 5.8.2**: Catch Indicator and PokéNav improvements, raid, resource, and crash fixes.
- **5.6**: new core foundation, currency overhaul, legacy Realms Coin conversion, progression, and multiplayer stability.
- **5.3**: new forms, additional rideable Pokémon, performance improvements, loot, and spawn balancing.

Links: [5.9](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/8169072) · [5.8.1](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/7847115) · [5.6](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/7591795) · [5.3](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/7404528)

### 4.x Releases

- **4.9.1**: corrected overly common legendary summoning items.
- **4.9**: Cobbreeding overhaul with multiple eggs, offline progress, individual activation, and size support.
- **4.6**: new costumes and improvements to KO and capture chain boosters.
- **4.5**: Raid Den evolution and Shiny Booster overhaul.
- **4.4hf2**: Freeroam, quest, command, and server pack fixes.
- **4.4**: Freeroam mode, Trainer Association, expanded outbreaks, and rebalanced Alpha and wild spawns.
- **4.3**: new costumes, improved Paradox forms, Zygarde Matrix, loot, and texture updates.
- **4.2**: 8 GB RAM recommendation, new recipe interface, Cobble Workers, and improved notifications.
- **4.1**: Café forms, Cobble Workers automation, and performance work.
- **4.0**: Baby Legendaries, Paradox expansion, loot overhaul, and optimizations.

Links: [4.9](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/7183122) · [4.9.1](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/7186961) · [4.4](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/7020443) · [4.3](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/6987577)

### 3.x Releases

- **3.9**: roughly 150 species in outbreaks plus RAM, JVM, performance, and structure optimizations.
- **3.8a**: Sandy, Mimikins, Crystal Steelix, Mega Crystal Steelix, and an Arceus overhaul.
- **3.7**: Realms Coins, new starters, animation cleanup, textures, and music.
- **3.6**: WonderTrade overhaul, wild aggression changes, and roughly 100 Create quests.
- **3.5 through 3.3**: major loot, world generation, lore, interface, animation, and performance work.
- **3.2**: new launch screen, boss bars, more than 60 rideable Pokémon, and legendary reworks.
- **3.1**: persistent configurations, store items, and quest fixes.
- **3.0**: major quest overhaul, Realms Store beta, breeding, Rotom forms, Mega Showdown, and new integrations.

[View the official 3.7 changelog →](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms/files/6793247)

### 2.x Releases

- **2.8**: Discord spawn bot, mount improvements, 54 Pokédex quests, and legendary balancing.
- **2.6**: Zygarde progression, Necrozma forms, trainer, and spawn changes.
- **2.5**: support for **all 1025 Pokémon**, Mass Outbreaks, JourneyMap, gyms, and chain systems.
- **2.4.2**: targeted Entity Mimic crash fix.
- **2.4**: complete French quest translation, arenas, badges, storage, starters, and PokéSmartphone.
- **2.3 through 2.2 bis**: new species, loot, fossils, notifications, and progression tools.
- **2.1**: shiny rate changed from 1/8192 to 1/4096 and level cap raised from 25 to 30.

### 1.x Releases

- **1.9**: wider Cobblemon chest loot integration and new world creation interface.
- **1.8**: NeoForge update and extensive performance and crash fixes.
- **1.7**: minimum cap raised to 25, legendary announcements, and balancing.
- **1.6**: first public server pack, legendary quests, currency, and quest organization overhaul.
- **1.5**: tutorial map, Myths and Legends, and Pokémon size variations.
- **1.4**: animated inventory, Immersive Engineering, Mega Showdown, and new interface.
- **1.3**: Pokémon sizes, roughly 70 quests, SimpleTMs, and Legends Untold Reborn.
- **1.2**: The Aether and the first major quest lines.
- **1.1**: NeoForge update, Eggs, Ride On, and Legendary datapack.
- **1.0**: initial launch with Cobblemon, quests, trainers, currency, exploration, shaders, and optimizations.

---

## 🖥️ Server Packs

A server pack is separate from the client modpack and must match the version used by players.

- Current official server pack: **5.9.4b**.
- Check **Additional Files** whenever `+1` or `+2` appears on CurseForge.
- Some server packs include their own instructions or hotfixes.
- Never mix client and server files from different release branches.

{% hint style="danger" %}
Incompatible client and server versions may cause connection errors, mismatched registries, missing quests, or data loss.
{% endhint %}

---

## 💾 Before Every Update

1. Back up the world, players, quests, configurations, and server files.
2. Read the complete changelog for the target release.
3. Check the instructions for the matching server pack.
4. Confirm the Java, Minecraft, and NeoForge versions.
5. Test a copy of the world first.

Also see the [Installation Guide](installation.md) and [Report a Bug](report-a-bug.md).

{% hint style="success" %}
CurseForge remains the source of truth for release status, dates, file types, and downloads. This page provides a readable index of the public release history.
{% endhint %}
