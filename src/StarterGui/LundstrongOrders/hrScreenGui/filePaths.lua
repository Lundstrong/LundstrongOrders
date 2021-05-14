local run = game:GetService("RunService")

if (run:IsClient()) then -- ! This script can only run on the client side.
    game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui:WaitForChild("hrScreenGui") -- ? Is there a better way to do this?
    return {
        ["hrScreenGuiFolder"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui,
        ["hrScreenGui"] = {
                ["home"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.home,
                ["manageOrders"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.manageOrders,
                ["staffStatus"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.staffStatus,
                ["gameSettings"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.gameSettings
            }
        }
end
