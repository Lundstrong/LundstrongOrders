local chefGui = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.chefGui.chefGui
local currentOrderId = false
game.ReplicatedStorage:WaitForChild("LundstrongOrders"):WaitForChild("Events"):WaitForChild("completeOrder").OnClientEvent:Connect(function(order)
    chefGui.Enabled = true
    for _,v in pairs(order.items) do
        local clone = chefGui.main.Items.ScrollingFrame.cloneFrame:Clone()
        clone.Parent = chefGui.main.Items.ScrollingFrame
        clone.Name = "itemFrame"
        clone.Visible = true
        clone.TextLabel.Text = v
    end
    currentOrderId = order.id
    chefGui.main.username.Text = "Order For: "..order.orderReceiver.DisplayName
end)
chefGui.main.Frame.TextButton.MouseButton1Up:Connect(function()
    if (currentOrderId) then
        chefGui.Enabled = false
        for _,v in pairs(chefGui.main.Items.ScrollingFrame:GetChildren()) do
            if (v.Name == "itemFrame") then
                v:Destroy()
            end
        end
        game.ReplicatedStorage.LundstrongOrders.Events.completeOrder:FireServer(currentOrderId)
        currentOrderId = false
    end
end)
chefGui.main.Items.ScrollingFrame.UIListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = chefGui.main.Items.ScrollingFrame.UIListLayout.AbsoluteContentSize
	chefGui.main.Items.ScrollingFrame.CanvasSize = UDim2.new(0, 0, 0, absoluteSize.Y)
end)
