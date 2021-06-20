!!! warning inline end
    Please note that this section for how to setup LundstrongOrders for Development. We do not recommend following this unless you know what you are doing!

To setup LundstrongOrders for Development, you will need to setup the Visual Studio Code part, and the Roblox part. Visual Studio Code is strong suggested, although you can use other text editors if you prefer.

## Visual Studio Code

To setup the Visual Studio Code, first install the [Rojo Extension](https://marketplace.visualstudio.com/items?itemName=evaera.vscode-rojo). This will allow you to setup Rojo eaisily.

After you have installed Rojo, you will see the welcome screen. Scroll down until you get to the Plugin Section, and then Select `Manage it for Me`. You can select manually installing rojo - but if there is a major update you would have to remove and reinstall the plugin.


![Setup Screen](https://i.imgur.com/u3kWiOa.png)


Next, we **highly suggest** installing Roblox LSP. Roblox LSP allows you to have syntax highlighting for Roblox Lua, and also allows you to have autocomplete. You can install it [here](https://marketplace.visualstudio.com/items?itemName=Nightrains.robloxlsp). For more information, see [the DevForum post](https://devforum.roblox.com/t/717745).

## Roblox

On the Roblox End, you need to create some folders to test & develop the system.

1. In the workspace, add the LundstrongOrders model like you would as a normal user, but then disable the add script.
2. Set up the config to what you would like it to be.
3. Create a folder in StarterGui called `LundstrongOrders`
4. Create a folder in ReplicatedStorage called `LundstrongOrders`
5. Create a folder in ServerScriptService called `LundstrongOrders`

??? tip
    Steps 3-5 can be automated by pasting the following into the command bar:
    ``` lua
    if (not workspace:FindFirstChild("LundstrongOrders")) then warn("No LundstrongOrders setup in Workspace! Stopping Script.") else Instance.new("Folder", game.StarterGui).Name = "LundstrongOrders"; Instance.new("Folder", game.ReplicatedStorage).Name = "LundstrongOrders"; Instance.new("Folder", game.ServerScriptService).Name = "LundstrongOrders"; end
    ```
