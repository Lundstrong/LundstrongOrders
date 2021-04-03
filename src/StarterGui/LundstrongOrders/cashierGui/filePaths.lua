local run = game:GetService("RunService")

if (run:IsClient()) then -- ! This script can only run on the client side.
    game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui:WaitForChild("cashierGui") -- ? Is there a better way to do this?
    return {
        ["cashierGuiFolder"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui,
        ["cashierGui"] = {
                ["home"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.cashierGui.home,
                ["reportBugs"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.cashierGui.reportBugs,
                ["settings"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.cashierGui.settings,
                ["createOrder"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.cashierGui.createOrder,
                ["usernamePrompt"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.cashierGui.usernamePrompt,
                ["viewMenu"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.cashierGui.viewMenu,
            }
        }
end
