# Wiki - Creating a Music Pack for Music Interface

## Overview

This page explains how to create a resource pack compatible with **Music Interface** so players can add their own music to the mod.

The mod reads music from a standard Minecraft resource pack, with a few specific files that must be provided.

---

## Minimum Pack Structure

Your pack should look like this:

```text
My Music Pack/
|-- pack.mcmeta
|-- pack.png                      <- optional, but recommended
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

The namespace used by the mod is **`musicinterface`**, so this folder name must match exactly.

---

## Pack Location

Place your pack inside:

```text
.minecraft/resourcepacks/
```

---

## 1. The `pack.mcmeta` File

Simple example:

```json
{
  "pack": {
    "pack_format": 34,
    "description": "My Music Interface music pack"
  }
}
```

Notes:

- `pack_format` must match the Minecraft version targeted by the mod
- if you are unsure, use the value that matches your Minecraft version

---

## 2. Audio Files

Music files must be placed in:

```text
assets/musicinterface/sounds/custom/
```

Example:

```text
assets/musicinterface/sounds/custom/my_first_track.ogg
```

Recommendations:

- use the **`.ogg`** format
- avoid spaces and accented characters in file names
- prefer simple names such as `battle_theme.ogg`, `route_01.ogg`, `legendary_theme.ogg`

---

## 3. The `sounds.json` File

This file registers your sounds with Minecraft.

Example:

```json
{
  "custom/my_first_track": {
    "sounds": [
      {
        "name": "musicinterface:custom/my_first_track",
        "stream": true
      }
    ]
  },
  "custom/battle_theme": {
    "sounds": [
      {
        "name": "musicinterface:custom/battle_theme",
        "stream": true
      }
    ]
  }
}
```

Important:

- the key on the left must match the declared music entry
- the `name` field must point to the correct audio file
- for a file located at `sounds/custom/my_first_track.ogg`, the safe value is:
  `musicinterface:custom/my_first_track`
- keep `stream: true` for long music tracks

---

## 4. The `music_data.json` File

This is the file **Music Interface** reads to display and play tracks.

Example:

```json
[
  {
    "id": "my_first_track",
    "title": "My First Track",
    "author": "Your Name",
    "album": "My Album",
    "sound": "musicinterface:custom/my_first_track",
    "cover": "musicinterface:textures/covers/my_first_track.png",
    "enabled": true,
    "weight": 1
  },
  {
    "id": "battle_theme",
    "title": "Battle Theme",
    "author": "Your Name",
    "album": "My Album",
    "sound": "musicinterface:custom/battle_theme",
    "cover": "musicinterface:textures/covers/battle_theme.png",
    "enabled": true,
    "weight": 1
  }
]
```

### Field Reference

- `id`: unique track identifier
- `title`: track name shown in-game
- `author`: artist / composer
- `album`: album or collection name
- `sound`: sound resource declared in `sounds.json`
- `cover`: cover image resource
- `duration`: displayed duration, free text
- `enabled`: whether the track is enabled by default
- `weight`: weighted value if the system randomly chooses between tracks

Tips:

- every `id` must be unique
- every `sound` value must match a valid declared entry
- if you do not want to manage duration, you can leave it as an empty string

---

## 5. Cover Images

Cover images must be placed here:

```text
assets/musicinterface/textures/covers/
```

Example:

```text
assets/musicinterface/textures/covers/my_first_track.png
```

Then reference them like this in `music_data.json`:

```json
"cover": "musicinterface:textures/covers/my_first_track.png"
```

If a cover is missing or invalid, the mod may fall back to a default image, but providing a cover for each track is strongly recommended.

---

## Full Example Ready to Copy

### Folder Structure

```text
My Music Pack/
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
    "author": "Your Name",
    "album": "My Pack",
    "sound": "musicinterface:custom/route_01",
    "cover": "musicinterface:textures/covers/route_01.png",
    "duration": "2:45",
    "enabled": true,
    "weight": 1
  }
]
```

---

## Enabling the Pack In-Game

1. Place the pack inside the `resourcepacks` folder.
2. Launch Minecraft with the mod installed.
3. Enable the resource pack from the resource packs menu.
4. Open the mod interface and verify that your tracks are listed.

---

## Common Issues

### The music does not appear

Check that:

- `music_data.json` is located in `assets/musicinterface/`
- the JSON is valid
- every `id` is unique
- the pack is enabled in-game

### The music appears but does not play

Check that:

- the `.ogg` file actually exists
- the file name matches the entry in `sounds.json`
- the `sound` field in `music_data.json` matches the declared sound entry

Correct example:

```json
"sound": "musicinterface:custom/route_01"
```

### The cover does not show

Check that:

- the image is located in `assets/musicinterface/textures/covers/`
- the path in `cover` is correct
- the file is a `.png`

---

## Best Practices

- keep file names lowercase
- replace spaces with underscores `_`
- use one cover image per track whenever possible
- test with one track first before adding a full pack

---

## Recommended Starting Point

The easiest approach is to create a new pack folder, then add the following step by step:

- the `pack.mcmeta` file
- your `.ogg` audio files
- the `sounds.json` file
- the `music_data.json` file
- your `.png` cover images

---

## Quick Summary

For a pack to work, you need at minimum:

- a `pack.mcmeta`
- one or more `.ogg` files
- a `sounds.json`
- a `music_data.json`
- ideally one `.png` cover per track

If you follow the structure and paths shown on this page, your pack will be compatible with **Music Interface**.
