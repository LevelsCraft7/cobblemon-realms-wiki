# 📘 Guide CobbleWorkers

## 🤖 Présentation

{% hint style="info" %}
CobbleWorkers permet d’assigner des tâches à vos Pokémon afin d’automatiser votre base.  
Chaque Pokémon possède des rôles spécifiques selon son type, son espèce ou ses capacités.
{% endhint %}

Cette page présente les rôles disponibles et les Pokémon associés.

---

## ⚙️ Fonctionnement

- Placez vos Pokémon en tant que **CobbleWorkers**
- Chaque Pokémon dispose d’un ou plusieurs rôles selon son profil
- Les tâches sont exécutées automatiquement dans un rayon défini (`cobbleworkers.json`)
- Certains rôles incluent des temps de recharge (eau, lave, etc.)

---

## 🧬 Configuration

Par défaut, certains rôles étaient attribués à des Pokémon génériques comme **Pikachu**, **Apitrini** ou **Leveinard**.

Cobblemon Realms utilise une configuration personnalisée basée sur :
- le **type**
- les **capacités**
- le **lore**

Cela permet de diversifier les Pokémon utiles en base.

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
