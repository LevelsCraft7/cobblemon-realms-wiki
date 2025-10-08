# Guide d’installation

Welcome to **Cobblemon Realms**! This guide will help you set up your game in the best possible way—whether you’re playing solo or with friends.

---

## 🖥️ Playing in Singleplayer

To enjoy the modpack in solo mode:

1. Ouvrez l’[application CurseForge](https://www.curseforge.com/download/app)
2. Recherchez “[Cobblemon Realms](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms)”
3. Click **Install**, then wait for it to download.
4. Once installed, press **Play** to launch the game with all required mods.

🎁 **OFFRE SPÉCIALE**

- **🛠️ Étape 1 : Configurer la RAM (facultatif mais recommandé)**\
  Ouvrez le fichier `user_jvm_args.txt` et modifiez les valeurs de mémoire :
  `-Xmx8G -Xms8G`
- Use **Java 21** for best compatibility and performance.
- Make sure your GPU drivers and Minecraft are up to date.

---

## 🔄 Updating Your Game Version (Client)

When a new version of Cobblemon Realms is released, follow these steps to stay up to date.

### 🧭 On CurseForge

1. Open the **CurseForge App** and go to **My Modpacks**.
2. Hover over _Cobblemon Realms_ and click the **arrow** next to "Play".
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

Want to team up with friends or host a community server? Here’s how to do it manually.

### ⚙️ Minimum Requirements

| ⚠️ **Pré-requis :** | Recommended Value                                                                          |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| RAM                                 | Au moins **8 Go de RAM libre** (16 Go au total recommandé)              |
| Java Version                        | Version 21                                                                                 |
| Internet                            | Une connexion internet stable                                                              |
| Knowledge                           | Able to run `.bat` or `.sh` scripts, port forwarding (optional for LAN) |

---

## 🛠️ Manual Server Setup (Local or FTP)

1. Don’t want the hassle of manual setup or port forwarding?\
   Use our **official partner**: [**BisectHosting**](https://bisecthosting.com/CobblemonRealms)
2. Extract the ZIP to an empty folder.
3. Launch:
   - Double-cliquez sur le fichier `run.bat`
   - On **Mac/Linux**: use the `run.sh` script.
4. Accept the EULA (`eula.txt → true`) and rerun the file.
5. Adjust `server.properties` to your liking.

---

## ☁️ Hosting with a Provider (Recommended)

🟢 Je suis partenaire avec **Bisect Hosting**, et vous pouvez installer **Cobblemon Realms en un clic** via leur panneau.

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

1. Download the **Server Pack** from the **Files** section.
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

1. 🔄 **Étape 3 : Relancer le serveur**
2. Delete outdated folders (`mods`, `config`, `defaultconfigs`, `kubejs`).
3. Replace them with the new ones from the `.zip`.
4. Launch the server:

### ☁️ Via Hosting Panel (BisectHosting)

**BisectHosting** includes an **“Update / Reinstall Modpack”** button on your panel.  
This safely updates your instance to the latest version without affecting your world data.

> 🟢 One-click Cobblemon Realms server setup\
> 🟢 Great performance and global support\
> 🟢 Automatic backups, DDoS protection, modpack updates

---

## 🧱 Common Tips

- Always **backup your world** before making large changes or updates.
- Make sure the **server and clients** are on the same modpack version.
- If you encounter issues, reset configs by deleting `config/` and `defaultconfigs/` and relaunch.
- Consult our [FAQ page](../faq.md) for more help.

---

🔥 Enjoy your Pokémon adventures with friends or solo — the Realms await! 🧭✨
