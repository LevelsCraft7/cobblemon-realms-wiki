# Chunky zur Vorab-Generierung der Welt

## Einführung

Chunky Pregenerator ist ein Mod, der Chunks in deiner Minecraft-Welt vorab generiert, um Lag zu reduzieren und die Performance bei der Erkundung zu verbessern.  
Durch das Vorladen der Bereiche wird der Server weniger belastet, besonders bei hoher Aktivität.

## Funktionen

- Generiert Chunks innerhalb eines definierten Bereichs oder Radius.  
- Ausführbar manuell oder automatisch beim Serverstart.  
- Reduziert Lag und verbessert die Gesamtleistung.  
- Konfigurierbare Einstellungen (Geschwindigkeit, Radius).

## Funktionsweise

Chunky generiert das Terrain der Chunks, bevor Spieler die Bereiche betreten.  
Die Welt wird «vorab generiert», mit bereits geladenem Terrain, Strukturen und Ressourcen.  
Dadurch muss der Server Chunks nicht live generieren.

## Befehle und Nutzung

### 1. Radius festlegen
```

/chunky radius <radius>

```

### 2. Generierung starten
```

/chunky start

```

### 3. Fortschritt prüfen
```

/chunky status

```

### 4. Generierung abbrechen
```

/chunky cancel

```

### Erweiterte Einstellungen

- Anpassbar über die Datei `config`.  
- Geschwindigkeit oder maximale Chunk-Anzahl einstellbar.  
- Weitere Optionen im Konfigurationsfile.

## Tipps

- Vorab-Generierung während geringer Aktivität durchführen.  
- Mit kleinem Radius beginnen und steigern.  
- Große Karten während Wartungsfenstern generieren.  
- Regelmäßig `/chunky status` nutzen.  
- Automatisierung möglich mit einem Script, das `/chunky start` ausführt.

## Ressourcen

- CurseForge : https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge  
- Chunky Wiki (Guides) : https://github.com/pop4959/Chunky/wiki/How-To%27s  
- Chunky Wiki (Pregeneration) : https://github.com/pop4959/Chunky/wiki/Pregeneration

## Fazit

Die richtige Nutzung von Chunky Pregenerator verbessert die Serverleistung deutlich, insbesondere beim Erkunden.  
Experimentiere mit Einstellungen, um das optimale Ergebnis zu erzielen.
