# 📊 Enhanced Wild Pokémon Mechanics

Some mods extend the Cobblemon experience by introducing mechanics that reward players for their interactions with wild Pokémon — specifically **KOs** and **captures**. These mechanics track player activity and dynamically influence future spawns.

---

## 🧮 How Tracking Works

Every player has two sets of stats tracked separately:
- **KO Count & Streak**: Number of times a player has knocked out a specific Pokémon species, and how many times in a row they've done so.
- **Capture Count & Streak**: Number of captures per species, and how many times in a row a species was caught.

For each action:
- If you **KO or catch** a Pokémon of the same species as your last one, your **streak continues** and the count increases.
- If you switch species, the **streak resets** to 1 and starts again for the new one.
- KO and capture stats are **tracked independently**, allowing precise tracking of both activities.

These values are stored in your player data and can influence future wild Pokémon encounters.

---

## 🔥 Effects on Wild Spawns

Your accumulated data directly affects the characteristics of wild Pokémon that spawn around you (typically within a 64-block radius). These effects include **hidden abilities**, **shiny rates**, and **guaranteed perfect IVs**.

---

### 🎯 Hidden Ability Chance

The chance for a wild Pokémon to spawn with its **hidden ability** increases if:
- You were the **last player to KO** that species.
- Or you’ve KO’d **at least 99 Pokémon** of that species.

➡️ Default example: a **20% chance** (1 in 5) to spawn with a hidden ability if either condition is met.

---

### ✨ Shiny Rate Boost

Shiny Pokémon spawn rates are enhanced based on your **KO streaks**:

| KO Streak         | Shiny Spawn Rate |
|-------------------|------------------|
| None / <100       | 1 / 8196         |
| 100+              | 2 / 8196         |
| 300+              | 3 / 8196         |
| 500+              | 4 / 8196         |

➡️ Maintaining long KO streaks on a species gives you **better odds** for shiny encounters.

---

### 🧬 Guaranteed Perfect IVs

The number of **perfect IVs** a wild Pokémon spawns with depends on your **capture streak**:

| Capture Streak     | Guaranteed Perfect IVs |
|--------------------|------------------------|
| 5+                 | 1                      |
| 10+                | 2                      |
| 20+                | 3                      |
| 30+                | 4                      |

➡️ The more you capture the same Pokémon in a row, the better the IV quality of future spawns.

---

## 🧠 How Points Are Calculated

Behind the scenes, actions like **KOs, captures**, and **streaks** earn you **points** that are used to evaluate spawn effects:

- **KO streaks and capture streaks** award the most impactful points.
- Each booster module (Hidden Ability, Shiny, IVs) uses a separate scoring system based on these actions.

The more consistent you are with a particular species, the more likely you’ll influence its future spawns.

---

## ✅ Summary

- Keep knocking out or catching the same species to build **streaks**.
- These streaks directly improve your chances of seeing **rare, powerful, or shiny Pokémon**.
- Effects only apply to wild Pokémon spawning **near you**.
- All data is tied to your **individual player profile**.

Take advantage of these mechanics to **farm specific traits** or **hunt rare Pokémon** more effectively!
