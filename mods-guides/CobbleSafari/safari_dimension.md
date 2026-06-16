# 🏝️ Safari Dimension

{% hint style="info" %}
<p align="center">
The <strong>Safari Dimension</strong> is a dimension composed of <strong>18 Pokémon biomes</strong>, each based on an elemental type. Explore unique habitats and catch rare Pokémon in a time-limited environment.
</p>
{% endhint %}

---

# 🚪 Accessing the Safari

## 🔹 Safari Teleporter

Entry is done via a **Safari Teleporter**:

1. Activate the teleporter
2. Confirmation interface
3. Destination display
4. Teleportation to the dimension

{% hint style="info" %}
<p align="center">
📍 Each entrance is <strong>unique</strong>: you never appear in the same location twice.
</p>
{% endhint %}

{% hint style="warning" %}
<p align="center">
In <strong>Cobblemon Realms</strong>, crafting the teleporter is not possible. To access it, go to spawn using <strong>/spawn</strong>: the teleporter is located on your right.
</p>
{% endhint %}

---

## 🔹 Leaving the Safari

- Command: `/safariexit`
- You can leave at any time
- Remaining time is **preserved for the day**

---

# ⏱️ General Rules

Inside the Safari Dimension:

- ⏳ You have a maximum of **15 minutes**
- ⚪ Only Safari Balls can be used
- ❌ No battles allowed
- ❌ Pokémon cannot be sent out
- 🎣 Fishing is disabled
- 💨 Pokémon can flee
- 📍 Completely random spawn location

{% hint style="warning" %}
<p align="center">
Dying inside the Safari may result in the loss of local progression.
</p>
{% endhint %}

---

# 💨 Pokémon Fleeing System

{% hint style="info" %}
Safari Pokémon may flee when they become too disturbed.
{% endhint %}

---

## ⚡ Flee Trigger Conditions

A flee event can be triggered during a critical interaction:

- ❗ a Safari Ball breaks  
- 🎒 using an item on the Pokémon  
- 🎯 direct interaction with the Pokémon  

👉 Each event has a **23.6% chance** of triggering a flee.

---

## ⏳ Flee Phase

When a Pokémon starts fleeing:

- ⚠️ a warning appears on the screen
- ⏱️ you have **5 seconds**
- 🎯 one final capture attempt is possible

If no capture succeeds:

> 💨 The Pokémon escapes permanently.

---

## 🧠 Technical Behavior

The system is based on the **Great Marsh (DPPt)**:

- a random number between **0 and 254** is generated each turn
- if the value is ≤ the flee rate → the Pokémon flees

📌 System base:
> 60 → approximately **23.6% chance to flee**

---

## 📊 Modifier System (Flee & Capture)

Levels range from **-6 to +6** and affect both fleeing and capture.

### 🎮 Simplified View

| Level | -6 | -3 | 0 | +3 | +6 |
|--------|----|----|---|----|----|
| 💨 Flee | 71% | 47% | 24% | 12% | 8% |
| 🎯 Capture | x3 | x2 | x1 | x0.5 | x0.33 |

👉 The higher the level, the easier Pokémon are to catch and the less likely they are to flee.

<details>
<summary>📈 View detailed values</summary>

| Level | -6 | -5 | -4 | -3 | -2 | -1 | 0 | +1 | +2 | +3 | +4 | +5 | +6 |
|--------|----|----|----|----|----|----|---|----|----|----|----|----|----|
| 💨 Flee Modifier | 9/3 | 8/3 | 7/3 | 6/3 | 5/3 | 4/3 | 3/3 | 3/4 | 3/5 | 3/6 | 3/7 | 3/8 | 3/9 |
| 💨 Calculated Flee Rate | 180 | 160 | 140 | 120 | 100 | 80 | 60 | 45 | 36 | 30 | ~25 | ~22 | 20 |
| 💨 Flee Percentage | 71% | 63% | 55% | 47% | 39% | 31% | 24% | 18% | 14% | 12% | 10% | 9% | 8% |
| 🎯 Capture Modifier | 9/3 | 8/3 | 7/3 | 6/3 | 5/3 | 4/3 | 3/3 | 3/4 | 3/5 | 3/6 | 3/7 | 3/8 | 3/9 |
| 🎯 Capture Bonus | x3 | x2.6 | x2.3 | x2 | x1.6 | x1.3 | x1 | x0.75 | x0.6 | x0.5 | x0.43 | x0.375 | x0.33 |

</details>

{% hint style="info" %}
Intermediate values follow a continuous progression between each level.
{% endhint %}

---

# 🎯 Safari Items

## 🍖 Bait

Effect:
- ↓ reduces flee chances
- ↑ lowers capture chances

![Bait Crafting Recipe](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/app%C3%A2t.png)

<p align="center">
ℹ️ You can use any Cobblemon berry.
</p>
👉 Makes the Pokémon calmer, but harder to catch.

---

## 🪨 Mud Ball

Effect:
- ↑ increases flee chances
- ↑ improves capture chances

![Mud Ball Crafting Recipe](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/boue_boule.gif)

👉 Makes capturing easier but riskier.

---

# 🌍 Biomes & Pokémon

The Safari Dimension contains **18 biomes**, each based on a Pokémon type.

Each biome contains:

- 🟢 Common
- 🔵 Uncommon
- 🟣 Rare
- ⭐ Ultra-rare

📖 Complete spawn list: [Safari Dimension Wild Pokémon](wild_pokemon_safari.md)

---

# 💰 Safari Entry (Optional)

By default:
- Free entry

But configurable per server/modpack:

## 🔹 Available Payment Types
- 🎟️ item (e.g. Safari Ticket)
- 💰 Realms Coins (e.g. 5000)

## 🔹 Advanced Options
- Multiple payments allowed
- Time refills + additional entries
- Daily reward reset through payment

---

# ⚙️ Configuration

Most Safari settings are grouped in:
<br>
➡️ `config/cobblesafari/safari_config.json`

Some useful options:

- `dailySafariBallsCount` → number of free daily Safari Balls (default: `16`)
- `enableEntryFee` → enables entry fees

{% hint style="info" %}
## More Information

<p align="center">
You can find a complete description of the configuration file on the mod's official page:
<a href="https://cobblesafari.maxigregrze.fr/en/addons/config_safari_config">Safari_config</a>
</p>
{% endhint %}

---

## 🔒 Dimensional Restrictions

Allowed items, battle rules, and some Safari restrictions are defined in:
<br>
➡️ `config/cobblesafari/dimensional_restrictions_config.json`

{% hint style="info" %}
## More Information

<p align="center">
Full details of this configuration are available on the mod's official page:
<a href="https://cobblesafari.maxigregrze.fr/en/addons/config_dimensional_restrictions_config">Dimensional Restrictions Configuration</a>
</p>
{% endhint %}

---

## ⏱️ Timer and Teleportation

Session duration, entry cooldowns, and teleportation logic are defined in:
<br>
➡️ `config/cobblesafari/dimensional_timer_config.json`

{% hint style="info" %}
## More Information

<p align="center">
Full details of this configuration are available on the mod's official page:
<a href="https://cobblesafari.maxigregrze.fr/en/addons/config_dimensional_timer_config">Dimensional Timer Configuration</a>
</p>
{% endhint %}

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
