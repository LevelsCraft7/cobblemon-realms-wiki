# ⚙️ Tutoriel Chunky

## 🎯 Introduction

Chunky est un mod conçu pour **pré-générer les chunks Minecraft**, afin de réduire les lags et améliorer les performances globales lors de l’exploration. En générant les chunks à l’avance, le serveur rencontre beaucoup moins de ralentissements, notamment lors des sessions d’exploration intensive ou à forte activité.

➡️ Le principe est simple : tout est généré avant que les joueurs n’arrivent.

---

## 🚀 Fonctionnalités

- 🗺️ Génération anticipée des chunks sur une zone ou un rayon défini  
- ⚙️ Lancement manuel ou automatique au démarrage du serveur  
- 📉 Réduction significative des lags en exploration  
- 🔧 Paramètres ajustables (vitesse, rayon, etc.)

---

## 🧠 Comment ça fonctionne

Chunky génère le monde **avant l’arrivée des joueurs**.

Cela signifie :

- Le terrain est déjà créé  
- Les structures sont déjà générées  
- Les ressources sont déjà en place  

➡️ Quand un joueur arrive dans une zone, le serveur n’a rien à calculer en direct.

---

## ⌨️ Commandes & utilisation

### 📍 Définir une zone

`/chunky radius <rayon>`

Définit le rayon de pré-génération autour du spawn.

---

### ▶️ Lancer la génération

`/chunky start`

Démarre la pré-génération des chunks dans la zone définie.

---

### 📊 Vérifier l’état

`/chunky status`

Affiche la progression et l’état actuel de la génération.

---

### ❌ Annuler

`/chunky cancel`

Stoppe la génération en cours.

---

## ⚙️ Paramètres avancés

- Ajustement de la vitesse de génération  
- Limite de chunks générés simultanément  
- Configuration via les fichiers du dossier `config`  

---

## 💡 Conseils & bonnes pratiques

- ⏰ Lancer la génération pendant les heures creuses  
- 📉 Commencer avec un petit rayon puis augmenter progressivement  
- 🧪 Tester les performances avant de lancer une grande génération  
- 📊 Surveiller régulièrement avec `/chunky status`  
- 🤖 Automatiser au démarrage du serveur si possible  

---

## 🔗 Ressources supplémentaires

- CurseForge : https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge  
- Wiki Chunky (Guides) : https://github.com/pop4959/Chunky/wiki/How-To%27s  
- Wiki Chunky (Pregeneration) : https://github.com/pop4959/Chunky/wiki/Pregeneration  

---

## 🧾 Conclusion

Utiliser Chunky Pregenerator permet d’améliorer fortement les performances d’un serveur Minecraft.

En pré-générant le monde :

- moins de lags  
- plus de stabilité  
- meilleure fluidité en exploration  

➡️ Un serveur bien préparé = une expérience de jeu plus propre et plus agréable.
