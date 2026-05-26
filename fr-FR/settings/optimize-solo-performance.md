# Optimiser les performances en solo dans Cobblemon Realms

Si vous rencontrez des **rollbacks, des freezes ou de mauvaises performances** en jouant a Cobblemon Realms en solo, ajuster les arguments JVM dans CurseForge peut nettement ameliorer la stabilite du jeu.

---

## Arguments JVM recommandes

```
-Xms10G
-Xmx10G
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100
-XX:InitiatingHeapOccupancyPercent=30
-XX:+ExplicitGCInvokesConcurrent
```

---

## Comment les appliquer dans CurseForge

1. Ouvrez l'application **CurseForge**.
2. Cliquez sur l'icone **engrenage** en bas a gauche pour ouvrir les **parametres**.
3. Allez dans **Game Specific > Minecraft**.
4. Descendez jusqu'a **Java Settings**.
5. Desactivez **Use System Memory Settings**.
6. Reglez le curseur de memoire sur **8 a 10 Go minimum**.
7. Dans **Additional Java Arguments**, collez exactement les arguments ci-dessus en les separant par des espaces.
8. Sauvegardez puis redemarrez le modpack.

> CurseForge ajoute automatiquement certains arguments Java, mais les dernieres valeurs `-Xms` et `-Xmx` renseignees restent prioritaires.

---

## Resumé

En combinant **Java 21** avec ces reglages JVM, vous pouvez corriger une grande partie des problemes de performances en solo dans Cobblemon Realms, notamment les pics de lag, les soucis de nettoyage memoire et certains rollbacks.

Le résultat attendu est un jeu plus fluide et plus stable.

---

# ⚡ Optimiser les performances en solo

Si vous rencontrez des :

- ❄️ Freezes
- 🔁 Rollbacks
- 📉 Chutes de FPS
- 🧠 Ralentissements mémoire
- ⏳ Temps de chargement élevés

...sur **Cobblemon Realms** en solo, ajuster les arguments JVM peut améliorer nettement la stabilité du jeu.

---

# 🧩 Configuration recommandée

## ☕ Java

Utilisez impérativement :

- **Java 21 ou plus**

---

## 💾 RAM recommandée

Allouez au minimum :

- **8 Go de RAM**
- idéalement **10 Go** pour une meilleure stabilité

---

# ⚙️ Arguments JVM recommandés

Copiez exactement ceci dans les arguments Java supplémentaires :

```
-Xms10G
-Xmx10G
-XX:+UseG1GC
-XX:MaxGCPauseMillis=100
-XX:InitiatingHeapOccupancyPercent=30
-XX:+ExplicitGCInvokesConcurrent
```

---

# 🛠️ Comment appliquer ces réglages dans CurseForge

## 1️⃣ Ouvrir les paramètres CurseForge

- Lancez **CurseForge**
- Cliquez sur l’icône ⚙️ en bas à gauche

---

## 2️⃣ Accéder aux paramètres Minecraft

Allez dans :

```
Game Specific → Minecraft
```

---

## 3️⃣ Configurer la mémoire

Dans la section **Java Settings** :

- désactivez :
  
```
Use System Memory Settings
```

- réglez ensuite la mémoire sur :

```
8 à 10 Go minimum
```

---

## 4️⃣ Ajouter les arguments JVM

Dans :

```text
Additional Java Arguments
```

Collez les arguments précédents en les séparant par des espaces.

---

## 5️⃣ Redémarrer le modpack

Une fois les modifications appliquées :

- Sauvegardez les paramètres
- Redémarrez complètement le jeu

---

# 📌 Ce que ces réglages améliorent

Ces paramètres permettent notamment de :

- ✅ réduire les freezes
- ✅ limiter les micro-lags
- ✅ améliorer le nettoyage mémoire (GC)
- ✅ réduire certains rollbacks en solo
- ✅ stabiliser les longues sessions de jeu
- ✅ améliorer les performances générales du modpack

---

# ⚠️ Important

> CurseForge ajoute déjà certains arguments Java automatiquement.

Cependant :

- les dernières valeurs `-Xms` et `-Xmx` renseignées restent prioritaires

---

# 🧠 Conseils supplémentaires

Pour de meilleures performances :

- ❌ Évitez les applications lourdes en arrière-plan
- 🎮 Limitez les shaders trop exigeants
- 📦 Gardez vos drivers graphiques à jour
- 🗺️ Pré-générez les chunks avec Chunky si vous jouez longtemps sur le même monde

---

# ✅ Résumé rapide

| Élément | Recommandation |
|---|---|
| ☕ Java | Java 21+ |
| 💾 RAM | 8–10 Go |
| ⚙️ GC | G1GC |
| 🎮 Usage conseillé | Solo longue durée |
| 🧩 Effet principal | Jeu plus fluide et stable |

Avec ces réglages, **Cobblemon Realms** devrait être nettement plus agréable à jouer en solo, surtout sur les longues sessions ou les mondes avancés.
