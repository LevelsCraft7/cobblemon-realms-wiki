# 🌌 Portail Hoopa

<p align="center">
Au détour de vos aventures, vous pourrez apercevoir d’étranges portails flottant dans le monde.
<br>
Ces failles, que l’on dit créées par <strong>Hoopa lui-même</strong>, permettent d’accéder à des donjons et dimensions inconnus… mais leur stabilité est loin d’être garantie.
</p>

![Portail Hoopa](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/distortion_world/hoopa_portal_v2.png)

---

## 🌀 Fonctionnement

Les portails apparaissent **périodiquement dans l’Overworld**, près d’un joueur choisi aléatoirement.
<br>
Toutes les 10 minutes par défaut. Vous pouvez modifier ce temps dans les fichiers de configurations.

Chaque portail est relié à une **instance unique de donjon**, sélectionnée dans le *Dungeon Pool*.
<br>
Une fois utilisé, le portail transporte les joueurs vers ce donjon précis.

{% hint style="warning" %}
<p align="center">
Chaque donjon est instancié : vous ne rejoignez pas un monde partagé, mais une version unique générée pour votre groupe.
</p>
{% endhint %}

---

## ⏳ Temps limité

Les donjons ne sont pas éternels.

- ⏳ Vous disposez de **15 minutes** par défaut dans une dimension ;
- 💥 Les portails finissent par expirer ou être détruits ;
- 🚪 Les joueurs encore présents sont expulsés à la fin du timer dimensionnel.

Une fois le portail disparu, l’instance du donjon est entièrement supprimée.

---

## 🎮 Comment l’utiliser ?

Pour activer un portail, faites un **clic droit sur sa partie basse**.
<br>
Dans la majorité des cas, un écran de confirmation s’affiche afin de vous indiquer la destination.

{% hint style="info" %}
<p align="center">
Toujours vérifier la destination avant d’accepter une téléportation.
</p>
{% endhint %}

✔️ En cas d’acceptation :

- Vous êtes téléporté dans le donjon ;
- Si vous êtes le premier joueur, une génération peut entraîner un léger temps de chargement ;
- Vous pouvez quitter à tout moment via un portail interne.

---

## 🗺️ Dungeon Pool par défaut

Les portails peuvent actuellement mener vers :

- 🌍 **Souterrain de Sinnoh**  
  Exploration souterraine, mini-jeu d’excavation, trésors rares et Pokémon cachés.

- 🌀 **Monde Distorsion**  
  Dimension chaotique de Giratina avec plateformes inversées, labyrinthes d’illusions et combats de Pokémon Distordus.  
  → [Voir la page](mods-guides/CobbleSafari/distortion_world.md)

---

## ⚙️ Configuration

Le comportement des portails est défini dans :

`config/cobblesafari/dungeon_spawn_config.json`

### 🔧 Paramètres principaux

- ⏱️ **Intervalle d'apparition** → `spawnIntervalSeconds` (défaut : 600)
- 🌀 **Durée de vie du portail** → `portalLifetimeMinutes` (défaut : 30)
- 🔘 **Activer les portails** → `enabled` (true/false)

{% hint style="info" %}
<p align="center">
Le détail complet de la configuration est disponible sur la page dédiée.
</p>
{% endhint %}

👉 [Configuration complète](À faire)
