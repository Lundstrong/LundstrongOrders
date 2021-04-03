local Nofications = require(game.ReplicatedStorage.LundstrongOrders.notifHandler)

game.ReplicatedStorage.LundstrongOrders.Events.sendNotification.OnClientEvent:Connect(function(notification: string, time: number?)
    Nofications:CreateNotification(notification, time)
end)
