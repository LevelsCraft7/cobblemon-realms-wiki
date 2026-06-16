# 🌌 Hoopa Portal

<p align="center">
During your adventures, you may come across strange portals floating in the world.
<br>
These rifts, said to have been created by <strong>Hoopa itself</strong>, provide access to unknown dungeons and dimensions… but their stability is far from guaranteed.
</p>

![Hoopa Portal](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/distortion_world/hoopa_portal_v2.png)

---

## 🌀 How It Works

Portals appear **periodically in the Overworld**, near a randomly selected player.
<br>
By default, they spawn every 10 minutes. You can modify this interval in the configuration files.

Each portal is linked to a **unique dungeon instance**, selected from the *Dungeon Pool*.
<br>
Once used, the portal transports players to that specific dungeon.

{% hint style="warning" %}
<p align="center">
Each dungeon is instanced: you are not joining a shared world, but a unique version generated for your group.
</p>
{% endhint %}

---

## ⏳ Limited Time

Dungeons are not permanent.

- ⏳ You have **15 minutes** by default inside a dimension;
- 💥 Portals eventually expire or are destroyed;
- 🚪 Players still inside are expelled when the dimensional timer ends.

Once the portal disappears, the dungeon instance is completely removed.

---

## 🎮 How to Use It

To activate a portal, **right-click its lower part**.
<br>
In most cases, a confirmation screen appears to show you the destination.

{% hint style="info" %}
<p align="center">
Always check the destination before accepting a teleportation.
</p>
{% endhint %}

✔️ If accepted:

- You are teleported into the dungeon;
- If you are the first player, world generation may cause a short loading time;
- You can leave at any time through an internal portal.

---

## 🗺️ Default Dungeon Pool

Portals can currently lead to:

- 🌍 **Sinnoh Underground**  
  Underground exploration, excavation mini-game, rare treasures, and hidden Pokémon.

- 🌀 **Distortion World**  
  Giratina's chaotic dimension featuring inverted platforms, illusion labyrinths, and battles against Distorted Pokémon.  
  → [View page](distortion_world.md)

---

## ⚙️ Configuration

Portal behavior is defined in:

`config/cobblesafari/dungeon_spawn_config.json`

### 🔧 Main Settings

- ⏱️ **Spawn interval** → `spawnIntervalSeconds` (default: 600)
- 🌀 **Portal lifetime** → `portalLifetimeMinutes` (default: 30)
- 🔘 **Enable portals** → `enabled` (true/false)

---

{% hint style="info" %}
## More Information

<p align="center">
You can find a complete description of the configuration file on the mod's official page: <a href="https://cobblesafari.maxigregrze.fr/en/addons/config_dungeon_spawn_config">dungeon_spawn_config</a>
</p>
{% endhint %}

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
