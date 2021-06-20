!!! attention
    Please note that you **must** be [setup for development](../contributing/setup.md) before following this tutorial. 

It is suggested to follow this guide so that you can make sure that your GUI is not overwritten accidently by rojo.

Firstly, start the Rojo server on both sides and connect to it.

Then, once you have got the latest updates, you can modify scripts (in VSC!) & the GUI (In studio) to your liking.

When you are ready to import it back to Visual Studio Code, please do the following.

1. Please set the GUI back to its normal enabled state, and make sure the frames visible are the ones which were visible originally. (IE: Only `home` should be visible for CashierGui)
2. Right Click on the GUI, and click `Save to file`
3. Change the `Save as type:` from `.rbxm` to `.rbxmx`. This is __very important__, as otherwise rojo will not be able to understand the GUI (Once version 7 of rojo is released, we will be able move to a binary file for GUI).
4. Save it in the folder for the GUI and overwrite the old one.


!!! danger "Important"
    If your rojo server disconnects for some reason, **__do not reconnect__**. It will overwrite your progress. Just keep on working until you have imported the GUI but be aware your scripts will not sync.
