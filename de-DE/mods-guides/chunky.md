# Chunky Pregenerator Tutorial

## Einführung

Chunky Pregenerator ist ein Mod, der dafür entwickelt wurde, Chunks in deiner Minecraft-Welt vorab zu generieren,\
was hilft, Lag zu reduzieren und die Gesamtleistung während der Erkundung zu verbessern.\
Durch das Vorab-Generieren von Chunks wird dein Server weniger Verzögerungen erfahren,\
insbesondere während intensiver Spielsitzungen oder bei intensiver Erkundung.

## Funktionen

- Generiert Chunks in einem angegebenen Bereich oder Radius vorab.
- Kann manuell oder automatisch beim Start des Servers ausgeführt werden.
- Reduziert das Lag im Spiel und verbessert die Serverleistung.
- Konfigurierbare Einstellungen für Generierungsgeschwindigkeit und Radius.

## Funktionsweise

Chunky generiert Terrain in Chunks, bevor Spieler diese Bereiche besuchen.\
Dieser Prozess schafft eine "vorab generierte" Welt, in der Terrain, Strukturen und Ressourcen\
bereits geladen sind, was bedeutet, dass der Server keine Chunks in Echtzeit generieren muss,\
wenn Spieler neue Zonen betreten.

## Befehle & Nutzung

1. **Grundbefehl:**\
  Verwende den Befehl:\
  `/chunky radius <radius>`\
  Dies startet die Vorab-Generierung von Chunks im angegebenen Radius vom Spawn-Punkt.\
  Beispiel:\
  `/chunky start`\
  Dieser Befehl startet die Generierung aller Chunks innerhalb des zuvor festgelegten Radius.

2. **Status prüfen:**\
  Um den Fortschritt der Vorab-Generierung zu überwachen:\
  `/chunky status`\
  Dies zeigt den aktuellen Fortschritt und Leistungsdetails an.

3. **Generierung abbrechen:**\
  Wenn nötig, kannst du den Vorab-Generierungsprozess mit folgendem Befehl abbrechen:\
  `/chunky cancel`

4. **Erweiterte Einstellungen:**

- Einige Einstellungen können in den Konfigurationsdateien des Mods angepasst werden.
- Ändere die Generierungsgeschwindigkeit oder die maximale Anzahl von generierten Chunks.
- Überprüfe die Konfigurationsdatei (normalerweise im `config`-Ordner des Servers)\
  für detailliertere Optionen.

## Tipps & Best Practices

- Es wird empfohlen, die Vorab-Generierung während der Nebenzeiten oder vor der Öffnung des Servers für Spieler durchzuführen.
- Beginne mit einem kleinen Radius, um die Auswirkungen auf die Leistung zu testen, und erhöhe ihn dann schrittweise.
- Für große Karten plane die Vorab-Generierungsaufgaben während Wartungsfenstern.
- Verwende regelmäßig den Befehl `/chunky status`, um den Fortschritt zu überwachen und eine Überlastung des Servers zu vermeiden.
- Automatisiere den Prozess beim Serverstart, wenn möglich, mit einem Skript, das `/chunky start` enthält.\
  Dies kann über ein Startskript oder ein Server-Plugin erfolgen, das Automatisierung unterstützt.

## Zusätzliche Ressourcen

- CurseForge: https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge
- Chunky Wiki (Anleitungen): https://github.com/pop4959/Chunky/wiki/How-To%27s
- Chunky Wiki (Vorab-Generierung): https://github.com/pop4959/Chunky/wiki/Pregeneration

## Conclusion:

Die effektive Nutzung von Chunky Pregenerator kann die Leistung deines Servers erheblich verbessern,\
indem sie Lag während der Erkundung reduziert. Experimentiere mit verschiedenen Radien und Einstellungen,\
um das richtige Gleichgewicht für deine Welt zu finden.\
Genieße ein flüssigeres Spielerlebnis und einen stabileren Server!
