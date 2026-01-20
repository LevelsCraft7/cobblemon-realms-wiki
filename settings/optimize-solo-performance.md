# 🚀 Optimize Solo Performance in Cobblemon Realms

If you experience **rollbacks, freezes, or poor performance** when playing Cobblemon Realms solo, adjusting your JVM arguments in the CurseForge launcher can greatly improve stability and smoothness.

---

## 💡 Recommended JVM Arguments

-Xms10G
-Xmx10G
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100
-XX:InitiatingHeapOccupancyPercent=30

---

## 🛠 How to Apply in CurseForge

1. Open the **CurseForge app**.
2. Click the **gear icon** in the bottom-left corner (**Settings**).
3. Go to **Game Specific → Minecraft**.
4. Scroll to **Java Settings**.
5. **Disable** “Use System Memory Settings”.
6. Set the **Memory slider** to at least **8–10 GB** max !
7. In **Additional Java Arguments**, paste the flags exactly as shown above (separated by spaces).
8. Save and **restart the modpack**.

> ⚠️ CurseForge automatically adds its own flags, but the **last** `-Xms` / `-Xmx` values entered will take priority.

---

## ✅ Summary

By combining **Java 21** with these optimized JVM settings, you can fix most solo performance issues in Cobblemon Realms—especially those related to memory cleanup, lag spikes, and rollback glitches.  
Enjoy smoother, more stable gameplay! 🧭
