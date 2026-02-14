# 🧰 Installation & Update Guide

Welcome to **Cobblemon Realms**.
This guide covers everything you need to install, update, or host the modpack properly.

---

# 🎮 PLAYING SOLO (Singleplayer)

## ✅ Install via CurseForge (Recommended)

1. Install the **CurseForge App**
   [https://download.curseforge.com/](https://download.curseforge.com/)
2. Search for **Cobblemon Realms**
3. Click **Install**
4. Press **Play**

That’s it.

---

## ⚙️ Recommended Settings

* **RAM:** Minimum 8 GB allocated
* **Java:** Version 21
* Keep GPU drivers up to date
* Do not add extra mods on first launch

If something behaves strangely on first boot, restart the game once before troubleshooting.

---

## 🔄 Updating (Client)

### On CurseForge

1. Open CurseForge → *My Modpacks*
2. Click the arrow next to **Play**
3. Select the latest version
4. Click **Update**

CurseForge automatically applies configs and dependencies correctly. It is the recommended launcher.

---

### Other Launchers (Prism, MultiMC, Modrinth)

1. In CurseForge → `...` → **Export Profile**
2. Import the `.zip` into your launcher

Note: Some launchers may not apply configs perfectly.

---

# 🌐 MULTIPLAYER SERVER SETUP

You have two options: **easy and optimized**, or manual.

---

# ☁️ RECOMMENDED — Host with BisectHosting

Cobblemon Realms officially partners with:

## 👉 [https://bisecthosting.com/OurStory](https://bisecthosting.com/OurStory)

BisectHosting offers:

* One click Cobblemon Realms installation
* Automatic updates
* Automatic backups
* Optimized performance for large modpacks
* Full CurseForge compatibility
* DDoS protection
* Global server locations

### 🎉 Use Code: **OurStory**

Get **25% OFF** at checkout.

If you want a stable experience without technical headaches, this is the best option.

---

# 🛠️ Manual Server Setup (Local or VPS)

### Minimum Requirements

| Requirement | Recommended              |
| ----------- | ------------------------ |
| RAM         | 8 GB free minimum        |
| Java        | Version 21               |
| Storage     | SSD strongly recommended |

---

### Installation Steps

1. Download the **Server Pack** from CurseForge
2. Extract to an empty folder
3. Run:

   * Windows → `run.bat`
   * Mac/Linux → `run.sh`
4. Accept the EULA (`eula.txt → true`)
5. Restart the server

---

# 🔄 Updating a Server

## Manual Update

1. Download the new server pack
2. Delete:

   * `mods/`
   * `config/`
   * `defaultconfigs/`
   * `kubejs/`
3. Replace them with the new ones
4. Never delete:

   * `world/`
   * `libraries/`
   * server `.jar`
5. Restart

Always back up `/world` before updating.

---

## Updating via BisectHosting

Use the **Update / Reinstall Modpack** button in your control panel.

Your world data remains intact.

---

# 🧠 Important Notes

* Client and server must use the same modpack version.
* Always back up before updates.
* Do not remove core mods.
* If issues appear after modifying the pack, revert to the official version.

For troubleshooting, see the [FAQ](../faq.md).

---

🔥 Whether solo or with friends, Cobblemon Realms is built for long term adventure and progression.
