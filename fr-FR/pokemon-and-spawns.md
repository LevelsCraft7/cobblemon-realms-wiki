# 🐾 Pokémon et apparitions

{% hint style="info" %}
<p align="center">
<strong>Cobblemon Realms</strong> utilise le datapack personnalisé <strong>Biome Expanded Spawns v6.0</strong> afin de proposer des rencontres cohérentes, variées et adaptées à chaque environnement du modpack. Les apparitions des Pokémon peuvent dépendre des biomes, des dimensions, de l’heure, de la météo, de la lumière, des structures, des blocs à proximité, de l’altitude et de nombreuses autres conditions du monde.
</p>
{% endhint %}

---

## 📚 Ce que couvre ce guide

| 📌 Sujet | 📋 Contenu |
|:---:|---|
| 🌍 Zones d’apparition | Overworld, Nether, End, Aether et The Otherside |
| 🧭 Règles environnementales | Biomes, tags de biome, altitude, lumière, météo et heure |
| 🏛️ Rencontres spéciales | Structures, blocs à proximité, pêche et autres conditions |
| ✨ Rareté | Rencontres communes, peu communes, rares et Ultra Rares |
| 🔎 Outils de recherche | Méthodes en jeu et sur Discord pour trouver des Pokémon |

---

## 🌍 Fonctionnement du système d’apparition

Un Pokémon n’est pas associé à un seul biome. Chaque espèce peut posséder plusieurs règles d’apparition indépendantes, lui permettant d’apparaître dans différents environnements, à différents niveaux ou sous différentes conditions.

Par exemple, un même Pokémon peut avoir :

- une apparition commune en forêt pendant la journée
- une apparition plus rare la nuit dans un autre biome
- une rencontre exclusive à une structure
- une apparition Ultra Rare dans une dimension spéciale

{% hint style="warning" %}
Un biome ne garantit pas toujours à lui seul qu’un Pokémon puisse apparaître. L’heure, la météo, le niveau de lumière, l’altitude, les blocs à proximité, les structures et la position d’apparition peuvent également être requis.
{% endhint %}

---

## 🗺️ Principales zones d’apparition

| Monde ou dimension | Rôle général dans le système d’apparition |
|---|---|
| 🌎 **Overworld** | Monde de chasse principal, avec des rencontres réparties entre les biomes naturels, les grottes, les océans, les structures et les terrains modifiés |
| 🔥 **Nether** | Rencontres liées au feu, à la lave, aux fossiles, aux ruines et aux structures, avec plusieurs espèces rares |
| 🌌 **End** | Rencontres rares, inhabituelles et late-game dans les biomes, îles et structures de l’End |
| ☁️ **The Aether** | Vastes groupes personnalisés dans les quatre biomes Skyroot, avec des starters, fossiles, Pokémon Paradoxes, Ultra-Chimères et Pokémon légendaires |
| 🌑 **The Otherside** | Rencontres Spectre, Ténèbres, Dragon, Psy et late-game dans les quatre biomes de Deeper and Darker |

### 📖 Guides des dimensions

- [☁️ Guide des apparitions de l’Aether](mods-guides/worlds_and_dimensions/aether.md)
- [🌑 Guide des apparitions de The Otherside](mods-guides/worlds_and_dimensions/deeper_and_darker.md)

{% hint style="info" %}
Les guides dédiés aux dimensions contiennent les listes complètes des rencontres biome par biome, avec les niveaux Ultra Rares et les conditions importantes.
{% endhint %}

---

## 🧭 Biomes et tags de biome

Le datapack organise principalement les environnements à l’aide de tags de biome tels que :

- `#cobblemon:is_forest`
- `#cobblemon:is_ocean`
- `#cobblemon:is_cave`
- `#cobblemon:is_mountain`
- `#cobblemon:is_floral`
- `#cobblemon:is_otherside`
- `#aether:is_aether`

Un tag de biome peut regrouper des biomes Vanilla et des biomes moddés compatibles sous une même catégorie environnementale. Des zones similaires peuvent ainsi accueillir des Pokémon adaptés sans devoir configurer chaque biome séparément dans chaque fichier d’apparition.

⮕ Consultez la [Référence des tags de biome](pokemons-guides/biome-tags-reference.md) pour afficher les tags et les biomes pris en charge par le modpack.

---

## ⚙️ Conditions pouvant influencer une apparition

<details>
<summary><strong>🌤️ Heure, météo et phases lunaires</strong></summary>

Certains Pokémon sont limités à :

- la journée
- la nuit
- le crépuscule
- la pluie
- un temps dégagé
- certaines phases lunaires

Ces conditions sont particulièrement importantes pour les Pokémon de type Spectre, les espèces nocturnes, les formes liées à la météo et plusieurs rencontres rares.

</details>

<details>
<summary><strong>💡 Lumière, accès au ciel et altitude</strong></summary>

Une règle d’apparition peut vérifier :

- une luminosité du ciel minimale ou maximale
- la lumière locale totale
- si le Pokémon peut voir le ciel
- une altitude Y minimale ou maximale
- une position souterraine ou en surface

Entrer dans le bon biome ne suffit donc pas toujours pour les rencontres en grotte, en montagne, dans les grandes profondeurs ou nécessitant une faible luminosité.

</details>

<details>
<summary><strong>🏛️ Structures et lieux spéciaux</strong></summary>

Certains Pokémon ne peuvent apparaître qu’à l’intérieur ou à proximité de structures particulières, par exemple :

- les villages
- les ruines
- les épaves et criques d’épaves
- les monuments océaniques
- les forteresses de l’End
- les cités antiques
- l’Ancient Temple de The Otherside
- les donjons de l’Aether

Les rencontres liées aux structures peuvent utiliser des niveaux ou catégories de rareté différents des apparitions naturelles habituelles du même Pokémon.

</details>

<details>
<summary><strong>🧱 Blocs à proximité et terrain</strong></summary>

Certaines rencontres dépendent des blocs à proximité ou de la surface située sous l’apparition. Cela peut inclure :

- des fleurs et arbres spéciaux
- de l’eau ou de la lave
- des minerais et gemmes
- des composants de redstone
- des paratonnerres
- des PC et machines Cobblemon
- de la pierre naturelle, de l’ardoise des abîmes, du feuillage ou des blocs propres à une dimension

Ces règles servent à créer une cohérence environnementale et des chasses spéciales pour les Pokémon technologiques, minéraux, floraux ou élémentaires.

</details>

<details>
<summary><strong>🌊 Eau, pêche, cimes et autres positions</strong></summary>

Les Pokémon peuvent utiliser différents types de positions d’apparition :

- au sol
- immergée
- à la surface de l’eau
- sur le fond marin
- par la pêche
- dans les cimes ou le feuillage surélevé

Les règles de pêche peuvent aussi dépendre de la canne, du niveau de leurre ou de l’appât utilisé.

</details>

---

## ✨ Comprendre la rareté

Cobblemon Realms utilise quatre catégories principales de rencontre :

| Rareté | Signification générale |
|:---:|---|
| Commune | Fréquemment disponible lorsque les conditions requises sont remplies |
| Peu commune | Rencontre moins fréquente, mais accessible lors d’une exploration normale |
| Rare | Rencontre peu courante, souvent associée à des conditions environnementales plus précises |
| Ultra Rare | Rencontres naturelles les plus difficiles, dont de nombreux starters, fossiles, Pokémon Paradoxes, Ultra-Chimères, Pokémon légendaires et mythiques |

{% hint style="info" %}
Un même Pokémon peut apparaître dans plusieurs catégories de rareté lorsqu’il possède différentes règles d’apparition. Vérifiez toujours l’environnement et les conditions exactes au lieu de vous fier uniquement à son nom.
{% endhint %}

---

## 🔎 Utiliser `/checkspawns`

Utilisez `/checkspawns` en jeu pour consulter les Pokémon pouvant actuellement apparaître autour de votre position.

Le résultat reflète votre environnement actuel, notamment le biome et les conditions actives du monde.

{% hint style="warning" %}
Un Pokémon affiché peut toujours nécessiter une heure, un niveau de lumière, une météo, une structure, un bloc à proximité, une altitude ou une position d’apparition précise avant de pouvoir réellement apparaître.
{% endhint %}

---

## 🤖 Intégration Discord

Le bot Discord **@Our Story** peut rechercher les données d’apparition à distance. Vous pouvez ainsi trouver un Pokémon sans parcourir chaque biome en jeu.

### 📋 Commandes disponibles

| Langue | Commande |
|:---:|---|
| 🇬🇧 Anglais | `/where <pokemon_name>` |
| 🇫🇷 Français | `/tesou <pokemon_name>` |
| 🇩🇪 Allemand | `/wobistdu <pokemon_name>` |
| 🇯🇵 Japonais, Rōmaji | `/doko <pokemon_name>` |

Le résultat peut inclure les dimensions, tags de biome, identifiants directs de biome, niveaux, raretés et conditions spéciales lorsqu’elles sont disponibles. Les Pokémon possédant de nombreux habitats peuvent produire des listes très longues.

{% hint style="success" %}
Utilisez le bot avant de partir afin de préparer vos chasses rares, comparer les dimensions et identifier le biome le plus adapté au Pokémon recherché.
{% endhint %}

---

## 🧠 Conseils de chasse

- Consultez le guide dédié à l’Aether ou à The Otherside avant de chasser dans ces dimensions.
- Vérifiez à la fois le biome et l’heure de la journée.
- Explorez verticalement pour les rencontres en grotte, en montagne ou dans les grandes profondeurs.
- Inspectez les structures et formations de blocs inhabituelles plutôt que de chercher uniquement en terrain ouvert.
- N’oubliez pas que les rencontres par pêche, immergées, sur le fond marin et dans les cimes utilisent des positions d’apparition différentes.
- Utilisez `/checkspawns` pour votre position actuelle et le bot Discord pour une recherche globale.
- Consultez la [Référence des tags de biome](pokemons-guides/biome-tags-reference.md) lorsqu’un résultat utilise un tag plutôt qu’un identifiant direct de biome.

⮕ Découvrez les améliorations des rencontres sauvages dans [Améliorations des apparitions](pokemons-guides/wild-boost-mechanics.md).

⮕ Découvrez les espèces et variantes personnalisées dans la section [Formes exclusives](pokemons-exclusives/mewtwo-exclusive-forms.md).

---

{% hint style="success" %}
## Nous contacter

<p align="center">
Si vous avez des questions, des suggestions ou des modifications à proposer, n'hésitez pas à nous rejoindre sur <a href="https://discord.gg/kb8NSTF45n">Discord</a> et à contacter directement <strong>@FabLeKebab</strong> sur le serveur pour tout ce qui concerne le wiki, ou <strong>@Levels</strong> pour tout ce qui concerne le modpack.
</p>
{% endhint %}
