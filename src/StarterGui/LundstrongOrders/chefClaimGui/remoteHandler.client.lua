local tweenService = game:GetService("TweenService")
local tweenInfo = TweenInfo.new(1)
local isOrderClaimed = false
local function claimOrder(clone)
    if (not isOrderClaimed) then
        isOrderClaimed = true
        game.ReplicatedStorage.LundstrongOrders.Events.claimOrder:FireServer(clone.ID.Value)
        local tween1 = tweenService:Create(clone.Frame.TextButton, tweenInfo, { BackgroundColor3 = Color3.fromRGB(53, 79, 87) })
        tween1:Play()
        tween1.Completed:Connect(function()
            clone.Frame.TextButton.TextButton.Text = "Claimed"
            clone.LayoutOrder = 2
        end)
    end
end
local function handleChefUI(chefGui)
    if (chefGui.Name == "chefClaimGui") then
        print("INITIALISING GUI")
        local path = {
            ["chefGui"] = {
                ["Frame"] = chefGui.Frame,
                ["ScrollingFrame"] = chefGui.Frame.ScrollingFrame,
            }
        }
        game.ReplicatedStorage.LundstrongOrders.Events.orderList.OnClientEvent:Connect(function(orders)
            print("[LundstrongOrders] [ChefClaimGui] Event Received")
            for _,v in pairs(orders) do
                local foundOrder
                for _,v2 in pairs(path.chefGui.ScrollingFrame:GetChildren()) do
                    if (v2:IsA("Frame")) then
                        if (v2.Name == "itemFrame") then 
                            if (v2.ID.Value == v.id) then
                                foundOrder = true
                                if (v.isCompleted) then
                                    isOrderClaimed = false
                                    v2:Destroy()
                                    break
                                end
                                if (v.isClaimed and v2.LayoutOrder ~= 2) then
                                    local tween1 = tweenService:Create(v2.Frame.TextButton, tweenInfo, { BackgroundColor3 = Color3.fromRGB(53, 79, 87) })
                                    tween1:Play()
                                    tween1.Completed:Connect(function()
                                        v2.Frame.TextButton.TextButton.Text = "Claimed"
                                        v2.LayoutOrder = 2
                                    end)
                                    break
                                end
                            end
                        end
                    end
                end
                if (foundOrder) then
                    print("Order Found")
                else
                    print("Order not found")
                end
                if (v.isClaimed) then
                    print("Order Claimed")
                else
                    print("Order not Claimed")
                end
                if (v.isCompleted) then
                    print("Order Completed")
                else
                    print("Order not Completed")
                end
                if (not foundOrder and not v.isCompleted) then
                    local clone = path.chefGui.ScrollingFrame.cloneFrame:Clone()
                    clone.Parent = path.chefGui.ScrollingFrame
                    clone:WaitForChild("ID").Value = v.id
                    clone.Frame:WaitForChild("TextLabel").Text = v.orderReceiver.DisplayName
                    clone.Frame:WaitForChild("ImageLabel").Image = "https://www.roblox.com/Thumbs/Avatar.ashx?x=500&y=500&username="..v.orderReceiver.Name
                    clone.Name = "itemFrame"
                    clone.Visible = true
                    clone.Frame.TextButton.Activated:Connect(function()
                        claimOrder(clone)
                    end)
                    clone.Frame.TextButton.TextButton.Activated:Connect(function()
                        claimOrder(clone)
                    end)
                end
            end
        end)
        path.chefGui.ScrollingFrame.UIGridLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
            local absoluteSize = path.chefGui.ScrollingFrame.UIGridLayout.AbsoluteContentSize
            path.chefGui.ScrollingFrame.CanvasSize = UDim2.new(0, 0, 0, absoluteSize.Y)
        end)
    end
end
game.Players.LocalPlayer.PlayerGui.LundstrongOrders.chefClaimGui.DescendantAdded:Connect(handleChefUI)
for _,chefGui in pairs(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.chefClaimGui:GetChildren()) do
    handleChefUI(chefGui)
end
