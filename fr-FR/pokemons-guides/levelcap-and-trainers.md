# 🧗 Vue d'ensemble de la progression du Dresseur

Cobblemon Realms propose un système de progression structuré basé sur les **Cartes de Dresseur**, les **Dresseurs Clés**, et les **Séries de Dresseurs**.  
Ce système encourage l'exploration, la stratégie et une montée en puissance progressive à travers des défis de plus en plus complexes.

---

## 📊 Système de Cap de Niveau

Chaque joueur possède un **cap de niveau personnel**, qui commence à **niveau 50** (ou plus si votre premier Dresseur Clé est plus fort).

### ⚙️ Effets du Cap de Niveau

- 🛑 Les Pokémon à votre cap de niveau ou au-dessus **ne gagnent plus d'expérience**.
- 🚫 Les dresseurs **refuseront de vous affronter** si un Pokémon de votre équipe dépasse votre cap.
- 🎯 La **difficulté des dresseurs proches** s'adapte à votre équipe, mais ne dépassera jamais votre cap.

### 🧭 Comment augmenter votre cap

Pour augmenter votre cap, vous devez vaincre des **Dresseurs Clés** dans un ordre précis.  
Utilisez votre **Carte de Dresseur** et l’onglet **Avancements** pour suivre votre progression et vos objectifs à venir.

---

## 🔍 Dresseurs Clés & Suivi

Les Dresseurs Clés sont essentiels pour progresser — les vaincre permet d'augmenter votre cap de niveau et de débloquer du contenu plus avancé.

- 🌍 **Apparition** : Ils apparaissent dans des biomes spécifiques indiqués sur votre Carte de Dresseur.
- 🧭 **Système de suivi** :
  - La carte **brille** lorsqu’un Dresseur Clé est actif.
  - Une **flèche holographique** indique sa position.
  - Si le dresseur est dans une autre dimension, la flèche **tourne aléatoirement**.
- 🔄 **Ordre obligatoire** : Vous devez les vaincre dans le bon ordre, selon leur série.
- 🎯 **Apparition accélérée** : Avoir un Pokémon au cap de niveau dans votre équipe augmente leur taux d’apparition.
- 🧠 **Réapparition réduite** : Les Dresseurs Clés déjà vaincus ont moins de chances de réapparaître.

---

## 🏆 Débloquer les Champions d’Arène

Les Champions d’Arène et autres défis supérieurs sont débloqués en battant des Dresseurs Clés.

- 🥇 Vaincre un **nombre requis** de Dresseurs Clés d'une série débloque son Champion.
- 🧩 Certains défis avancés (Ligue, Boss d'équipe) demandent de **compléter plusieurs séries** ou d’en vaincre entièrement une.
- 📈 Suivez votre parcours avec la **Carte de Dresseur** et l’onglet **Avancements**.

La progression est **non linéaire** — explorez, affrontez et débloquez à votre rythme !

---

## 🤝 Association des Dresseurs

L’**Association des Dresseurs** est un PNJ villageois spécial qui permet aux joueurs de démarrer leur première série de défis.

- 🧭 Elle **apparaît à proximité** d’un joueur qui :
  - A une **Carte de Dresseur** (en main ou dans l’inventaire), **et**
  - **N’a commencé aucune série de dresseur**.

- 🗺️ Lorsqu’elle est proche, votre Carte de Dresseur :
  - **Brillera**, et  
  - Affichera une **flèche directionnelle** pointant vers l’Association.

Ce PNJ vous permet d’accéder à de nombreuses **séries de dresseurs**, avec leurs propres thèmes, niveaux de difficulté et chemins de progression.

---

### 📋 Séries de Dresseurs disponibles

#### 🟢 Séries indépendantes

Aucune condition requise.

1. **Pokémon Adventures** *(5/10)*  
   Affrontez les héros du manga Pokémon Adventures.  
   Séries à embranchements avec personnages déblocables.  
   Combats optionnels : Black, White, Blake et Whitley (v1.7+).

2. **Défi des Arènes de Sinnoh** *(4/10)*  
   Combats doubles contre les Champions de Sinnoh.

3. **Team Aqua** *(4/10)*  
   Combattez la Team Aqua dans l’Overworld.

4. **Team Magma** *(4/10)*  
   Affrontez la Team Magma dans le Nether.

5. **Défi des Arènes d’Unys** *(5/10)*  
   Vainquez les Champions de la région d’Unys.

6. **Défi des Arènes de Hoenn** *(3/10)*  
   Battez les Champions de Hoenn.

7. **Défi des Arènes de Kalos** *(6/10)*  
   Équipes de niveau 90+ avec Méga-Évolutions.  
   (Les Pokémon arrivent déjà méga-évolués pour des raisons techniques.)

---

#### 🔒 Séries avec prérequis

8. **Team Plasma** *(5/10)*  
   ➤ Requiert : *Défi d’Unys*

9. **Défi de la Ligue d’Unys** *(5/10)*  
   ➤ Requiert : *Défi d’Unys*

10. **Défi de la Ligue de Hoenn** *(6/10)*  
    ➤ Requiert : *Défi de Hoenn*

11. **Défi de la Ligue de Kalos** *(6/10)*  
    ➤ Requiert : *Défi de Kalos*

12. **Sept Sages de la Team Plasma** *(6/10)*  
    ➤ Requiert : *Team Plasma & Ligue d’Unys*

13. **Défi Unys (NB2)** *(6/10)*  
    ➤ Requiert : *Défi + Ligue d’Unys*

14. **Neo Team Plasma** *(6/10)*  
    ➤ Requiert : *Sept Sages de la Team Plasma*  
    Équipes compétitives avec EV/IV max.

---

## 📈 Graphique de progression

Vous pouvez visualiser votre avancée via un **graphe de progression des séries**.

### 🛠️ Commande à utiliser

`/rctmod player get progress <pseudo> graph include_defeated include_optionals`


Ce graphe montre :
- ✔️ Séries terminées
- 🟡 Séries optionnelles
- 🔒 Séries verrouillées
- 🔁 Dépendances entre séries

Un outil idéal pour planifier votre prochaine étape !

---

### 🎯 Avancements

Chaque série inclut ses propres **avancements** (certains sont cachés).  
Ils vous aident à suivre votre parcours, débloquer des récompenses, et savoir quoi faire ensuite.

Consultez régulièrement l’onglet **Avancements** en jeu.

---

## 💡 Conseils de progression

- 🧠 Entraînez une **équipe variée** pour ne pas bloquer au cap de niveau.  
- 🎯 **Affrontez des Dresseurs** dès que possible pour débloquer du contenu.  
- 📖 Utilisez souvent votre **Carte de Dresseur** et l’onglet **Avancements** — ce sont vos meilleurs outils.

---

## ℹ️ En savoir plus

Consultez la documentation officielle du mod *Radical Cobblemon Trainers* :

🔗 [https://srcmc.gitlab.io/rct/docs/0.13/](https://srcmc.gitlab.io/rct/docs/0.13/)
