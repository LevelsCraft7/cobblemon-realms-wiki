# 🐎 New Mount System (v1.7)

{% hint style="info" %}
<p align="center">
Since version <strong>1.7</strong>, Cobblemon Realms now uses the official mount system.
</p>
{% endhint %}

---

## 🔄 Transition to Official Mounts

The **Cobblemon: Ride On!** add-on has been removed from the modpack and replaced by Cobblemon’s official mount system.

### What changes

- ❌ Some Pokémon that were previously rideable no longer are.
- ✅ Available mounts now depend entirely on official Cobblemon support.
- 🔄 The mount roster may continue evolving in future updates.

---

# 🐎 How the Official System Works

Each rideable Pokémon has one or more **mount styles**, which define how it moves.

{% hint style="info" %}
💡 A single Pokémon may have multiple mount styles.
{% endhint %}

**Example:**

- 🌍 Charizard can be used as a ground mount (**Standard**)
- ☁️ Charizard can also be used as an aerial mount (**Bird**)

---

## 🌍 Ground Mounts

### 🚶 Standard

> The most common ground movement style.

The Pokémon naturally moves in the direction the player is facing, similarly to Minecraft horses.

**Features:**

- 🧭 Follows camera orientation
- ↔️ Supports lateral movement
- ⚡ Includes a sprint mode
- 💨 Sprinting consumes stamina

---

### 🚗 Vehicle

> A movement style similar to Minecraft boats.

Unlike the **Standard** style, movement direction is not directly tied to the camera.

**Features:**

- 👀 Allows free camera movement
- 🔄 Side keys are used for turning
- 🏎️ Usually has a wider turning radius
- 💨 Can drift by crouching while turning

---

## 🌊 Water Mounts

### 🚤 Boat

> The classic water navigation style.

Works similarly to Minecraft boats.

**Features:**

- 👀 Camera movement independent from direction
- 🔄 Simple and intuitive controls
- 🤽🏼‍♂️ Designed for surface travel

---

### 🌊 Submarine

> A mount capable of diving underwater.

Uses the foundations of the **Boat** style while enabling underwater exploration.

**Features:**

- 🏊🏼 Surface navigation
- 🤿 Underwater exploration
- 🧭 Free underwater movement

---

### 🐬 Dolphin

> A more agile version of the Submarine style.

**Features:**

- 🦘 Large jumps out of the water
- ⚡ Fast movement speed
- 🏝️ Ideal for coastal exploration

---

## ☁️ Flying Mounts

### 🕊️ Bird

> The most versatile aerial style.

Allows free flight while remaining capable of hovering.

**Features:**

- 🛫 Free flight
- 🎯 Precise controls
- ↔️ Lateral movement
- 🪂 Flight mode inspired by Elytra movement

---

### ✈️ Jet

> A style designed for speed.

**Features:**

- ⚡ Very fast
- 👀 Independent camera movement
- ⬆️⬇️ Manual altitude control
- ❌ Cannot hover

---

### 🛸 Hover

> Complete freedom of movement.

Comparable to Minecraft’s Creative or Spectator mode.

**Features:**

- 🔄 Movement in all directions
- 🎯 Very precise controls
- 🐢 Usually slower
- ⛰️ Maximum altitude affected by Jump stat

---

### 🚀 Rocket

> A faster version of Hover.

**Features:**

- 🚀 Strong forward acceleration
- ☁️ Excellent aerial mobility
- 🌍 Extremely effective for long-distance travel

---

# 📊 Mount Statistics

Each Pokémon has its own mount statistics.

{% hint style="warning" %}
⚠️ These statistics are completely independent from the Pokémon’s battle stats.
{% endhint %}

{% hint style="success" %}
Some of these characteristics can also be modified using [Aprijuices](https://github.com/LevelsCraft7/cobblemon-realms-wiki/blob/main/fr-FR/cobblemon-craft/aprijuice-guide.md)
</p> 
{% endhint %}

---

### ⚡ Speed

Determines the maximum speed a mount can reach.

**The higher the value:**

- ✅ Faster movement speed
- ✅ More efficient travel

---

### 🏃 Acceleration

Determines how quickly a mount reaches its top speed.

**The higher the value:**

- ✅ Faster takeoff
- ✅ Better responsiveness

---

### 🎯 Handling

Determines how easily the mount changes direction.

**The higher the value:**

- ✅ Tighter turns
- ✅ More precise controls

---

### 🦘 Jump

Determines the mount’s vertical capabilities.

Depending on the mount style:

- 🌊 **Submarine** → ascent and descent speed
- 🐬 **Dolphin** → jump height
- 🕊️ **Bird** → gliding efficiency
- ✈️ **Jet** → ease of takeoff
- 🛸 **Hover** → maximum altitude
- 🚀 **Rocket** → climbing speed

---

### 💨 Stamina

Determines how long special abilities can be used.

It affects:

- ⚡ Sprint duration for Standard mounts
- 🤿 Oxygen duration for Submarine and Dolphin styles
- ☁️ Flight time for Bird and Jet styles
- ⛰️ Maximum altitude for Hover and Rocket styles

When stamina is depleted, the affected ability becomes temporarily unavailable.

---

# 🎮 Using Mounts

## 🧗🏼 Mounting a Pokémon

- 🧎 Crouch (**Shift** by default)
- 🖱️ Right-click a compatible Pokémon
- 🐎 Select the mount option

ℹ️ *You can adjust mount settings in `config\cobblemon\main.json`, for example:*

```
{
  "invertRoll": false,
  "invertPitch": false,
  "invertYaw": false,
  "xAxisSensitivity": 1.0,
  "yAxisSensitivity": 1.0,
  "swapXAndYAxes": false,
  "rightingDelay": -1.0,
  "disableRoll": false,
  "displayControlSeconds": 0,
  "infiniteRideStamina": false,
  "rememberRidingCamera": false
}
```

{% hint style="info" %}
## Motion sickness while riding?

💡 Set: `"disableRoll": true`.
{% endhint %}

---

# 📋 List of Rideable Pokémon

Below is the complete list of Pokémon currently rideable using Cobblemon’s official mount system.  
Statistics are shown by mount type and come directly from the official Cobblemon mount spreadsheet.

---

<details>
<summary><strong>🐾 Ground Mount List</strong></summary>

---

| Pokémon | Accel. | Skill | Speed | Stam. | Jump |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Venusaur | 40-75 | 10-40 | 30-55 | 45-85 | 40-60 |
| Charizard | 55-65 | 10-25 | 25-40 | 20-30 | 15-25 |
| Blastoise | 30-50 | 10-35 | 30-65 | 15-35 | 15-30 |
| Parasect | 50-70 | 45-65 | 15-30 | 15-30 | 0-15 |
| Arcanine | 70-90 | 40-80 | 45-70 | 35-80 | 45-65 |
| Dewgong | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Rhyhorn | 5-20 | 5-25 | 25-60 | 40-80 | 5-15 |
| Rhydon | 55-75 | 30-60 | 5-15 | 55-90 | 20-30 |
| Mr. Mime | 20-40 | 15-45 | 25-45 | 35-60 | 15-35 |
| Tauros | 15-50 | 15-30 | 55-75 | 35-55 | 25-35 |
| Tauros (Paldea-Aqua) | 15-50 | 15-30 | 50-70 | 40-60 | 25-30 |
| Tauros (Paldea-Blaze) | 20-55 | 15-30 | 55-75 | 30-50 | 25-40 |
| Tauros (Paldea-Combat) | 15-50 | 15-30 | 55-75 | 35-55 | 25-35 |
| Gyarados | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Lapras | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Aerodactyl | 55-75 | 15-45 | 10-20 | 20-45 | 25-35 |
| Articuno | 70-90 | 30-60 | 10-20 | 40-80 | 25-50 |
| Zapdos | 70-90 | 30-60 | 10-20 | 40-80 | 25-50 |
| Moltres | 70-90 | 30-60 | 10-20 | 40-80 | 25-50 |
| Dragonite | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Ariados | 55-85 | 45-65 | 30-45 | 15-30 | 25-45 |
| Girafarig | 40-65 | 20-35 | 25-45 | 30-50 | 30-45 |
| Heracross | 55-70 | 40-65 | 15-30 | 35-50 | 35-50 |
| Ursaring | 45-80 | 20-45 | 30-40 | 30-65 | 25-40 |
| Piloswine | 30-50 | 30-45 | 10-25 | 35-70 | 5-10 |
| Mantine | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Lugia | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Ho-Oh | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Slaking | 0-20 | 0-20 | 25-65 | 60-100 | 25-40 |
| Wailmer | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Wailord | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Camerupt | 45-60 | 10-30 | 25-35 | 50-80 | 10-25 |
| Flygon | 60-75 | 15-25 | 15-25 | 25-40 | 15-30 |
| Altaria | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Tropius | 30-50 | 30-50 | 15-25 | 55-85 | 10-20 |
| Salamence | 60-80 | 5-20 | 10-20 | 35-70 | 15-25 |
| Metagross | 50-70 | 35-50 | 10-20 | 55-70 | 30-45 |
| Latias | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Latios | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Staraptor | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Bastiodon | 15-25 | 0-5 | 15-35 | 50-90 | 0-5 |
| Gastrodon | 70-90 | 0-15 | 5-10 | 10-20 | 0-10 |
| Honchkrow | 55-65 | 10-25 | 25-40 | 20-30 | 15-25 |
| Garchomp | 65-75 | 40-70 | 40-55 | 30-45 | 30-50 |
| Lickilicky | 0-15 | 0-5 | 10-25 | 20-40 | 40-60 |
| Rhyperior | 45-75 | 25-55 | 5-15 | 75-100 | 10-25 |
| Togekiss | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Mamoswine | 30-40 | 20-30 | 20-35 | 60-90 | 10-20 |
| Serperior | 65-80 | 0-30 | 25-45 | 35-55 | 0-5 |
| Zebstrika | 65-85 | 45-65 | 35-75 | 25-45 | 35-45 |
| Scolipede | 20-25 | 25-35 | 45-75 | 50-70 | 25-35 |
| Darmanitan | 45-65 | 15-25 | 40-50 | 35-60 | 35-45 |
| Crustle | 15-45 | 25-35 | 1-5 | 60-85 | 0-5 |
| Golurk | 65-80 | 40-65 | 35-50 | 60-85 | 40-60 |
| Frison | 50-75 | 15-30 | 45-65 | 55-70 | 20-30 |
| Braviary | 90-100 | 15-30 | 10-20 | 15-30 | 10-20 |
| Braviary (Hisui) | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Hydreigon | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Volcarona | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Skiddo | 40-65 | 20-40 | 30-45 | 30-45 | 30-40 |
| Gogoat | 65-75 | 40-60 | 45-65 | 45-65 | 40-60 |
| Tyrantrum | 50-70 | 40-60 | 20-30 | 70-100 | 40-55 |
| Noivern | 65-85 | 30-50 | 35-50 | 10-20 | 30-45 |
| Mudsdale | 50-70 | 30-60 | 30-40 | 70-100 | 30-40 |
| Dhelmise | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Corviknight | 60-80 | 30-50 | 15-30 | 60-80 | 30-45 |
| Dragapult | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Wyrdeer | 60-80 | 40-60 | 45-65 | 55-70 | 45-55 |
| Ursaluna | 30-40 | 10-25 | 40-65 | 65-85 | 25-35 |
| Sneasler | 75-90 | 65-85 | 35-45 | 10-20 | 30-40 |
| Kilowattrel | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Espathra | 30-65 | 15-40 | 55-70 | 25-35 | 40-55 |
| Revavroom | 0-5 | 25-40 | 70-85 | 20-40 | 15-20 |
| Cyclizar | 65-85 | 35-60 | 50-85 | 30-60 | 35-45 |
| Orthworm | 15-25 | 0-15 | 30-40 | 25-75 | 0-5 |
| Dondozo | 10-40 | 80-100 | 10-40 | 10-40 | 10-40 |
| Farigiraf | 40-60 | 35-50 | 45-60 | 50-70 | 45-55 |
| Dudunsparce | 30-50 | 30-40 | 5-25 | 30-75 | 20-45 |
| Dudunsparce (Three-Segment) | 35-60 | 30-40 | 5-25 | 35-85 | 25-55 |

</details>

---

<details><summary><strong>🌊 Water Mount List</strong></summary>

---

| Pokémon | Accel. | Skill | Speed | Stam. | Jump |
| :--- | :---: | :---: | :---: | :---: | :---: | 
| Blastoise | 45-65 | 50-75 | 35-65 | 35-70 | 30-50 |
| Dewgong | 50-75 | 30-65 | 25-45 | 25-50 | 25-50 |
| Seaking | 35-70 | 25-55 | 35-65 | 20-40 | 15-35 |
| Tauros (Paldea-Aqua) | 55-65 | 40-55 | 30-40 | 30-65 | 20-30 |
| Gyarados | 40-60 | 35-65 | 30-55 | 45-75 | 40-70 |
| Lapras | 30-55 | 50-75 | 25-40 | 45-75 | 20-30 |
| Dragonite | 30-65 | 35-50 | 30-50 | 60-90 | 55-85 |
| Mantine | 30-55 | 45-75 | 20-40 | 20-40 | 40-80 |
| Lugia | 80-100 | 75-95 | 60-80 | 80-100 | 75-90 |
| Sharpedo | 55-85 | 25-65 | 55-85 | 20-45 | 45-75 |
| Wailmer | 30-55 | 30-55 | 30-50 | 40-85 | 25-40 |
| Wailord | 20-45 | 30-55 | 20-40 | 65-100 | 40-55 |
| Relicanth | 25-40 | 40-80 | 15-35 | 50-90 | 50-75 |
| Garchomp | 75-85 | 10-25 | 35-60 | 5-10 | 40-80 |
| Dhelmise | 40-55 | 20-30 | 15-30 | 45-65 | 70-100 |
| Dragapult | 60-85 | 55-70 | 50-65 | 25-35 | 40-55 |
| Dondozo | 45-65 | 50-75 | 25-45 | 60-75 | 10-25 |

</details>

---

<details><summary><strong>🪶 Flying Mount List</strong></summary>

---

| Pokémon | Accel. | Skill | Speed | Stam. | Jump |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Charizard | 45-75 | 55-85 | 30-65 | 45-75 | 30-65 |
| Blastoise | 5-40 | 30-60 | 5-15 | 2-20 | 10-20 |
| Gyarados | 35-60 | 45-65 | 15-50 | 15-55 | 20-45 |
| Aerodactyl | 35-65 | 35-70 | 45-75 | 40-65 | 45-75 |
| Articuno | 70-85 | 80-100 | 65-90 | 70-90 | 65-90 |
| Zapdos | 65-90 | 70-85 | 80-100 | 65-85 | 70-85 |
| Moltres | 70-85 | 65-90 | 70-85 | 80-100 | 65-90 |
| Dragonite | 35-50 | 50-85 | 40-60 | 50-85 | 50-70 |
| Forretress | 20-40 | 25-45 | 15-25 | 0-5 | 5-10 |
| Heracross | 40-65 | 55-85 | 35-50 | 35-55 | 0-5 |
| Mantine | 75-100 | 30-50 | 20-40 | 0-0 | 25-45 |
| Lugia | 65-85 | 60-80 | 60-80 | 65-90 | 75-90 |
| Ho-Oh | 75-95 | 65-85 | 75-90 | 80-100 | 75-100 |
| Flygon | 40-75 | 40-85 | 50-80 | 45-65 | 45-60 |
| Altaria | 25-45 | 40-50 | 25-35 | 70-90 | 25-45 |
| Claydol | 65-85 | 50-70 | 10-20 | 5-10 | 35-70 |
| Tropius | 20-45 | 20-40 | 20-45 | 55-80 | 70-90 |
| Salamence | 60-75 | 40-65 | 60-75 | 65-85 | 60-85 |
| Metagross | 60-75 | 35-55 | 45-75 | 10-25 | 25-45 |
| Latias | 70-95 | 70-95 | 75-90 | 85-100 | 85-100 |
| Latios | 70-95 | 70-95 | 85-100 | 70-95 | 80-100 |
| Staraptor | 45-70 | 25-45 | 35-55 | 45-70 | 45-65 |
| Drifblim | 10-20 | 15-25 | 5-15 | 40-80 | 60-100 |
| Honchkrow | 20-40 | 30-50 | 20-35 | 55-75 | 50-70 |
| Bronzong | 40-65 | 25-40 | 15-30 | 10-20 | 30-50 |
| Garchomp | 50-70 | 50-60 | 70-80 | 30-50 | 20-70 |
| Magnezone | 65-90 | 35-50 | 20-35 | 5-15 | 45-65 |
| Togekiss | 20-30 | 45-65 | 20-30 | 70-100 | 10-20 |
| Dusknoir | 45-60 | 60-70 | 15-25 | 0-5 | 45-80 |
| Klinklang | 40-60 | 40-60 | 30-40 | 5-10 | 15-25 |
| Golurk | 10-35 | 15-30 | 45-75 | 30-50 | 25-40 |
| Braviary | 35-55 | 30-50 | 45-70 | 55-85 | 35-55 |
| Braviary (Hisui) | 30-50 | 30-50 | 40-65 | 60-90 | 40-60 |
| Hydreigon | 35-55 | 30-60 | 45-60 | 75-100 | 5-10 |
| Volcarona | 45-65 | 55-75 | 30-50 | 65-90 | 25-35 |
| Noivern | 40-65 | 50-85 | 55-90 | 30-45 | 55-85 |
| Corviknight | 35-55 | 20-35 | 25-40 | 80-100 | 80-100 |
| Dragapult | 60-85 | 55-70 | 55-90 | 25-35 | 45-80 |
| Kilowattrel | 35-50 | 40-65 | 30-45 | 40-65 | 50-70 |

</details>

---

{% hint style="warning" %}
## Notice:
 
Some Pokémon, mount styles, and statistics may be added, modified, or removed over time as the mod receives updates. Therefore, we are not responsible for changes made by Cobblemon itself.
{% endhint %}

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
