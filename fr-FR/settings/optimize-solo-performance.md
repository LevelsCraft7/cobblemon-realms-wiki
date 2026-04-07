# Optimiser les performances en solo dans Cobblemon Realms

Si vous rencontrez des **rollbacks, des freezes ou de mauvaises performances** en jouant a Cobblemon Realms en solo, ajuster les arguments JVM dans CurseForge peut nettement ameliorer la stabilite du jeu.

---

## Arguments JVM recommandes

```text
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

## Resume

En combinant **Java 21** avec ces reglages JVM, vous pouvez corriger une grande partie des problemes de performances en solo dans Cobblemon Realms, notamment les pics de lag, les soucis de nettoyage memoire et certains rollbacks.

Le resultat attendu est un jeu plus fluide et plus stable.
