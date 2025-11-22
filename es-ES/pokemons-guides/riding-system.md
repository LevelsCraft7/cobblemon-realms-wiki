# Nuevo Sistema de Monturas (v1.7)

## 🚀 Eliminación del Mod de Monturas Antiguo

Hemos eliminado el complemento **Cobblemon: Ride On!** del modpack y ahora usamos el sistema oficial de monturas proporcionado por Cobblemon.
Esto significa que algunos de tus Pokémon favoritos podrían **ya no ser montables**, al menos temporalmente.
Nuestro equipo está siguiendo de cerca este sistema y ampliará la lista de Pokémon montables cuando el mod oficial lo permita.

---

## 🐾 Cómo Funciona el Sistema Oficial de Monturas

* Haz clic derecho sobre un Pokémon compatible (mientras **te agachas**) para abrir la opción de montura.
* No se requiere montura.
* El modo de cámara preferido para cada estilo de montura se guardará y restaurará al montar o desmontar.
* Puedes ajustar la configuración de monturas en **`config\cobblemon\main.json`**, por ejemplo:

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

  Si sufres mareos, configura `"disableRoll": true`.
* Página oficial del wiki para más detalles: [Pokémon / Monturas](https://wiki.cobblemon.com/index.php/Pok%C3%A9mon/Riding)

---

## 📋 Lista de Pokémon Montables

A continuación se muestra la lista completa de Pokémon actualmente montables con el sistema oficial de Cobblemon.  
Las estadísticas se muestran por tipo de montura y provienen directamente de la tabla oficial de monturas.

---

<details>
<summary><strong>Pokémon montables (Terrestre)</strong></summary>

| No. Dex | Pokémon | Estilo terrestre | Velocidad | Aceleración | Habilidad | Salto | Aguante |
|--------:|-------------------------------------|-----------------|--------|--------|--------|--------|--------|
| 003     | Venusaur                            | Terrestre           | 30-55  | 40-75  | 10-40  | 40-60  | 45-85  |
| 006     | Charizard                           | Terrestre           | 25-40  | 55-65  | 10-25  | 15-25  | 20-30  |
| 009     | Blastoise                           | Terrestre           | 30-65  | 30-50  | 10-35  | 15-30  | 15-35  |
| 047     | Parasect                            | Terrestre           | 15-30  | 50-70  | 45-65  | 0-15   | 15-30  |
| 059     | Arcanine                            | Terrestre           | 45-70  | 70-90  | 40-80  | 45-65  | 35-80  |
| 087     | Dewgong                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 111     | Rhyhorn                             | Terrestre           | 25-60  | 5-20   | 5-25   | 5-15   | 40-80  |
| 112     | Rhydon                              | Terrestre           | 5-15   | 55-75  | 30-60  | 20-30  | 55-90  |
| 122     | Mr. Mime                            | Terrestre           | 25-45  | 20-40  | 15-45  | 15-35  | 35-60  |
| 128     | Tauros                              | Terrestre           | 55-75  | 15-50  | 15-30  | 25-35  | 35-55  |
| 128     | Tauros (Paldea-Combat)              | Terrestre           | 55-75  | 15-50  | 15-30  | 25-35  | 35-55  |
| 128     | Tauros (Paldea-Blaze)               | Terrestre           | 55-75  | 20-55  | 15-30  | 25-40  | 30-50  |
| 128     | Tauros (Paldea-Aqua)                | Terrestre           | 50-70  | 15-50  | 15-30  | 25-30  | 40-60  |
| 130     | Gyarados                            | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 131     | Lapras                              | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 142     | Aerodactyl                          | Terrestre           | 10-20  | 55-75  | 15-45  | 25-35  | 20-45  |
| 144     | Articuno                            | Terrestre           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 145     | Zapdos                              | Terrestre           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 146     | Moltres                             | Terrestre           | 10-20  | 70-90  | 30-60  | 25-50  | 40-80  |
| 149     | Dragonite                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 168     | Ariados                             | Terrestre           | 30-45  | 55-85  | 45-65  | 25-45  | 15-30  |
| 203     | Girafarig                           | Terrestre           | 25-45  | 40-65  | 20-35  | 30-45  | 30-50  |
| 214     | Heracross                           | Terrestre           | 15-30  | 55-70  | 40-65  | 35-50  | 35-50  |
| 217     | Ursaring                            | Terrestre           | 30-40  | 45-80  | 20-45  | 25-40  | 30-65  |
| 221     | Piloswine                           | Terrestre           | 10-25  | 30-50  | 30-45  | 5-10   | 35-70  |
| 249     | Lugia                               | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 250     | Ho-Oh                               | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 289     | Slaking                             | Terrestre           | 25-65  | 0-20   | 0-20   | 25-40  | 60-100 |
| 320     | Wailmer                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 321     | Wailord                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 323     | Camerupt                            | Terrestre           | 25-35  | 45-60  | 10-30  | 10-25  | 50-80  |
| 330     | Flygon                              | Terrestre           | 15-25  | 60-75  | 15-25  | 15-30  | 25-40  |
| 334     | Altaria                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 357     | Tropius                             | Terrestre           | 15-25  | 30-50  | 30-50  | 10-20  | 55-85  |
| 373     | Salamence                           | Terrestre           | 10-20  | 60-80  | 5-20   | 15-25  | 35-70  |
| 376     | Metagross                           | Terrestre           | 10-20  | 50-70  | 35-50  | 30-45  | 55-70  |
| 380     | Latias                              | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 381     | Latios                              | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 398     | Staraptor                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 411     | Bastiodon                           | Terrestre           | 15-35  | 15-25  | 0-5    | 0-5    | 50-90  |
| 423     | Gastrodon                           | Terrestre           | 5-10   | 70-90  | 0-15   | 0-10   | 10-20  |
| 423     | Gastrodon (East)                    | Terrestre           | 5-10   | 70-90  | 0-15   | 0-10   | 10-20  |
| 445     | Garchomp                            | Terrestre           | 40-55  | 65-75  | 40-70  | 30-50  | 30-45  |
| 463     | Lickilicky                          | Terrestre           | 10-25  | 0-15   | 0-5    | 40-60  | 20-40  |
| 464     | Rhyperior                           | Terrestre           | 5-15   | 45-75  | 25-55  | 10-25  | 75-100 |
| 468     | Togekiss                            | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 473     | Mamoswine                           | Terrestre           | 20-35  | 30-40  | 20-30  | 10-20  | 60-90  |
| 497     | Serperior                           | Terrestre           | 25-45  | 65-80  | 0-30   | 0-5    | 35-55  |
| 523     | Zebstrika                           | Terrestre           | 35-75  | 65-85  | 45-65  | 35-45  | 25-45  |
| 545     | Scolipede                           | Terrestre           | 45-75  | 20-25  | 25-35  | 25-35  | 50-70  |
| 555     | Darmanitan                          | Terrestre           | 40-50  | 45-65  | 15-25  | 35-45  | 35-60  |
| 558     | Crustle                             | Terrestre           | 1-5    | 15-45  | 25-35  | 0-5    | 60-85  |
| 623     | Golurk                              | Terrestre           | 35-50  | 65-80  | 40-65  | 40-60  | 60-85  |
| 626     | Bouffalant                          | Terrestre           | 45-65  | 50-75  | 15-30  | 20-30  | 55-70  |
| 628     | Braviary                            | Terrestre           | 10-20  | 90-100 | 15-30  | 10-20  | 15-30  |
| 628     | Braviary (Hisui)                    | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 635     | Hydreigon                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 637     | Volcarona                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 672     | Skiddo                              | Terrestre           | 30-45  | 40-65  | 20-40  | 30-40  | 30-45  |
| 673     | Gogoat                              | Terrestre           | 45-65  | 65-75  | 40-60  | 40-60  | 45-65  |
| 697     | Tyrantrum                           | Terrestre           | 20-30  | 50-70  | 40-60  | 40-55  | 70-100 |
| 715     | Noivern                             | Terrestre           | 35-50  | 65-85  | 30-50  | 30-45  | 10-20  |
| 750     | Mudsdale                            | Terrestre           | 30-40  | 50-70  | 30-60  | 30-40  | 70-100 |
| 781     | Dhelmise                            | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 823     | Corviknight                         | Terrestre           | 15-30  | 60-80  | 30-50  | 30-45  | 60-80  |
| 887     | Dragapult                           | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 899     | Wyrdeer                             | Terrestre           | 45-65  | 60-80  | 40-60  | 45-55  | 55-70  |
| 901     | Ursaluna                            | Terrestre           | 40-65  | 30-40  | 10-25  | 25-35  | 65-85  |
| 903     | Sneasler                            | Terrestre           | 35-45  | 75-90  | 65-85  | 30-40  | 10-20  |
| 941     | Kilowattrel                         | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 956     | Espathra                            | Terrestre           | 55-70  | 30-65  | 15-40  | 40-55  | 25-35  |
| 966     | Revavroom                           | Terrestre           | 70-85  | 0-5    | 25-40  | 15-20  | 20-40  |
| 967     | Cyclizar                            | Terrestre           | 50-85  | 65-85  | 35-60  | 35-45  | 30-60  |
| 968     | Orthworm                            | Terrestre           | 30-40  | 15-25  | 0-15   | 0-5    | 25-75  |
| 977     | Dondozo                             | Terrestre           | 10-40  | 10-40  | 80-100 | 10-40  | 10-40  |
| 981     | Farigiraf                           | Terrestre           | 45-60  | 40-60  | 35-50  | 45-55  | 50-70  |
| 982     | Dudunsparce                         | Terrestre           | 5-25   | 30-50  | 30-40  | 20-45  | 30-75  |
| 982     | Dudunsparce (Three-Segment)         | Terrestre           | 5-25   | 35-60  | 30-40  | 25-55  | 35-85  |

</details>

---

<details>
<summary><strong>Pokémon montables (Acuático)</strong></summary>

| No. Dex | Pokémon | Estilo acuático | Velocidad | Aceleración | Habilidad | Salto | Aguante |
|--------:|-------------------------------------|------------------|--------|--------|--------|--------|--------|
| 009     | Blastoise                           | Submarino        | 35-65  | 45-65  | 50-75  | 30-50  | 35-70  |
| 087     | Dewgong                             | Nado rápido          | 25-45  | 50-75  | 30-65  | 25-50  | 25-50  |
| 119     | Seaking                             | Submarino        | 35-65  | 35-70  | 25-55  | 15-35  | 20-40  |
| 128     | Tauros (Paldea-Aqua)                | Navegación             | 30-40  | 55-65  | 40-55  | 20-30  | 30-65  |
| 130     | Gyarados                            | Nado rápido          | 30-55  | 40-60  | 35-65  | 40-70  | 45-75  |
| 131     | Lapras                              | Navegación             | 25-40  | 30-55  | 50-75  | 20-30  | 45-75  |
| 149     | Dragonite                           | Nado rápido          | 30-50  | 30-65  | 35-50  | 55-85  | 60-90  |
| 249     | Lugia                               | Nado rápido          | 60-80  | 80-100 | 75-95  | 75-90  | 80-100 |
| 319     | Sharpedo                            | Nado rápido          | 55-85  | 55-85  | 25-65  | 45-75  | 20-45  |
| 320     | Wailmer                             | Submarino        | 30-50  | 30-55  | 30-55  | 25-40  | 40-85  |
| 321     | Wailord                             | Submarino        | 20-40  | 20-45  | 30-55  | 40-55  | 65-100 |
| 369     | Relicanth                           | Submarino        | 15-35  | 25-40  | 40-80  | 50-75  | 50-90  |
| 445     | Garchomp                            | Navegación             | 35-60  | 75-85  | 10-25  | 40-80  | 5-10   |
| 781     | Dhelmise                            | Submarino        | 15-30  | 40-55  | 20-30  | 70-100 | 45-65  |
| 887     | Dragapult                           | Nado rápido          | 50-65  | 60-85  | 55-70  | 40-55  | 25-35  |
| 977     | Dondozo                             | Submarino        | 25-45  | 45-65  | 50-75  | 10-25  | 60-75  |

</details>

---

<details>
<summary><strong>Pokémon montables (Aéreo / Planeo)</strong></summary>

| No. Dex | Pokémon | Estilo aéreo | Velocidad | Aceleración | Habilidad | Salto | Aguante |
|--------:|-------------------------------------|----------------|--------|--------|--------|--------|--------|
| 006     | Charizard                           | Vuelo clásico           | 30-65  | 45-75  | 55-85  | 30-65  | 30-65  |
| 009     | Blastoise                           | Propulsión         | 5-15   | 5-40   | 30-60  | 10-20  | 2-20   |
| 142     | Aerodactyl                          | Vuelo clásico           | 45-75  | 30-65  | 35-70  | 45-75  | 20-50  |
| 144     | Articuno                            | Vuelo clásico           | 65-90  | 70-85  | 80-100 | 65-90  | 70-85  |
| 145     | Zapdos                              | Vuelo clásico           | 80-100 | 65-90  | 70-85  | 70-85  | 65-90  |
| 146     | Moltres                             | Vuelo clásico           | 70-85  | 70-85  | 65-90  | 65-90  | 80-100 |
| 149     | Dragonite                           | Vuelo rápido            | 40-60  | 35-50  | 50-85  | 50-70  | 50-85  |
| 205     | Forretress                          | Planeo          | 15-25  | 20-40  | 25-45  | 5-10   | 0-5    |
| 214     | Heracross                           | Vuelo clásico           | 35-50  | 40-65  | 55-85  | 0-5    | 15-40  |
| 249     | Lugia                               | Vuelo clásico           | 60-80  | 65-85  | 60-80  | 75-90  | 65-90  |
| 250     | Ho-Oh                               | Vuelo clásico           | 75-90  | 75-95  | 65-85  | 75-100 | 80-100 |
| 330     | Flygon                              | Vuelo clásico           | 50-80  | 40-75  | 40-85  | 45-60  | 35-55  |
| 334     | Altaria                             | Vuelo clásico           | 25-35  | 25-45  | 40-50  | 25-45  | 70-90  |
| 344     | Claydol                             | Planeo          | 10-20  | 55-80  | 50-75  | 15-30  | 35-55  |
| 357     | Tropius                             | Vuelo clásico           | 20-45  | 20-45  | 20-40  | 70-90  | 40-70  |
| 373     | Salamence                           | Vuelo clásico           | 60-75  | 60-75  | 40-65  | 60-85  | 55-80  |
| 376     | Metagross                           | Planeo          | 40-65  | 60-75  | 30-45  | 30-50  | 10-25  |
| 380     | Latias                              | Vuelo rápido            | 75-90  | 70-95  | 70-95  | 85-100 | 85-100 |
| 381     | Latios                              | Vuelo rápido            | 85-100 | 70-95  | 70-95  | 80-100 | 70-95  |
| 398     | Staraptor                           | Vuelo clásico           | 35-55  | 45-70  | 25-45  | 45-65  | 25-60  |
| 426     | Drifblim                            | Planeo          | 5-10   | 20-30  | 15-30  | 40-80  | 30-80  |
| 437     | Bronzong                            | Planeo          | 15-25  | 35-65  | 20-40  | 25-45  | 25-45  |
| 445     | Garchomp                            | Vuelo rápido            | 70-80  | 50-70  | 50-60  | 20-70  | 30-50  |
| 462     | Magnezone                           | Planeo          | 15-30  | 45-65  | 35-50  | 45-65  | 5-15   |
| 468     | Togekiss                            | Vuelo rápido            | 20-30  | 20-30  | 45-65  | 10-20  | 70-100 |
| 477     | Dusknoir                            | Planeo          | 15-25  | 40-60  | 60-70  | 50-80  | 0-5    |
| 601     | Klinklang                           | Planeo          | 25-35  | 30-50  | 40-60  | 10-20  | 5-10   |
| 623     | Golurk                              | Propulsión         | 45-75  | 10-35  | 15-30  | 25-40  | 30-50  |
| 628     | Braviary                            | Vuelo clásico           | 45-70  | 35-55  | 30-50  | 35-55  | 45-75  |
| 628     | Braviary (Hisui)                    | Vuelo clásico           | 40-65  | 30-50  | 30-50  | 40-60  | 50-80  |
| 635     | Hydreigon                           | Vuelo clásico           | 45-60  | 35-55  | 30-60  | 5-10   | 70-100 |
| 637     | Volcarona                           | Vuelo clásico           | 30-50  | 45-65  | 55-75  | 25-35  | 60-90  |
| 715     | Noivern                             | Vuelo clásico           | 55-90  | 40-65  | 50-85  | 55-85  | 10-30  |
| 823     | Corviknight                         | Vuelo clásico           | 25-40  | 35-55  | 20-35  | 80-100 | 80-100 |
| 887     | Dragapult                           | Vuelo rápido            | 55-90  | 60-85  | 55-70  | 45-80  | 25-35  |
| 941     | Kilowattrel                         | Vuelo clásico           | 30-40  | 35-50  | 45-60  | 50-65  | 55-70  |

</details>


**Importante:** Las estadísticas mostradas son solo de referencia y pueden cambiar en futuras actualizaciones.

---

## 📣 Qué Significa Esto para el Modpack

* Si tu Pokémon favorito aún *no* es montable, no te preocupes. Podría añadirse a medida que evolucionen las mecánicas oficiales.
* Por ahora, ajústense las expectativas: algunas mecánicas de montura presentes en versiones anteriores podrían estar deshabilitadas.
* Seguiremos las actualizaciones del mod y añadiremos parches cuando haya más opciones de montura disponibles.
