# 📊 Mécanismes améliorés des Pokémon sauvages

## 📈 Suivi de progression

{% hint style="info" %}
<p align="center">
Certaines fonctionnalités du modpack suivent vos captures et vos combats contre les Pokémon sauvages. Cette page présente les différents systèmes concernés et leur fonctionnement.
</p>
{% endhint %}

---

## 🧮 Comment fonctionne le suivi ?

Chaque joueur possède deux ensembles de statistiques distinctes :

- **KO Count & Streak** : nombre de fois où un joueur a mis K.O. une espèce spécifique, ainsi que le nombre de K.O. consécutifs sur cette espèce.
- **Compteur de captures et série** : nombre de captures d’une espèce, et nombre de fois consécutives où elle a été capturée.

Pour chaque action :

- Si vous **mettez K.O. ou capturez** un Pokémon de la même espèce que le précédent, votre **série continue** et le compteur augmente.
- Si vous changez d’espèce, la **série est réinitialisée** à 1 pour la nouvelle espèce.
- Les données de K.O. et de captures sont **suivies séparément**, permettant un suivi précis de chaque action.

Ces données sont enregistrées dans votre profil joueur et peuvent influencer les apparitions futures de Pokémon sauvages autour de vous.

---

## 🔥 Effets sur les apparitions

Les données que vous accumulez affectent directement les caractéristiques des Pokémon sauvages qui apparaissent autour de vous (généralement dans un rayon de 64 blocs). Ces effets incluent les **talents cachés**, les **taux de shiny**, et les **IV parfaits garantis**.

---

### 🎯 Chance d’avoir un Talent Caché

La probabilité qu’un Pokémon sauvage apparaisse avec son **talent caché** augmente si :

- Vous êtes le **dernier joueur** à avoir mis K.O. cette espèce.
- Ou vous avez mis K.O. **au moins 99 Pokémon** de cette espèce.

{% hint style="success" %}
➡️ Par défaut : **20 % de chance** (1 sur 5) si une des conditions est remplie.
{% endhint %}

---

### ✨ Augmentation du taux de Shiny

Les taux d’apparition de Pokémon shiny augmentent selon votre **série de K.O.** :

| KO Streak | Taux de Shiny |
|----------|--------------|
| Aucune / <100 | 1 / 8196 |
| 100+ | 2 / 8196 |
| 300+ | 3 / 8196 |
| 500+ | 4 / 8196 |

{% hint style="success" %}
➡️ Garder une longue série de K.O. sur une espèce augmente vos **chances de rencontrer un shiny**.
{% endhint %}

---

### 🧬 IV Parfaits Garantis

Le nombre d’**IV parfaits garantis** pour un Pokémon sauvage dépend de votre **série de captures** :

| Capture Streak | IV Parfaits Garantis |
|---------------|----------------------|
| 5+ | 1 |
| 10+ | 2 |
| 20+ | 3 |
| 30+ | — |

{% hint style="success" %}
💡 Plus vous capturez la même espèce à la suite, meilleure sera la qualité des IV des prochaines apparitions.
{% endhint %}

---

### 🧠 Comment les points sont calculés

En arrière-plan, vos actions (K.O., captures, séries) vous font gagner des **points**, utilisés pour évaluer les effets sur les apparitions :

- Les **séries de K.O. et de captures** rapportent les points les plus influents.
- Chaque système de bonus (talent caché, shiny, IV) utilise une méthode de calcul différente basée sur ces points.

Plus vous êtes cohérent avec une espèce particulière, plus vous influencez ses futures apparitions.

---

## ✅ Résumé

- 🧩 K.O. ou captures d’une même espèce pour créer des **séries**
- 📈 Les séries augmentent vos chances de Pokémon **rares, puissants ou shiny**
- 📍 Les effets s’appliquent uniquement aux Pokémon sauvages proches
- 👤 Toutes les données sont liées à votre **profil joueur individuel**

Utilisez ces mécaniques pour **chasser efficacement** ou **optimiser les caractéristiques** des Pokémon que vous ciblez !
