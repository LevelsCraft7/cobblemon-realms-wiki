# Wiki - Creer un pack de musique pour Music Interface

## Objectif

Cette page explique comment creer un resource pack compatible avec **Music Interface** afin d'ajouter vos propres musiques dans le jeu.

Le mod lit les musiques depuis un pack de ressources Minecraft classique, avec quelques fichiers precis a fournir.

---

## Structure minimale du pack

Votre pack doit ressembler a ceci :

```text
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

Le namespace utilise par le mod est **`musicinterface`**. Il faut donc respecter exactement ce nom de dossier.

---

## Emplacement du pack

Placez votre dossier de pack dans :

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
    "description": "Mon pack de musique Music Interface"
  }
}
```

Notes :

- `pack_format` doit correspondre a la version Minecraft cible du mod.
- Si vous avez un doute, utilisez la valeur correspondant a votre version de Minecraft.

---

## 2. Les fichiers audio

Les musiques doivent etre placees dans :

```text
assets/musicinterface/sounds/custom/
```

Exemple :

```text
assets/musicinterface/sounds/custom/ma_premiere_musique.ogg
```

Recommandations :

- utilisez le format **`.ogg`**
- evitez les espaces et accents dans les noms de fichiers
- preferez des noms simples comme `battle_theme.ogg`, `route_01.ogg`, `legendary_theme.ogg`

---

## 3. Le fichier `sounds.json`

Ce fichier declare les sons a Minecraft.

Exemple :

```json
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

Important :

- la cle a gauche doit correspondre a la musique declaree
- le champ `name` doit pointer vers le bon fichier audio
- pour un fichier `sounds/custom/ma_premiere_musique.ogg`, la valeur sure est :
  `musicinterface:custom/ma_premiere_musique`
- laissez `stream: true` pour les musiques longues

---

## 4. Le fichier `music_data.json`

Ce fichier est celui que **Music Interface** lit pour afficher et jouer les pistes.

Exemple :

```json
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

### Signification des champs

- `id` : identifiant unique de la piste
- `title` : nom affiche en jeu
- `author` : auteur / compositeur
- `album` : album ou collection
- `sound` : ressource sonore declaree dans `sounds.json`
- `cover` : image de couverture
- `duration` : duree affichee, texte libre
- `enabled` : active ou desactive la piste par defaut
- `weight` : poids de tirage si le systeme choisit aleatoirement entre plusieurs pistes

Conseils :

- chaque `id` doit etre unique
- chaque valeur `sound` doit correspondre a une entree valide
- si vous ne voulez pas gerer la duree, vous pouvez laisser une chaine vide

---

## 5. Les images de cover

Les covers doivent etre placees ici :

```text
assets/musicinterface/textures/covers/
```

Exemple :

```text
assets/musicinterface/textures/covers/ma_premiere_musique.png
```

Puis referencees ainsi dans `music_data.json` :

```json
"cover": "musicinterface:textures/covers/ma_premiere_musique.png"
```

Si une cover est absente ou invalide, le mod peut utiliser une image de secours, mais il est recommande de toujours en fournir une.

---

## Exemple complet pret a copier

### Arborescence

```text
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

### `pack.mcmeta`

```json
{
  "pack": {
    "pack_format": 34,
    "description": "Route 01 Music Pack"
  }
}
```

### `sounds.json`

```json
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

### `music_data.json`

```json
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

## Activer le pack en jeu

1. Placez le pack dans le dossier `resourcepacks`.
2. Lancez Minecraft avec le mod.
3. Activez le resource pack dans le menu des packs.
4. Verifiez ensuite dans l'interface du mod que les musiques apparaissent bien.

---

## Erreurs frequentes

### La musique n'apparait pas

Verifiez :

- que `music_data.json` est bien dans `assets/musicinterface/`
- que le JSON est valide
- que `id` est unique
- que le pack est bien active en jeu

### La musique apparait mais ne se joue pas

Verifiez :

- que le fichier `.ogg` existe vraiment
- que le nom du fichier correspond exactement a `sounds.json`
- que `sound` dans `music_data.json` correspond bien a l'entree declaree

Exemple correct :

```json
"sound": "musicinterface:custom/route_01"
```

### La cover ne s'affiche pas

Verifiez :

- que l'image est bien dans `assets/musicinterface/textures/covers/`
- que le chemin dans `cover` est exact
- que le fichier est bien en `.png`

---

## Bonnes pratiques

- gardez des noms de fichiers en minuscules
- remplacez les espaces par des underscores `_`
- utilisez une cover par piste quand c'est possible
- testez d'abord avec une seule musique avant d'en ajouter beaucoup

---

## Base de travail recommandee

Le plus simple est de creer un nouveau dossier de pack, puis d'ajouter progressivement :

- le fichier `pack.mcmeta`
- vos fichiers audio `.ogg`
- le fichier `sounds.json`
- le fichier `music_data.json`
- vos images de cover `.png`

---

## Resume rapide

Pour qu'un pack fonctionne, il faut au minimum :

- un `pack.mcmeta`
- un ou plusieurs fichiers `.ogg`
- un `sounds.json`
- un `music_data.json`
- idealement une image `.png` par musique

Si vous respectez la structure et les chemins montres dans cette page, le pack sera compatible avec **Music Interface**.
