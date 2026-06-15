# 🎈 Ballon Récompense

<p align="center">
Inspirés des cadeaux sponsorisés de Pokémon GO, les <strong>Ballon Récompense</strong> sont de rares événements qui apparaissent dans l’Overworld et contiennent du butin lié aux Cobblemon.
</p>

![Ballon Récompense](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/reward_balloons.png)

---

## 🎯 Fonctionnement

Lorsque vous explorez la surface de l’Overworld, des ballons peuvent apparaître très rarement dans le ciel, dans un rayon configurable autour des joueurs.

{% hint style="info" %}
<p align="center">
Les Ballon Récompense sont des événements rares et entièrement aléatoires.
</p>
{% endhint %}

### 🎈 Interaction

Pour les ouvrir, il suffit de faire un **clic droit** dessus :

- qu’ils soient encore en l’air ;
- ou déjà posés au sol.

Une fois le ballon ouvert :
- 🎁 il libère son contenu ;
- 🎈 il devient plus léger ;
- ⬆️ il remonte dans le ciel avant de disparaître.

---

### ⏳ Despawn automatique

Si un ballon n’est pas utilisé, il disparaît automatiquement après **5 minutes**, afin d’éviter l’accumulation d’entités sur le serveur.

---

## 🏝️ Ballon Safari

Les **Ballon Safari** sont une variante exclusive apparaissant uniquement dans la zone Safari.

Contrairement aux ballons classiques, ils ne contiennent qu’un seul type de récompense : les **Safari Balls**.

### 📊 Particularités

- 📈 4× plus fréquents que les Ballon Récompense classiques ;
- 🎁 Drop entre 1 et 4 Ballon Safari ;
- 🌿 Exclusifs à la surface du Safari.

{% hint style="success" %}
<p align="center">
Un petit bonus conçu pour faciliter l’exploration du Safari.
</p>
{% endhint %}

![Ballon Safari](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/safari_ballons.png)

---

## ⚙️ Configuration

Les fichiers de configuration sont séparés selon le type de ballon :

- 🎈 `config/cobblesafari/misc_config.json` → Ballon Récompense
- 🏝️ `config/cobblesafari/safari_config.json` → Ballon Safari

### 🔧 Paramètres principaux

- 🎈 **Ballon Récompense**
  - `balloonEnabled` → activation/désactivation

- 🏝️ **Ballon Safari*
  - `balloonSafariEnabled` → activation/désactivation

---

{% hint style="info" %}
<p align="center">
Une documentation complète des paramètres est disponible sur les pages de configuration dédiées.
</p>
{% endhint %}

👉 [Ballon Récompense](https://cobblesafari.maxigregrze.fr/en/addons/config_misc_config)
<br>
👉 [Ballon Safari](https://cobblesafari.maxigregrze.fr/en/addons/config_safari_config)
