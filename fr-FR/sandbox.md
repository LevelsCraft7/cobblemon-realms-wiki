## 📦 Guide d'installation 

{% hint style="info" %}
<p align="center">
<strong>Ce guide</strong> vous accompagnera pour installer le modpack, le maintenir à jour et héberger un serveur multijoueur dans les meilleures conditions.
</p>
{% endhint %}

---

## 🎮 Installation du modpack

### 🖥️ Jouer en solo

{% stepper %}
{% step %}
📥 Installez l'[Application CurseForge](https://www.curseforge.com/download/app)
{% endstep %}

{% step %}
🔎 Recherchez **Cobblemon Realms**
{% endstep %}

{% step %}
📦 Cliquez sur **Installer**
{% endstep %}

{% step %}
⏳ Patientez pendant le téléchargement et l'installation des mods
{% endstep %}

{% step %}
🚀 Lancez le modpack et commencez votre aventure !
{% endstep %}
{% endstepper %}

{% hint style="success" %}
CurseForge est recommandé pour garantir une installation complète et éviter les problèmes de configuration.
{% endhint %}

### ⚙️ Configuration recommandée

- ☕ Utiliser **Java 21**
- 💾 Allouer **8 Go de RAM**
- 🎮 Mettre à jour les pilotes graphiques
- 🚀 Installer le jeu sur un SSD si possible

Exemple dans `user_jvm_args.txt` :

```txt
-Xms8G
-Xmx8G
```

---

## 🔄 Mettre à jour le modpack

### 📥 CurseForge

1. Ouvrez CurseForge.
2. Rendez-vous dans **Mes modpacks**.
3. Survolez **Cobblemon Realms**.
4. Cliquez sur la flèche à côté de **Jouer**.
5. Sélectionnez **Mise à jour disponible**.
6. Choisissez la dernière version.
7. Cliquez sur **Continuer**.

{% hint style="info" %}
CurseForge applique automatiquement les dépendances et les configurations nécessaires.
{% endhint %}

### 🌍 Prism Launcher, Modrinth ou MultiMC

1. Ouvrez CurseForge.
2. Cliquez sur les `...`.
3. Sélectionnez **Exporter le profil**.
4. Importez l'archive dans votre launcher.

{% hint style="warning" %}
Certaines configurations peuvent ne pas être importées correctement. CurseForge reste recommandé.
{% endhint %}

---

# 🌐 Héberger un serveur

## 📋 Pré-requis

| Ressource | Recommandation |
|------------|------------|
| 💾 RAM | 8 Go minimum |
| ☕ Java | Version 21 |
| 🌍 Internet | Connexion stable |
| 🛠️ Connaissances | Installation de mods recommandée |

---

## ☁️ Hébergement recommandé

### 🚀 BisectHosting

Cobblemon Realms dispose d'un partenariat avec **BisectHosting**.

✅ Installation en un clic  
✅ Sauvegardes automatiques  
✅ Protection DDoS  
✅ Support complet des mods  
✅ Mises à jour simplifiées

{% hint style="success" %}
Utilisez le code **OurStory** pour obtenir 25 % de réduction sur votre premier mois.
{% endhint %}

---

## 🛠️ Installation manuelle

1. Téléchargez le Server Pack.
2. Extrayez l'archive.
3. Lancez :

### Windows

```bat
run.bat
```

### Linux / MacOS

```bash
./run.sh
```

4. Modifiez :

```txt
eula=true
```

5. Relancez le serveur.

---

## 🔄 Mettre à jour un serveur

### 📦 Mise à jour manuelle

Remplacez uniquement :

- `mods/`
- `config/`
- `kubejs/`
- `defaultconfigs/`

Ne supprimez jamais :

- `world/`
- `libraries/`
- les fichiers `.jar`

{% hint style="danger" %}
Effectuez toujours une sauvegarde complète du monde avant toute mise à jour.
{% endhint %}

---

## 💡 Bonnes pratiques

- 💾 Sauvegarder régulièrement le monde
- 🔄 Garder serveur et clients sur la même version
- 🛠️ Régénérer les configurations en cas de problème
- ❓ Consulter la FAQ avant d'ouvrir un ticket

{% hint style="info" %}
Une grande partie des problèmes rencontrés provient d'un client ou d'un serveur qui n'est pas à jour.
{% endhint %}

---

# 🎉 Bon jeu !

Partez à l'aventure, capturez des Pokémon, construisez votre équipe et explorez le monde de **Cobblemon Realms** !


{% tabs %}
{% tab title="Windows" %}

1. Blablabla
2. Blablabla
3. Blablabla

{% endtab %}

{% tab title="MacOS" %}

1. Blablabla
2. Blablabla
3. Blablabla

{% endtab %}

{% tab title="Linux" %}

1. Blablabla
2. Blablabla
3. Blablabla

{% endtab %}
{% endtabs %}
