local api = {}
local guiTypes = {"cashierGui", "kioskGui"}
local events = game.ServerScriptService.LundstrongOrders.apiEvents

api.onOrderCreated = events.orderCreated.Event

api.onOrderClaimed = events.orderClaimed.Event

api.onOrderCompleted = events.orderCompleted.Event

function api:EnableGui(Player: Player, gui: string)
    if (table.find(guiTypes, gui)) then
        events.enableGui:Fire(Player, gui)
    else
        error("[LundstrongOrders] api:EnableGui type is NOT of \"cashierGui\" OR \"kioskGui\"")
    end
end

function api:SendNotification(Player: Player, message: string, time: number?)
    events.sendNotification:Fire(Player, message, time)
end

return api
