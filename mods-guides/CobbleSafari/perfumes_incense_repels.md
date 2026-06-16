# 🌿 Scents, Incenses, and Repels

{% hint style="info" %}
<p align="center">
<strong>Incenses</strong> and <strong>Scents</strong> allow you to influence wild Pokémon encounters in order to favor certain types or rare conditions. These items increase the probability of encountering Pokémon with specific characteristics.
</p>
{% endhint %}

{% hint style="success" %}
<p align="center">
Unlike standard Minecraft potions, using multiple scents or incenses consecutively <strong>extends the total duration</strong> instead of resetting the effect.
</p>
{% endhint %}

---

## ✨ Incenses (Shiny Bonus)

Incenses are known for increasing the chances of encountering shiny Pokémon.
<br>
They only apply to **new Pokémon spawns** around the affected player.

{% hint style="info" %}
<p align="center">
Pokémon that are already present cannot be rerolled by incense.
</p>
{% endhint %}

### 🧪 Available Tiers

- ✨ Incense → x4 (configurable default)
- 💫 Super Incense → x8
- 🌟 Hyper Incense → x12

---

### ⚠️ Usage Rules

- ❌ Incenses do not stack with each other;
- 🔁 A new incense always replaces the previous one;
- ✅ An incense can be combined with a scent;
- ✨ Effects stack between different categories.

{% hint style="warning" %}
<p align="center">
Shiny bonuses do not stack with other boost systems provided by other mods.
</p>
{% endhint %}

---

## 🌸 Scents (Rarity Bonus)

Scents increase the probability of encountering rarer Pokémon in the wild.
<br>
Like incenses, they only affect **new spawns** around the player.

### 🧴 Available Types

- 🌸 Uncommon Scent  
- 🌺 Rare Scent  
- 🌼 Ultra-Rare Scent  

Each scent increases the spawn rate of its corresponding spawn table with a x16 bonus.

---

### ⚠️ Usage Rules

- ❌ Scents do not stack with each other;
- 🔁 A new scent always replaces the previous one;
- ✅ A scent can be combined with an incense;
- ⚠️ Effects remain separate but active simultaneously.

{% hint style="info" %}
<p align="center">
The PokéNav does not display the influence of scents on encounter rates.
</p>
{% endhint %}

---

## 🚫 Repel

Repel prevents new Pokémon from spawning around you.

It does not affect:
- Pokémon that are already present;
- spawns triggered by other players.

Simple, effective… and somewhat radical.

---

{% hint style="danger" %}
<p align="center">
Using Repel + Incense + Scent at the same time is strongly discouraged.
<br>
Repel blocks spawns, completely canceling the effects of the boosts.
</p>
{% endhint %}

---

## ⚙️ Configuration

The settings for these systems are defined in:

`config/cobblesafari/encounter_boost_config.json`

### 🔧 Main Categories

- ⚙️ **Effect Settings** → `effectSettings`  
  Defines how effects work (including those from other systems such as the [Secret Base PC](secret_base_pc.md)).

- ⏱️ **Duration Settings** → `durationSettings`  
  Defines the duration of items that grant effects.

---

{% hint style="warning" %}
## Warning

<p align="center">
Some values present in the configuration file are not yet active in-game.
<br>
They will be used in future updates.
</p>
{% endhint %}

{% hint style="info" %}
## More Information

<p align="center">
You can find a complete description of the configuration file on the mod's official page: <a href="https://cobblesafari.maxigregrze.fr/en/addons/config_encounter_boost_config">Encounter_boost_config</a>
</p>
{% endhint %}

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
