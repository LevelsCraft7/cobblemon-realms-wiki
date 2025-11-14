# 🚀 Optimize Solo Performance in Cobblemon Realms

If you experience **rollbacks, freezes, or poor performance** when playing Cobblemon Realms solo, adjusting your JVM arguments in the CurseForge launcher can greatly improve stability and smoothness.

---

## 💡 Recommended JVM Arguments

-Xms8G -Xmx10G -XX:+UnlockExperimentalVMOptions -XX:+UseZGC -XX:+ZGenerational
-XX:+AlwaysPreTouch -XX:+DisableExplicitGC -Djava.awt.headless=true
-XX:+UseCompressedOops -Dfile.encoding=UTF-8

These values are designed for **Java 21** and use **ZGC with Generational GC**, an advanced garbage collector built for low latency.\
They help:\
They help:\
They help:  
They help:  
They help:  
They help:  
They help:

- Reduce **lag spikes** caused by garbage collection.
- Minimize **RAM cleanup pauses**.
- Prevent most **client-side rollbacks**.

---

## 🛠 How to Apply in CurseForge

1. Open the **CurseForge app**.
2. Click the **gear icon** in the bottom-left corner (**Settings**).
3. Go to **Game Specific → Minecraft**.
4. Scroll to **Java Settings**.
5. **Disable** “Use System Memory Settings”.
6. Set the **Memory slider** to at least **8–10 GB**.
7. In **Additional Java Arguments**, paste the flags exactly as shown above (separated by spaces).
8. Save and **restart the modpack**.

> ⚠️ CurseForge automatically adds its own flags, but the **last** `-Xms` / `-Xmx` values entered will take priority.

---

## ✅ Summary

By combining **Java 21** with these optimized JVM settings, you can fix most solo performance issues in Cobblemon Realms—especially those related to memory cleanup, lag spikes, and rollback glitches.\
Enjoy smoother, more stable gameplay!\
Enjoy smoother, more stable gameplay!\
Enjoy smoother, more stable gameplay!  
Enjoy smoother, more stable gameplay! 🧭
