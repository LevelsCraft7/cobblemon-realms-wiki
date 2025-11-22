# Tutorial de Chunky Pregenerator

## Introducción

Chunky Pregenerator es un mod que pre-genera los chunks de tu mundo de Minecraft para reducir el lag y mejorar el rendimiento durante la exploración.  
Al generar áreas por adelantado, el servidor sufre menos caídas de rendimiento en momentos de mucha actividad.

## Características

- Pre-genera chunks en un área o radio definido.
- Puede ejecutarse manualmente o automáticamente al iniciar el servidor.
- Reduce el lag y mejora el rendimiento general.
- Ajustes configurables (velocidad, radio).

## Cómo funciona

Chunky genera el terreno en trozos antes de que los jugadores visiten esas áreas.  
El mundo queda «pre-generado», con terreno, estructuras y recursos ya cargados. El servidor no necesita generarlos en tiempo real.

## Comandos y uso

1. **Comando Básico:**\
   Usa el comando:\
   `/chunky radius <radius>`\
   Esto comenzará a pre-generar los trozos en el radio especificado desde el punto de aparición.\
   Ejemplo:\
   `/chunky start`\
   Este comando comienza a generar todos los trozos dentro del radio previamente configurado.\
   Ejemplo:\
   `/chunky start`\
   Este comando comienza a generar todos los trozos dentro del radio previamente configurado.  
   Ejemplo:  
   `/chunky start`  
   Este comando comienza a generar todos los trozos dentro del radio previamente configurado.

2. **Ver Estado:**\
   Para monitorear el progreso de la pre-generación:\
   `/chunky status`\
   Esto mostrará el progreso actual y los detalles de rendimiento.

3. **Cancelar Generación:**\
   Si es necesario, puedes cancelar el proceso de pre-generación con:\
   `/chunky cancel`

4. **Configuración Avanzada:**

- Algunos ajustes pueden modificarse en los archivos de configuración del mod.
- Ajusta la velocidad o el número máximo de chunks generados.
- Consulta el archivo de configuración (generalmente encontrado en la carpeta `config` del servidor)\
  para opciones más detalladas.

## Consejos

- Se recomienda ejecutar la pre-generación durante horas de baja actividad o antes de abrir el servidor a los jugadores.
- Comienza con un radio pequeño para probar el impacto en el rendimiento y luego aumenta gradualmente.
- Para mapas grandes, programa las tareas de pre-generación durante las ventanas de mantenimiento.
- Usa regularmente el comando `/chunky status` para monitorear el progreso y evitar sobrecargar el servidor.
- Automatizar con un script que incluya `/chunky start`.  
  Esto se puede hacer mediante un script de inicio o un plugin del servidor que soporte automatización.

## Recursos

- CurseForge : https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge
- Chunky Wiki (Guías) : https://github.com/pop4959/Chunky/wiki/How-To%27s
- Chunky Wiki (Pre-Generación) : https://github.com/pop4959/Chunky/wiki/Pregeneration

## Conclusión

Usar Chunky Pregenerator correctamente mejora el rendimiento del servidor reduciendo el lag de exploración. Experimenta con diferentes radios para optimizar tu mundo.  
¡Disfruta de una jugabilidad más fluida y un servidor más estable!
