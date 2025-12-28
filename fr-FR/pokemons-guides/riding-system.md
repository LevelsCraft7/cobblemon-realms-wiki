# Nouveau système de montures (v1.7)

## 🚀 Retrait de l'ancien mod de montures

Nous avons retiré l'add-on **Cobblemon: Ride On!** du modpack et utilisons désormais le système de montures officiel fourni par Cobblemon. from the modpack and are now using the official riding mechanics provided by Cobblemon itself.
Cela signifie que certains de vos Pokémon préférés pourraient **ne plus être montables**, au moins temporairement.
Notre équipe garde un œil sur ce système et cherchera à étendre la liste des Pokémon montables dès que le mod officiel le permettra.

---

## 🐾 Fonctionnement du système officiel de montures

### ♾️ Infinite Ride Stamina (Cobblemon Realms)

In **Cobblemon Realms**, ride stamina is **infinite for all rideable Pokémon**.

That means:

- You will never run out of stamina while riding
- Long-distance travel is always possible
- No stamina management is required

This is a **modpack-specific customization** and differs from default Cobblemon.

- Faites un clic droit sur un Pokémon compatible (tout en étant **accroupi**) pour ouvrir l'option de monture.
- Aucune selle n'est requise.
- Le mode de caméra préféré pour chaque style de monture est enregistré et restauré lorsque vous montez ou descendez.
- Vous pouvez ajuster les paramètres de monture dans **`config\cobblemon\main.json`**, par exemple :

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
- Page du wiki officiel pour plus de détails : [Pokémon / Montures](https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Riding)

---

## 📋 Liste des Pokémon montables

Ci-dessous se trouve la liste complète des Pokémon actuellement montables avec le système officiel de Cobblemon.  
Les statistiques sont indiquées par type de monture et proviennent directement du tableau officiel de montures de Cobblemon.

---

<details><summary><strong>Pokémon montables (Terrestre)</strong></summary>

| No. Dex | Pokémon                                               | Style terrestre | Vitesse | Accél. | Skill  | Jump  | Stam. |
| ----------------------: | ----------------------------------------------------- | --------------- | ------- | ---------------------- | ------ | ----- | --------------------- |
|                     003 | Venusaur                                              | Horse           | 30-55   | 40-75                  | 10-40  | 40-60 | ∞                     |
|                     006 | Dracaufeu                                             | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     009 | Blastoise                                             | Horse           | 30-65   | 30-50                  | 10-35  | 15-30 | ∞                     |
|                     012 | Butterfree                                            | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     018 | Pidgeot                                               | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     022 | Fearow                                                | Horse           | 30-50   | 45-65                  | 20-40  | 20-35 | ∞                     |
|                     024 | Arbok                                                 | Horse           | 25-45   | 65-80                  | 0-30   | 0-5   | ∞                     |
|                     031 | Nidoqueen                                             | Horse           | 30-40   | 50-70                  | 30-60  | 30-40 | ∞                     |
|                     034 | Nidoking                                              | Horse           | 40-55   | 65-75                  | 40-70  | 30-50 | ∞                     |
|                     036 | Clefable                                              | Horse           | 30-45   | 35-55                  | 35-55  | 20-35 | ∞                     |
|                     038 | Ninetales                                             | Horse           | 45-70   | 65-85                  | 40-75  | 40-60 | ∞                     |
|                     040 | Wigglytuff                                            | Horse           | 10-25   | 0-15                   | 0-5    | 40-60 | ∞                     |
|                     042 | Golbat                                                | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     045 | Vileplume                                             | Horse           | 30-50   | 45-70                  | 30-55  | 30-45 | ∞                     |
|                     047 | Parasect                                              | Horse           | 15-30   | 50-70                  | 45-65  | 0-15  | ∞                     |
|                     053 | Persian                                               | Horse           | 60-80   | 60-80                  | 70-90  | 35-55 | ∞                     |
|                     057 | Primeape                                              | Horse           | 55-75   | 65-85                  | 60-80  | 35-55 | ∞                     |
|                     059 | Arcanin                                               | Horse           | 45-70   | 70-90                  | 40-80  | 45-65 | ∞                     |
|                     062 | Poliwrath                                             | Horse           | 30-50   | 35-55                  | 50-70  | 35-55 | ∞                     |
|                     065 | Alakazam                                              | Horse           | 60-85   | 65-85                  | 75-95  | 25-45 | ∞                     |
|                     068 | Machamp                                               | Horse           | 45-65   | 50-70                  | 70-90  | 55-75 | ∞                     |
|                     071 | Victreebel                                            | Horse           | 2-20    | 25-40                  | 30-45  | 10-20 | ∞                     |
|                     073 | Tentacruel                                            | Horse           | 5-20    | 5-20                   | 20-40  | 0-5   | ∞                     |
|                     076 | Golem                                                 | Horse           | 18-28   | 20-35                  | 25-40  | 10-20 | ∞                     |
|                     080 | Slowbro                                               | Horse           | 30-80   | 20-35                  | 20-35  | 10-20 | ∞                     |
|                     085 | Dodrio                                                | Horse           | 65-100  | 60-85                  | 50-75  | 25-45 | ∞                     |
|                     087 | Dewgong                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     089 | Muk                                                   | Horse           | 25-45   | 20-40                  | 20-40  | 10-25 | ∞                     |
|                     091 | Cloyster                                              | Horse           | 30-65   | 30-50                  | 10-35  | 15-30 | ∞                     |
|                     094 | Gengar                                                | Horse           | 25-40   | 35-55                  | 45-65  | 20-35 | ∞                     |
|                     099 | Kingler                                               | Horse           | 20-40   | 25-50                  | 20-40  | 10-25 | ∞                     |
|                   50-90 | Exeggutor                                             | Horse           | 20-35   | 20-40                  | 15-35  | 5-20  | ∞                     |
|                     108 | Lickitung                                             | Horse           | 10-25   | 5-20                   | 5-20   | 10-25 | ∞                     |
|                     111 | Rhinastoc                                             | Horse           | 25-60   | 5-20                   | 5-25   | 5-15  | ∞                     |
|                     112 | Rhydon                                                | Horse           | 5-15    | 55-75                  | 30-60  | 20-30 | ∞                     |
|                     113 | Chansey                                               | Horse           | 5-20    | 0-15                   | 0-20   | 5-15  | ∞                     |
|                   50-90 | Kangaskhan                                            | Horse           | 45-65   | 50-75                  | 30-50  | 25-45 | ∞                     |
|                     122 | Migalos                                               | Horse           | 25-45   | 20-40                  | 15-45  | 15-35 | ∞                     |
|                     128 | Tauros                                                | Horse           | 55-75   | 15-50                  | 15-30  | 25-35 | ∞                     |
|                     128 | Tauros (Paldea-Aqua)               | Horse           | 50-70   | 15-50                  | 15-30  | 25-30 | ∞                     |
|                     128 | Tauros (Paldea-Blaze)              | Horse           | 55-75   | 20-55                  | 15-30  | 25-40 | ∞                     |
|                     128 | Tauros (Paldea-Combat)             | Horse           | 55-75   | 15-50                  | 15-30  | 25-35 | ∞                     |
|                     130 | Gyarados                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     131 | Lokhlass                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     134 | Vaporeon                                              | Horse           | 20-45   | 25-50                  | 35-60  | 20-35 | ∞                     |
|                   35-85 | Jolteon                                               | Horse           | 40-70   | 45-75                  | 35-60  | 25-45 | ∞                     |
|                     136 | Flareon                                               | Horse           | 25-45   | 25-45                  | 30-55  | 25-40 | ∞                     |
|                     142 | Aerodactyl                                            | Horse           | 10-20   | 55-75                  | 15-45  | 25-35 | ∞                     |
|                     143 | Snorlax                                               | Horse           | 15-35   | 0-20                   | 20-50  | 10-25 | ∞                     |
|                     144 | Artikodin                                             | Horse           | 10-20   | 70-90                  | 30-60  | 25-50 | ∞                     |
|                     145 | Zapétrel                                              | Horse           | 10-20   | 70-90                  | 30-60  | 25-50 | ∞                     |
|                     146 | Moltres                                               | Horse           | 10-20   | 70-90                  | 30-60  | 25-50 | ∞                     |
|                     149 | Dracolosse                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     154 | Meganium                                              | Horse           | 25-45   | 35-60                  | 20-45  | 30-55 | ∞                     |
|                     157 | Typhlosion                                            | Horse           | 40-60   | 45-70                  | 25-45  | 25-40 | ∞                     |
|                     160 | Feraligatr                                            | Horse           | 30-50   | 30-55                  | 25-45  | 25-40 | ∞                     |
|                     162 | Furret                                                | Horse           | 35-60   | 40-65                  | 40-60  | 20-35 | ∞                     |
|                     164 | Noctunoir                                             | Horse           | 20-35   | 35-55                  | 15-30  | 10-25 | ∞                     |
|                     166 | Ledian                                                | Horse           | 20-35   | 25-40                  | 20-40  | 10-25 | ∞                     |
|                     168 | Ariados                                               | Horse           | 30-45   | 55-85                  | 45-65  | 25-45 | ∞                     |
|                     178 | Xatu                                                  | Horse           | 10-25   | 10-30                  | 30-50  | 10-25 | ∞                     |
|                     181 | Ampharos                                              | Horse           | 20-40   | 25-45                  | 35-60  | 10-25 | ∞                     |
|                     184 | Azumarill                                             | Horse           | 20-40   | 20-35                  | 25-45  | 15-30 | ∞                     |
|                     189 | Jumpluff                                              | Horse           | 15-30   | 20-40                  | 25-45  | 20-35 | ∞                     |
|                     193 | Yanma                                                 | Horse           | 10-25   | 20-40                  | 20-35  | 15-30 | ∞                     |
|                     195 | Quagsire                                              | Horse           | 20-35   | 20-35                  | 20-40  | 10-25 | ∞                     |
|                     196 | Espeon                                                | Horse           | 45-75   | 35-60                  | 45-70  | 20-35 | ∞                     |
|                     197 | Umbreon                                               | Horse           | 25-50   | 25-45                  | 40-65  | 15-25 | ∞                     |
|                     199 | Slowking                                              | Horse           | 20-40   | 15-35                  | 40-60  | 10-20 | ∞                     |
|                     202 | Wobbuffet                                             | Horse           | 5-25    | 5-25                   | 20-35  | 0-10  | ∞                     |
|                     203 | Girafarig                                             | Horse           | 25-45   | 40-65                  | 20-35  | 30-45 | ∞                     |
|                     208 | Steelix                                               | Horse           | 10-30   | 15-35                  | 35-60  | 0-10  | ∞                     |
|                     210 | Granbull                                              | Horse           | 25-45   | 35-55                  | 20-40  | 20-35 | ∞                     |
|                     212 | Dracaufeu                                             | Horse           | 40-65   | 55-75                  | 45-70  | 15-30 | ∞                     |
|                     214 | Heracross                                             | Horse           | 15-30   | 55-70                  | 40-65  | 35-50 | ∞                     |
|                     217 | Ursaring                                              | Horse           | 30-40   | 45-80                  | 20-45  | 25-40 | ∞                     |
|                     219 | Magcargo                                              | Horse           | 1-10    | 0-15                   | 25-45  | 0-5   | ∞                     |
|                     221 | Pyrax                                                 | Horse           | 10-25   | 30-50                  | 30-45  | 5-10  | ∞                     |
|                     227 | Skarmory                                              | Horse           | 20-35   | 20-35                  | 20-35  | 10-25 | ∞                     |
|                     229 | Houndoom                                              | Horse           | 40-65   | 55-80                  | 30-60  | 25-45 | ∞                     |
|                     232 | Donphan                                               | Horse           | 30-50   | 30-45                  | 25-40  | 20-35 | ∞                     |
|                     234 | Stantler                                              | Horse           | 50-75   | 40-65                  | 30-55  | 25-45 | ∞                     |
|                     241 | Miltank                                               | Horse           | 35-60   | 30-55                  | 25-45  | 20-35 | ∞                     |
|                     242 | Blissey                                               | Horse           | 10-25   | 5-20                   | 10-25  | 5-15  | ∞                     |
|                     248 | Tyranitar                                             | Horse           | 20-35   | 30-55                  | 40-60  | 15-30 | ∞                     |
|                     249 | Lugia                                                 | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     250 | Ho-Oh                                                 | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     254 | Sceptile                                              | Horse           | 40-70   | 40-70                  | 45-75  | 35-60 | ∞                     |
|                     257 | Blaziken                                              | Horse           | 35-65   | 40-70                  | 40-70  | 40-70 | ∞                     |
|                     260 | Swampert                                              | Horse           | 35-65   | 35-65                  | 40-70  | 30-55 | ∞                     |
|                     262 | Mightyena                                             | Horse           | 30-55   | 25-50                  | 30-55  | 20-40 | ∞                     |
|                     272 | Ludicolo                                              | Horse           | 20-40   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                   25-75 | Shiftry                                               | Horse           | 25-50   | 25-45                  | 40-70  | 20-40 | ∞                     |
|                     277 | Saut                                                  | Horse           | 15-30   | 15-35                  | 25-40  | 15-30 | ∞                     |
|                     279 | Pelipper                                              | Horse           | 15-30   | 15-35                  | 25-40  | 15-30 | ∞                     |
|                     282 | Gardevoir                                             | Horse           | 20-45   | 25-50                  | 35-65  | 15-30 | ∞                     |
|                     289 | Saut                                                  | Horse           | 25-65   | 0-20                   | 0-20   | 25-40 | ∞                     |
|                     295 | Exploud                                               | Horse           | 15-35   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                     297 | Hariyama                                              | Horse           | 15-35   | 15-35                  | 30-55  | 10-25 | ∞                     |
|                     306 | Aggron                                                | Horse           | 20-45   | 20-45                  | 35-65  | 20-40 | ∞                     |
|                     308 | Medicham                                              | Horse           | 35-65   | 35-60                  | 55-80  | 25-50 | ∞                     |
|                     310 | Manectric                                             | Horse           | 35-65   | 35-65                  | 30-55  | 20-40 | ∞                     |
|                     320 | Wailmer                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     321 | Wailord                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     323 | Camérupt                                              | Horse           | 25-35   | 45-60                  | 10-30  | 10-25 | ∞                     |
|                     324 | Torkoal                                               | Horse           | 10-25   | 10-25                  | 30-55  | 10-20 | ∞                     |
|                     330 | Flygon                                                | Horse           | 15-25   | 60-75                  | 15-25  | 15-30 | ∞                     |
|                     334 | Altaria                                               | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     342 | Crawdaunt                                             | Horse           | 10-25   | 15-35                  | 25-45  | 15-30 | ∞                     |
|                     348 | Armaldo                                               | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     357 | Tropius                                               | Horse           | 15-25   | 30-50                  | 30-50  | 10-20 | ∞                     |
|                     359 | Absol                                                 | Horse           | 30-55   | 30-55                  | 40-70  | 25-45 | ∞                     |
|                     365 | Walrein                                               | Horse           | 10-25   | 15-35                  | 30-55  | 10-20 | ∞                     |
|                     373 | Salamence                                             | Horse           | 10-20   | 60-80                  | 5-20   | 15-25 | ∞                     |
|                     376 | Metagross                                             | Horse           | 10-20   | 50-70                  | 35-50  | 30-45 | ∞                     |
|                     377 | Regirock                                              | Horse           | 15-30   | 10-30                  | 35-60  | 10-25 | ∞                     |
|                     378 | Regice                                                | Horse           | 15-30   | 10-30                  | 35-60  | 10-25 | ∞                     |
|                     379 | Registeel                                             | Horse           | 15-30   | 10-30                  | 35-60  | 10-25 | ∞                     |
|                     380 | Latias                                                | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     381 | Latios                                                | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     389 | Torterra                                              | Horse           | 15-35   | 15-35                  | 35-60  | 15-30 | ∞                     |
|                     392 | Infernape                                             | Horse           | 30-55   | 30-55                  | 35-65  | 25-45 | ∞                     |
|                     395 | Empoleon                                              | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     398 | Étouraptor                                            | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     400 | Bibarel                                               | Horse           | 15-30   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                     405 | Luxray                                                | Horse           | 25-50   | 25-50                  | 40-70  | 20-40 | ∞                     |
|                     409 | Rampardos                                             | Horse           | 15-35   | 20-45                  | 35-60  | 20-35 | ∞                     |
|                     411 | Bastiodon                                             | Horse           | 15-35   | 15-25                  | 0-5    | 0-5   | ∞                     |
|                     423 | Gastrodon                                             | Horse           | 5-10    | 70-90                  | 0-15   | 0-10  | ∞                     |
|                     423 | Gastrodon (East)                   | Horse           | 5-10    | 70-90                  | 0-15   | 0-10  | ∞                     |
|                     428 | Lopunny                                               | Horse           | 20-40   | 20-40                  | 45-70  | 20-40 | ∞                     |
|                     430 | Honchkrow                                             | Horse           | 10-25   | 10-30                  | 25-45  | 10-25 | ∞                     |
|                     445 | Garchomp                                              | Horse           | 40-55   | 65-75                  | 40-70  | 30-50 | ∞                     |
|                     448 | Lucario                                               | Horse           | 25-50   | 25-50                  | 40-70  | 25-45 | ∞                     |
|                     450 | Rhinoféros                                            | Horse           | 20-40   | 15-35                  | 25-45  | 15-30 | ∞                     |
|                     452 | Drapion                                               | Horse           | 20-40   | 20-40                  | 35-60  | 15-30 | ∞                     |
|                     454 | Toxicroak                                             | Horse           | 20-45   | 20-45                  | 35-60  | 25-45 | ∞                     |
|                     463 | Lickilicky                                            | Horse           | 10-25   | 0-15                   | 0-5    | 40-60 | ∞                     |
|                     464 | Rexillius                                             | Horse           | 5-15    | 45-75                  | 25-55  | 10-25 | ∞                     |
|                     465 | Tangrowth                                             | Horse           | 15-30   | 15-30                  | 35-60  | 10-25 | ∞                     |
|                     466 | Electivire                                            | Horse           | 30-60   | 30-55                  | 40-70  | 25-40 | ∞                     |
|                     467 | Magmortar                                             | Horse           | 15-40   | 20-45                  | 30-55  | 15-30 | ∞                     |
|                     468 | Togekiss                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     469 | Yanmega                                               | Horse           | 12-30   | 20-40                  | 25-45  | 15-30 | ∞                     |
|                     470 | Leafeon                                               | Horse           | 20-45   | 20-45                  | 35-60  | 20-35 | ∞                     |
|                     471 | Glaceon                                               | Horse           | 20-45   | 20-45                  | 35-60  | 20-35 | ∞                     |
|                     472 | Lokhlass                                              | Horse           | 25-40   | 55-65                  | 10-25  | 15-25 | ∞                     |
|                     473 | Mammochon                                             | Horse           | 20-35   | 30-40                  | 20-30  | 10-20 | ∞                     |
|                     475 | Gallade                                               | Horse           | 40-70   | 40-65                  | 55-80  | 30-55 | ∞                     |
|                     486 | Regigigas                                             | Horse           | 35-80   | 10-25                  | 60-85  | 10-22 | ∞                     |
|                     497 | Serperior                                             | Horse           | 25-45   | 65-80                  | 0-30   | 0-5   | ∞                     |
|                     500 | Emboar                                                | Horse           | 25-45   | 25-45                  | 35-60  | 20-35 | ∞                     |
|                     503 | Samurott                                              | Horse           | 20-40   | 20-40                  | 30-55  | 15-30 | ∞                     |
|                     508 | Stoutland                                             | Horse           | 25-50   | 25-45                  | 35-60  | 20-35 | ∞                     |
|                     510 | Liepard                                               | Horse           | 30-55   | 30-55                  | 35-60  | 20-35 | ∞                     |
|                     521 | Unfezant                                              | Horse           | 20-40   | 20-40                  | 25-45  | 20-35 | ∞                     |
|                     523 | Rexillius                                             | Horse           | 35-75   | 65-85                  | 45-65  | 35-45 | ∞                     |
|                     526 | Gigalith                                              | Horse           | 10-30   | 10-30                  | 35-60  | 15-30 | ∞                     |
|                     528 | Swoobat                                               | Horse           | 20-40   | 20-40                  | 25-45  | 20-35 | ∞                     |
|                     530 | Excadrill                                             | Horse           | 25-55   | 30-60                  | 35-60  | 20-35 | ∞                     |
|                     534 | Conkeldurr                                            | Horse           | 10-25   | 10-25                  | 30-55  | 10-25 | ∞                     |
|                     545 | Scolipede                                             | Horse           | 45-75   | 20-25                  | 25-35  | 25-35 | ∞                     |
|                     553 | Cliticlic                                             | Horse           | 30-55   | 25-50                  | 40-70  | 20-40 | ∞                     |
|                     555 | Darmanitan                                            | Horse           | 40-50   | 45-65                  | 15-25  | 35-45 | ∞                     |
|                     558 | Crabaraque                                            | Horse           | 1-5     | 15-45                  | 25-35  | 0-5   | ∞                     |
|                     563 | Cofagrigus                                            | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     565 | Carracosta                                            | Horse           | 15-35   | 15-35                  | 30-55  | 10-25 | ∞                     |
|                     567 | Archeops                                              | Horse           | 25-45   | 20-40                  | 30-55  | 20-35 | ∞                     |
|                     569 | Garbodor                                              | Horse           | 10-25   | 10-25                  | 20-40  | 10-20 | ∞                     |
|                     571 | Zoroark                                               | Horse           | 30-55   | 30-55                  | 40-65  | 20-35 | ∞                     |
|                     576 | Gothitelle                                            | Horse           | 20-45   | 20-45                  | 35-65  | 15-30 | ∞                     |
|                     586 | Sawsbuck                                              | Horse           | 25-50   | 25-50                  | 35-60  | 25-45 | ∞                     |
|                     591 | Amoonguss                                             | Horse           | 10-25   | 10-25                  | 30-55  | 10-20 | ∞                     |
|                     596 | Galvantula                                            | Horse           | 25-50   | 25-45                  | 35-60  | 20-35 | ∞                     |
|                     598 | Ferrothorn                                            | Horse           | 5-20    | 5-20                   | 45-70  | 5-15  | ∞                     |
|                     612 | Haxorus                                               | Horse           | 30-55   | 30-55                  | 35-65  | 25-45 | ∞                     |
|                     614 | Ursaking                                              | Horse           | 20-45   | 20-45                  | 30-55  | 20-35 | ∞                     |
|                     617 | Accelgor                                              | Horse           | 30-55   | 30-60                  | 40-70  | 15-30 | ∞                     |
|                     620 | Mienshao                                              | Horse           | 35-60   | 35-60                  | 45-70  | 20-35 | ∞                     |
|                     621 | Druddigon                                             | Horse           | 20-45   | 20-45                  | 35-65  | 20-35 | ∞                     |
|                     623 | Golurk                                                | Horse           | 35-50   | 65-80                  | 40-65  | 40-60 | ∞                     |
|                     626 | Bourrinos                                             | Horse           | 45-65   | 50-75                  | 15-30  | 20-30 | ∞                     |
|                     628 | Bruyverne                                             | Horse           | 10-20   | 90-100                 | 15-30  | 10-20 | ∞                     |
|                     628 | Braviary (Hisui)                   | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     631 | Heatmor                                               | Horse           | 15-35   | 15-35                  | 30-55  | 15-30 | ∞                     |
|                     632 | Durant                                                | Horse           | 15-35   | 20-40                  | 40-70  | 10-25 | ∞                     |
|                     635 | Hydreigon                                             | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     637 | Volcarona                                             | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     638 | Rhinocorne                                            | Horse           | 35-55   | 35-50                  | 35-55  | 30-45 | ∞                     |
|                     639 | Terrakion                                             | Horse           | 35-55   | 35-50                  | 35-55  | 30-45 | ∞                     |
|                     652 | Chesnaught                                            | Horse           | 25-45   | 30-55                  | 35-60  | 20-35 | ∞                     |
|                     655 | Delphox                                               | Horse           | 30-55   | 35-60                  | 50-75  | 20-35 | ∞                     |
|                     658 | Greninja                                              | Horse           | 45-75   | 55-80                  | 50-75  | 35-55 | ∞                     |
|                     663 | Talonflame                                            | Horse           | 25-45   | 35-55                  | 20-40  | 15-30 | ∞                     |
|                     672 | Saut                                                  | Horse           | 30-45   | 40-65                  | 20-40  | 30-40 | ∞                     |
|                     673 | Gogoat                                                | Horse           | 45-65   | 65-75                  | 40-60  | 40-60 | ∞                     |
|                     676 | Furfrou                                               | Horse           | 45-70   | 40-65                  | 30-55  | 25-40 | ∞                     |
|                     689 | Barbaracle                                            | Horse           | 25-40   | 30-50                  | 35-55  | 15-30 | ∞                     |
|                     696 | Tyrunt                                                | Horse           | 25-40   | 25-40                  | 40-60  | 20-35 | ∞                     |
|                     697 | Tritosor                                              | Horse           | 20-30   | 50-70                  | 40-60  | 40-55 | ∞                     |
|                     699 | Aurorus                                               | Horse           | 20-40   | 30-55                  | 25-45  | 15-30 | ∞                     |
|                     706 | Goodra                                                | Horse           | 20-40   | 30-55                  | 40-70  | 15-30 | ∞                     |
|                     709 | Trevenant                                             | Horse           | 20-35   | 25-45                  | 45-75  | 10-25 | ∞                     |
|                     713 | Avalugg                                               | Horse           | 10-25   | 15-30                  | 40-70  | 5-15  | ∞                     |
|                     715 | Rhinoféros                                            | Horse           | 35-50   | 65-85                  | 30-50  | 30-45 | ∞                     |
|                     724 | Decidueye                                             | Horse           | 20-40   | 25-45                  | 40-60  | 15-30 | ∞                     |
|                     727 | Incineroar                                            | Horse           | 35-60   | 40-70                  | 45-70  | 25-40 | ∞                     |
|                     730 | Primarina                                             | Horse           | 10-25   | 10-30                  | 30-55  | 5-15  | ∞                     |
|                     733 | Toucannon                                             | Horse           | 20-35   | 20-40                  | 10-25  | 10-25 | ∞                     |
|                     740 | Crabaraque                                            | Horse           | 15-30   | 15-30                  | 25-45  | 5-15  | ∞                     |
|                     750 | Mudsdale                                              | Horse           | 30-40   | 50-70                  | 30-60  | 30-40 | ∞                     |
|                     752 | Araquanid                                             | Horse           | 15-30   | 15-35                  | 25-45  | 5-20  | ∞                     |
|                     758 | Salazzle                                              | Horse           | 45-70   | 40-65                  | 40-65  | 25-45 | ∞                     |
|                     760 | Bewear                                                | Horse           | 35-55   | 40-65                  | 25-45  | 20-30 | ∞                     |
|                     768 | Golisopod                                             | Horse           | 25-40   | 20-40                  | 45-70  | 15-30 | ∞                     |
|                     776 | Léviator                                              | Horse           | 15-30   | 20-40                  | 25-45  | 5-15  | ∞                     |
|                     780 | Drampa                                                | Horse           | 20-40   | 15-35                  | 30-55  | 5-15  | ∞                     |
|                     781 | Dhelmise                                              | Horse           | 10-40   | 10-40                  | 80-100 | 10-40 | ∞                     |
|                     794 | Buzzwole                                              | Horse           | 30-45   | 30-45                  | 30-45  | 20-35 | ∞                     |
|                     805 | Stakataka                                             | Horse           | 15-25   | 15-25                  | 20-30  | 5-15  | ∞                     |
|                     809 | Melmetal                                              | Horse           | 20-35   | 20-35                  | 25-40  | 15-25 | ∞                     |
|                     812 | Rillaboom                                             | Horse           | 30-50   | 30-55                  | 40-65  | 20-35 | ∞                     |
|                     815 | Cinderace                                             | Horse           | 55-85   | 55-85                  | 45-70  | 30-50 | ∞                     |
|                     818 | Inteleon                                              | Horse           | 55-80   | 45-70                  | 45-75  | 25-45 | ∞                     |
|                     823 | Corvaillus                                            | Horse           | 15-30   | 60-80                  | 30-50  | 30-45 | ∞                     |
|                     828 | Thievul                                               | Horse           | 40-60   | 35-55                  | 45-70  | 20-35 | ∞                     |
|                     832 | Dubwool                                               | Horse           | 45-70   | 40-65                  | 30-55  | 25-45 | ∞                     |
|                     834 | Drednaw                                               | Horse           | 30-55   | 35-60                  | 30-50  | 20-40 | ∞                     |
|                     836 | Boltund                                               | Horse           | 60-85   | 55-80                  | 35-55  | 30-50 | ∞                     |
|                     842 | Appletun                                              | Horse           | 25-40   | 25-40                  | 20-35  | 10-20 | ∞                     |
|                     844 | Sandaconda                                            | Horse           | 20-40   | 15-35                  | 30-55  | 5-20  | ∞                     |
|                     851 | Centiskorch                                           | Horse           | 35-65   | 35-60                  | 35-60  | 20-35 | ∞                     |
|                     858 | Hatterene                                             | Horse           | 25-45   | 20-40                  | 45-75  | 10-25 | ∞                     |
|                     861 | Grimmsnarl                                            | Horse           | 25-45   | 35-60                  | 40-70  | 20-40 | ∞                     |
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

<details><summary><strong>Pokémon montables (Aquatique)</strong></summary>

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

<details><summary><strong>Pokémon montables (Aérien / Vol stationnaire)</strong></summary>

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

- Si votre Pokémon préféré n'est _pas_ encore montable, ne paniquez pas. Il pourra être ajouté au fur et à mesure que les mécaniques officielles s'étendent.
- Pour l'instant, il faut ajuster les attentes des joueurs : certaines mécaniques de monture disponibles dans les versions précédentes peuvent être désactivées.
- Nous suivrons les mises à jour du mod et publierons des correctifs lorsque de nouvelles options de monture seront disponibles.
