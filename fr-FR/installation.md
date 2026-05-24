# Guide d’installation

Ce guide vous aidera à configurer votre jeu de la meilleure façon possible, que vous jouiez en solo ou avec des amis.

---

## 🖥️ Jouer en solo

Pour profiter du modpack en mode solo :

1. Ouvrez l’[application CurseForge](https://www.curseforge.com/download/app)
2. Recherchez “[Cobblemon Realms](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms)”
3. Cliquez sur **Installer**, puis attendez la fin du téléchargement.
4. Une fois installé, appuyez sur **Jouer** pour lancer le jeu avec tous les mods requis.

🎁 **OFFRE SPÉCIALE**

- **🛠️ Étape 1 : Configurer la RAM (facultatif mais recommandé)**\
  Ouvrez le fichier `user_jvm_args.txt` et modifiez les valeurs de mémoire :
  `-Xmx8G -Xms8G`
- Utilisez **Java 21** pour une meilleure compatibilité et de meilleures performances.
- Assurez-vous que les pilotes de votre carte graphique ainsi que Minecraft sont à jour.

---

## 🔄 Mettre à jour votre version du jeu (Client)

Lorsqu’une nouvelle version de Cobblemon Realms est publiée, suivez ces étapes pour rester à jour.

### 🧭 Sur CurseForge

1. Ouvrez l’**application CurseForge** et allez dans **Mes modpacks**.
2. Survolez _Cobblemon Realms_ et cliquez sur la **flèche** à côté de “Jouer”.
3. Si une mise à jour est disponible, vous verrez **“Mise à jour disponible”**.
4. Sélectionnez la **dernière version** puis cliquez sur **Continuer**.
5. Attendez la fin de l’installation puis cliquez sur **Jouer**.

🟢 **Astuce :** CurseForge applique automatiquement les configurations et dépendances. C’est le **launcher recommandé**.

### 🌍 Sur d’autres launchers (Prism, Modrinth, MultiMC)

Si vous utilisez un autre launcher :

1. Dans CurseForge, cliquez sur les `...` à côté du modpack → **Exporter le profil**.
2. Importez le fichier `.zip` exporté dans le launcher de votre choix.
3. Certains launchers peuvent ne pas appliquer correctement toutes les configurations — **CurseForge reste toujours recommandé** pour obtenir les meilleurs résultats.

---

## 🎮 Héberger un serveur multijoueur

Vous voulez jouer avec des amis ou héberger un serveur communautaire ? Voici comment procéder manuellement.

### ⚙️ Configuration minimale requise

| ⚠️ **Pré-requis :** | Valeur recommandée |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| RAM                                 | Au moins **8 Go de RAM libre** (16 Go au total recommandé) |
| Version de Java                     | Version 21 |
| Internet                            | Une connexion internet stable |
| Connaissances                       | Savoir exécuter des scripts `.bat` ou `.sh`, redirection de ports (facultatif en LAN) |

---

## 🛠️ Installation manuelle du serveur (Local ou FTP)

1. Vous ne voulez pas vous compliquer la vie avec une installation manuelle ou une redirection de ports ?\
   Utilisez notre **partenaire officiel** : [**BisectHosting**](https://bisecthosting.com/CobblemonRealms)
2. Extrayez le fichier ZIP dans un dossier vide.
3. Lancez :
   - Double-cliquez sur le fichier `run.bat`
   - Sur **Mac/Linux** : utilisez le script `run.sh`
4. Acceptez l’EULA (`eula.txt → true`) puis relancez le fichier.
5. Ajustez `server.properties` selon vos préférences.

---

## ☁️ Hébergement avec un fournisseur (Recommandé)

🟢 Je suis partenaire avec **Bisect Hosting**, et vous pouvez installer **Cobblemon Realms en un clic** via leur panneau.

- 🔧 **Installation instantanée** sans aucun upload ou réglage manuel requis
- 💾 **Mises à jour automatiques**, **sauvegardes** régulières et performances optimisées
- 📍 **Localisations mondiales**, stockage SSD, protection DDoS et prise en charge complète des mods
- 🧩 Entièrement compatible avec CurseForge, garantissant la synchronisation de vos configurations

### 🎉 Réduction partenaire

Dans le cadre de notre partenariat, vous pouvez utiliser le code [**OurStory**](https://www.bisecthosting.com/OurStory) lors du paiement pour obtenir **25 % DE RÉDUCTION**.

Profitez d’un hébergement fluide afin de vous concentrer sur **l’exploration, la capture et l’aventure** — et non sur la maintenance du serveur !

---

### 🧰 Installation manuelle (Si nécessaire)

Si vous préférez importer le pack serveur manuellement :

1. Téléchargez le **Server Pack** depuis la section **Fichiers**.
2. Extrayez-le dans le dossier de votre serveur.
3. Remplacez uniquement ces dossiers du nouveau pack :
   - `mods/`
   - `config/`
   - `kubejs/`
   - `defaultconfigs/`
4. Ne supprimez jamais :
   - `world/`
   - `libraries/`
   - les fichiers `.jar`

> 💡 **BisectHosting** gère automatiquement les mises à jour et optimisations, rendant les mises à jour manuelles inutiles dans la plupart des cas.

---

## 🔄 Mettre à jour un pack serveur

### 🧰 Méthode manuelle

1. 🔄 **Étape 3 : Relancer le serveur**
2. Supprimez les dossiers obsolètes (`mods`, `config`, `defaultconfigs`, `kubejs`).
3. Remplacez-les par les nouveaux contenus du fichier `.zip`.
4. Lancez le serveur :

### ☁️ Via le panneau d’hébergement (BisectHosting)

**BisectHosting** inclut un bouton **“Mettre à jour / Réinstaller le modpack”** sur votre panneau.  
Cela met à jour votre instance vers la dernière version en toute sécurité sans affecter les données de votre monde.

> 🟢 Installation de serveur Cobblemon Realms en un clic\
> 🟢 Excellentes performances et support mondial\
> 🟢 Sauvegardes automatiques, protection DDoS et mises à jour du modpack

---

## 🧱 Conseils courants

- Faites toujours une **sauvegarde de votre monde** avant de réaliser de gros changements ou des mises à jour.
- Assurez-vous que le **serveur et les clients** utilisent la même version du modpack.
- Si vous rencontrez des problèmes, réinitialisez les configurations en supprimant `config/` et `defaultconfigs/` puis relancez le jeu.
- Consultez notre [page FAQ](../faq.md) pour obtenir davantage d’aide.

---

🔥 Profitez de vos aventures Pokémon entre amis ou en solo ; les Realms vous attendent ! 🧭✨
