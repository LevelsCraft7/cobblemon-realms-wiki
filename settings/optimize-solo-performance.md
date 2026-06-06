

{% hint style="info" %}
<p align="center">
If you experience freezes, rollbacks, memory slowdowns, or performance issues while playing Cobblemon Realms in singleplayer, adjusting your JVM arguments can significantly improve game stability.
</p>
{% endhint %}

---

# 📋 Recommended Configuration

| Element | Recommendation |
|---|---|
| ☕ Java | Java 21 or higher |
| 💾 RAM | Minimum 8 GB |
| 💾 Recommended RAM | 10 GB |
| ⚙️ Garbage Collector | G1GC |

---

# ⚙️ Recommended JVM Arguments

Copy the following arguments into your additional Java settings:

```
-Xms10G
-Xmx10G
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100
-XX:InitiatingHeapOccupancyPercent=30
-XX:+ExplicitGCInvokesConcurrent
```

---

# 🛠️ Configuration in CurseForge

## ☝🏼 Steps

1. Open `CurseForge`.
2. Click on `⚙️ Settings`.
3. Go to `Game Specific → Minecraft`.
4. Scroll down to `Java Settings`.
5. Disable `Use System Memory Settings`.
6. Allocate between `8 and 10 GB of RAM`.
7. Paste the JVM arguments above into `Additional Java Arguments`.
8. Save and restart the modpack.

{% hint style="warning" %}
<p align="center">
CurseForge automatically adds some Java arguments. However, the last defined values for <code>-Xms</code> and <code>-Xmx</code> will take priority.
</p>
{% endhint %}

---

# 📈 What These Settings Improve

- ✅ Reduced freezes and micro-stutters
- ✅ Better memory management (GC)
- ✅ Fewer singleplayer rollbacks
- ✅ More stable gameplay sessions
- ✅ Better overall performance

---

{% hint style="info" %}
## 💡 Additional Tips

- ❌ Avoid running heavy background applications
- 🎮 Limit highly demanding shaders
- 📦 Keep your graphics drivers up to date
- 🗺️ Use Chunky to pre-generate chunks in your worlds
{% endhint %}

---

{% hint style="success" %}
<p align="center">
With Java 21 and these JVM settings, Cobblemon Realms should run smoother and more reliably, especially on advanced worlds and during long play sessions.
</p>
{% endhint %}
