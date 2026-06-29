# Wiki - Créer un pack de musique pour Music Interface 🎵

## 🎯 Objectif

{% hint style="info" %}
<p align="center">
Cette page explique comment créer un ressource pack compatible avec <strong>Music Interface</strong> afin d’ajouter vos propres musiques dans Minecraft. Le mod utilise un pack de ressources Minecraft classique, avec quelques fichiers spécifiques à fournir.
</p>
{% endhint %}

---

## 📦 Structure minimale du pack

Votre pack doit respecter cette structure :

```
Mon Pack Musique/
|-- pack.mcmeta
|-- pack.png                      <- optionnel, mais recommande
\-- assets/
    \-- musicinterface/
        |-- music_data.json
        |-- sounds.json
        |-- sounds/
        |   \-- custom/
        |       |-- ma_premiere_musique.ogg
        |       \-- mon_theme_combat.ogg
        \-- textures/
            \-- covers/
                |-- ma_premiere_musique.png
                \-- mon_theme_combat.png
```

📌 Le namespace utilisé par le mod est **`musicinterface`** → à respecter strictement.

---

## 📁 Emplacement du pack

Placez votre dossier de pack dans :

```
.minecraft/resourcepacks/
```

---

## ⚙️ 1. Le fichier `pack.mcmeta`

Exemple simple :

```
{
  "pack": {
    "pack_format": 34,
    "description": "Mon pack de musique Music Interface"
  }
}
```

### 🧾 Notes

- `pack_format` doit correspondre à la version Minecraft ciblée
- En cas de doute, utilisez la version correspondant à votre modpack

---

## 🎧 2. Les fichiers audio

Les musiques doivent être placées ici :

```
assets/musicinterface/sounds/custom/
```

Exemple :

```
assets/musicinterface/sounds/custom/ma_premiere_musique.ogg
```

✅ Recommandations

- Utilisez le format **`.ogg`**
- Évitez les espaces et accents dans les noms de fichiers
- Préférer des noms simples comme :
   - `legendary_theme.ogg`,
   - `battle_theme.ogg`, 
   - `route_01.ogg`

---

## 🔊 3. Le fichier `sounds.json`

Ce fichier déclare les sons côté Minecraft.

```
{
  "custom/ma_premiere_musique": {
    "sounds": [
      {
        "name": "musicinterface:custom/ma_premiere_musique",
        "stream": true
      }
    ]
  },
  "custom/mon_theme_combat": {
    "sounds": [
      {
        "name": "musicinterface:custom/mon_theme_combat",
        "stream": true
      }
    ]
  }
}
```

📌 Points importants

- La clé à gauche doit correspondre à la musique déclarée
- Le champ `name` doit pointer vers le bon fichier audio
- Pour un fichier `sounds/custom/ma_premiere_musique.ogg`, la valeur sure est :
  - `musicinterface:custom/ma_premiere_musique`
- Laissez `stream: true` recommandé pour les musiques longues

---

## 🎼 4. Le fichier `music_data.json`

Ce fichier est utilisé par **Music Interface** pour afficher les musiques en jeu.

```
[
  {
    "id": "ma_premiere_musique",
    "title": "Ma Premiere Musique",
    "author": "Votre Nom",
    "album": "Mon Album",
    "sound": "musicinterface:custom/ma_premiere_musique",
    "cover": "musicinterface:textures/covers/ma_premiere_musique.png",
    "enabled": true,
    "weight": 1
  },
  {
    "id": "mon_theme_combat",
    "title": "Mon Theme Combat",
    "author": "Votre Nom",
    "album": "Mon Album",
    "sound": "musicinterface:custom/mon_theme_combat",
    "cover": "musicinterface:textures/covers/mon_theme_combat.png",
    "enabled": true,
    "weight": 1
  }
]
```

### 🧩 Champs expliqués

- `id` : Identifiant unique
- `title` :  Titre affiché en jeu
- `author` : Auteur / Compositeur
- `album` : Album ou collection
- `sound` : Ressource sonore déclarée dans `sounds.json`
- `cover` : Image de couverture
- `duration` : Durée affichée, texte libre
- `enabled` : Active ou désactive la piste par défaut
- `weight` : Poids de tirage si le système choisit aléatoirement entre plusieurs pistes

###### ⚠️ Rappel :

- Chaque `id` doit être unique
- Chaque valeur `sound` doit correspondre a une entrée valide
- Si vous ne voulez pas gérer la durée, vous pouvez laisser une chaine vide

---

## 🖼️ 5. Les covers

Les covers doivent être placées ici :

```
assets/musicinterface/textures/covers/
```

Exemple :

```
assets/musicinterface/textures/covers/ma_premiere_musique.png
```

Puis référencées ainsi dans `music_data.json` :

```
"cover": "musicinterface:textures/covers/ma_premiere_musique.png"
```

📌 Si une cover est absente ou invalide, le mod peut utiliser une image de secours, mais il est **recommande** de **toujours** en fournir une.

---

## 🧪 Exemple complet prêt à copier

### 📁 Arborescence

```
Mon Pack Musique/
|-- pack.mcmeta
\-- assets/
    \-- musicinterface/
        |-- music_data.json
        |-- sounds.json
        |-- sounds/
        |   \-- custom/
        |       \-- route_01.ogg
        \-- textures/
            \-- covers/
                \-- route_01.png
```

### ⚙️ `pack.mcmeta`

```
{
  "pack": {
    "pack_format": 34,
    "description": "Route 01 Music Pack"
  }
}
```

### 🔊 `sounds.json`

```
{
  "custom/route_01": {
    "sounds": [
      {
        "name": "musicinterface:custom/route_01",
        "stream": true
      }
    ]
  }
}
```

### 🎼 `music_data.json`

```
[
  {
    "id": "route_01",
    "title": "Route 01",
    "author": "Votre Nom",
    "album": "Mon Pack",
    "sound": "musicinterface:custom/route_01",
    "cover": "musicinterface:textures/covers/route_01.png",
    "enabled": true,
    "weight": 1
  }
]
```

---

## ▶️ Activer le pack en jeu

1. Placez le pack dans le dossier `resourcepacks`.
2. Lancez Minecraft avec le mod.
3. Activez le resource pack dans le menu des packs.
4. Vérifiez ensuite dans l'interface du mod que les musiques apparaissent bien.

---

## ⚠️ Erreurs fréquentes

### 🎵 La musique n'apparait pas

Vérifiez que :

- `music_data.json` est bien dans `assets/musicinterface/`
- le JSON soit valide
- l'`id` est unique
- le pack est **bien activé** en jeu

### 🔇 La musique apparait mais ne se lance pas

Vérifiez que :

- le fichier `.ogg` existe vraiment
- le nom du fichier correspond exactement a `sounds.json`
- `sound` dans `music_data.json` correspond bien a l'entrée déclarée

Exemple correct :

```
"sound": "musicinterface:custom/route_01"
```

### 🖼️ La cover ne s'affiche pas

Verifiez que :

- l'image est bien dans `assets/musicinterface/textures/covers/`
- le chemin dans `cover` est exact
- le fichier est bien en `.png`

---

## 🧠 Bonnes pratiques

- Gardez des noms de fichiers en minuscules
- Remplacez les espaces par des underscores `_`
- Utilisez une cover par piste quand c'est possible
- Testez d'abord avec une seule musique avant d'en ajouter beaucoup

---

## 🧱 Base de travail recommandée

Le plus simple est de créer un nouveau dossier de pack, puis d'ajouter progressivement :

- Le fichier `pack.mcmeta`
- Vos fichiers audio `.ogg`
- Le fichier `sounds.json`
- Le fichier `music_data.json`
- Vos images de cover `.png`

---

## 🧾 En résumé

Pour qu'un pack fonctionne, il faut au minimum :

- Un `pack.mcmeta`
- Un ou plusieurs fichiers `.ogg`
- Un `sounds.json`
- Un `music_data.json`
- Idéalement une image `.png` par musique

Si vous respectez la structure et les chemins montres dans cette page, le pack sera compatible avec **Music Interface**.

---

{% hint style="success" %}
## Nous contacter

<p align="center">
Si vous avez des questions, des suggestions ou des modifications à proposer, n'hésitez pas à nous rejoindre sur <a href="https://discord.gg/kb8NSTF45n">Discord</a> et à contacter directement <strong>@FabLeKebab</strong> sur le serveur pour tout ce qui concerne le wiki, ou <strong>@Levels</strong> pour tout ce qui concerne le modpack.
</p>
{% endhint %}
