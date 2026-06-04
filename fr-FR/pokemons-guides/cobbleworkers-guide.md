# 📘 Guide CobbleWorkers

## 🤖 Présentation

{% hint style="info" %}
<p align="center">
CobbleWorkers permet d'assigner certaines tâches à vos Pokémon afin d'automatiser différentes activités au sein de votre base. Chaque rôle dispose de capacités spécifiques et peut contribuer à la production ou à la collecte de ressources.

Cette page détaille les différents métiers disponibles ainsi que les Pokémon pouvant les exercer.
</p>
{% endhint %}

---

## ⚙️ Fonctionnement

- Placez vos Pokémon dans le monde en tant que **CobbleWorker**
- Chaque Pokémon dispose d'un ou plusieurs **rôles de travail** selon son type ou son espèce
- Les workers effectuent automatiquement leurs tâches dans un rayon configurable via `cobbleworkers.json`
- Certains rôles possèdent un temps de recharge (génération d'eau, de lave, etc.)

---

## 🌱 Configuration personnalisée

Par défaut, la majorité des rôles étaient attribués à **Pikachu**, avec quelques exceptions comme **Apitrini** pour le miel ou **Leveinard** pour les soins.

Cobblemon Realms utilise une configuration personnalisée afin d'attribuer des rôles plus cohérents avec le **type**, les **capacités** ou le **lore** des Pokémon. Cette approche permet à davantage d'espèces d'avoir une utilité unique au sein de votre base.

---

## 🧑‍🌾 Rôles des Workers

### 🌾 Récolte & agriculture

- **Récolte d’Apricorns (Insecte)** : Insécateur, Scarhino, Rubombelle
- **Récolte de baies (Plante)** : Germignon, Tortipouss, Ouistempo
- **Récolte de cultures (Plante)** : Bulbizarre, Brindibou, Phyllali
- **Irrigation des cultures (Eau)** : Carapuce, Gobou, Psykokwak
- **Récolte de Netherwart (Spectre)** : Fantominus, Skelénox, Mimiqui
- **Récolte de menthes (Fée)** : Nymphali, Tarsal, Togepi

### ⛏️ Minage & ressources

- **Extraction d’améthyste (Roche)** : Racaillou, Onix, Tarinor
- **Extraction de Tumblestone (Acier)** : Magnéti, Galekid, Terhal

### 🔥 Générateurs

- **Génération de lave (Feu)** : Salamèche, Limagma, Chartor
- **Génération d’eau (Eau)** : Axoloto, Kaiminus, Gobou
- **Génération de poudreuse (Glace)** : Blizzi, Stalgamin, Sorbébé
- **Génération de carburant (Feu)** : Poussifeu, Funécire, Chamallot
- **Carburant pour table de brassage (Dragon)** : Minidraco, Coupenotte, Griknot

### 📦 Collecte

- **Collecte de miel** : Apitrini, Apireine, Teddiursa, Pikachu
- **Loot de pêche (Eau)** : Magicarpe, Barpau, Rémoraid
- **Génération de ramassage (Pick Up)** : Tout Pokémon possédant le talent **Pick Up**
- **Loot de plongée (Dive)** : Tout Pokémon connaissant **Dive**
- **Ramassage d’objets au sol (Psychique)** : Abra, Tarsal, Mentali

### 🛠️ Support & utilitaire

- **Soigneurs** : Ptiravi, Leveinard, Leuphorie, Nanméouïe, Pikachu  
  _Soignent les joueurs proches grâce à des capacités de soin comme Vœu, Soin ou E-Coque._

- **Extincteurs (Eau)** : Carapuce, Tiplouf, Moustillon

---

## 💡 Conseils

- Configurez le comportement des workers via le fichier `cobbleworkers.json`
- Utilisez des Pokémon adaptés à leur environnement (types Plante dans les fermes, types Feu près des fours, etc.)
- Multipliez les workers afin de spécialiser les tâches et améliorer l'efficacité de votre base
- Les Pokémon soigneurs sont particulièrement utiles dans les zones fréquentées, comme les bases ou les villages
