# Wiki - Creating a Music Pack for Music Interface 🎵

## 🎯 Goal

{% hint style="info" %}
<p align="center">
This page explains how to create a resource pack compatible with <strong>Music Interface</strong> to add your own music into Minecraft. The mod uses a standard Minecraft resource pack structure, with a few specific files that must be provided.
</p>
{% endhint %}

---

## 📦 Minimum Pack Structure

Your pack must follow this structure:

```
My Music Pack/
|-- pack.mcmeta
|-- pack.png                      <- optional, but recommended
\-- assets/
    \-- musicinterface/
        |-- music_data.json
        |-- sounds.json
        |-- sounds/
        |   \-- custom/
        |       |-- my_first_music.ogg
        |       \-- my_battle_theme.ogg
        \-- textures/
            \-- covers/
                |-- my_first_music.png
                \-- my_battle_theme.png
```

📌 The namespace used by the mod is **`musicinterface`** → this must be respected exactly.

---

## 📁 Pack Location

Place your pack folder inside:

```
.minecraft/resourcepacks/
```

---

## ⚙️ 1. The `pack.mcmeta` File

Simple example:

```
{
  "pack": {
    "pack_format": 34,
    "description": "My Music Interface music pack"
  }
}
```

### 🧾 Notes

- `pack_format` must match the targeted Minecraft version
- If unsure, use the version matching your modpack

---

## 🎧 2. Audio Files

Music files must be placed here:

```
assets/musicinterface/sounds/custom/
```

Example:

```
assets/musicinterface/sounds/custom/my_first_music.ogg
```

✅ Recommendations

- Use the **`.ogg`** format
- Avoid spaces and accents in file names
- Prefer simple names such as:
   - `legendary_theme.ogg`
   - `battle_theme.ogg`
   - `route_01.ogg`

---

## 🔊 3. The `sounds.json` File

This file registers sounds on the Minecraft side.

```
{
  "custom/my_first_music": {
    "sounds": [
      {
        "name": "musicinterface:custom/my_first_music",
        "stream": true
      }
    ]
  },
  "custom/my_battle_theme": {
    "sounds": [
      {
        "name": "musicinterface:custom/my_battle_theme",
        "stream": true
      }
    ]
  }
}
```

📌 Important points

- The key on the left must match the declared music entry
- The `name` field must point to the correct audio file
- For a file located at `sounds/custom/my_first_music.ogg`, the correct value is:
  - `musicinterface:custom/my_first_music`
- Keeping `stream: true` is recommended for long music tracks

---

## 🎼 4. The `music_data.json` File

This file is used by **Music Interface** to display music tracks in-game.

```
[
  {
    "id": "my_first_music",
    "title": "My First Music",
    "author": "Your Name",
    "album": "My Album",
    "sound": "musicinterface:custom/my_first_music",
    "cover": "musicinterface:textures/covers/my_first_music.png",
    "enabled": true,
    "weight": 1
  },
  {
    "id": "my_battle_theme",
    "title": "My Battle Theme",
    "author": "Your Name",
    "album": "My Album",
    "sound": "musicinterface:custom/my_battle_theme",
    "cover": "musicinterface:textures/covers/my_battle_theme.png",
    "enabled": true,
    "weight": 1
  }
]
```

### 🧩 Field Explanations

- `id`: Unique identifier  
- `title`: Displayed title in-game  
- `author`: Author / Composer  
- `album`: Album or collection  
- `sound`: Sound resource declared in `sounds.json`  
- `cover`: Cover image  
- `duration`: Displayed duration, free text field  
- `enabled`: Enables or disables the track by default  
- `weight`: Selection weight if the system randomly chooses between multiple tracks  

###### ⚠️ Reminder:

- Each `id` must be unique  
- Each `sound` value must correspond to a valid entry  
- If you do not want to manage duration, you can leave it as an empty string  

---

## 🖼️ 5. Covers

Cover images must be placed here:

```
assets/musicinterface/textures/covers/
```

Example:

```
assets/musicinterface/textures/covers/my_first_music.png
```

Then reference them like this inside `music_data.json`:

```
"cover": "musicinterface:textures/covers/my_first_music.png"
```

📌 If a cover is missing or invalid, the mod may use a fallback image, but it is **recommended** to **always** provide one.

---

## 🧪 Complete Copy-Paste Example

### 📁 Folder Structure

```
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
    "author": "Your Name",
    "album": "My Pack",
    "sound": "musicinterface:custom/route_01",
    "cover": "musicinterface:textures/covers/route_01.png",
    "enabled": true,
    "weight": 1
  }
]
```

---

## ▶️ Enable the Pack In-Game

1. Place the pack inside the `resourcepacks` folder.
2. Launch Minecraft with the mod installed.
3. Enable the resource pack in the resource packs menu.
4. Then check the mod interface to verify that the tracks appear correctly.

---

## ⚠️ Common Errors

### 🎵 Music Does Not Appear

Make sure:

- `music_data.json` is correctly placed inside `assets/musicinterface/`
- the JSON is valid
- the `id` is unique
- the pack is **properly enabled** in-game

### 🔇 Music Appears but Does Not Play

Make sure:

- the `.ogg` file actually exists
- the filename exactly matches the entry in `sounds.json`
- `sound` inside `music_data.json` correctly matches the declared entry

Correct example:

```
"sound": "musicinterface:custom/route_01"
```

### 🖼️ Cover Does Not Display

Make sure:

- the image is inside `assets/musicinterface/textures/covers/`
- the path in `cover` is correct
- the file is a `.png`

---

## 🧠 Best Practices

- Keep filenames lowercase
- Replace spaces with underscores `_`
- Use one cover image per track whenever possible
- Test with a single track first before adding many

---

## 🧱 Recommended Workflow

The easiest approach is to create a new pack folder, then gradually add:

- The `pack.mcmeta` file
- Your `.ogg` audio files
- The `sounds.json` file
- The `music_data.json` file
- Your `.png` cover images

---

## 🧾 Summary

For a pack to work, you need at minimum:

- One `pack.mcmeta`
- One or more `.ogg` files
- A `sounds.json`
- A `music_data.json`
- Ideally one `.png` image per track

If you follow the structure and paths shown on this page, your pack will be compatible with **Music Interface**.
