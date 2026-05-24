# Nouveau système de montures (v1.7)

## 🚀 Retrait de l'ancien mod de montures

Nous avons retiré l'add-on **Cobblemon: Ride On!** du modpack et utilisons désormais le système de montures officiel fourni par Cobblemon.  
Cela signifie que certains de vos Pokémon préférés pourraient **ne plus être montables**, au moins temporairement.  
Notre équipe garde un œil sur ce système et cherchera à étendre la liste des Pokémon montables dès que le mod officiel le permettra.

---

## 🐾 Fonctionnement du système officiel de montures

### ♾️ Endurance de monture infinie (Cobblemon Realms)

Dans **Cobblemon Realms**, l’endurance de monture est **infinie pour tous les Pokémon montables**.

Cela signifie :

- 🟢 Vous ne manquez jamais d’endurance en montant un Pokémon
- 🟢 Les déplacements longue distance sont toujours possibles
- 🟢 Aucune gestion de stamina n’est nécessaire

Ceci est une **personnalisation propre au modpack**, différente du Cobblemon de base.

---

### 🎮 Utilisation des montures

- Faites un clic droit sur un Pokémon compatible (tout en étant **accroupi**) pour ouvrir l’option de monture.
- Aucune selle n’est requise.
- Le mode caméra préféré pour chaque style de monture est enregistré et restauré lorsque vous montez ou descendez.
- Vous pouvez ajuster les paramètres de monture dans `config\cobblemon\main.json`, par exemple :

```json
{
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
}
````

💡 Si vous souffrez du mal des transports, définissez `"disableRoll": true`.

---

## 📚 Documentation officielle

* 🔗 [https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Riding](https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Riding)

---

## 📋 Liste des Pokémon montables

Ci-dessous se trouve la liste complète des Pokémon actuellement montables avec le système officiel de Cobblemon.
Les statistiques sont indiquées par type de monture et proviennent directement du tableau officiel des montures Cobblemon.

---

<details>
<summary><strong>🐾 Liste des montures terrestres</strong></summary>
```

---

| No. Dex | Pokémon                                               | Style terrestre | Vitesse | Accél. | Skill  | Jump  | Stam. |
| ----------------------: | ----------------------------------------------------- | --------------- | ------- | ---------------------- | ------ | ----- | --------------------- |
|                     003 | Florizarre                                            | Horse           | 30-55   | 40-75                  | 10-40  | 40-60 | ∞                     |
|                     006 | Dracaufeu                                             | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     009 | Tortank                                               | Horse           | 30-65   | 30-50                  | 10-35  | 15-30 | ∞                     |
|                     012 | Papilusion                                            | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     018 | Roucarnage                                            | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     022 | Rapasdepic                                            | Horse           | 30-50   | 45-65                  | 20-40  | 20-35 | ∞                     |
|                     024 | Arbok                                                 | Horse           | 25-45   | 65-80                  | 0-30   | 0-5   | ∞                     |
|                     031 | Nidoqueen                                             | Horse           | 30-40   | 50-70                  | 30-60  | 30-40 | ∞                     |
|                     034 | Nidoking                                              | Horse           | 40-55   | 65-75                  | 40-70  | 30-50 | ∞                     |
|                     036 | Mélodelfe                                             | Horse           | 30-45   | 35-55                  | 35-55  | 20-35 | ∞                     |
|                     038 | Feunard                                               | Horse           | 45-70   | 65-85                  | 40-75  | 40-60 | ∞                     |
|                     040 | Grodoudou                                             | Horse           | 10-25   | 0-15                   | 0-5    | 40-60 | ∞                     |
|                     042 | Nosferalto                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     045 | Rafflesia                                             | Horse           | 30-50   | 45-70                  | 30-55  | 30-45 | ∞                     |
|                     047 | Parasect                                              | Horse           | 15-30   | 50-70                  | 45-65  | 0-15  | ∞                     |
|                     053 | Persian                                               | Horse           | 60-80   | 60-80                  | 70-90  | 35-55 | ∞                     |
|                     057 | Colossinge                                            | Horse           | 55-75   | 65-85                  | 60-80  | 35-55 | ∞                     |
|                     059 | Arcanin                                               | Horse           | 45-70   | 70-90                  | 40-80  | 45-65 | ∞                     |
|                     062 | Tartard                                               | Horse           | 30-50   | 35-55                  | 50-70  | 35-55 | ∞                     |
|                     065 | Alakazam                                              | Horse           | 60-85   | 65-85                  | 75-95  | 25-45 | ∞                     |
|                     068 | Mackogneur                                            | Horse           | 45-65   | 50-70                  | 70-90  | 55-75 | ∞                     |
|                     071 | Empiflor                                              | Horse           | 2-20    | 25-40                  | 30-45  | 10-20 | ∞                     |
|                     073 | Tentacruel                                            | Horse           | 5-20    | 5-20                   | 20-40  | 0-5   | ∞                     |
|                     076 | Grolem                                                | Horse           | 18-28   | 20-35                  | 25-40  | 10-20 | ∞                     |
|                     080 | Flagadoss                                             | Horse           | 30-80   | 20-35                  | 20-35  | 10-20 | ∞                     |
|                     085 | Dodrio                                                | Horse           | 65-100  | 60-85                  | 50-75  | 25-45 | ∞                     |
|                     087 | Lamantine                                             | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     089 | Grotadmorv                                            | Horse           | 25-45   | 20-40                  | 20-40  | 10-25 | ∞                     |
|                     091 | Crustabri                                             | Horse           | 30-65   | 30-50                  | 10-35  | 15-30 | ∞                     |
|                     094 | Ectoplasma                                            | Horse           | 25-40   | 35-55                  | 45-65  | 20-35 | ∞                     |
|                     099 | Krabboss                                              | Horse           | 20-40   | 25-50                  | 20-40  | 10-25 | ∞                     |
|                   50-90 | Noadkoko                                              | Horse           | 20-35   | 20-40                  | 15-35  | 5-20  | ∞                     |
|                     108 | Excelangue                                            | Horse           | 10-25   | 5-20                   | 5-20   | 10-25 | ∞                     |
|                     111 | Rhinastoc                                             | Horse           | 25-60   | 5-20                   | 5-25   | 5-15  | ∞                     |
|                     112 | Rhinoféros                                            | Horse           | 5-15    | 55-75                  | 30-60  | 20-30 | ∞                     |
|                     113 | Leveinard                                             | Horse           | 5-20    | 0-15                   | 0-20   | 5-15  | ∞                     |
|                   50-90 | Kangourex                                             | Horse           | 45-65   | 50-75                  | 30-50  | 25-45 | ∞                     |
|                     122 | Migalos                                               | Horse           | 25-45   | 20-40                  | 15-45  | 15-35 | ∞                     |
|                     128 | Tauros                                                | Horse           | 55-75   | 15-50                  | 15-30  | 25-35 | ∞                     |
|                     128 | Tauros (Paldea-Aqua)                                  | Horse           | 50-70   | 15-50                  | 15-30  | 25-30 | ∞                     |
|                     128 | Tauros (Paldea-Blaze)                                 | Horse           | 55-75   | 20-55                  | 15-30  | 25-40 | ∞                     |
|                     128 | Tauros (Paldea-Combat)                                | Horse           | 55-75   | 15-50                  | 15-30  | 25-35 | ∞                     |
|                     130 | Léviator                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     131 | Lokhlass                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     134 | Aquali                                                | Horse           | 20-45   | 25-50                  | 35-60  | 20-35 | ∞                     |
|                   35-85 | Voltali                                               | Horse           | 40-70   | 45-75                  | 35-60  | 25-45 | ∞                     |
|                     136 | Pyroli                                                | Horse           | 25-45   | 25-45                  | 30-55  | 25-40 | ∞                     |
|                     142 | Ptéra                                                 | Horse           | 10-20   | 55-75                  | 15-45  | 25-35 | ∞                     |
|                     143 | Ronflex                                               | Horse           | 15-35   | 0-20                   | 20-50  | 10-25 | ∞                     |
|                     144 | Artikodin                                             | Horse           | 10-20   | 70-90                  | 30-60  | 25-50 | ∞                     |
|                     145 | Zapétrel                                              | Horse           | 10-20   | 70-90                  | 30-60  | 25-50 | ∞                     |
|                     146 | Sulfura                                               | Horse           | 10-20   | 70-90                  | 30-60  | 25-50 | ∞                     |
|                     149 | Dracolosse                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     154 | Méganium                                              | Horse           | 25-45   | 35-60                  | 20-45  | 30-55 | ∞                     |
|                     157 | Typhlosion                                            | Horse           | 40-60   | 45-70                  | 25-45  | 25-40 | ∞                     |
|                     160 | Aligatueur                                            | Horse           | 30-50   | 30-55                  | 25-45  | 25-40 | ∞                     |
|                     162 | Fouinar                                               | Horse           | 35-60   | 40-65                  | 40-60  | 20-35 | ∞                     |
|                     164 | Noctunoir                                             | Horse           | 20-35   | 35-55                  | 15-30  | 10-25 | ∞                     |
|                     166 | Coxyclaque                                            | Horse           | 20-35   | 25-40                  | 20-40  | 10-25 | ∞                     |
|                     168 | Migalos                                               | Horse           | 30-45   | 55-85                  | 45-65  | 25-45 | ∞                     |
|                     178 | Xatu                                                  | Horse           | 10-25   | 10-30                  | 30-50  | 10-25 | ∞                     |
|                     181 | Pharamp                                               | Horse           | 20-40   | 25-45                  | 35-60  | 10-25 | ∞                     |
|                     184 | Azumarill                                             | Horse           | 20-40   | 20-35                  | 25-45  | 15-30 | ∞                     |
|                     189 | Cotovol                                               | Horse           | 15-30   | 20-40                  | 25-45  | 20-35 | ∞                     |
|                     193 | Yanma                                                 | Horse           | 10-25   | 20-40                  | 20-35  | 15-30 | ∞                     |
|                     195 | Maraiste                                              | Horse           | 20-35   | 20-35                  | 20-40  | 10-25 | ∞                     |
|                     196 | Mentali                                               | Horse           | 45-75   | 35-60                  | 45-70  | 20-35 | ∞                     |
|                     197 | Noctali                                               | Horse           | 25-50   | 25-45                  | 40-65  | 15-25 | ∞                     |
|                     199 | Roigada                                               | Horse           | 20-40   | 15-35                  | 40-60  | 10-20 | ∞                     |
|                     202 | Qulbutoké                                             | Horse           | 5-25    | 5-25                   | 20-35  | 0-10  | ∞                     |
|                     203 | Girafarig                                             | Horse           | 25-45   | 40-65                  | 20-35  | 30-45 | ∞                     |
|                     208 | Steelix                                               | Horse           | 10-30   | 15-35                  | 35-60  | 0-10  | ∞                     |
|                     210 | Granbull                                              | Horse           | 25-45   | 35-55                  | 20-40  | 20-35 | ∞                     |
|                     212 | Dracaufeu                                             | Horse           | 40-65   | 55-75                  | 45-70  | 15-30 | ∞                     |
|                     214 | Scarhino                                              | Horse           | 15-30   | 55-70                  | 40-65  | 35-50 | ∞                     |
|                     217 | Ursaring                                              | Horse           | 30-40   | 45-80                  | 20-45  | 25-40 | ∞                     |
|                     219 | Volcaropod                                            | Horse           | 1-10    | 0-15                   | 25-45  | 0-5   | ∞                     |
|                     221 | Pyrax                                                 | Horse           | 10-25   | 30-50                  | 30-45  | 5-10  | ∞                     |
|                     227 | Airmure                                               | Horse           | 20-35   | 20-35                  | 20-35  | 10-25 | ∞                     |
|                     229 | Démolosse                                             | Horse           | 40-65   | 55-80                  | 30-60  | 25-45 | ∞                     |
|                     232 | Donphan                                               | Horse           | 30-50   | 30-45                  | 25-40  | 20-35 | ∞                     |
|                     234 | Cerfrousse                                            | Horse           | 50-75   | 40-65                  | 30-55  | 25-45 | ∞                     |
|                     241 | Écrémeuh                                              | Horse           | 35-60   | 30-55                  | 25-45  | 20-35 | ∞                     |
|                     242 | Leuphorie                                             | Horse           | 10-25   | 5-20                   | 10-25  | 5-15  | ∞                     |
|                     248 | Tyranocif                                             | Horse           | 20-35   | 30-55                  | 40-60  | 15-30 | ∞                     |
|                     249 | Lugia                                                 | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     250 | Ho-Oh                                                 | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     254 | Jungko                                                | Horse           | 40-70   | 40-70                  | 45-75  | 35-60 | ∞                     |
|                     257 | Braségali                                             | Horse           | 35-65   | 40-70                  | 40-70  | 40-70 | ∞                     |
|                     260 | Laggron                                               | Horse           | 35-65   | 35-65                  | 40-70  | 30-55 | ∞                     |
|                     262 | Grahyèna                                              | Horse           | 30-55   | 25-50                  | 30-55  | 20-40 | ∞                     |
|                     272 | Ludicolo                                              | Horse           | 20-40   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                   25-75 | Tengalice                                             | Horse           | 25-50   | 25-45                  | 40-70  | 20-40 | ∞                     |
|                     277 | Saut                                                  | Horse           | 15-30   | 15-35                  | 25-40  | 15-30 | ∞                     |
|                     279 | Bekipan                                               | Horse           | 15-30   | 15-35                  | 25-40  | 15-30 | ∞                     |
|                     282 | Gardevoir                                             | Horse           | 20-45   | 25-50                  | 35-65  | 15-30 | ∞                     |
|                     289 | Saut                                                  | Horse           | 25-65   | 0-20                   | 0-20   | 25-40 | ∞                     |
|                     295 | Brouhabam                                             | Horse           | 15-35   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                     297 | Hariyama                                              | Horse           | 15-35   | 15-35                  | 30-55  | 10-25 | ∞                     |
|                     306 | Galeking                                              | Horse           | 20-45   | 20-45                  | 35-65  | 20-40 | ∞                     |
|                     308 | Charmina                                              | Horse           | 35-65   | 35-60                  | 55-80  | 25-50 | ∞                     |
|                     310 | Élecsprint                                            | Horse           | 35-65   | 35-65                  | 30-55  | 20-40 | ∞                     |
|                     320 | Wailmer                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     321 | Wailord                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     323 | Camérupt                                              | Horse           | 25-35   | 45-60                  | 10-30  | 10-25 | ∞                     |
|                     324 | Chartor                                               | Horse           | 10-25   | 10-25                  | 30-55  | 10-20 | ∞                     |
|                     330 | Libégon                                               | Horse           | 15-25   | 60-75                  | 15-25  | 15-30 | ∞                     |
|                     334 | Altaria                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     342 | Colhomard                                             | Horse           | 10-25   | 15-35                  | 25-45  | 15-30 | ∞                     |
|                     348 | Armaldo                                               | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     357 | Tropius                                               | Horse           | 15-25   | 30-50                  | 30-50  | 10-20 | ∞                     |
|                     359 | Absol                                                 | Horse           | 30-55   | 30-55                  | 40-70  | 25-45 | ∞                     |
|                     365 | Kaimorse                                              | Horse           | 10-25   | 15-35                  | 30-55  | 10-20 | ∞                     |
|                     373 | Drattak                                               | Horse           | 10-20   | 60-80                  | 5-20   | 15-25 | ∞                     |
|                     376 | Métalosse                                             | Horse           | 10-20   | 50-70                  | 35-50  | 30-45 | ∞                     |
|                     377 | Regirock                                              | Horse           | 15-30   | 10-30                  | 35-60  | 10-25 | ∞                     |
|                     378 | Regice                                                | Horse           | 15-30   | 10-30                  | 35-60  | 10-25 | ∞                     |
|                     379 | Registeel                                             | Horse           | 15-30   | 10-30                  | 35-60  | 10-25 | ∞                     |
|                     380 | Latias                                                | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     381 | Latios                                                | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     389 | Torterra                                              | Horse           | 15-35   | 15-35                  | 35-60  | 15-30 | ∞                     |
|                     392 | Simiabraz                                             | Horse           | 30-55   | 30-55                  | 35-65  | 25-45 | ∞                     |
|                     395 | Pingoléon                                             | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     398 | Étouraptor                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     400 | Castorno                                              | Horse           | 15-30   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                     405 | Luxray                                                | Horse           | 25-50   | 25-50                  | 40-70  | 20-40 | ∞                     |
|                     409 | Charkos                                               | Horse           | 15-35   | 20-45                  | 35-60  | 20-35 | ∞                     |
|                     411 | Bastiodon                                             | Horse           | 15-35   | 15-25                  | 0-5    | 0-5   | ∞                     |
|                     423 | Tritosor                                              | Horse           | 5-10    | 70-90                  | 0-15   | 0-10  | ∞                     |
|                     423 | Tritosor (East)                                       | Horse           | 5-10    | 70-90                  | 0-15   | 0-10  | ∞                     |
|                     428 | Lockpin                                               | Horse           | 20-40   | 20-40                  | 45-70  | 20-40 | ∞                     |
|                     430 | Corboss                                               | Horse           | 10-25   | 10-30                  | 25-45  | 10-25 | ∞                     |
|                     445 | Carchacrok                                            | Horse           | 40-55   | 65-75                  | 40-70  | 30-50 | ∞                     |
|                     448 | Lucario                                               | Horse           | 25-50   | 25-50                  | 40-70  | 25-45 | ∞                     |
|                     450 | Rhinoféros                                            | Horse           | 20-40   | 15-35                  | 25-45  | 15-30 | ∞                     |
|                     452 | Drascore                                              | Horse           | 20-40   | 20-40                  | 35-60  | 15-30 | ∞                     |
|                     454 | Coatox                                                | Horse           | 20-45   | 20-45                  | 35-60  | 25-45 | ∞                     |
|                     463 | Coudlangue                                            | Horse           | 10-25   | 0-15                   | 0-5    | 40-60 | ∞                     |
|                     464 | Rexillius                                             | Horse           | 5-15    | 45-75                  | 25-55  | 10-25 | ∞                     |
|                     465 | Bouldeneu                                             | Horse           | 15-30   | 15-30                  | 35-60  | 10-25 | ∞                     |
|                     466 | Élekable                                              | Horse           | 30-60   | 30-55                  | 40-70  | 25-40 | ∞                     |
|                     467 | Maganon                                               | Horse           | 15-40   | 20-45                  | 30-55  | 15-30 | ∞                     |
|                     468 | Togekiss                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     469 | Yanmega                                               | Horse           | 12-30   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                     470 | Phyllali                                              | Horse           | 20-45   | 20-45                  | 35-60  | 20-35 | ∞                     |
|                     471 | Givrali                                               | Horse           | 20-45   | 20-45                  | 35-60  | 20-35 | ∞                     |
|                     472 | Lokhlass                                              | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     473 | Mammochon                                             | Horse           | 20-35   | 30-40                  | 20-30  | 10-20 | ∞                     |
|                     475 | Gallame                                               | Horse           | 40-70   | 40-65                  | 55-80  | 30-55 | ∞                     |
|                     486 | Regigigas                                             | Horse           | 35-80   | 10-25                  | 60-85  | 10-22 | ∞                     |
|                     497 | Majaspic                                              | Horse           | 25-45   | 65-80                  | 0-30   | 0-5   | ∞                     |
|                     500 | Roitiflam                                             | Horse           | 25-45   | 25-45                  | 35-60  | 20-35 | ∞                     |
|                     503 | Clamiral                                              | Horse           | 20-40   | 20-40                  | 30-55  | 15-30 | ∞                     |
|                     508 | Mastouffe                                             | Horse           | 25-50   | 25-45                  | 35-60  | 20-35 | ∞                     |
|                     510 | Léopardus                                             | Horse           | 30-55   | 30-55                  | 35-60  | 20-35 | ∞                     |
|                     521 | Déflaisan                                             | Horse           | 20-40   | 20-40                  | 25-45  | 20-35 | ∞                     |
|                     523 | Rexillius                                             | Horse           | 35-75   | 65-85                  | 45-65  | 35-45 | ∞                     |
|                     526 | Gigalithe                                             | Horse           | 10-30   | 10-30                  | 35-60  | 15-30 | ∞                     |
|                     528 | Rhinolove                                             | Horse           | 20-40   | 20-40                  | 25-45  | 20-35 | ∞                     |
|                     530 | Minotaupe                                             | Horse           | 25-55   | 30-60                  | 35-60  | 20-35 | ∞                     |
|                     534 | Bétochef                                              | Horse           | 10-25   | 10-25                  | 30-55  | 10-25 | ∞                     |
|                     545 | Brutapode                                             | Horse           | 45-75   | 20-25                  | 25-35  | 25-35 | ∞                     |
|                     553 | Cliticlic                                             | Horse           | 30-55   | 25-50                  | 40-70  | 20-40 | ∞                     |
|                     555 | Darumacho                                             | Horse           | 40-50   | 45-65                  | 15-25  | 35-45 | ∞                     |
|                     558 | Crabaraque                                            | Horse           | 1-5     | 15-45                  | 25-35  | 0-5   | ∞                     |
|                     563 | Tutankafer                                            | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     565 | Mégapagos                                             | Horse           | 15-35   | 15-35                  | 30-55  | 10-25 | ∞                     |
|                     567 | Aéroptéryx                                            | Horse           | 25-45   | 20-40                  | 30-55  | 20-35 | ∞                     |
|                     569 | Miasmax                                               | Horse           | 10-25   | 10-25                  | 20-40  | 10-20 | ∞                     |
|                     571 | Zoroark                                               | Horse           | 30-55   | 30-55                  | 40-65  | 20-35 | ∞                     |
|                     576 | Sidérella                                             | Horse           | 20-45   | 20-45                  | 35-65  | 15-30 | ∞                     |
|                     586 | Haydaim                                               | Horse           | 25-50   | 25-50                  | 35-60  | 25-45 | ∞                     |
|                     591 | Gaulet                                                | Horse           | 10-25   | 10-25                  | 30-55  | 10-20 | ∞                     |
|                     596 | Mygavolt                                              | Horse           | 25-50   | 25-45                  | 35-60  | 20-35 | ∞                     |
|                     598 | Noacier                                               | Horse           | 5-20    | 5-20                   | 45-70  | 5-15  | ∞                     |
|                     612 | Tranchodon                                            | Horse           | 30-55   | 30-55                  | 35-65  | 25-45 | ∞                     |
|                     614 | Ursaking                                              | Horse           | 20-45   | 20-45                  | 30-55  | 20-35 | ∞                     |
|                     617 | Limaspeed                                             | Horse           | 30-55   | 30-60                  | 40-70  | 15-30 | ∞                     |
|                     620 | Shaofouine                                            | Horse           | 35-60   | 35-60                  | 45-70  | 20-35 | ∞                     |
|                     621 | Drakkarmin                                            | Horse           | 20-45   | 20-45                  | 35-65  | 20-35 | ∞                     |
|                     623 | Golemastoc                                            | Horse           | 35-50   | 65-80                  | 40-65  | 40-60 | ∞                     |
|                     626 | Bourrinos                                             | Horse           | 45-65   | 50-75                  | 15-30  | 20-30 | ∞                     |
|                     628 | Bruyverne                                             | Horse           | 10-20   | 90-100                 | 15-30  | 10-20 | ∞                     |
|                     628 | Gueriaigle (Hisui)                                    | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     631 | Aflamanoir                                            | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     632 | Fermite                                               | Horse           | 15-35   | 20-40                  | 40-70  | 10-25 | ∞                     |
|                     635 | Trioxhydre                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     637 | Pyrax                                                 | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     638 | Rhinocorne                                            | Horse           | 35-55   | 35-50                  | 35-55  | 30-45 | ∞                     |
|                     639 | Terrakium                                             | Horse           | 35-55   | 35-50                  | 35-55  | 30-45 | ∞                     |
|                     652 | Blindépique                                           | Horse           | 25-45   | 30-55                  | 35-60  | 20-35 | ∞                     |
|                     655 | Goupelin                                              | Horse           | 30-55   | 35-60                  | 50-75  | 20-35 | ∞                     |
|                     658 | Amphinobi                                             | Horse           | 45-75   | 55-80                  | 50-75  | 35-55 | ∞                     |
|                     663 | Flambusard                                            | Horse           | 25-45   | 35-55                  | 20-40  | 15-30 | ∞                     |
|                     672 | Saut                                                  | Horse           | 30-45   | 40-65                  | 20-40  | 30-40 | ∞                     |
|                     673 | Chevroum                                              | Horse           | 45-65   | 65-75                  | 40-60  | 40-60 | ∞                     |
|                     676 | Couafarel                                             | Horse           | 45-70   | 40-65                  | 30-55  | 25-40 | ∞                     |
|                     689 | Golgopathe                                            | Horse           | 25-40   | 30-50                  | 35-55  | 15-30 | ∞                     |
|                     696 | Ptyranidur                                            | Horse           | 25-40   | 25-40                  | 40-60  | 20-35 | ∞                     |
|                     697 | Tritosor                                              | Horse           | 20-30   | 50-70                  | 40-60  | 40-55 | ∞                     |
|                     699 | Dragmara                                              | Horse           | 20-40   | 30-55                  | 25-45  | 15-30 | ∞                     |
|                     706 | Muplodocus                                            | Horse           | 20-40   | 30-55                  | 40-70  | 15-30 | ∞                     |
|                     709 | Desséliande                                           | Horse           | 20-35   | 25-45                  | 45-75  | 10-25 | ∞                     |
|                     713 | Séracrawl                                             | Horse           | 10-25   | 15-30                  | 40-70  | 5-15  | ∞                     |
|                     715 | Rhinoféros                                            | Horse           | 35-50   | 65-85                  | 30-50  | 30-45 | ∞                     |
|                     724 | Archéduc                                              | Horse           | 20-40   | 25-45                  | 40-60  | 15-30 | ∞                     |
|                     727 | Félinferno                                            | Horse           | 35-60   | 40-70                  | 45-70  | 25-40 | ∞                     |
|                     730 | Primarina                                             | Horse           | 10-25   | 10-30                  | 30-55  | 5-15  | ∞                     |
|                     733 | Bazoucan                                              | Horse           | 20-35   | 20-40                  | 10-25  | 10-25 | ∞                     |
|                     740 | Crabaraque                                            | Horse           | 15-30   | 15-30                  | 25-45  | 5-15  | ∞                     |
|                     750 | Bourrinos                                             | Horse           | 30-40   | 50-70                  | 30-60  | 30-40 | ∞                     |
|                     752 | Tarenbulle                                            | Horse           | 15-30   | 15-35                  | 25-45  | 5-20  | ∞                     |
|                     758 | Malamandre                                            | Horse           | 45-70   | 40-65                  | 40-65  | 25-45 | ∞                     |
|                     760 | Chelours                                              | Horse           | 35-55   | 40-65                  | 25-45  | 20-30 | ∞                     |
|                     768 | Sarmuraï                                              | Horse           | 25-40   | 20-40                  | 45-70  | 15-30 | ∞                     |
|                     776 | Léviator                                              | Horse           | 15-30   | 20-40                  | 25-45  | 5-15  | ∞                     |
|                     780 | Draïeul                                               | Horse           | 20-40   | 15-35                  | 30-55  | 5-15  | ∞                     |
|                     781 | Sinistrail                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     794 | Mouscoto                                              | Horse           | 30-45   | 30-45                  | 30-45  | 20-35 | ∞                     |
|                     805 | Ama-Ama                                               | Horse           | 15-25   | 15-25                  | 20-30  | 5-15  | ∞                     |
|                     809 | Melmetal                                              | Horse           | 20-35   | 20-35                  | 25-40  | 15-25 | ∞                     |
|                     812 | Gorythmic                                             | Horse           | 30-50   | 30-55                  | 40-65  | 20-35 | ∞                     |
|                     815 | Pyrobut                                               | Horse           | 55-85   | 55-85                  | 45-70  | 30-50 | ∞                     |
|                     818 | Lézargus                                              | Horse           | 55-80   | 45-70                  | 45-75  | 25-45 | ∞                     |
|                     823 | Corvaillus                                            | Horse           | 15-30   | 60-80                  | 30-50  | 30-45 | ∞                     |
|                     828 | Roublenard                                            | Horse           | 40-60   | 35-55                  | 45-70  | 20-35 | ∞                     |
|                     832 | Moumouflon                                            | Horse           | 45-70   | 40-65                  | 30-55  | 25-45 | ∞                     |
|                     834 | Torgamord                                             | Horse           | 30-55   | 35-60                  | 30-50  | 20-40 | ∞                     |
|                     836 | Fulgudog                                              | Horse           | 60-85   | 55-80                  | 35-55  | 30-50 | ∞                     |
|                     842 | Dratatin                                              | Horse           | 25-40   | 25-40                  | 20-35  | 10-20 | ∞                     |
|                     844 | Dunaconda                                             | Horse           | 20-40   | 15-35                  | 30-55  | 5-20  | ∞                     |
|                     851 | Scolocendre                                           | Horse           | 35-65   | 35-60                  | 35-60  | 20-35 | ∞                     |
|                     858 | Sorcilence                                            | Horse           | 25-45   | 20-40                  | 45-75  | 10-25 | ∞                     |
|                     861 | Angoliath                                             | Horse           | 25-45   | 35-60                  | 40-70  | 20-40 | ∞                     |
|                     862 | Obstagoon                                             | Horse           | 30-55   | 40-65                  | 40-70  | 20-40 | ∞                     |
|                     874 | Stonjourner                                           | Horse           | 15-30   | 20-35                  | 20-40  | 5-15  | ∞                     |
|                     875 | Eiscue                                                | Horse           | 20-35   | 20-40                  | 25-45  | 10-20 | ∞                     |
|                     879 | Copperajah                                            | Horse           | 15-30   | 20-35                  | 25-45  | 5-15  | ∞                     |
|                     880 | Dracolosse                                            | Horse           | 35-55   | 35-60                  | 30-55  | 20-35 | ∞                     |
|                     881 | Arctozolt                                             | Horse           | 30-50   | 30-55                  | 30-55  | 15-30 | ∞                     |
|                     882 | Dracolosse                                            | Horse           | 25-45   | 25-45                  | 30-55  | 10-25 | ∞                     |
|                     887 | Drattak                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     893 | Zarude                                                | Horse           | 60-85   | 55-80                  | 45-65  | 30-50 | ∞                     |
|                     894 | Regieleki                                             | Horse           | 40-55   | 65-75                  | 40-70  | 30-50 | ∞                     |
|                     895 | Regidrago                                             | Horse           | 35-55   | 25-45                  | 35-60  | 25-45 | ∞                     |
|                     899 | Léviator                                              | Horse           | 45-65   | 60-80                  | 40-60  | 45-55 | ∞                     |
|                     901 | Oyacata                                               | Horse           | 40-65   | 30-40                  | 10-25  | 25-35 | ∞                     |
|                     903 | Lanssorien                                            | Horse           | 35-45   | 75-90                  | 65-85  | 30-40 | ∞                     |
|                     908 | Meowscarada                                           | Horse           | 55-80   | 55-80                  | 55-85  | 35-60 | ∞                     |
|                     911 | Skeledirge                                            | Horse           | 25-45   | 20-40                  | 45-75  | 20-35 | ∞                     |
|                     914 | Quaquaval                                             | Horse           | 40-65   | 45-70                  | 55-80  | 25-45 | ∞                     |
|                     916 | Oinkologne                                            | Horse           | 25-45   | 20-40                  | 20-40  | 15-30 | ∞                     |
|                     918 | Spidops                                               | Horse           | 20-40   | 20-35                  | 35-65  | 15-30 | ∞                     |
|                     934 | Grodrive                                              | Horse           | 10-30   | 10-25                  | 30-55  | 10-20 | ∞                     |
|                     936 | Armarouge                                             | Horse           | 35-55   | 40-65                  | 50-80  | 20-35 | ∞                     |
|                     937 | Ceruledge                                             | Horse           | 35-60   | 45-70                  | 60-85  | 25-40 | ∞                     |
|                     939 | Bellibolt                                             | Horse           | 20-40   | 30-55                  | 35-60  | 20-40 | ∞                     |
|                     941 | Kilowattrel                                           | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     943 | Mabosstiff                                            | Horse           | 35-60   | 35-55                  | 30-50  | 20-35 | ∞                     |
|                     949 | Toedscruel                                            | Horse           | 30-55   | 20-40                  | 30-60  | 15-30 | ∞                     |
|                     950 | Klawf                                                 | Horse           | 20-40   | 20-35                  | 35-55  | 10-25 | ∞                     |
|                     956 | Espathra                                              | Horse           | 55-70   | 30-65                  | 15-40  | 40-55 | ∞                     |
|                     966 | Revavroom                                             | Horse           | 70-85   | 0-5                    | 25-40  | 15-20 | ∞                     |
|                     967 | Cliticlic                                             | Horse           | 50-85   | 65-85                  | 35-60  | 35-45 | ∞                     |
|                     968 | Ursaking                                              | Horse           | 30-40   | 15-25                  | 0-15   | 0-5   | ∞                     |
|                     975 | Tritosor                                              | Horse           | 20-40   | 20-45                  | 30-55  | 10-25 | ∞                     |
|                     977 | Dondozo                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     979 | Annihilape                                            | Horse           | 45-70   | 40-65                  | 45-75  | 25-40 | ∞                     |
|                     980 | Clodsire                                              | Horse           | 5-20    | 10-25                  | 20-40  | 0-10  | ∞                     |
|                     981 | Farigiraf                                             | Horse           | 45-60   | 40-60                  | 35-50  | 45-55 | ∞                     |
|                     982 | Dudunsparce                                           | Horse           | 5-25    | 30-50                  | 30-40  | 20-45 | ∞                     |
|                     982 | Deusolourdo (Forme Trois Segments) | Horse           | 5-25    | 35-60                  | 30-40  | 25-55 | ∞                     |
|                    1018 | Archaludon                                            | Horse           | 25-40   | 25-40                  | 25-40  | 15-30 | ∞                     |
|                       — | Ironcrown                                             | Horse           | 35-55   | 35-50                  | 35-55  | 30-45 | ∞                     |
|                       — | Ironleaves                                            | Horse           | 55-85   | 55-80                  | 45-70  | 25-45 | ∞                     |
|                       — | Kommoo                                                | Horse           | 35-55   | 40-60                  | 45-70  | 20-35 | ∞                     |
|                       — | M.                                    | Horse           | 25-40   | 20-40                  | 35-60  | 15-30 | ∞                     |
|                       — | Screamtail                                            | Horse           | 25-40   | 30-45                  | 30-45  | 20-35 | ∞                     |
|                       — | Walkingwake                                           | Horse           | 35-60   | 35-60                  | 25-45  | 25-45 | ∞                     |

</details>

---

<details><summary><strong>🌊 Liste des montures aquatiques</strong></summary>

| No. Dex | Pokémon                                 | Style aquatique | Vitesse | Accél. | Skill | Jump   | Stam. |
| ----------------------: | --------------------------------------- | --------------- | ------- | ---------------------- | ----- | ------ | --------------------- |
|                     009 | Blastoise                               | Submarine       | 35-65   | 45-65                  | 50-75 | 30-50  | ∞                     |
|                     073 | Tentacruel                              | Dolphin         | 30-60   | 40-65                  | 45-75 | 25-55  | ∞                     |
|                     087 | Dewgong                                 | Dolphin         | 25-45   | 50-75                  | 30-65 | 25-50  | ∞                     |
|                     091 | Cloyster                                | Submarine       | 35-65   | 45-65                  | 50-75 | 30-50  | ∞                     |
|                     099 | Kingler                                 | Submarine       | 30-55   | 35-60                  | 45-70 | 15-35  | ∞                     |
|                     119 | Saut                                    | Submarine       | 35-65   | 35-70                  | 25-55 | 15-35  | ∞                     |
|                     128 | Tauros (Paldea-Aqua) | Boat            | 30-40   | 55-65                  | 40-55 | 20-30  | ∞                     |
|                     130 | Gyarados                                | Dolphin         | 30-55   | 40-60                  | 35-65 | 40-70  | ∞                     |
|                     131 | Lokhlass                                | Boat            | 25-40   | 30-55                  | 50-75 | 20-30  | ∞                     |
|                     134 | Vaporeon                                | Dolphin         | 30-60   | 30-55                  | 40-70 | 20-40  | ∞                     |
|                     149 | Dracolosse                              | Dolphin         | 30-50   | 30-65                  | 35-50 | 55-85  | ∞                     |
|                     160 | Feraligatr                              | Dolphin         | 35-60   | 40-65                  | 40-70 | 30-55  | ∞                     |
|                     171 | Lanssorien                              | Dolphin         | 30-55   | 35-60                  | 45-75 | 25-45  | ∞                     |
|                     184 | Azumarill                               | Dolphin         | 30-55   | 30-50                  | 35-60 | 20-40  | ∞                     |
|                     195 | Quagsire                                | Boat            | 25-40   | 30-50                  | 30-50 | 10-25  | ∞                     |
|                     211 | Qwilfish                                | Dolphin         | 30-55   | 30-55                  | 25-45 | 15-35  | ∞                     |
|                     222 | Corsola                                 | Dolphin         | 10-25   | 20-35                  | 50-80 | 30-55  | ∞                     |
|                     226 | Mantine                                 | Dolphin         | 30-55   | 35-60                  | 50-80 | 35-60  | ∞                     |
|                     230 | Kingdra                                 | Dolphin         | 40-70   | 45-70                  | 45-75 | 20-40  | ∞                     |
|                     249 | Lugia                                   | Dolphin         | 60-80   | 80-100                 | 75-95 | 75-90  | ∞                     |
|                     260 | Swampert                                | Dolphin         | 35-65   | 35-65                  | 45-75 | 25-45  | ∞                     |
|                     272 | Ludicolo                                | Dolphin         | 30-55   | 30-55                  | 40-70 | 20-35  | ∞                     |
|                     319 | Sharpedo                                | Dolphin         | 55-85   | 55-85                  | 25-65 | 45-75  | ∞                     |
|                     320 | Wailmer                                 | Submarine       | 30-50   | 30-55                  | 30-55 | 25-40  | ∞                     |
|                     321 | Wailord                                 | Submarine       | 20-40   | 20-45                  | 30-55 | 40-55  | ∞                     |
|                     340 | Whiscash                                | Dolphin         | 25-55   | 25-50                  | 35-65 | 20-40  | ∞                     |
|                     342 | Crawdaunt                               | Dolphin         | 30-55   | 30-50                  | 40-70 | 25-45  | ∞                     |
|                     348 | Armaldo                                 | Dolphin         | 25-50   | 20-45                  | 30-60 | 20-40  | ∞                     |
|                     350 | Migalos                                 | Dolphin         | 40-70   | 35-65                  | 55-80 | 25-45  | ∞                     |
|                     365 | Walrein                                 | Dolphin         | 30-60   | 30-55                  | 45-75 | 25-40  | ∞                     |
|                     369 | Relicanth                               | Submarine       | 15-35   | 25-40                  | 40-80 | 50-75  | ∞                     |
|                     395 | Empoleon                                | Dolphin         | 30-60   | 30-60                  | 45-75 | 25-45  | ∞                     |
|                     400 | Bibarel                                 | Dolphin         | 25-45   | 25-45                  | 30-55 | 15-30  | ∞                     |
|                     419 | Floatzel                                | Dolphin         | 35-65   | 40-70                  | 45-75 | 25-45  | ∞                     |
|                     445 | Garchomp                                | Boat            | 35-60   | 75-85                  | 10-25 | 40-80  | ∞                     |
|                     457 | Lumineon                                | Dolphin         | 30-55   | 25-50                  | 40-70 | 25-45  | ∞                     |
|                     503 | Samurott                                | Dolphin         | 30-55   | 30-55                  | 45-75 | 25-45  | ∞                     |
|                     550 | Basculin                                | Dolphin         | 35-65   | 35-65                  | 40-70 | 20-40  | ∞                     |
|                     565 | Carracosta                              | Dolphin         | 25-50   | 20-40                  | 40-70 | 20-35  | ∞                     |
|                     581 | Swanna                                  | Dolphin         | 25-50   | 25-50                  | 40-70 | 30-55  | ∞                     |
|                     593 | Jellicent                               | Dolphin         | 25-50   | 25-50                  | 35-65 | 20-35  | ∞                     |
|                     604 | Eelektross                              | Dolphin         | 30-60   | 35-65                  | 45-75 | 20-40  | ∞                     |
|                     658 | Greninja                                | Dolphin         | 50-80   | 60-85                  | 60-85 | 35-65  | ∞                     |
|                     687 | Malamar                                 | Dolphin         | 45-70   | 40-65                  | 45-70 | 25-45  | ∞                     |
|                     689 | Barbaracle                              | Dolphin         | 30-55   | 35-60                  | 40-65 | 25-45  | ∞                     |
|                     691 | Dragalge                                | Dolphin         | 30-55   | 35-60                  | 40-65 | 20-40  | ∞                     |
|                     693 | Clawitzer                               | Dolphin         | 45-75   | 45-70                  | 55-80 | 25-45  | ∞                     |
|                     730 | Primarina                               | Dolphin         | 30-55   | 35-60                  | 50-80 | 25-45  | ∞                     |
|                     748 | Pyrax                                   | Submarine       | 10-25   | 20-35                  | 45-70 | 10-20  | ∞                     |
|                     752 | Araquanid                               | Dolphin         | 30-55   | 40-65                  | 45-75 | 25-45  | ∞                     |
|                     768 | Golisopod                               | Dolphin         | 35-65   | 35-60                  | 40-65 | 25-45  | ∞                     |
|                     779 | Bruyverne                               | Dolphin         | 40-70   | 40-65                  | 45-70 | 25-45  | ∞                     |
|                     781 | Dhelmise                                | Submarine       | 15-30   | 40-55                  | 20-30 | 70-100 | ∞                     |
|                     818 | Inteleon                                | Dolphin         | 45-70   | 40-65                  | 45-75 | 35-55  | ∞                     |
|                     834 | Drednaw                                 | Dolphin         | 40-65   | 35-55                  | 35-60 | 20-35  | ∞                     |
|                     853 | Grapploct                               | Dolphin         | 35-60   | 40-65                  | 55-85 | 15-35  | ∞                     |
|                     875 | Eiscue                                  | Boat            | 35-55   | 30-50                  | 30-55 | 20-35  | ∞                     |
|                     882 | Dracolosse                              | Submarine       | 40-65   | 35-60                  | 40-70 | 30-55  | ∞                     |
|                     887 | Drattak                                 | Dolphin         | 50-65   | 60-85                  | 55-70 | 40-55  | ∞                     |
|                     894 | Regieleki                               | Boat            | 35-60   | 75-85                  | 10-25 | 40-80  | ∞                     |
|                     902 | Basculegion                             | Dolphin         | 45-75   | 40-65                  | 35-60 | 25-45  | ∞                     |
|                     904 | Overqwil                                | Dolphin         | 35-60   | 30-50                  | 40-70 | 15-35  | ∞                     |
|                     914 | Quaquaval                               | Dolphin         | 45-75   | 50-75                  | 60-85 | 30-55  | ∞                     |
|                     964 | Palafin                                 | Dolphin         | 45-75   | 45-70                  | 50-80 | 35-60  | ∞                     |
|                     976 | Veluza                                  | Dolphin         | 45-75   | 50-80                  | 40-70 | 20-40  | ∞                     |
|                     977 | Dondozo                                 | Submarine       | 25-45   | 45-65                  | 50-75 | 10-25  | ∞                     |
|                       — | Walkingwake                             | Dolphin         | 45-75   | 40-70                  | 35-60 | 30-55  | ∞                     |

</details>

---

<details><summary><strong>🪶 Liste des montures aériennes</strong></summary>

| No. Dex | Pokémon                             | Style aérien     | Vitesse | Accél. | Skill  | Jump   | M. |
| ----------------------: | ----------------------------------- | ---------------- | ------- | ---------------------- | ------ | ------ | ------------------ |
|                     006 | Dracaufeu                           | Bird             | 30-65   | 45-75                  | 55-85  | 30-65  | ∞                  |
|                     009 | Blastoise                           | Rocket           | 5-15    | 5-40                   | 30-60  | 10-20  | ∞                  |
|                     012 | Butterfree                          | Bird             | 30-65   | 45-75                  | 55-85  | 30-65  | ∞                  |
|                     015 | Beedrill                            | Bird             | 30-55   | 35-60                  | 55-80  | 35-60  | ∞                  |
|                     018 | Pidgeot                             | Bird             | 30-65   | 45-75                  | 55-85  | 30-65  | ∞                  |
|                     022 | Fearow                              | Bird             | 40-80   | 50-80                  | 60-90  | 30-75  | ∞                  |
|                     042 | Golbat                              | Bird             | 35-55   | 45-70                  | 25-45  | 45-65  | ∞                  |
|                     094 | Gengar                              | Hover            | 20-35   | 25-45                  | 55-80  | 25-45  | ∞                  |
|                     130 | Gyarados                            | Vol stationnaire | 15-50   | 35-60                  | 45-65  | 20-45  | ∞                  |
|                     142 | Aerodactyl                          | Bird             | 45-75   | 30-65                  | 35-70  | 45-75  | ∞                  |
|                     144 | Artikodin                           | Bird             | 65-90   | 70-85                  | 80-100 | 65-90  | ∞                  |
|                     145 | Zapétrel                            | Bird             | 80-100  | 65-90                  | 70-85  | 70-85  | ∞                  |
|                     146 | Moltres                             | Bird             | 70-85   | 70-85                  | 65-90  | 65-90  | ∞                  |
|                     149 | Dracolosse                          | Vol stationnaire | 40-60   | 35-50                  | 50-85  | 50-70  | ∞                  |
|                     164 | Noctunoir                           | Bird             | 25-55   | 30-55                  | 45-75  | 30-55  | ∞                  |
|                     166 | Ledian                              | Bird             | 25-45   | 30-55                  | 55-85  | 35-60  | ∞                  |
|                     169 | Crobat                              | Bird             | 55-85   | 45-70                  | 45-70  | 45-70  | ∞                  |
|                     178 | Xatu                                | Bird             | 25-50   | 25-45                  | 45-70  | 30-55  | ∞                  |
|                     189 | Jumpluff                            | Bird             | 25-50   | 35-60                  | 45-75  | 40-70  | ∞                  |
|                     193 | Yanma                               | Bird             | 30-60   | 40-70                  | 45-75  | 25-45  | ∞                  |
|                  60-100 | Misdreavus                          | Hover            | 20-35   | 30-50                  | 50-75  | 10-20  | ∞                  |
|                     205 | Foretress                           | Hover            | 15-25   | 20-40                  | 25-45  | 5-10   | ∞                  |
|                     212 | Dracaufeu                           | Bird             | 35-55   | 40-60                  | 50-75  | 25-45  | ∞                  |
|                     214 | Heracross                           | Bird             | 35-50   | 40-65                  | 55-85  | 0-5    | ∞                  |
|                     227 | Skarmory                            | Bird             | 35-65   | 40-70                  | 55-80  | 35-60  | ∞                  |
|                     233 | Porygon2                            | Hover            | 25-45   | 20-40                  | 40-60  | 10-25  | ∞                  |
|                     249 | Lugia                               | Bird             | 60-80   | 65-85                  | 60-80  | 75-90  | ∞                  |
|                     250 | Ho-Oh                               | Bird             | 75-90   | 75-95                  | 65-85  | 75-100 | ∞                  |
|                     277 | Saut                                | Bird             | 35-65   | 40-70                  | 45-75  | 30-55  | ∞                  |
|                     279 | Pelipper                            | Bird             | 35-65   | 40-70                  | 45-75  | 30-55  | ∞                  |
|                     330 | Flygon                              | Bird             | 50-80   | 40-75                  | 40-85  | 45-60  | ∞                  |
|                     334 | Altaria                             | Bird             | 25-35   | 25-45                  | 40-50  | 25-45  | ∞                  |
|                     344 | Claydol                             | Hover            | 10-20   | 55-80                  | 50-75  | 15-30  | ∞                  |
|                     357 | Tropius                             | Bird             | 20-45   | 20-45                  | 20-40  | 70-90  | ∞                  |
|                     373 | Salamence                           | Bird             | 60-75   | 60-75                  | 40-65  | 60-85  | ∞                  |
|                     376 | Metagross                           | Hover            | 40-65   | 60-75                  | 30-45  | 30-50  | ∞                  |
|                     380 | Latias                              | Vol stationnaire | 75-90   | 70-95                  | 70-95  | 85-100 | ∞                  |
|                     381 | Latios                              | Vol stationnaire | 85-100  | 70-95                  | 70-95  | 80-100 | ∞                  |
|                     398 | Étouraptor                          | Bird             | 35-55   | 45-70                  | 25-45  | 45-65  | ∞                  |
|                     426 | Drifblim                            | Hover            | 5-10    | 20-30                  | 15-30  | 40-80  | ∞                  |
|                     430 | Honchkrow                           | Bird             | 30-55   | 35-60                  | 50-80  | 30-55  | ∞                  |
|                     437 | Bronzong                            | Hover            | 15-25   | 35-65                  | 20-40  | 25-45  | ∞                  |
|                     445 | Garchomp                            | Vol stationnaire | 70-80   | 50-70                  | 50-60  | 20-70  | ∞                  |
|                     462 | Magnézone                           | Hover            | 15-30   | 45-65                  | 35-50  | 45-65  | ∞                  |
|                     468 | Togekiss                            | Vol stationnaire | 20-30   | 20-30                  | 45-65  | 10-20  | ∞                  |
|                     469 | Yanmega                             | Bird             | 35-70   | 45-75                  | 55-80  | 30-55  | ∞                  |
|                     472 | Lokhlass                            | Bird             | 30-65   | 45-75                  | 55-85  | 30-65  | ∞                  |
|                     476 | Probopass                           | Bird             | 20-40   | 20-45                  | 35-60  | 35-60  | ∞                  |
|                     477 | Dusknoir                            | Hover            | 15-25   | 40-60                  | 60-70  | 50-80  | ∞                  |
|                     521 | Unfezant                            | Bird             | 35-60   | 35-60                  | 45-70  | 35-60  | ∞                  |
|                     528 | Swoobat                             | Bird             | 35-60   | 35-60                  | 45-70  | 35-60  | ∞                  |
|                     567 | Archeops                            | Bird             | 35-65   | 35-60                  | 45-75  | 35-60  | ∞                  |
|                     579 | Reuniclus                           | Hover            | 20-40   | 20-40                  | 40-70  | 20-35  | ∞                  |
|                     581 | Swanna                              | Bird             | 30-55   | 30-55                  | 40-70  | 35-60  | ∞                  |
|                     589 | Escavalier                          | Hover            | 20-40   | 20-40                  | 40-70  | 20-35  | ∞                  |
|                     601 | Klinklang                           | Hover            | 25-35   | 30-50                  | 40-60  | 10-20  | ∞                  |
|                     609 | Chandelure                          | Bird             | 20-40   | 25-45                  | 45-70  | 20-35  | ∞                  |
|                     623 | Golurk                              | Rocket           | 45-75   | 10-35                  | 15-30  | 25-40  | ∞                  |
|                     628 | Bruyverne                           | Bird             | 45-70   | 35-55                  | 30-50  | 35-55  | ∞                  |
|                     628 | Braviary (Hisui) | Bird             | 40-65   | 30-50                  | 30-50  | 40-60  | ∞                  |
|                     635 | Hydreigon                           | Bird             | 45-60   | 35-55                  | 30-60  | 5-10   | ∞                  |
|                     637 | Volcarona                           | Bird             | 30-50   | 45-65                  | 55-75  | 25-35  | ∞                  |
|                     663 | Talonflame                          | Bird             | 45-85   | 50-80                  | 55-85  | 35-65  | ∞                  |
|                     666 | Vivillon                            | Bird             | 25-45   | 30-55                  | 60-90  | 40-65  | ∞                  |
|                     671 | Florges                             | Hover            | 20-40   | 25-45                  | 50-80  | 15-35  | ∞                  |
|                     715 | Noctunoir                           | Bird             | 55-90   | 40-65                  | 50-85  | 55-85  | ∞                  |
|                     724 | Decidueye                           | Bird             | 30-55   | 35-60                  | 60-85  | 35-60  | ∞                  |
|                     733 | Toucannon                           | Bird             | 30-55   | 35-60                  | 45-70  | 30-55  | ∞                  |
|                     804 | Naganadel                           | Vol stationnaire | 60-90   | 55-85                  | 60-90  | 45-75  | ∞                  |
|                     823 | Corvaillus                          | Bird             | 25-40   | 35-55                  | 20-35  | 80-100 | ∞                  |
|                     887 | Drattak                             | Vol stationnaire | 55-90   | 60-85                  | 55-70  | 45-80  | ∞                  |
|                     894 | Regieleki                           | Vol stationnaire | 70-80   | 50-70                  | 50-60  | 20-70  | ∞                  |
|                     939 | Bellibolt                           | Vol stationnaire | 55-90   | 45-75                  | 50-80  | 45-80  | ∞                  |
|                     941 | Kilowattrel                         | Bird             | 30-40   | 35-50                  | 45-60  | 50-65  | ∞                  |

</details>

**Important :** les statistiques affichées sont fournies à titre indicatif et peuvent changer dans de futures mises à jour.

---

## 📣 Ce que cela signifie pour le modpack

- Si votre Pokémon préféré n’est pas encore montable, pas d’inquiétude : il pourra être ajouté progressivement à mesure que les mécaniques officielles évoluent.
- Pour le moment, certaines fonctionnalités de monture présentes dans les versions précédentes peuvent ne plus être disponibles.
- Nous suivons de près les mises à jour du mod et intégrerons les nouvelles options de monture dès qu’elles seront accessibles.
