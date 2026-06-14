# ⌨️ CobbleSafari Commands

{% hint style="info" %}
<p align="center">
This page lists the various commands added by <strong>CobbleSafari</strong>, allowing you to manage the Safari Dimension, Hoopa Portals, traders, and several other features of the mod.
</p>
{% endhint %}

{% hint style="warning" %}
<p align="center">
This page is mainly intended for server administrators and owners.
</p>
{% endhint %}

---

# 🔄 Configuration Management

These commands allow you to reload or reset certain CobbleSafari systems.

## `/cobblesafari refresh`

```
/cobblesafari refresh
```

ℹ️ Reloads the mod's configuration files without restarting the server.

---

## `/cobblesafari reset safari`

```
/cobblesafari reset safari
```

ℹ️ Resets the Safari Dimension.

---

## `/cobblesafari reset dungeon`

```
/cobblesafari reset dungeon
```

ℹ️ Resets dungeons and removes active portals.

{% hint style="danger" %}
<p align="center">
Dungeons cannot be reset while players are still inside them.
</p>
{% endhint %}

---

# 🤝 Trader Management

Allows you to spawn CobbleSafari traders.

## `/cobblesafari summon`

```
/cobblesafari summon <name> <variant>
```

ℹ️ Spawns a trader at your current position.

## `/cobblesafari summon_template`

```
/cobblesafari summon_template <name> <variant>
```

ℹ️ Spawns a template trader intended for structures.

---

# ⏳ Timer Management

## Safari

```
/cobblesafari timer safari add <player> <seconds>
```

ℹ️ Adds time to a player's Safari timer.

```
/cobblesafari timer safari remove <player> <seconds>
```

ℹ️ Removes time from a player.

```
/cobblesafari timer safari set <player> <seconds>
```

ℹ️ Sets the remaining time.

```
/cobblesafari timer safari get <player>
```

ℹ️ Displays the remaining time.

```
/cobblesafari timer safari toggle <player>
```

ℹ️ Enables or disables the timer bypass.

---

## Custom Dimensions

```
/cobblesafari timer dimension set <player> <seconds> <dimension>
```

ℹ️ Modifies the remaining time for a configured dimension.

---

# 🌀 Hoopa Portals and Dungeons

## Spawn a portal

```
/cobblesafari dungeon spawn
```

ℹ️ Creates a Hoopa Portal near the player.

## View active portals

```
/cobblesafari dungeon list
```

ℹ️ Displays all currently active portals.

## Display registered dimensions

```
/cobblesafari dungeon dimensions
```

ℹ️ Displays the available dungeon dimensions and their configured durations.

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or modifications to propose, feel free to join our <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
