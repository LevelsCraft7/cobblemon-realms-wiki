# Chunky Pregenerator Tutorial

## Introduction

Chunky Pregenerator is a mod designed to pre-generate chunks in your Minecraft world,  
which helps reduce lag and improve overall performance during exploration.  
By generating chunks in advance, your server will experience fewer slowdowns,  
especially during high-activity sessions or intense exploration.

## Features

- Pre-generates chunks in a specified area or radius.
- Can be run manually or automatically on server startup.
- Reduces in-game lag and improves server performance.
- Configurable settings for generation speed and radius.

## How It Works

Chunky generates terrain in chunks before players visit those areas.  
This process creates a "pre-generated" world where terrain, structures, and resources  
are already loaded, meaning the server doesn’t have to generate chunks on the fly  
when players enter new zones.

## Commands & Usage

1. **Basic Command:**  
   Use the command:  
   `/chunky radius <radius>`  
   This will start pregenerating chunks in the specified radius from the spawn point.  
   Example:  
   `/chunky start`  
   This command starts generating all chunks within the previously set radius.

2. **Check Status:**  
   To monitor the pregeneration progress:  
   `/chunky status`  
   This will display current progress and performance details.

3. **Cancel Generation:**  
   If needed, you can cancel the pregeneration process with:  
   `/chunky cancel`

4. **Advanced Settings:**

- Some settings can be adjusted in the mod’s configuration files.
- Modify the generation speed or maximum number of chunks generated.
- Check the config file (usually found in the server's `config` folder)  
  for more detailed options.

## Tips & Best Practices

- It’s recommended to run pregeneration during off-peak hours or before opening the server to players.
- Start with a small radius to test the impact on performance, then gradually increase.
- For large maps, schedule pregeneration tasks during maintenance windows.
- Regularly use the `/chunky status` command to monitor progress and avoid overloading the server.
- If possible, automate the process on server startup with a script containing `/chunky start`.  
  This can be done via a startup script or a server plugin that supports automation.

## Additional Resources

- CurseForge: https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge  
- Chunky Wiki (Guides): https://github.com/pop4959/Chunky/wiki/How-To%27s  
- Chunky Wiki (Pregeneration): https://github.com/pop4959/Chunky/wiki/Pregeneration  

## Conclusion

Using Chunky Pregenerator effectively can greatly improve your server’s performance  
by reducing exploration lag. Experiment with different radii and settings  
to find the right balance for your world.  
Enjoy smoother gameplay and a more stable server!
