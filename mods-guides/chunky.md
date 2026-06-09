# ⚙️ Chunky Pregenerator

## 🎯 Introduction

{% hint style="info" %}
<p align="center">
<strong>Chunky</strong> is a mod that allows you to pre-generate chunks in a Minecraft world in order to reduce lag and improve server performance during exploration.
</p>
{% endhint %}

{% hint style="success" %}
<p align="center">
By generating terrain in advance, the server no longer needs to calculate chunks in real time when players discover new areas.
</p>
{% endhint %}

---

# ✨ Features

- 🗺️ Pre-generate chunks within a defined area or radius
- ⚙️ Manual or automatic startup generation
- 📉 Significant reduction in exploration-related lag
- 🔧 Fully configurable settings

---

# 🧠 How it Works

Chunky generates the world **before players arrive**.

This means:

- terrain is already created;
- structures are already generated;
- resources are already in place.

➡️ When a player enters a pre-generated area, the server has almost nothing left to calculate live.

---

# ⌨️ Main Commands

## 📍 Define an Area

```
/chunky radius <radius>
```

{% hint style="info" %}
Defines the pre-generation radius around the starting point.
{% endhint %}

---

## ▶️ Start Generation

```
/chunky start
```

{% hint style="info" %}
Starts chunk pre-generation within the defined area.
{% endhint %}

---

## 📊 Check Progress

```
/chunky status
```

{% hint style="info" %}
Displays the current generation status and progress.
{% endhint %}

---

## ❌ Cancel Generation

```
/chunky cancel
```

{% hint style="info" %}
Immediately stops the current pre-generation process.
{% endhint %}

---

# ⚙️ Advanced Settings

Chunky allows you to configure:

- generation speed;
- number of chunks generated simultaneously;
- general settings through files located in the `config` folder.

{% hint style="warning" %}
Generating chunks too quickly may temporarily impact server performance. Adjust settings according to available resources.
{% endhint %}

---

# 💡 Best Practices

For the best results:

- ⏰ Run generation during off-peak hours.
- 📉 Start with a smaller radius, then gradually increase it.
- 🧪 Test performance before launching massive generation jobs.
- 📊 Regularly monitor progress with `/chunky status`.
- 🤖 Automate generation at server startup if needed.

---

# 🎯 Why Use Chunky?

Pre-generation helps:

- reduce lag spikes during exploration;
- improve overall server stability;
- create smoother gameplay experiences;
- minimize slowdowns caused by loading new chunks.

{% hint style="success" %}
The more your world is pre-generated, the fewer slowdowns players will experience while exploring.
{% endhint %}

---

# 🔗 Useful Resources

- [CurseForge](https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge)
- [Chunky Wiki - Guide](https://github.com/pop4959/Chunky/wiki/How-To%27s)
- [Chunky Wiki - Pregeneration](https://github.com/pop4959/Chunky/wiki/Pregeneration)

---

# 🧾 Summary

Chunky is an essential tool for servers aiming to provide smooth exploration.

By pre-generating the world ahead of time:

- ✅ less lag;
- ✅ improved stability;
- ✅ smoother exploration;
- ✅ a better experience for all players.

{% hint style="info" %}
A well pre-generated server is a more enjoyable server to explore.
{% endhint %}

---

{% hint style="success" %}
## Contact Us

<p align="center">
If you have any questions, suggestions, or changes to propose, feel free to join us on <a href="https://discord.gg/kb8NSTF45n">Discord</a> and contact <strong>@FabLeKebab</strong> directly on the server for anything related to the wiki, or <strong>@Levels</strong> for anything related to the modpack.
</p>
{% endhint %}
