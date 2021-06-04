local api = {}
local playerService = game:GetService("Players")
local guiTypes = {"cashierGui", "kioskGui", "hrScreenGui"}
local events = game.ServerScriptService.LundstrongOrders.apiEvents

api.onOrderCreated = events.orderCreated.Event

api.onOrderClaimed = events.orderClaimed.Event

api.onOrderCompleted = events.orderCompleted.Event

function api:EnableGui(Player: Player, gui: string)
    if (table.find(guiTypes, gui)) then
        events.enableGui:Fire(Player, gui)
    else
        error("[LundstrongOrders] api:EnableGui type is NOT of \"cashierGui\" OR \"kioskGui\" OR \"hrScreenGui\"")
    end
end

function api:SendNotification(Player: Player, message: string, time: number?)
    events.sendNotification:Fire(Player, message, time)
end

function api:RegisterPluginGuiWithHrScreen(gui: GuiObject)
    for _,Player in pairs(playerService:GetPlayers()) do
        Player.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.plugins.ScrollingFrame.noPlugins.Visible = false
        gui:Clone().Parent = Player.PlayerGui.LundstrongOrders.hrScreenGui.hrScreenGui.plugins.ScrollingFrame
    end
    game.StarterGui.LundstrongOrders.hrScreenGui.hrScreenGui.plugins.ScrollingFrame.noPlugins.Visible = false
    gui:Clone().Parent = game.StarterGui.LundstrongOrders.hrScreenGui.hrScreenGui.plugins.ScrollingFrame
end

return api
