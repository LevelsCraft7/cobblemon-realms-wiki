# ⛏️ Les Souterrains de Sinnoh

{% hint style="info" %}
<div align="center">
Après avoir traversé un étrange portail, vous voilà dans les **Souterrains de Sinnoh** ! Sous la surface s'étend un immense réseau de galeries oubliées renfermant trésors, fossiles, sphères mystérieuses et anciennes bases secrètes abandonnées. Entre les mini-jeux d'excavation, les cachettes Pokémon et les rencontres avec d'autres explorateurs, chaque expédition réserve son lot de surprises.
</p>
{% endhint %}

> 💡 **Astuce :** certains fossiles extrêmement rares peuvent même garantir l'obtention d'un **Pokémon chromatique**.

![Mini-jeu d'excavation](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/excavation.png)

---

## 🚪 Comment y accéder ?

Les Souterrains de Sinnoh ne sont accessibles qu'à travers un **Portail de Hoopa**.

Si vous êtes suffisamment chanceux, la destination du portail pourra être les Souterrains. L'écran de confirmation indique toujours la destination avant la téléportation.

Une fois à l'intérieur :

- ❌ Impossible de casser des blocs ;
- ❌ Impossible d'en placer ;
- ⏳ Temps limité à **15 minutes** par défaut.

{% hint style="warning" %}
<div align="center">
Les Souterrains sont une dimension temporaire.
  
Une fois le portail disparu, tous les joueurs encore présents sont automatiquement expulsés.
</div>
{% endhint %}

Comme toutes les dimensions spéciales, ces paramètres peuvent être modifiés via :

- `Dimensional Restrictions`
- `Dimensional Timer`

---

# ⛏️ Mini-jeu d'excavation

En parcourant les galeries, vous remarquerez parfois des reflets inhabituels sur certaines parois.
<br>
Ces emplacements spéciaux, appelés **sites d'excavation**, apparaissent aléatoirement dans les murs des tunnels.
<br>
Un simple clic droit sur la paroi permet de commencer l'excavation.

*Qui sait ce qui se cache derrière cette couche de roche ?*

---

## 🎮 Comment jouer ?

Le fonctionnement est directement inspiré du mini-jeu des Souterrains de Pokémon Diamant, Perle et Platine.

Votre objectif est simple : déterrer les trésors cachés avant que le mur ne s'effondre.

Pour cela, vous disposez de deux outils :

- ⛏️ **La Pioche**, précise mais lente ;
- 🔨 **Le Marteau**, plus puissant mais beaucoup plus risqué.

Chaque coup retire une partie de la terre et révèle progressivement :

- 💎 des trésors ;
- 🪨 des amas de fer ;
- 🟫 différentes couches de roche.

{% hint style="info" %}
<div align="center">
Un objet n'est récupéré que si l'intégralité de son dessin est visible.

Le moindre morceau encore recouvert est perdu.
</div>
{% endhint %}

---

## ⚠️ Stabilité du mur

Chaque coup réduit progressivement la stabilité de la paroi.

Les fissures visibles en haut de l'écran vous permettent d'estimer son état :

- plus elles progressent vers la gauche ;
- plus l'effondrement est proche.

Le Marteau :

- consomme davantage de stabilité ;
- applique une pénalité lorsqu'il est utilisé trop tôt.

Les amas de fer sont eux aussi dangereux et provoquent une perte supplémentaire de stabilité.

{% hint style="danger" %}
<div align="center">
Lorsque la stabilité atteint zéro, le mur s'effondre.

Le mini-jeu se termine immédiatement.
</div>
{% endhint %}

---

## 💎 Trésors

Chaque trésor possède :

- une forme unique ;
- une taille différente ;
- un poids plus ou moins élevé.

Certains objets sont très communs, tandis que d'autres sont extrêmement rares.
<br>
La liste complète des récompenses disponibles est consultable sur la page :

👉 ![Liste des Trésors des Souterrains]()

<details>

<summary>🚫 Zone anti-fun (détails techniques)</summary>

Les probabilités exactes, le poids des objets et les mécaniques internes du mini-jeu peuvent être consultés ici Mais honnêtement ? L'expérience est bien plus amusante lorsqu'on découvre les trésors par soi-même.

</details>

---

# 🥾 Randonneurs

Même sous terre, vous n'êtes jamais totalement seul...

Les **Randonneurs** parcourent eux aussi les galeries à la recherche de richesses.

La plupart proposent des échanges contre vos sphères, tandis que certains rachètent directement les trésors découverts lors de vos excavations.

{% hint style="info" %}
<div align="center">
Ne sous-estimez jamais les sphères.

Elles valent bien plus qu'elles n'en ont l'air.
</div>
{% endhint %}

---

# 🌿 Cachettes Pokémon

Les **Cachettes Pokémon** sont des zones spéciales utilisant les spawners de **Cobblemon Trial Edition**.
<br>
Ces cavernes isolées abritent différents Pokémon que vous pourrez combattre ou capturer.
<br>
Vaincre tous les Pokémon présents permet d'obtenir diverses récompenses.

{% hint style="warning" %}
<div align="center">
Sans Cobblemon Trial Edition, aucun Pokémon n'apparaîtra.

La grotte restera toutefois entièrement explorable.
</div>
{% endhint %}

---

# 🏠 Bases secrètes abandonnées

Certaines anciennes bases semblent avoir été désertées depuis près de vingt ans.

Les décorations sont toujours là.
<br>
Les meubles n'ont pas bougé.
<br>
Et les drapeaux flottent encore silencieusement...

Si vous apercevez une étrange ouverture dans un mur, prenez le temps d'aller voir : une ancienne base secrète se cache peut-être derrière.

Vous pourrez alors récupérer le **drapeau** laissé sur le PC et l'utiliser dans votre propre **PC de Base Secrète**.

---

# ⚙️ Configuration

Les restrictions de la dimension (objets interdits, combats autorisés, etc.) sont définies dans :
<br>
- `Dimensional Restrictions`

Le système de téléportation ainsi que les minuteries sont quant à eux définis dans :
<br>
- `Dimensional Timer`

{% hint style="info" %}
<div align="center">
Le détail complet de ces fichiers est disponible dans les pages de configuration correspondantes.
</div>
{% endhint %}
