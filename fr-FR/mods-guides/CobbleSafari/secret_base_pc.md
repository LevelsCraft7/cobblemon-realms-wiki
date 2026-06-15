# 🧪 PC de Base Secrète

<p align="center">
Le **PC de Base Secrète** est un bloc craftable qui vous permet de créer et gérer votre propre base secrète !
<br>
Contrairement aux bases secrètes des jeux Pokémon DPPt, ce PC ne sert pas à casser des rochers.  
Il fonctionne plutôt comme une <strong>Balise</strong>, mais avec une mécanique entièrement revisitée autour de Cobblemon : les <strong>drapeaux trouvés dans les bases souterraines</strong> permettent de débloquer des effets passifs puissants pour votre zone.
</p>

---

## 🧱 Craft du PC

{% hint style="info" %}
<p align="center">
Le schéma de fabrication du PC de Base Secrète est disponible en jeu via JEI / REI.
</p>
{% endhint %}

![Recette du PC de Base Secrète](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/craft_pc_secret_base.png)

---

## ⚙️ Comment l’utiliser ?

- 🖱️ **Clic droit** sur le bloc : ouvre l’interface du PC
- 🏁 Insérez vos **drapeaux collectés** dans l’emplacement central puis cliquez sur **“Capture”**
- 🔋 Chaque drapeau remplit la **batterie du PC**
- ❌ Impossible d’insérer un drapeau si la batterie est pleine (sauf cas spéciaux d’amélioration)
- 🔄 Les flèches permettent de **changer l’effet actif**
- ⚡ Cliquez sur **“Activate”** pour activer/désactiver l’effet

{% hint style="warning" %}
Casser le PC permet de le récupérer sous forme d’item.  
Le **niveau, la batterie et la progression sont conservés** dans l’objet.
{% endhint %}

---

## 🏅 Rangs du PC

Le PC possède plusieurs **rangs d’évolution**, déterminés par les drapeaux utilisés.

Chaque rang correspond à une couleur :

- 🔵 **Rang 0** : Bleu (départ)
- 🟤 **Rang Cuivre**
- ⚪ **Rang Argent**
- 🟡 **Rang Or**
- 🟣 **Rang Platine**

---

### 📈 Ce que change un rang

Chaque montée de rang améliore :

- 🔋 la **capacité maximale de batterie**
- 📏 la **portée des effets**
- ⚙️ le **nombre d’effets disponibles**
- 💰 le **coût d’activation des effets**

![Interface du PC](https://raw.githubusercontent.com/LevelsCraft7/cobblemon-realms-wiki/refs/heads/main/imgwiki/CobbleSafari/pc_interface.png)

{% hint style="info" %}
Pour améliorer votre PC, insérez simplement un drapeau du rang correspondant.
{% endhint %}

---

## 🌟 Effets disponibles

Le PC de Base Secrète propose 5 types d’effets :

### 🚫 Repousse Pokémon
Empêche les Pokémon de spawn dans la zone.

{% hint style="success" %}
Cet effet ne consomme **aucune batterie**, quel que soit le rang.
{% endhint %}

---

### 🍀 Boosts d’apparition

- 🟢 Apparition **Peu commune**
- 🔵 Apparition **Rare**
- 🟣 Apparition **Ultra-rare**
- ✨ Apparition **Shiny**

Ces effets :

- augmentent les chances de spawn des Pokémon ciblés
- consomment de la batterie lorsqu’ils sont actifs
- se débloquent progressivement selon le rang du PC

---

{% hint style="warning" %}
Les effets du PC sont basés sur les mécaniques des objets **Parfums et Encens**.  
Leur puissance est donc directement liée à ces systèmes.
{% endhint %}

---

## 🧪 Mode Créatif & Administration

Un **drapeau spécial créatif** existe.

Lorsqu’il est inséré dans un PC :

- 🔋 batterie infinie
- ⚙️ tous les coûts sont supprimés
- 🌍 effets illimités

{% hint style="danger" %}
Attention : le PC reste destructible et modifiable même en mode créatif.  
Il est fortement recommandé de le **sécuriser dans une structure protégée**.
{% endhint %}

---

## 📊 Valeurs & configuration

Les paramètres suivants sont modifiables :

- 🔋 capacité de batterie par rang
- 💰 coût des effets
- 🏁 valeur des drapeaux

📁 Fichier de config :
`secretbase_pc_config.json`

{% hint style="info" %}
Une documentation complète des valeurs est disponible dans la référence de configuration.
{% endhint %}

---
