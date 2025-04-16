# Chunky Pregenerator Tutorial

## Introduction:

Chunky Pregenerator is a mod designed to pre-generate chunks in your Minecraft world,
helping to reduce lag and improve overall performance when exploring new areas.
By pre-generating chunks, your server will experience fewer delays during gameplay,
especially in high-traffic or exploration-intensive sessions.

## Features:

- Pre-generates chunks over a specified area or radius.
- Can be run manually or automatically on server startup.
- Helps reduce in-game lag and improve overall server performance.
- Configurable settings for chunk generation speed and radius.

## How It Works:

Chunky works by generating terrain in chunks before players visit those areas.
This process creates a “pregen” world where the terrain, structures, and resources
are already loaded, meaning that when a player enters an area, the server doesn’t
need to generate the chunks on the fly.

## Commands & Usage:

1. Basic Command:
  Use the command:
  /chunky pregen <radius>
  This will start pre-generating chunks within the specified radius from the spawn.
  Example:
  /chunky pregen 100
  This command pre-generates all chunks in a 100-block radius.

2. Checking Status:
  You can check the status of the pre-generation process with:
  /chunky status
  This command displays the progress and performance metrics.

3. Cancelling Pre-Generation:
  If needed, you can cancel the pre-generation process with:
  /chunky cancel

4. Advanced Settings:
  - Some configurations can be modified in the mod’s config files.
  - Adjust parameters like generation speed or maximum chunk count.
  - Refer to the config file (usually located in your server’s config folder) for detailed options.

## Tips & Best Practices:

- Pre-generation is recommended during off-peak hours or before the server is open to players.
- Start with a small radius to test performance impact, then gradually increase.
- For larger maps, consider scheduling pre-generation tasks during maintenance periods.
- Use the /chunky status command regularly to monitor progress and ensure the process
  is not overloading your server.
- If possible, automate the pre-generation process on server startup with a script that
  runs the /chunky pregen command for a defined radius. This can be done by adding the
  command to your startup scripts or using a server plugin that supports command automation.

## Additional Resources:

- CurseForge: https://www.curseforge.com/minecraft/mc-mods/chunky-pregenerator-forge
- Chunky Wiki (How-To’s): https://github.com/pop4959/Chunky/wiki/How-To%27s
- Chunky Wiki (Pregeneration): https://github.com/pop4959/Chunky/wiki/Pregeneration

## Conclusion:

Using Chunky Pregenerator effectively can greatly enhance the performance of your server
by reducing lag when players explore new areas. Experiment with different radii and settings
to find the optimal balance for your world. Enjoy smoother gameplay and a more stable server!
