local tweenService = game:GetService("TweenService")
local module = {}
local path = {
    ["Container"] = game.Players.LocalPlayer.PlayerGui.LundstrongOrders.notification.notification.Container
}

function module:CreateNotification(notificationText: string, notificationTime: number?) 
    local clone = path.Container.Demo:Clone()
    clone.Parent = path.Container
    clone.Name = "Notification"
    clone.Frame.textFrame.TextLabel.Text = notificationText

    local tween1 = tweenService:Create(clone.Frame, TweenInfo.new(1), {
        Position =  UDim2.new(0.1, 0, 0.1, 0)
    })
    local tween2 = tweenService:Create(clone.Frame.Frame, TweenInfo.new(notificationTime or 5, Enum.EasingStyle.Linear, Enum.EasingDirection.Out), {
        BackgroundColor3 = Color3.fromRGB(90, 137, 149),
        Size = UDim2.new(0, 0, 0.05, 0)
    })
    local tween3 = tweenService:Create(clone.Frame, TweenInfo.new(1), {
        Position =  UDim2.new(0.1, 0, 1.1, 0)
    })

    tween1:Play()
    game.Players.LocalPlayer.PlayerGui.LundstrongOrders.notification.Sound:Play()
    tween1.Completed:Connect(function()
        tween2:Play()
    end)
    tween2.Completed:Connect(function()
        tween3:Play()
    end)
    tween3.Completed:Connect(function()
        clone:Destroy()
    end)
end


return module
