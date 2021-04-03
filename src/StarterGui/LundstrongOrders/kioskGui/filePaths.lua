local run = game:GetService("RunService")

if (run:IsClient()) then -- ! This script can only run on the client side.
    game.Players.LocalPlayer.PlayerGui.LundstrongOrders.kioskGui:WaitForChild("kioskGui") -- ? Is there a better way to do this?
    return {
        ["kioskGuiFolder"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.kioskGui,
        ["kioskGui"] = {
            ["createOrder"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.kioskGui.kioskGui.createOrder
        }
    }
end
