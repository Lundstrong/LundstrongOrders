local Configuration = require(workspace.LundstrongOrders.Configuration)
local function handlePickUpUI(chefGui)
    if (chefGui.Name == "pickupGui") then
        print("INITIALISING GUI")
        local path = {
            ["pickupGui"] = {
                ["prep"] = chefGui.Frame.prep.Items.orderList,
                ["complete"] = chefGui.Frame.complete.Items.orderList,
            }
        }
        game.ReplicatedStorage.LundstrongOrders.Events.orderList.OnClientEvent:Connect(function(orders)
            print("[LundstrongOrders] [PickupScreenGUI] Event Received")
            for _,v in pairs(orders) do
                local foundOrder
                for _,v2 in pairs(path.pickupGui.prep:GetChildren()) do
                    if (v2:IsA("Frame")) then
                        if (v2.Name == "itemFrame") then 
                            if (v2.ID.Value == v.id) then
                                foundOrder = true
                                if (v.isCompleted) then
                                    v2.Parent = path.pickupGui.complete
                                    coroutine.resume(coroutine.create(function()
                                        wait(Configuration.PickupScreenSettings.CompletedOrdersTime)
                                        v2:Destroy()
                                    end))
                                    break
                                end
                            end
                        end
                    end
                end
                if (not foundOrder and v.isClaimed and not v.isCompleted) then
                    local clone = path.pickupGui.prep.cloneFrame:Clone()
                    clone.Parent = path.pickupGui.prep
                    clone.Name = "itemFrame"
                    clone.ID.Value = v.id
                    clone.Frame.username.Text = v.orderReceiver.DisplayName
                    clone.Frame.ImageLabel.Image = "rbxthumb://type=Avatar&id="..v.orderReceiver.UserId.."&w=720&h=720"
                    clone.Frame.orderNumber.Text = "Order #"..v.id
                    clone.Visible = true
                end
            end
        end)
    end
end
game.Players.LocalPlayer.PlayerGui.LundstrongOrders.pickupScreenGui.DescendantAdded:Connect(handlePickUpUI)
for _,pickupScreenGui in pairs(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.pickupScreenGui:GetChildren()) do
    handlePickUpUI(pickupScreenGui)
end
