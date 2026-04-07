# Installation and Update Guide

Welcome to **Cobblemon Realms**.
This guide covers the recommended way to install, update, and host the modpack.

---

## Playing Solo

### Install via CurseForge (Recommended)

1. Install the **CurseForge App**:
   [https://download.curseforge.com/](https://download.curseforge.com/)
2. Search for **Cobblemon Realms**.
3. Click **Install**.
4. Press **Play**.

CurseForge is the recommended launcher because it handles dependencies and config updates correctly.

---

### Recommended Settings

- **RAM:** Allocate at least 8 GB.
- **Java:** Use **Java 21**.
- Keep GPU drivers up to date.
- Do not add extra mods on your first launch.

If the game behaves strangely on first boot, restart it once before troubleshooting further.

You can also tune memory in `user_jvm_args.txt` if needed. A common baseline is:

```text
-Xms8G
-Xmx8G
```

---

## Updating the Client

### On CurseForge

1. Open **CurseForge**.
2. Go to **My Modpacks**.
3. Click the arrow next to **Play**.
4. Select the latest version.
5. Click **Update**.

---

### On Other Launchers

If you use Prism, MultiMC, Modrinth App, or another launcher:

1. In CurseForge, open `...` and choose **Export Profile**.
2. Import the exported `.zip` into your launcher.

Some third-party launchers may not apply configs perfectly, so CurseForge remains the safest option.

---

## Multiplayer Server Setup

You have two good options:

- use a hosting provider for the easiest setup
- install the server pack manually

---

## Recommended Hosting

Cobblemon Realms officially partners with:

[https://bisecthosting.com/OurStory](https://bisecthosting.com/OurStory)

BisectHosting offers:

- one-click Cobblemon Realms installation
- automatic updates
- automatic backups
- optimized performance for large modpacks
- full CurseForge compatibility
- DDoS protection
- global server locations

Use code **OurStory** for **25% OFF** at checkout.

If you want a stable experience without manual setup, this is the recommended option.

---

## Manual Server Setup

### Minimum Requirements

| Requirement | Recommended |
| ----------- | ----------- |
| RAM | 8 GB free minimum |
| Java | Version 21 |
| Storage | SSD strongly recommended |
| Network | Stable connection |

Client and server must always use the same modpack version.

---

### Installation Steps

1. Download the **Server Pack** from CurseForge.
2. Extract it to an empty folder.
3. Run:
   - Windows: `run.bat`
   - Mac/Linux: `run.sh`
4. Accept the EULA by setting `eula.txt` to `true`.
5. Start the server again.
6. Adjust `server.properties` as needed.

If you host publicly, make sure port `25565` is open or forwarded correctly.

---

## Updating a Server

### Manual Update

1. Download the new server pack.
2. Replace these folders:
   - `mods/`
   - `config/`
   - `defaultconfigs/`
   - `kubejs/`
3. Keep these intact:
   - `world/`
   - `libraries/`
   - the server `.jar` when appropriate for your host setup
4. Restart the server.

Always back up `world/` before updating.

### Hosting Panel Update

If you use BisectHosting, use the **Update / Reinstall Modpack** button in the control panel.

Your world data should remain intact, but backups are still strongly recommended before major updates.

---

## Important Notes

- Always back up before updates.
- Do not remove core mods unless you understand the impact.
- If issues appear after modifying the pack, revert to the official version before asking for support.

For troubleshooting, see the [FAQ](faq.md).

---

Whether you play solo or with friends, Cobblemon Realms is built around long-term adventure and progression.
