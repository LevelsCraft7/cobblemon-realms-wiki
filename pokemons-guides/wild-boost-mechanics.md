# 📊 Enhanced Wild Pokémon Mechanics

## 📈 Progress Tracking

{% hint style="info" %}
<p align="center">
Some features of the modpack track your captures and battles against wild Pokémon. This page explains the different systems involved and how they work.
</p>
{% endhint %}

---

## 🧮 How does tracking work?

Each player has two separate sets of statistics:

- **KO Count & Streak**: number of times you have defeated a specific species, as well as your consecutive KO streak for that species.
- **Capture Count & Streak**: number of captures for a species, and how many times you have captured it consecutively.

For each action:

- If you **defeat or capture** a Pokémon of the same species as the previous one, your **streak continues** and the counter increases.
- If you switch species, the **streak resets** to 1 for the new species.
- KO data and capture data are **tracked separately**, allowing precise monitoring of each action.

These values are stored in your player profile and may influence future wild Pokémon spawns around you.

---

## 🔥 Effects on Wild Spawns

The data you accumulate directly affects the characteristics of wild Pokémon spawning near you (generally within a 64-block radius). These effects include **Hidden Abilities**, **Shiny rates**, and **guaranteed perfect IVs**.

---

### 🎯 Hidden Ability Chance

The chance for a wild Pokémon to spawn with its **Hidden Ability** increases if:

- You are the **last player** who defeated that species.
- Or you have defeated **at least 99 Pokémon** of that species.

{% hint style="success" %}
➡️ Default bonus: **20% chance** (1 in 5) if one of these conditions is met.
{% endhint %}

---

### ✨ Increased Shiny Rates

Shiny encounter rates increase depending on your **KO streak**:

| KO Streak | Shiny Rate |
|----------|------------|
| None / <100 | 1 / 8196 |
| 100+ | 2 / 8196 |
| 300+ | 3 / 8196 |
| 500+ | 4 / 8196 |

{% hint style="success" %}
➡️ Maintaining a long KO streak on a species increases your **chance of finding shinies**.
{% endhint %}

---

### 🧬 Guaranteed Perfect IVs

The number of **guaranteed perfect IVs** depends on your **capture streak**:

| Capture Streak | Guaranteed Perfect IVs |
|---------------|------------------------|
| 5+ | 1 |
| 10+ | 2 |
| 20+ | 3 |
| 30+ | — |

{% hint style="success" %}
💡 The more you capture the same species consecutively, the better the IV quality of future encounters.
{% endhint %}

---

### 🧠 How Points Are Calculated

Behind the scenes, your actions (KOs, captures, streaks) generate **points**, which are used to determine spawn bonuses.

- **KO streaks and capture streaks** provide the most impactful points.
- Each bonus system (Hidden Abilities, shiny rates, IVs) uses different calculations based on those points.

The more consistent you are with a specific species, the more you influence its future spawns.

---

## ✅ Summary

- 🧩 Defeat or capture the same species repeatedly to build **streaks**
- 📈 Streaks increase your chances of finding **rare, stronger, or shiny Pokémon**
- 📍 Effects only apply to nearby wild Pokémon
- 👤 All progress is tied to your **individual player profile**

Use these mechanics to **hunt more efficiently** or **optimize the Pokémon you are targeting**!

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
