# 🥚 Œufs sauvages et Incubateurs

{% hint style="info" %}
<p align="center">
Dans le safari, vous pouvez parfois trouver des <strong>nids sauvages</strong>. Faites un clic droit dessus pour récupérer un œuf ! Ces œufs inconnus donnent naissance à un Pokémon rare d’un type spécifique, avec des chances de shiny augmentées. Mais ils ne peuvent pas éclore seuls : il vous faut un <strong>Incubateur</strong>.
</p>
{% endhint %}

---

## 🔥 Incubateur

Une fois posé :
- Faites un clic droit avec un œuf (œuf sauvage ou œuf Cobbreeding) pour l’insérer
- Attendez la fin de l’incubation (progression visible sur le bloc ou via Jade/WTHIT)
- À la fin du timer, cliquez avec **n’importe quelle Poké Ball** pour récupérer le Pokémon

{% hint style="success" %}
<p align="center">
Si vous cassez l’incubateur, le bloc est récupéré et l’œuf (avec sa progression) est sauvegardé. Reposez-le pour reprendre l’incubation.
</p>
{% endhint %}

![Recette de fabrication de l’Incubateur]

---

## 🧬 Compatibilité Cobbreeding

Les œufs Cobbreeding sont compatibles avec l’incubateur :

- ⏱️ Temps d’éclosion réduit de **33%**
- 🎯 Choix de la Poké Ball à la récupération

{% hint style="warning" %}
<p align="center">
Si Cobbreeding est retiré pendant l’incubation, les données cryptées sont perdues, mais l’espèce et le temps restant sont conservés.
</p>
{% endhint %}

---

## ⚙️ Configuration

Le fichier `incubator_config.json` permet de personnaliser le système :

- `defaultWildEggHatchTimeTicks` → temps d’éclosion des œufs sauvages (défaut : 14400)
- `cobbreedingHatchSpeedMultiplier` → vitesse Cobbreeding (défaut : 0.66)

📘 Détails complets ici :  
https://cobblesafari.maxigregrze.fr/en/addons/config_incubator_config
