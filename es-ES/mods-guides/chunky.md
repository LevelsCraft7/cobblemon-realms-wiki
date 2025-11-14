# Chunky para la Pre-Generación del Mundo

## Introducción

Chunky Pregenerator es un mod que pre-genera los chunks de tu mundo de Minecraft para reducir el lag y mejorar el rendimiento durante la exploración.  
Al generar áreas por adelantado, el servidor sufre menos caídas de rendimiento en momentos de mucha actividad.

## Características

- Pre-genera chunks en un área o radio definido.  
- Puede ejecutarse manualmente o automáticamente al iniciar el servidor.  
- Reduce el lag y mejora el rendimiento general.  
- Ajustes configurables (velocidad, radio).

## Cómo funciona

Chunky genera el terreno antes de que los jugadores visiten esas zonas.  
El mundo queda «pre-generado», con terreno, estructuras y recursos ya cargados.  
El servidor no necesita generarlos en tiempo real.

## Comandos y uso

### 1. Definir el radio
```

/chunky radius <radio>

```

### 2. Iniciar la generación
```

/chunky start

```

### 3. Ver el progreso
```

/chunky status

```

### 4. Cancelar la generación
```

/chunky cancel

```

### Ajustes avanzados

- Parámetros disponibles en el archivo `config`.  
- Ajusta la velocidad o el número máximo de chunks generados.  
- Revisa el archivo para obtener opciones avanzadas.

## Consejos

- Ejecutar la pre-generación en horas de baja actividad.  
- Probar primero con un radio pequeño.  
- Programar la generación para ventanas de mantenimiento.  
- Supervisar con `/chunky status`.  
- Automatizar con un script que incluya `/chunky start`.

## Recursos

- CurseForge : https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge  
- Chunky Wiki (Guías) : https://github.com/pop4959/Chunky/wiki/How-To%27s  
- Chunky Wiki (Pre-Generación) : https://github.com/pop4959/Chunky/wiki/Pregeneration

## Conclusión

Usar Chunky Pregenerator correctamente mejora el rendimiento del servidor reduciendo el lag de exploración.  
Experimenta con diferentes radios para optimizar tu mundo.
