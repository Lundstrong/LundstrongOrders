local run = game:GetService("RunService")

if (run:IsClient()) then -- ! This script can only run on the client side.
    game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui:WaitForChild("hrScreenGui") -- ? Is there a better way to do this?
    return {
        ["hrScreenGuiFolder"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui,
        ["hrScreenGui"] = {
                ["home"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.home,
                ["modal"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.modal,
                ["manageOrders"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.manageOrders,
                ["plugins"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.plugins,
                ["gameSettings"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.gameSettings
            }
        }
end
