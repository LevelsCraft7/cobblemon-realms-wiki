# Wiki - Creer un pack musical pour Music Interface

## Vue d'ensemble

Cette page explique comment creer un resource pack compatible avec **Music Interface** afin d'ajouter votre propre musique au mod.

Le mod lit la musique depuis un resource pack Minecraft classique, avec quelques fichiers specifiques obligatoires.

---

## Structure minimale du pack

Votre pack doit ressembler a ceci :

```text
My Music Pack/
|-- pack.mcmeta
|-- pack.png
\-- assets/
    \-- musicinterface/
        |-- music_data.json
        |-- sounds.json
        |-- sounds/
        |   \-- custom/
        |       |-- my_first_track.ogg
        |       \-- battle_theme.ogg
        \-- textures/
            \-- covers/
                |-- my_first_track.png
                \-- battle_theme.png
```

Le namespace du mod est **`musicinterface`**, donc ce nom de dossier doit correspondre exactement.

---

## Emplacement du pack

Placez votre pack dans :

```text
.minecraft/resourcepacks/
```

---

## 1. Le fichier `pack.mcmeta`

Exemple simple :

```json
{
  "pack": {
    "pack_format": 34,
    "description": "My Music Interface music pack"
  }
}
```

Notes :

- `pack_format` doit correspondre a votre version de Minecraft
- si vous avez un doute, utilisez la valeur correspondant a votre version cible

---

## 2. Les fichiers audio

Les musiques doivent etre placees dans :

```text
assets/musicinterface/sounds/custom/
```

Recommandations :

- utilisez le format **`.ogg`**
- evitez les espaces et les accents dans les noms de fichiers
- utilisez des noms simples comme `battle_theme.ogg` ou `route_01.ogg`

---

## 3. Le fichier `sounds.json`

Ce fichier enregistre vos sons aupres de Minecraft.

Exemple :

```json
{
  "custom/my_first_track": {
    "sounds": [
      {
        "name": "musicinterface:custom/my_first_track",
        "stream": true
      }
    ]
  }
}
```

Important :

- la cle a gauche doit correspondre a l'entree declaree
- le champ `name` doit pointer vers le bon fichier audio
- gardez `stream: true` pour les pistes longues

---

## 4. Le fichier `music_data.json`

C'est le fichier lu par **Music Interface** pour afficher et jouer vos pistes.

Exemple :

```json
[
  {
    "id": "my_first_track",
    "title": "My First Track",
    "author": "Your Name",
    "album": "My Album",
    "sound": "musicinterface:custom/my_first_track",
    "cover": "musicinterface:textures/covers/my_first_track.png",
    "duration": "2:31",
    "enabled": true,
    "weight": 1
  }
]
```

### Champs principaux

- `id` : identifiant unique
- `title` : titre affiche en jeu
- `author` : artiste ou compositeur
- `album` : album ou collection
- `sound` : ressource sonore declaree dans `sounds.json`
- `cover` : image de couverture
- `duration` : duree affichee
- `enabled` : active par defaut ou non
- `weight` : poids utilise si le systeme choisit aleatoirement entre plusieurs pistes

---

## 5. Les images de couverture

Les covers doivent etre placees dans :

```text
assets/musicinterface/textures/covers/
```

Puis referencees dans `music_data.json` comme ceci :

```json
"cover": "musicinterface:textures/covers/my_first_track.png"
```

---

## Activation en jeu

1. Placez le pack dans `resourcepacks`.
2. Lancez Minecraft avec le mod installe.
3. Activez le resource pack.
4. Ouvrez l'interface du mod et verifiez que les pistes apparaissent.

---

## Problemes frequents

### La musique n'apparait pas

Verifiez que :

- `music_data.json` est bien dans `assets/musicinterface/`
- le JSON est valide
- chaque `id` est unique
- le pack est bien active en jeu

### La musique apparait mais ne joue pas

Verifiez que :

- le fichier `.ogg` existe
- le nom correspond bien a `sounds.json`
- le champ `sound` correspond bien a l'entree declaree

### La cover ne s'affiche pas

Verifiez que :

- l'image est dans `assets/musicinterface/textures/covers/`
- le chemin est correct
- le fichier est bien en `.png`

---

## Bonnes pratiques

- gardez les noms de fichiers en minuscules
- remplacez les espaces par `_`
- commencez avec une seule piste avant de construire un gros pack

---

## Resume rapide

Pour qu'un pack fonctionne, il faut au minimum :

- un `pack.mcmeta`
- un ou plusieurs fichiers `.ogg`
- un `sounds.json`
- un `music_data.json`
- idealement une image `.png` par piste
