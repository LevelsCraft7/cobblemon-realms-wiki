# Neues Reitsystem (v1.7)

## 🚀 Entfernung des alten Reit-Mods

Wir haben das alte Add-on **Cobblemon: Ride On!** aus dem Modpack entfernt und nutzen nun das offizielle Reitsystem von Cobblemon.
Das bedeutet: Einige deiner Lieblings-Pokémon sind möglicherweise **vorübergehend nicht mehr reitbar**.
Unser Team behält diese Funktion im Blick und wird die Liste der reitbaren Pokémon erweitern, sobald das offizielle Mod sie unterstützt.

---

## 🐾 Wie das offizielle Reitsystem funktioniert

* Mache einen Rechtsklick auf ein kompatibles Pokémon (während du **schleichst**), um die Reitoption zu öffnen.
* Kein Sattel erforderlich.
* Der bevorzugte Kameramodus für jeden Reitstil wird gespeichert und beim Auf- und Absteigen wiederhergestellt.
* Du kannst die Reiteinstellungen in **`config\cobblemon\main.json`** anpassen, zum Beispiel:

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

  Wenn du zu Motion Sickness neigst, setze `"disableRoll": true`.
* Offizielle Wiki-Seite für weitere Details: [Pokémon / Reiten](https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Riding)

---

## 📋 Liste der reitbaren Pokémon

Unten findest du die vollständige Liste aller Pokémon, die mit dem offiziellen Cobblemon-Reitsystem reitbar sind.  
Die Werte werden pro Reitstil angegeben und stammen direkt aus der offiziellen Cobblemon-Reittabelle.

---

<details>
<summary><strong>Reitbare Pokémon – Boden</strong></summary>

| Dex-Nr. | Pokémon | Bodenstil | Geschwindigkeit | Beschl. | Können | Sprung | Ausdauer |
|--------:|-------------------------------------|-----------------|--------|--------|--------|--------|--------|
| 003     | Venusaur                            | Boden           | 30-55  | 40-75  | 10-40  | 40-60  | 45-85  |
| 006     | Charizard                           | Boden           | 25-40  | 55-65  | 10-25  | 15-25  | 20-30  |
| 009     | Blastoise                           | Boden           | 30-65  | 30-50  | 10-35  | 15-30  | 15-35  |
| 047     | Parasect                            | Boden           | 15-30  | 50-70  | 45-65  | 0-15   | 15-30  |
| 059     | Arcanine                            | Boden           | 45-70  | 70-90  | 40-80  | 45-65  | 35-80  |
| 087     | Dewgong                             | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 111     | Rhyhorn                             | Boden           | 25-60  | 5-20   | 5-25   | 5-15   | 40-80  |
| 112     | Rhydon                              | Boden           | 5-15   | 55-75  | 30-60  | 20-30  | 55-90  |
| 122     | Mr. Mime                            | Boden           | 25-45  | 20-40  | 15-45  | 15-35  | 35-60  |
| 128     | Tauros                              | Boden           | 55-75  | 15-50  | 15-30  | 25-35  | 35-55  |
| 128     | Tauros (Paldea-Combat)              | Boden           | 55-75  | 15-50  | 15-30  | 25-35  | 35-55  |
| 128     | Tauros (Paldea-Blaze)               | Boden           | 55-75  | 20-55  | 15-30  | 25-40  | 30-50  |
| 128     | Tauros (Paldea-Aqua)                | Boden           | 50-70  | 15-50  | 15-30  | 25-30  | 40-60  |
| 130     | Gyarados                            | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 131     | Lapras                              | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 142     | Aerodactyl                          | Boden           | 10-20  | 55-75  | 15-45  | 25-35  | 20-45  |
| 144     | Articuno                            | Boden           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 145     | Zapdos                              | Boden           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 146     | Moltres                             | Boden           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 149     | Dragonite                           | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 168     | Ariados                             | Boden           | 30-45  | 55-85  | 45-65  | 25-45  | 15-30  |
| 203     | Girafarig                           | Boden           | 25-45  | 40-65  | 20-35  | 30-45  | 30-50  |
| 214     | Heracross                           | Boden           | 15-30  | 55-70  | 40-65  | 35-50  | 35-50  |
| 217     | Ursaring                            | Boden           | 30-40  | 45-80  | 20-45  | 25-40  | 30-65  |
| 221     | Piloswine                           | Boden           | 10-25  | 30-50  | 30-45  | 5-10   | 35-70  |
| 249     | Lugia                               | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 250     | Ho-Oh                               | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 289     | Slaking                             | Boden           | 25-65  | 0-20   | 0-20   | 25-40  | 60-100 |
| 320     | Wailmer                             | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 321     | Wailord                             | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 323     | Camerupt                            | Boden           | 25-35  | 45-60  | 10-30  | 10-25  | 50-80  |
| 330     | Flygon                              | Boden           | 15-25  | 60-75  | 15-25  | 15-30  | 25-40  |
| 334     | Altaria                             | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 357     | Tropius                             | Boden           | 15-25  | 30-50  | 30-50  | 10-20  | 55-85  |
| 373     | Salamence                           | Boden           | 10-20  | 60-80  | 5-20   | 15-25  | 35-70  |
| 376     | Metagross                           | Boden           | 10-20  | 50-70  | 35-50  | 30-45  | 55-70  |
| 380     | Latias                              | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 381     | Latios                              | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 398     | Staraptor                           | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 411     | Bastiodon                           | Boden           | 15-35  | 15-25  | 0-5    | 0-5    | 50-90  |
| 423     | Gastrodon                           | Boden           | 5-10   | 70-90  | 0-15   | 0-10   | 10-20  |
| 423     | Gastrodon (East)                    | Boden           | 5-10   | 70-90  | 0-15   | 0-10   | 10-20  |
| 445     | Garchomp                            | Boden           | 40-55  | 65-75  | 40-70  | 30-50  | 30-45  |
| 463     | Lickilicky                          | Boden           | 10-25  | 0-15   | 0-5    | 40-60  | 20-40  |
| 464     | Rhyperior                           | Boden           | 5-15   | 45-75  | 25-55  | 10-25  | 75-100 |
| 468     | Togekiss                            | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 473     | Mamoswine                           | Boden           | 20-35  | 30-40  | 20-30  | 10-20  | 60-90  |
| 497     | Serperior                           | Boden           | 25-45  | 65-80  | 0-30   | 0-5    | 35-55  |
| 523     | Zebstrika                           | Boden           | 35-75  | 65-85  | 45-65  | 35-45  | 25-45  |
| 545     | Scolipede                           | Boden           | 45-75  | 20-25  | 25-35  | 25-35  | 50-70  |
| 555     | Darmanitan                          | Boden           | 40-50  | 45-65  | 15-25  | 35-45  | 35-60  |
| 558     | Crustle                             | Boden           | 1-5    | 15-45  | 25-35  | 0-5    | 60-85  |
| 623     | Golurk                              | Boden           | 35-50  | 65-80  | 40-65  | 40-60  | 60-85  |
| 626     | Bouffalant                          | Boden           | 45-65  | 50-75  | 15-30  | 20-30  | 55-70  |
| 628     | Braviary                            | Boden           | 10-20  | 90-100 | 15-30  | 10-20  | 15-30  |
| 628     | Braviary (Hisui)                    | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 635     | Hydreigon                           | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 637     | Volcarona                           | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 672     | Skiddo                              | Boden           | 30-45  | 40-65  | 20-40  | 30-40  | 30-45  |
| 673     | Gogoat                              | Boden           | 45-65  | 65-75  | 40-60  | 40-60  | 45-65  |
| 697     | Tyrantrum                           | Boden           | 20-30  | 50-70  | 40-60  | 40-55  | 70-100 |
| 715     | Noivern                             | Boden           | 35-50  | 65-85  | 30-50  | 30-45  | 10-20  |
| 750     | Mudsdale                            | Boden           | 30-40  | 50-70  | 30-60  | 30-40  | 70-100 |
| 781     | Dhelmise                            | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 823     | Corviknight                         | Boden           | 15-30  | 60-80  | 30-50  | 30-45  | 60-80  |
| 887     | Dragapult                           | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 899     | Wyrdeer                             | Boden           | 45-65  | 60-80  | 40-60  | 45-55  | 55-70  |
| 901     | Ursaluna                            | Boden           | 40-65  | 30-40  | 10-25  | 25-35  | 65-85  |
| 903     | Sneasler                            | Boden           | 35-45  | 75-90  | 65-85  | 30-40  | 10-20  |
| 941     | Kilowattrel                         | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 956     | Espathra                            | Boden           | 55-70  | 30-65  | 15-40  | 40-55  | 25-35  |
| 966     | Revavroom                           | Boden           | 70-85  | 0-5    | 25-40  | 15-20  | 20-40  |
| 967     | Cyclizar                            | Boden           | 50-85  | 65-85  | 35-60  | 35-45  | 30-60  |
| 968     | Orthworm                            | Boden           | 30-40  | 15-25  | 0-15   | 0-5    | 25-75  |
| 977     | Dondozo                             | Boden           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 981     | Farigiraf                           | Boden           | 45-60  | 40-60  | 35-50  | 45-55  | 50-70  |
| 982     | Dudunsparce                         | Boden           | 5-25   | 30-50  | 30-40  | 20-45  | 30-75  |
| 982     | Dudunsparce (Three-Segment)         | Boden           | 5-25   | 35-60  | 30-40  | 25-55  | 35-85  |

</details>

---

<details>
<summary><strong>Reitbare Pokémon – Wasser</strong></summary>

| Dex-Nr. | Pokémon | Wasserstil | Geschwindigkeit | Beschl. | Können | Sprung | Ausdauer |
|--------:|-------------------------------------|------------------|--------|--------|--------|--------|--------|
| 009     | Blastoise                           | Tauchen        | 35-65  | 45-65  | 50-75  | 30-50  | 35-70  |
| 087     | Dewgong                             | Schnellschwimmen          | 25-45  | 50-75  | 30-65  | 25-50  | 25-50  |
| 119     | Seaking                             | Tauchen        | 35-65  | 35-70  | 25-55  | 15-35  | 20-40  |
| 128     | Tauros (Paldea-Aqua)                | Navigation             | 30-40  | 55-65  | 40-55  | 20-30  | 30-65  |
| 130     | Gyarados                            | Schnellschwimmen          | 30-55  | 40-60  | 35-65  | 40-70  | 45-75  |
| 131     | Lapras                              | Navigation             | 25-40  | 30-55  | 50-75  | 20-30  | 45-75  |
| 149     | Dragonite                           | Schnellschwimmen          | 30-50  | 30-65  | 35-50  | 55-85  | 60-90  |
| 249     | Lugia                               | Schnellschwimmen          | 60-80  | 80-100 | 75-95  | 75-90  | 80-100 |
| 319     | Sharpedo                            | Schnellschwimmen          | 55-85  | 55-85  | 25-65  | 45-75  | 20-45  |
| 320     | Wailmer                             | Tauchen        | 30-50  | 30-55  | 30-55  | 25-40  | 40-85  |
| 321     | Wailord                             | Tauchen        | 20-40  | 20-45  | 30-55  | 40-55  | 65-100 |
| 369     | Relicanth                           | Tauchen        | 15-35  | 25-40  | 40-80  | 50-75  | 50-90  |
| 445     | Garchomp                            | Navigation             | 35-60  | 75-85  | 10-25  | 40-80  | 5-10   |
| 781     | Dhelmise                            | Tauchen        | 15-30  | 40-55  | 20-30  | 70-100 | 45-65  |
| 887     | Dragapult                           | Schnellschwimmen          | 50-65  | 60-85  | 55-70  | 40-55  | 25-35  |
| 977     | Dondozo                             | Tauchen        | 25-45  | 45-65  | 50-75  | 10-25  | 60-75  |

</details>

---

<details>
<summary><strong>Reitbare Pokémon – Luft / Schweben</strong></summary>

| Dex-Nr. | Pokémon | Luftstil | Geschwindigkeit | Beschl. | Können | Sprung | Ausdauer |
|--------:|-------------------------------------|----------------|--------|--------|--------|--------|--------|
| 006     | Charizard                           | Klassischer Flug           | 30-65  | 45-75  | 55-85  | 30-65  | 30-65  |
| 009     | Blastoise                           | Raketenflug         | 5-15   | 5-40   | 30-60  | 10-20  | 2-20   |
| 142     | Aerodactyl                          | Klassischer Flug           | 45-75  | 30-65  | 35-70  | 45-75  | 20-50  |
| 144     | Articuno                            | Klassischer Flug           | 65-90  | 70-85  | 80-100 | 65-90  | 70-85  |
| 145     | Zapdos                              | Klassischer Flug           | 80-100 | 65-90  | 70-85  | 70-85  | 65-90  |
| 146     | Moltres                             | Klassischer Flug           | 70-85  | 70-85  | 65-90  | 65-90  | 80-100 |
| 149     | Dragonite                           | Schnellflug            | 40-60  | 35-50  | 50-85  | 50-70  | 50-85  |
| 205     | Forretress                          | Schweben          | 15-25  | 20-40  | 25-45  | 5-10   | 0-5    |
| 214     | Heracross                           | Klassischer Flug           | 35-50  | 40-65  | 55-85  | 0-5    | 15-40  |
| 249     | Lugia                               | Klassischer Flug           | 60-80  | 65-85  | 60-80  | 75-90  | 65-90  |
| 250     | Ho-Oh                               | Klassischer Flug           | 75-90  | 75-95  | 65-85  | 75-100 | 80-100 |
| 330     | Flygon                              | Klassischer Flug           | 50-80  | 40-75  | 40-85  | 45-60  | 35-55  |
| 334     | Altaria                             | Klassischer Flug           | 25-35  | 25-45  | 40-50  | 25-45  | 70-90  |
| 344     | Claydol                             | Schweben          | 10-20  | 55-80  | 50-75  | 15-30  | 35-55  |
| 357     | Tropius                             | Klassischer Flug           | 20-45  | 20-45  | 20-40  | 70-90  | 40-70  |
| 373     | Salamence                           | Klassischer Flug           | 60-75  | 60-75  | 40-65  | 60-85  | 55-80  |
| 376     | Metagross                           | Schweben          | 40-65  | 60-75  | 30-45  | 30-50  | 10-25  |
| 380     | Latias                              | Schnellflug            | 75-90  | 70-95  | 70-95  | 85-100 | 85-100 |
| 381     | Latios                              | Schnellflug            | 85-100 | 70-95  | 70-95  | 80-100 | 70-95  |
| 398     | Staraptor                           | Klassischer Flug           | 35-55  | 45-70  | 25-45  | 45-65  | 25-60  |
| 426     | Drifblim                            | Schweben          | 5-10   | 20-30  | 15-30  | 40-80  | 30-80  |
| 437     | Bronzong                            | Schweben          | 15-25  | 35-65  | 20-40  | 25-45  | 25-45  |
| 445     | Garchomp                            | Schnellflug            | 70-80  | 50-70  | 50-60  | 20-70  | 30-50  |
| 462     | Magnezone                           | Schweben          | 15-30  | 45-65  | 35-50  | 45-65  | 5-15   |
| 468     | Togekiss                            | Schnellflug            | 20-30  | 20-30  | 45-65  | 10-20  | 70-100 |
| 477     | Dusknoir                            | Schweben          | 15-25  | 40-60  | 60-70  | 50-80  | 0-5    |
| 601     | Klinklang                           | Schweben          | 25-35  | 30-50  | 40-60  | 10-20  | 5-10   |
| 623     | Golurk                              | Raketenflug         | 45-75  | 10-35  | 15-30  | 25-40  | 30-50  |
| 628     | Braviary                            | Klassischer Flug           | 45-70  | 35-55  | 30-50  | 35-55  | 45-75  |
| 628     | Braviary (Hisui)                    | Klassischer Flug           | 40-65  | 30-50  | 30-50  | 40-60  | 50-80  |
| 635     | Hydreigon                           | Klassischer Flug           | 45-60  | 35-55  | 30-60  | 5-10   | 70-100 |
| 637     | Volcarona                           | Klassischer Flug           | 30-50  | 45-65  | 55-75  | 25-35  | 60-90  |
| 715     | Noivern                             | Klassischer Flug           | 55-90  | 40-65  | 50-85  | 55-85  | 10-30  |
| 823     | Corviknight                         | Klassischer Flug           | 25-40  | 35-55  | 20-35  | 80-100 | 80-100 |
| 887     | Dragapult                           | Schnellflug            | 55-90  | 60-85  | 55-70  | 45-80  | 25-35  |
| 941     | Kilowattrel                         | Klassischer Flug           | 30-40  | 35-50  | 45-60  | 50-65  | 55-70  |

</details>


**Wichtig:** Die angezeigten Werte dienen nur als Referenz und können sich in zukünftigen Updates ändern.

---

## 📣 Was das für das Modpack bedeutet

* Wenn dein Lieblings-Pokémon noch *nicht* reitbar ist, keine Sorge. Es könnte in zukünftigen Updates hinzugefügt werden.
* Aktuell müssen die Spieler damit rechnen, dass einige Reitmechaniken aus früheren Versionen deaktiviert sind.
* Wir verfolgen die Mod-Updates und veröffentlichen Patches, sobald neue Reitoptionen verfügbar sind.
