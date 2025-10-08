# 🧰 Installation & Update Guide

Welcome to **Cobblemon Realms**! This guide explains how to **install, host, and update** your game or server, whether you’re playing solo or managing a large community.

---

## 🖥️ Playing in Singleplayer

To enjoy the modpack solo:

1. Install the [CurseForge App](https://download.curseforge.com/).
2. Search for "**Cobblemon Realms**" in the Minecraft section.
3. Click **Install**, then wait for it to download.
4. Once installed, press **Play** to launch the game with all required mods.

💡 **Recommended settings**
- Allocate at least **8 GB of RAM** (via CurseForge settings).  
- Use **Java 21** for best compatibility and performance.  
- Ensure your GPU drivers and Minecraft are up to date.

---

## 🔄 Updating Your Game Version (Client)

When a new version of Cobblemon Realms is released, follow these steps to stay up to date.

### 🧭 On CurseForge

1. Open the **CurseForge App** and go to **My Modpacks**.  
2. Hover over *Cobblemon Realms* and click the **arrow** next to "Play".  
3. If an update is available, you’ll see **“Update Available”**.  
4. Select the **latest version** and click **Continue**.  
5. Wait for it to install, then click **Play**.

🟢 **Tip:** CurseForge automatically applies configs and dependencies. It’s the **recommended launcher**.

### 🌍 On Other Launchers (Prism, Modrinth, MultiMC)

If you use another launcher:
1. In CurseForge, click the `...` next to the modpack → **Export Profile**.  
2. Import the exported `.zip` into your preferred launcher.  
3. Some launchers might not apply all configs correctly — **CurseForge is always recommended** for the best results.

---

## 🎮 Hosting a Multiplayer Server

Want to team up with friends or host a community? Here’s how.

### ⚙️ Minimum Requirements

| Requirement | Recommended |
|-------------|--------------|
| RAM | 8 GB free (16 GB total recommended) |
| Java | Version 21 |
| Internet | Stable connection |
| Knowledge | Running `.bat` / `.sh` scripts or using FTP |

---

## 🛠️ Manual Server Setup (Local or FTP)

1. Download the **Server Pack** from the [CurseForge page](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms).  
2. Extract the `.zip` to an empty folder.  
3. Launch:
   - **Windows:** `run.bat`
   - **Mac/Linux:** `run.sh`
4. Accept the EULA (`eula.txt → true`) and rerun the file.
5. Configure `server.properties` to your liking.

---

## ☁️ Hosting with a Provider (Recommended)

Our **official partner**, [**BisectHosting**](https://bisecthosting.com/OurStory), offers **1-click Cobblemon Realms server installs** — the easiest and most reliable way to host your world.

- 🔧 **Instant installation** with no manual uploads or setup required  
- 💾 **Automatic updates**, regular **backups**, and optimized performance  
- 📍 **Global locations**, SSD storage, DDoS protection, and full mod support  
- 🧩 Fully compatible with CurseForge, ensuring your configs stay synced

### 🎉 Partner Discount

As part of our partnership, you can use the code [**OurStory**](https://www.bisecthosting.com/OurStory) at checkout to receive **25% OFF**.

Embrace seamless hosting so you can focus on **exploring, catching, and adventuring** — not on server maintenance!

---

### 🧰 Manual Installation (If Needed)

If you prefer to upload the server pack manually:

1. Upload the **server pack .zip** via FTP.  
2. Extract it inside your server folder.  
3. Replace only these folders from the new pack:
   - `mods/`
   - `config/`
   - `kubejs/`
   - `defaultconfigs/`
4. Never delete:
   - `world/`
   - `libraries/`
   - `.jar` files

> 💡 **BisectHosting** automatically handles updates and optimizations, making manual updates unnecessary in most cases.

---

## 🔄 Updating a Server Pack

### 🧰 Manual Method

1. Download the **new server pack** from CurseForge.  
2. Delete outdated folders (`mods`, `config`, `defaultconfigs`, `kubejs`).  
3. Replace them with the new ones from the `.zip`.  
4. Restart your server.

### ☁️ Via Hosting Panel (BisectHosting)

**BisectHosting** includes an **“Update / Reinstall Modpack”** button on your panel.  
This safely updates your instance to the latest version without affecting your world data.

> 🧠 Always make a backup of your `/world` folder before updating.

---

## 🧱 Common Tips

- Always **backup** your `world/` before updates.  
- Make sure the **server and clients** are on the same modpack version.  
- If you encounter issues, reset configs by deleting `config/` and `defaultconfigs/` and relaunch.  
- Check the [FAQ](../faq.md) for performance or crash help.

---

🔥 Enjoy your Pokémon adventures with friends or solo — the Realms await! 🧭✨  
