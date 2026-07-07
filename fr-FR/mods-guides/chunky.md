# 🧱 Chunky pour la pré-génération du monde

## ⚙️ Chunky Pregenerator

### 🎯 Introduction

{% hint style="info" %}
<p align="center"><strong>Chunky</strong> est un mod permettant de pré-générer les chunks d'un monde Minecraft afin de réduire les lags et d'améliorer les performances du serveur lors de l'exploration.</p>
{% endhint %}

{% hint style="success" %}
<p align="center">En générant le terrain à l'avance, le serveur n'a plus besoin de calculer les chunks en temps réel lorsque les joueurs découvrent de nouvelles zones.</p>
{% endhint %}

***

## ✨ Fonctionnalités

* 🗺️ Pré-génération des chunks sur une zone ou un rayon défini
* ⚙️ Lancement manuel ou automatique au démarrage du serveur
* 📉 Réduction significative des lags liés à l'exploration
* 🔧 Paramètres entièrement configurables

***

## 🧠 Fonctionnement

Chunky génère le monde **avant l'arrivée des joueurs**.

Cela signifie que :

* le terrain est déjà créé ;
* les structures sont déjà générées ;
* les ressources sont déjà en place.

➡️ Lorsqu'un joueur arrive dans une zone pré-générée, le serveur n'a pratiquement rien à calculer en direct.

***

## ⌨️ Commandes principales

### 📍 Définir une zone

```
/chunky radius <rayon>
```

{% hint style="info" %}
Définit le rayon de pré-génération autour du point de départ.
{% endhint %}

***

### ▶️ Lancer la génération

```
/chunky start
```

{% hint style="info" %}
Démarre la pré-génération des chunks dans la zone définie.
{% endhint %}

***

### 📊 Vérifier la progression

```
/chunky status
```

{% hint style="info" %}
Affiche l'état actuel et la progression de la génération.
{% endhint %}

***

### ❌ Annuler une génération

```
/chunky cancel
```

{% hint style="info" %}
Interrompt immédiatement la pré-génération en cours.
{% endhint %}

***

## ⚙️ Paramètres avancés

Chunky permet notamment de configurer :

* la vitesse de génération ;
* le nombre de chunks générés simultanément ;
* les paramètres généraux via les fichiers présents dans le dossier `config`.

{% hint style="warning" %}
Une vitesse de génération trop élevée peut impacter temporairement les performances du serveur. Adaptez les réglages aux ressources disponibles.
{% endhint %}

***

## 💡 Bonnes pratiques

Pour obtenir les meilleurs résultats :

* ⏰ Lancez la génération pendant les heures creuses.
* 📉 Commencez avec un rayon réduit puis augmentez-le progressivement.
* 🧪 Testez les performances avant de lancer une génération massive.
* 📊 Surveillez régulièrement l'avancement avec `/chunky status`.
* 🤖 Automatisez la génération au démarrage du serveur si nécessaire.

***

## 🎯 Pourquoi utiliser Chunky ?

La pré-génération permet :

* de réduire les pics de lag lors de l'exploration ;
* d'améliorer la stabilité générale du serveur ;
* de fluidifier l'expérience des joueurs ;
* de limiter les ralentissements liés au chargement de nouveaux chunks.

{% hint style="success" %}
Plus votre monde est pré-généré, moins les joueurs rencontreront de ralentissements lors de leurs déplacements.
{% endhint %}

***

## 🔗 Ressources utiles

* [CurseForge](https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge)
* [Wiki Chunky - Guide](https://github.com/pop4959/Chunky/wiki/How-To's)
* [Wiki Chunky - Prégéneration](https://github.com/pop4959/Chunky/wiki/Pregeneration)

***

## 🧾 Résumé

Chunky est un outil essentiel pour les serveurs souhaitant offrir une exploration fluide.

En pré-générant le monde à l'avance :

* ✅ moins de lags ;
* ✅ meilleure stabilité ;
* ✅ exploration plus fluide ;
* ✅ meilleure expérience de jeu pour l'ensemble des joueurs.

{% hint style="info" %}
Un serveur bien pré-généré est un serveur plus agréable à explorer.
{% endhint %}

***

{% hint style="success" %}
### Nous contacter

<p align="center">Si vous avez des questions, des suggestions ou des modifications à proposer, n'hésitez pas à nous rejoindre sur <a href="https://discord.gg/kb8NSTF45n">Discord</a> et à contacter directement <strong>@FabLeKebab</strong> sur le serveur pour tout ce qui concerne le wiki, ou <strong>@Levels</strong> pour tout ce qui concerne le modpack.</p>
{% endhint %}
