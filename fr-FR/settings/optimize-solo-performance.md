## ⚡ Optimiser vos perfs 

{% hint style="info" %}
<p align="center">
Si vous rencontrez des freezes, rollbacks, ralentissements mémoire ou des problèmes de performances en solo sur Cobblemon Realms, ajuster les arguments JVM peut améliorer significativement la stabilité du jeu.
</p>
{% endhint %}

---

# 📋 Configuration recommandée

| Élément | Recommandation |
|---|---|
| ☕ Java | Java 21 ou supérieur |
| 💾 RAM | 8 Go minimum |
| 💾 RAM conseillée | 10 Go |
| ⚙️ Garbage Collector | G1GC |

---

# ⚙️ Arguments JVM recommandés

Copiez les arguments suivants dans les paramètres Java supplémentaires :

```
-Xms10G
-Xmx10G
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100
-XX:InitiatingHeapOccupancyPercent=30
-XX:+ExplicitGCInvokesConcurrent
```

---

# 🛠️ Configuration dans CurseForge

## ☝🏼 Étapes

1. Ouvrez `CurseForge`.
2. Cliquez sur `⚙️ Paramètres`.
3. Rendez-vous dans `Game Specific → Minecraft`.
4. Descendez jusqu'à `Java Settings`.
5. Désactivez `Use System Memory Settings`.
6. Allouez entre `8 et 10 Go de RAM`.
7. Collez les arguments JVM ci-dessus dans `Additional Java Arguments`.
8. Sauvegardez puis redémarrez le modpack.

{% hint style="warning" %}
<p align="center">
CurseForge ajoute automatiquement certains arguments Java. Les dernières valeurs définies pour <code>-Xms</code> et <code>-Xmx</code> restent toutefois prioritaires.
</p>
{% endhint %}

---

# 📈 Ce que ces réglages améliorent

- ✅ Réduction des freezes et micro-lags
- ✅ Meilleure gestion de la mémoire (GC)
- ✅ Moins de rollbacks en solo
- ✅ Sessions de jeu plus stables
- ✅ Meilleures performances globales

---

{% hint style="info" %}
## 💡 Conseils complémentaires

- ❌ Évitez les applications gourmandes en arrière-plan
- 🎮 Limitez les shaders très exigeants
- 📦 Maintenez vos pilotes graphiques à jour
- 🗺️ Utilisez Chunky pour pré-générer les chunks de vos mondes
{% endhint %}

---

{% hint style="success" %}
<p align="center">
Avec Java 21 et ces réglages JVM, Cobblemon Realms devrait être plus fluide et plus stable, notamment sur les mondes avancés et lors des longues sessions de jeu.
</p>
{% endhint %}
