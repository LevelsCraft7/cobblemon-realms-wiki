# Nouveau système de montures (v1.7)

## 🚀 Retrait de l'ancien mod de montures

Nous avons retiré l'add-on **Cobblemon: Ride On!** du modpack et utilisons désormais le système de montures officiel fourni par Cobblemon.
Cela signifie que certains de vos Pokémon préférés pourraient **ne plus être montables**, au moins temporairement.
Notre équipe garde un œil sur ce système et cherchera à étendre la liste des Pokémon montables dès que le mod officiel le permettra.

---

## 🐾 Fonctionnement du système officiel de montures

* Faites un clic droit sur un Pokémon compatible (tout en étant **accroupi**) pour ouvrir l'option de monture.
* Aucune selle n'est requise.
* Le mode de caméra préféré pour chaque style de monture est enregistré et restauré lorsque vous montez ou descendez.
* Vous pouvez ajuster les paramètres de monture dans **`config\cobblemon\main.json`**, par exemple :

  ```json
  "invertRoll": false,
  "invertPitch": false,
  "invertYaw": false,
  "xAxisSensitivity": 1.0,
  "yAxisSensitivity": 1.0,
  "swapXAndYAxes": false,
  "rightingDelay": -1.0,
  "disableRoll": false,
  "displayControlSeconds": 0,
  "infiniteRideStamina": false,
  "rememberRidingCamera": false
  ```

  Si vous souffrez du mal des transports, définissez `"disableRoll": true`.
* Page du wiki officiel pour plus de détails : [Pokémon / Montures](https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Riding)

---

## 📋 Liste des Pokémon montables

Ci-dessous se trouve la liste complète des Pokémon actuellement montables avec le système officiel de Cobblemon.  
Les statistiques sont indiquées par type de monture et proviennent directement du tableau officiel de montures de Cobblemon.

---

<details>
<summary><strong>Pokémon montables (Terrestre)</strong></summary>

| No. Dex | Pokémon                             | Style terrestre | Vitesse | Accél. | Maîtrise | Saut  | Endu.  |
|--------:|-------------------------------------|-----------------|--------|--------|--------|--------|--------|
| 003     | Florizarre                            | Terrestre           | 30-55  | 40-75  | 10-40  | 40-60  | 45-85  |
| 006     | Dracaufeu                           | Terrestre           | 25-40  | 55-65  | 10-25  | 15-25  | 20-30  |
| 009     | Tortank                           | Terrestre           | 30-65  | 30-50  | 10-35  | 15-30  | 15-35  |
| 047     | Parasect                            | Terrestre           | 15-30  | 50-70  | 45-65  | 0-15   | 15-30  |
| 059     | Arcanin                            | Terrestre           | 45-70  | 70-90  | 40-80  | 45-65  | 35-80  |
| 087     | Lamantine                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 111     | Rhinocorne                             | Terrestre           | 25-60  | 5-20   | 5-25   | 5-15   | 40-80  |
| 112     | Rhinoféros                              | Terrestre           | 5-15   | 55-75  | 30-60  | 20-30  | 55-90  |
| 122     | M. Mime                            | Terrestre           | 25-45  | 20-40  | 15-45  | 15-35  | 35-60  |
| 128     | Tauros                              | Terrestre           | 55-75  | 15-50  | 15-30  | 25-35  | 35-55  |
| 128     | Tauros (Paldea-Combat)              | Terrestre           | 55-75  | 15-50  | 15-30  | 25-35  | 35-55  |
| 128     | Tauros (Paldea-Blaze)               | Terrestre           | 55-75  | 20-55  | 15-30  | 25-40  | 30-50  |
| 128     | Tauros (Paldea-Aqua)                | Terrestre           | 50-70  | 15-50  | 15-30  | 25-30  | 40-60  |
| 130     | Léviator                            | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 131     | Lokhlass                              | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 142     | Ptéra                          | Terrestre           | 10-20  | 55-75  | 15-45  | 25-35  | 20-45  |
| 144     | Artikodin                            | Terrestre           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 145     | Électhor                              | Terrestre           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 146     | Sulfura                             | Terrestre           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 149     | Dracolosse                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 168     | Migalos                             | Terrestre           | 30-45  | 55-85  | 45-65  | 25-45  | 15-30  |
| 203     | Girafarig                           | Terrestre           | 25-45  | 40-65  | 20-35  | 30-45  | 30-50  |
| 214     | Scarhino                           | Terrestre           | 15-30  | 55-70  | 40-65  | 35-50  | 35-50  |
| 217     | Ursaring                            | Terrestre           | 30-40  | 45-80  | 20-45  | 25-40  | 30-65  |
| 221     | Cochignon                           | Terrestre           | 10-25  | 30-50  | 30-45  | 5-10   | 35-70  |
| 249     | Lugia                               | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 250     | Ho-Oh                               | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 289     | Monaflèmit                             | Terrestre           | 25-65  | 0-20   | 0-20   | 25-40  | 60-100 |
| 320     | Wailmer                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 321     | Wailord                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 323     | Camérupt                            | Terrestre           | 25-35  | 45-60  | 10-30  | 10-25  | 50-80  |
| 330     | Libégon                              | Terrestre           | 15-25  | 60-75  | 15-25  | 15-30  | 25-40  |
| 334     | Altaria                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 357     | Tropius                             | Terrestre           | 15-25  | 30-50  | 30-50  | 10-20  | 55-85  |
| 373     | Drattak                           | Terrestre           | 10-20  | 60-80  | 5-20   | 15-25  | 35-70  |
| 376     | Métalosse                           | Terrestre           | 10-20  | 50-70  | 35-50  | 30-45  | 55-70  |
| 380     | Latias                              | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 381     | Latios                              | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 398     | Étouraptor                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 411     | Bastiodon                           | Terrestre           | 15-35  | 15-25  | 0-5    | 0-5    | 50-90  |
| 423     | Tritosor                           | Terrestre           | 5-10   | 70-90  | 0-15   | 0-10   | 10-20  |
| 423     | Tritosor (Est)                    | Terrestre           | 5-10   | 70-90  | 0-15   | 0-10   | 10-20  |
| 445     | Carchacrok                            | Terrestre           | 40-55  | 65-75  | 40-70  | 30-50  | 30-45  |
| 463     | Coudlangue                          | Terrestre           | 10-25  | 0-15   | 0-5    | 40-60  | 20-40  |
| 464     | Rhinastoc                           | Terrestre           | 5-15   | 45-75  | 25-55  | 10-25  | 75-100 |
| 468     | Togekiss                            | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 473     | Mammochon                           | Terrestre           | 20-35  | 30-40  | 20-30  | 10-20  | 60-90  |
| 497     | Majaspic                           | Terrestre           | 25-45  | 65-80  | 0-30   | 0-5    | 35-55  |
| 523     | Zéblitz                           | Terrestre           | 35-75  | 65-85  | 45-65  | 35-45  | 25-45  |
| 545     | Brutapode                           | Terrestre           | 45-75  | 20-25  | 25-35  | 25-35  | 50-70  |
| 555     | Darumacho                          | Terrestre           | 40-50  | 45-65  | 15-25  | 35-45  | 35-60  |
| 558     | Crabaraque                             | Terrestre           | 1-5    | 15-45  | 25-35  | 0-5    | 60-85  |
| 623     | Golurk                              | Terrestre           | 35-50  | 65-80  | 40-65  | 40-60  | 60-85  |
| 626     | Frison                          | Terrestre           | 45-65  | 50-75  | 15-30  | 20-30  | 55-70  |
| 628     | Gueriaigle                            | Terrestre           | 10-20  | 90-100 | 15-30  | 10-20  | 15-30  |
| 628     | Gueriaigle de Hisui                    | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 635     | Trioxhydre                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 637     | Pyrax                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 672     | Cabriolaine                              | Terrestre           | 30-45  | 40-65  | 20-40  | 30-40  | 30-45  |
| 673     | Chevroum                              | Terrestre           | 45-65  | 65-75  | 40-60  | 40-60  | 45-65  |
| 697     | Rexillius                           | Terrestre           | 20-30  | 50-70  | 40-60  | 40-55  | 70-100 |
| 715     | Bruyverne                             | Terrestre           | 35-50  | 65-85  | 30-50  | 30-45  | 10-20  |
| 750     | Bourrinos                            | Terrestre           | 30-40  | 50-70  | 30-60  | 30-40  | 70-100 |
| 781     | Sinistrail                            | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 823     | Corvaillus                         | Terrestre           | 15-30  | 60-80  | 30-50  | 30-45  | 60-80  |
| 887     | Lanssorien                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 899     | Cerbyllin                             | Terrestre           | 45-65  | 60-80  | 40-60  | 45-55  | 55-70  |
| 901     | Ursaking                            | Terrestre           | 40-65  | 30-40  | 10-25  | 25-35  | 65-85  |
| 903     | Farfurex                            | Terrestre           | 35-45  | 75-90  | 65-85  | 30-40  | 10-20  |
| 941     | Zapétrel                         | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 956     | Cléopsytra                            | Terrestre           | 55-70  | 30-65  | 15-40  | 40-55  | 25-35  |
| 966     | Vrombotor                           | Terrestre           | 70-85  | 0-5    | 25-40  | 15-20  | 20-40  |
| 967     | Motorizard                            | Terrestre           | 50-85  | 65-85  | 35-60  | 35-45  | 30-60  |
| 968     | Ferdeter                            | Terrestre           | 30-40  | 15-25  | 0-15   | 0-5    | 25-75  |
| 977     | Oyacata                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 981     | Farigiraf                           | Terrestre           | 45-60  | 40-60  | 35-50  | 45-55  | 50-70  |
| 982     | Deusolourdo                         | Terrestre           | 5-25   | 30-50  | 30-40  | 20-45  | 30-75  |
| 982     | Deusolourdo (Forme Trois Segments)         | Terrestre           | 5-25   | 35-60  | 30-40  | 25-55  | 35-85  |

</details>

---

<details>
<summary><strong>Pokémon montables (Aquatique)</strong></summary>

| No. Dex | Pokémon                             | Style aquatique | Vitesse | Accél. | Maîtrise | Saut  | Endu.  |
|--------:|-------------------------------------|------------------|--------|--------|--------|--------|--------|
| 009     | Tortank                           | Plongée        | 35-65  | 45-65  | 50-75  | 30-50  | 35-70  |
| 087     | Lamantine                             | Nage rapide          | 25-45  | 50-75  | 30-65  | 25-50  | 25-50  |
| 119     | Poissoroy                             | Plongée        | 35-65  | 35-70  | 25-55  | 15-35  | 20-40  |
| 128     | Tauros (Paldea-Aqua)                | Navigation             | 30-40  | 55-65  | 40-55  | 20-30  | 30-65  |
| 130     | Léviator                            | Nage rapide          | 30-55  | 40-60  | 35-65  | 40-70  | 45-75  |
| 131     | Lokhlass                              | Navigation             | 25-40  | 30-55  | 50-75  | 20-30  | 45-75  |
| 149     | Dracolosse                           | Nage rapide          | 30-50  | 30-65  | 35-50  | 55-85  | 60-90  |
| 249     | Lugia                               | Nage rapide          | 60-80  | 80-100 | 75-95  | 75-90  | 80-100 |
| 319     | Sharpedo                            | Nage rapide          | 55-85  | 55-85  | 25-65  | 45-75  | 20-45  |
| 320     | Wailmer                             | Plongée        | 30-50  | 30-55  | 30-55  | 25-40  | 40-85  |
| 321     | Wailord                             | Plongée        | 20-40  | 20-45  | 30-55  | 40-55  | 65-100 |
| 369     | Relicanth                           | Plongée        | 15-35  | 25-40  | 40-80  | 50-75  | 50-90  |
| 445     | Carchacrok                            | Navigation             | 35-60  | 75-85  | 10-25  | 40-80  | 5-10   |
| 781     | Sinistrail                            | Plongée        | 15-30  | 40-55  | 20-30  | 70-100 | 45-65  |
| 887     | Lanssorien                           | Nage rapide          | 50-65  | 60-85  | 55-70  | 40-55  | 25-35  |
| 977     | Oyacata                             | Plongée        | 25-45  | 45-65  | 50-75  | 10-25  | 60-75  |

</details>

---

<details>
<summary><strong>Pokémon montables (Aérien / Vol stationnaire)</strong></summary>

| No. Dex | Pokémon                             | Style aérien    | Vitesse | Accél. | Maîtrise | Saut  | Endu.  |
|--------:|-------------------------------------|----------------|--------|--------|--------|--------|--------|
| 006     | Dracaufeu                           | Vol classique           | 30-65  | 45-75  | 55-85  | 30-65  | 30-65  |
| 009     | Tortank                           | Propulsion         | 5-15   | 5-40   | 30-60  | 10-20  | 2-20   |
| 142     | Ptéra                          | Vol classique           | 45-75  | 30-65  | 35-70  | 45-75  | 20-50  |
| 144     | Artikodin                            | Vol classique           | 65-90  | 70-85  | 80-100 | 65-90  | 70-85  |
| 145     | Électhor                              | Vol classique           | 80-100 | 65-90  | 70-85  | 70-85  | 65-90  |
| 146     | Sulfura                             | Vol classique           | 70-85  | 70-85  | 65-90  | 65-90  | 80-100 |
| 149     | Dracolosse                           | Vol rapide            | 40-60  | 35-50  | 50-85  | 50-70  | 50-85  |
| 205     | Foretress                          | Vol stationnaire          | 15-25  | 20-40  | 25-45  | 5-10   | 0-5    |
| 214     | Scarhino                           | Vol classique           | 35-50  | 40-65  | 55-85  | 0-5    | 15-40  |
| 249     | Lugia                               | Vol classique           | 60-80  | 65-85  | 60-80  | 75-90  | 65-90  |
| 250     | Ho-Oh                               | Vol classique           | 75-90  | 75-95  | 65-85  | 75-100 | 80-100 |
| 330     | Libégon                              | Vol classique           | 50-80  | 40-75  | 40-85  | 45-60  | 35-55  |
| 334     | Altaria                             | Vol classique           | 25-35  | 25-45  | 40-50  | 25-45  | 70-90  |
| 344     | Kaorine                             | Vol stationnaire          | 10-20  | 55-80  | 50-75  | 15-30  | 35-55  |
| 357     | Tropius                             | Vol classique           | 20-45  | 20-45  | 20-40  | 70-90  | 40-70  |
| 373     | Drattak                           | Vol classique           | 60-75  | 60-75  | 40-65  | 60-85  | 55-80  |
| 376     | Métalosse                           | Vol stationnaire          | 40-65  | 60-75  | 30-45  | 30-50  | 10-25  |
| 380     | Latias                              | Vol rapide            | 75-90  | 70-95  | 70-95  | 85-100 | 85-100 |
| 381     | Latios                              | Vol rapide            | 85-100 | 70-95  | 70-95  | 80-100 | 70-95  |
| 398     | Étouraptor                           | Vol classique           | 35-55  | 45-70  | 25-45  | 45-65  | 25-60  |
| 426     | Grodrive                            | Vol stationnaire          | 5-10   | 20-30  | 15-30  | 40-80  | 30-80  |
| 437     | Archéodong                            | Vol stationnaire          | 15-25  | 35-65  | 20-40  | 25-45  | 25-45  |
| 445     | Carchacrok                            | Vol rapide            | 70-80  | 50-70  | 50-60  | 20-70  | 30-50  |
| 462     | Magnézone                           | Vol stationnaire          | 15-30  | 45-65  | 35-50  | 45-65  | 5-15   |
| 468     | Togekiss                            | Vol rapide            | 20-30  | 20-30  | 45-65  | 10-20  | 70-100 |
| 477     | Noctunoir                            | Vol stationnaire          | 15-25  | 40-60  | 60-70  | 50-80  | 0-5    |
| 601     | Cliticlic                           | Vol stationnaire          | 25-35  | 30-50  | 40-60  | 10-20  | 5-10   |
| 623     | Golurk                              | Propulsion         | 45-75  | 10-35  | 15-30  | 25-40  | 30-50  |
| 628     | Gueriaigle                            | Vol classique           | 45-70  | 35-55  | 30-50  | 35-55  | 45-75  |
| 628     | Gueriaigle de Hisui                    | Vol classique           | 40-65  | 30-50  | 30-50  | 40-60  | 50-80  |
| 635     | Trioxhydre                           | Vol classique           | 45-60  | 35-55  | 30-60  | 5-10   | 70-100 |
| 637     | Pyrax                           | Vol classique           | 30-50  | 45-65  | 55-75  | 25-35  | 60-90  |
| 715     | Bruyverne                             | Vol classique           | 55-90  | 40-65  | 50-85  | 55-85  | 10-30  |
| 823     | Corvaillus                         | Vol classique           | 25-40  | 35-55  | 20-35  | 80-100 | 80-100 |
| 887     | Lanssorien                           | Vol rapide            | 55-90  | 60-85  | 55-70  | 45-80  | 25-35  |
| 941     | Zapétrel                         | Vol classique           | 30-40  | 35-50  | 45-60  | 50-65  | 55-70  |

</details>


**Important :** les statistiques affichées sont fournies à titre indicatif et peuvent changer dans de futures mises à jour.

---

## 📣 Ce que cela signifie pour le modpack

* Si votre Pokémon préféré n'est *pas* encore montable, ne paniquez pas. Il pourra être ajouté au fur et à mesure que les mécaniques officielles s'étendent.
* Pour l'instant, il faut ajuster les attentes des joueurs : certaines mécaniques de monture disponibles dans les versions précédentes peuvent être désactivées.
* Nous suivrons les mises à jour du mod et publierons des correctifs lorsque de nouvelles options de monture seront disponibles.
