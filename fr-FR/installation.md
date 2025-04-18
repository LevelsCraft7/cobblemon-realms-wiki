# Guide d’installation

Ce guide vous explique comment installer Cobblemon Realms en solo ou pour jouer en multijoueur.

## 🖥️ En solo (Installation client)

Nous recommandons d’utiliser CurseForge :

1. Ouvrez l’[application CurseForge](https://www.curseforge.com/download/app)
2. Recherchez “[Cobblemon Realms](https://www.curseforge.com/minecraft/modpacks/cobblemon-realms)”
3. Cliquez sur "Installer", puis lancez le modpack

> Assurez-vous d’avoir Java 21 installé.

## 🎮 Comment créer un serveur Minecraft pour jouer avec des amis

_Pour Cobblemon Realms et les modpacks Our Story_

## 🖥️ OPTION 1 – Héberger le serveur sur votre propre PC _(Gratuit mais nécessite une bonne configuration)_

Vous pouvez utiliser le **Server Pack officiel** que je fournis à chaque mise à jour du modpack !

⚠️ **Pré-requis :**

- Au moins **8 Go de RAM libre** (16 Go au total recommandé)
- **Java 21** (obligatoire pour Cobblemon Realms !)
- Une connexion internet stable
- Quelques notions de base sur l’utilisation de fichiers `.bat`
- Redirection de ports si vos amis se connectent depuis l’extérieur de votre réseau

---

### 📦 Guide d’installation pas-à-pas (inclus dans le Server Pack)

**🛠️ Étape 1 : Configurer la RAM (facultatif mais recommandé)**  
Ouvrez le fichier `user_jvm_args.txt` et modifiez les valeurs de mémoire :
`-Xmx8G -Xms8G`

- `Xmx` = RAM maximale
- `Xms` = RAM minimale\
   ➡️ _Ne donnez pas toute votre RAM ! Laissez 2 à 4 Go pour le système._

---

**📜 Étape 2 : Premier lancement et acceptation de l’EULA**

1. Extrayez le `.zip` du Server Pack dans un dossier (ex : `CobblemonServer`)
2. Double-cliquez sur le fichier `run.bat`
3. Cela va créer un fichier `eula.txt` et s’arrêter
4. Ouvrez ce fichier et changez :\
   `eula=false` → `eula=true`
5. Enregistrez et fermez

---

🔄 **Étape 3 : Relancer le serveur**

- Lancez de nouveau `run.bat`
- Le serveur va démarrer entièrement
- Attendez que le monde soit généré
- C’est prêt !

🌍 Vous pouvez maintenant :

- **Jouer en local** en vous connectant à `localhost`
- **Inviter des amis** sur le même Wi-Fi via votre IP locale
- Ou **configurer une redirection de ports** pour jouer avec des amis à distance

---

## 🌐 OPTION 2 – Utiliser un hébergeur de serveur _(Recommandé)_

Si vous ne voulez pas vous embêter avec la configuration, je recommande d’utiliser un service d’hébergement !

🟢 Je suis partenaire avec **Bisect Hosting**, et vous pouvez installer **Cobblemon Realms en un clic** via leur panneau.

✅ **Avantages :**

- Java 21 préinstallé
- Modpack déjà prêt à l’emploi
- Serveur toujours en ligne
- Interface facile à utiliser
- Meilleure connexion pour les joueurs dans le monde entier

---

🎁 **OFFRE SPÉCIALE**

**25% de réduction** sur votre premier serveur avec le code :  
🧡 `OurStory`

👉 **Lien affilié :**  
https://bisecthosting.com/ourstory

Cela soutient le projet et m’aide à continuer les mises à jour ❤️

📬 **Besoin d’aide ?**  
Posez vos questions sur les salons de support ou de discussion du modpack !\
Je ne répondrai peut-être pas immédiatement, mais la communauté est là aussi :speech_balloon:

🔥 Amusez-vous entre amis et profitez de votre aventure Pokémon sur **Cobblemon Realms** !  
Faisons-en une aventure inoubliable 🧭✨

_Je ne propose pas de support direct pour l’hébergement maison / la redirection de ports — mais de nombreux tutos sont disponibles en ligne !_
