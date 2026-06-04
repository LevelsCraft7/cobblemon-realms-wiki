# 📘 Guide CobbleWorkers

## 🤖 Présentation

{% hint style="info" %}
<p align="center">
CobbleWorkers permet d'assigner certaines tâches à vos Pokémon afin d'automatiser différentes activités au sein de votre base. Chaque rôle dispose de capacités spécifiques et peut contribuer à la production ou à la collecte de ressources.
</p>
{% endhint %}

<p align="center">
Cette page détaille les différents métiers disponibles ainsi que les Pokémon pouvant les exercer.
</p>

---

## ⚙️ Fonctionnement

- Placez vos Pokémon en tant que **CobbleWorkers**
- Chaque Pokémon dispose d’un ou plusieurs rôles selon son profil
- Les tâches sont exécutées automatiquement dans un rayon défini (`cobbleworkers.json`)
- Certains rôles incluent des temps de recharge (eau, lave, etc.)

---

## 🧬 Configuration personnalisée

Par défaut, la majorité des rôles étaient attribués à **Pikachu**, avec quelques exceptions comme :

- **Apitrini** pour le miel
- **Leveinard** pour les soins

Cobblemon Realms utilise une configuration personnalisée afin d'attribuer des rôles plus cohérents avec le **type**, les **capacités** ou le **lore** des Pokémon. Cette approche permet à davantage d'espèces d'avoir une utilité unique au sein de votre base.

---

## 🧑‍🌾 Rôles des Workers

### 🌱 Agriculture
- **Apricorns (Insecte)** : Insécateur, Scarhino, Rubombelle  
- **Baies (Plante)** : Germignon, Tortipouss, Ouistempo  
- **Cultures (Plante)** : Bulbizarre, Brindibou, Phyllali  
- **Netherwart (Spectre)** : Fantominus, Skelénox, Mimiqui  
- **Menthes (Fée)** : Nymphali, Tarsal, Togepi  

### ⛏️ Ressources
- **Améthyste (Roche)** : Racaillou, Onix, Tarinor  
- **Tumblestone (Acier)** : Magnéti, Galekid, Terhal  

### 🔥 Générateurs
- **Lave (Feu)** : Salamèche, Limagma, Chartor  
- **Eau (Eau)** : Axoloto, Kaiminus, Gobou  
- **Poudreuse (Glace)** : Blizzi, Stalgamin, Sorbébé  
- **Carburant (Feu)** : Poussifeu, Funécire, Chamallot  
- **Brassage (Dragon)** : Minidraco, Coupenotte, Griknot  

### 📦 Collecte
- **Miel** : Apitrini, Apireine, Teddiursa, Pikachu  
- **Pêche (Eau)** : Magicarpe, Barpau, Rémoraid  
- **Pick Up** : tout Pokémon avec le talent **Pick Up**  
- **Dive Loot** : tout Pokémon connaissant **Dive**  
- **Ramassage (Psychique)** : Abra, Tarsal, Mentali  

### 🛠️ Support
- **Soins** : Ptiravi, Leveinard, Leuphorie, Nanméouïe, Pikachu  
  → Soignent les joueurs proches via des capacités de soin (Vœu, Soin, etc.)
- **Extinction (Eau)** : Carapuce, Tiplouf, Moustillon  

---

## 💡 Conseils

{% hint style="success" %}
- Configurez les Workers via `cobbleworkers.json`
- Associez les Pokémon à leur environnement (type → logique de base)
- Spécialisez les rôles pour gagner en efficacité
- Placez des soigneurs dans les zones fréquentées
{% endhint %}
