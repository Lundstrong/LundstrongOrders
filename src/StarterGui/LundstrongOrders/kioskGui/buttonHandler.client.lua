local path = require(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.kioskGui.filePaths)
local Nofications = require(game.ReplicatedStorage.LundstrongOrders.notifHandler)
local tween = require(game.ReplicatedStorage.LundstrongOrders.tween)
local tweenService = game:GetService("TweenService")
local tweeninfo = TweenInfo.new(.75)
local openBounce = false

-- * Button Handlers
  -- Cat. Selector
local function catSelect()
    -- Bg
    local tween1 = tweenService:Create(path.kioskGui.createOrder.categoryAnim, tweeninfo, { BackgroundTransparency = .2 })
    -- Rotate
    local tween2 = tweenService:Create(path.kioskGui.createOrder.Categories.Categories.selectedCategory.dropdownButton, tweeninfo, { Rotation = 0 })
    tween1:Play()
    tween1.Completed:Connect(function()
        path.kioskGui.createOrder.Categories.Visible = true
        wait(0.5)
        tween2:Play()
    end)
end
path.kioskGui.createOrder.Category.MouseButton1Up:Connect(catSelect)
path.kioskGui.createOrder.Category.usernameText.MouseButton1Up:Connect(catSelect)
path.kioskGui.createOrder.Category.dropdownButton.MouseButton1Up:Connect(catSelect)
path.kioskGui.createOrder.ScrollingFrame.UIGridLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.kioskGui.createOrder.ScrollingFrame.UIGridLayout.AbsoluteContentSize
	path.kioskGui.createOrder.ScrollingFrame.CanvasSize = UDim2.new(0, absoluteSize.X, 0, absoluteSize.Y)
end)
path.kioskGui.createOrder.summaryFrame.ScrollingFrame.UIGridLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.kioskGui.createOrder.summaryFrame.ScrollingFrame.UIGridLayout.AbsoluteContentSize
	path.kioskGui.createOrder.summaryFrame.ScrollingFrame.CanvasSize = UDim2.new(0, absoluteSize.X, 0, absoluteSize.Y)
end)
path.kioskGui.createOrder.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.kioskGui.createOrder)
end)
path.kioskGui.createOrder.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.kioskGui.createOrder)
end)
path.kioskGui.createOrder.buttonFrame.clearAllItemsButton.MouseButton1Up:Connect(function()
    for _,v in pairs(path.kioskGui.createOrder.summaryFrame.ScrollingFrame:GetChildren()) do
        if (v:IsA("TextButton")) then
             if (v.Name == "itemFrame") then
                v:Destroy()
            end
        end
    end
end)
local createOrderDebounce = false -- OrderCooldown is dealt with on the server to prevent exploiters. This is just to stop the script from breaking.
path.kioskGui.createOrder.buttonFrame.submitOrderButton.MouseButton1Up:Connect(function()
    if (createOrderDebounce == false) then
        createOrderDebounce = true
        local items = {}
        for _,v in pairs(path.kioskGui.createOrder.summaryFrame.ScrollingFrame:GetChildren()) do 
            if v.Name == "itemFrame" and v:IsA("TextButton") then
                table.insert(items, v.TextLabel.Text)
            end
        end
        print(items)
        local orderSubmitted, time = game.ReplicatedStorage.LundstrongOrders.Events.createOrder:InvokeServer(game.Players.LocalPlayer.Name, items)
        if (orderSubmitted == true) then
            for _,v in pairs(path.kioskGui.createOrder.summaryFrame.ScrollingFrame:GetChildren()) do
                if (v:IsA("TextButton")) then
                    if (v.Name == "itemFrame") then
                        v:Destroy()
                    end
                end
            end
            createOrderDebounce = false
            Nofications:CreateNotification("The order has been submitted!")
        else
            createOrderDebounce = false
            print(time)
            Nofications:CreateNotification(orderSubmitted, time)
        end
    end
end)
-- * Fade IN
game.ReplicatedStorage:WaitForChild("LundstrongOrders"):WaitForChild("Events"):WaitForChild("enableGui").OnClientEvent:Connect(function(gui)
    if (gui == "kioskGui") then
        if (openBounce == false) then
            openBounce = true
            local tween1 = tweenService:Create(path.kioskGui.createOrder.animFrame, tweeninfo, {Transparency = 0})
            local tween2 = tweenService:Create(path.kioskGui.createOrder.bgGreenAnim, tweeninfo, {ImageTransparency = 0})
            local tween5 = tweenService:Create(path.kioskGui.createOrder.animFrame, tweeninfo, {Transparency = 1})
            local tween6 = tweenService:Create(path.kioskGui.createOrder.bgGreenAnim, tweeninfo, {ImageTransparency = 1})
            local tween7 = tweenService:Create(path.kioskGui.createOrder.exitButton, tweeninfo, {BackgroundTransparency = 0})
            local tween8 = tweenService:Create(path.kioskGui.createOrder.exitButton.TextButton, tweeninfo, {TextTransparency = 0})
            path.kioskGui.createOrder.animFrame.Transparency = 0
            path.kioskGui.createOrder.bgGreenAnim.ImageTransparency = 0
            path.kioskGui.createOrder.exitButton.BackgroundTransparency = 1
            path.kioskGui.createOrder.exitButton.TextButton.TextTransparency = 1
            path.kioskGuiFolder.kioskGui.Enabled = true
            tween1:Play()
            tween2:Play()
            tween2.Completed:Connect(function()
                path.kioskGui.createOrder.Visible = true
                wait(0.2)
                tween5:Play()
                tween6:Play()
                tween7:Play()
                tween8:Play()
            end)
        end
    end
end)
