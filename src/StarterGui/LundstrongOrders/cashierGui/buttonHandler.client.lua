local path = require(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.filePaths)
local tween = require(game.ReplicatedStorage.LundstrongOrders.tween)
local Nofications = require(game.ReplicatedStorage.LundstrongOrders.notifHandler)
local tweenService = game:GetService("TweenService")
local tweeninfo = TweenInfo.new(.75)
local openBounce = false

-- * Button Handlers
  -- Home
path.cashierGui.home.buttonFrame.createOrderButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.home, path.cashierGui.createOrder)
end)
path.cashierGui.home.buttonFrame.reportBugButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.home, path.cashierGui.reportBugs)
end)
path.cashierGui.home.buttonFrame.viewMenuButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.home, path.cashierGui.viewMenu)
end)
path.cashierGui.home.settingButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.home, path.cashierGui.settings)
end)
path.cashierGui.home.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.home)
end)
path.cashierGui.home.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.home)
end)
  -- createOrder
path.cashierGui.createOrder.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.createOrder, path.cashierGui.home)
end)
path.cashierGui.createOrder.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.createOrder, path.cashierGui.home)
end)
  -- Cat. Selector
local function catSelect()
    -- Bg
    local tween1 = tweenService:Create(path.cashierGui.createOrder.categoryAnim, tweeninfo, { BackgroundTransparency = .2 })
    -- Rotate
    local tween2 = tweenService:Create(path.cashierGui.createOrder.Categories.Categories.selectedCategory.dropdownButton, tweeninfo, { Rotation = 0 })
    tween1:Play()
    tween1.Completed:Connect(function()
        path.cashierGui.createOrder.Categories.Visible = true
        wait(0.5)
        tween2:Play()
    end)
end
path.cashierGui.createOrder.Category.MouseButton1Up:Connect(catSelect)
path.cashierGui.createOrder.Category.usernameText.MouseButton1Up:Connect(catSelect)
path.cashierGui.createOrder.Category.dropdownButton.MouseButton1Up:Connect(catSelect)
path.cashierGui.createOrder.ScrollingFrame.UIGridLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.cashierGui.createOrder.ScrollingFrame.UIGridLayout.AbsoluteContentSize
	path.cashierGui.createOrder.ScrollingFrame.CanvasSize = UDim2.new(0, absoluteSize.X, 0, absoluteSize.Y)
end)
path.cashierGui.createOrder.summaryFrame.ScrollingFrame.UIGridLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.cashierGui.createOrder.summaryFrame.ScrollingFrame.UIGridLayout.AbsoluteContentSize
	path.cashierGui.createOrder.summaryFrame.ScrollingFrame.CanvasSize = UDim2.new(0, absoluteSize.X, 0, absoluteSize.Y)
end)
path.cashierGui.createOrder.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.createOrder)
end)
path.cashierGui.createOrder.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.createOrder)
end)
path.cashierGui.createOrder.buttonFrame.clearAllItemsButton.MouseButton1Up:Connect(function()
    for _,v in pairs(path.cashierGui.createOrder.summaryFrame.ScrollingFrame:GetChildren()) do
        if (v:IsA("TextButton")) then
             if (v.Name == "itemFrame") then
                v:Destroy()
            end
        end
    end
end)
path.cashierGui.createOrder.buttonFrame.submitOrderButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.createOrder, path.cashierGui.usernamePrompt)
end)
path.cashierGui.usernamePrompt.buttonFrame.backButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.usernamePrompt, path.cashierGui.createOrder)
end)
local createOrderDebounce = false -- OrderCooldown is dealt with on the server to prevent exploiters. This is just to stop the script from breaking.
path.cashierGui.usernamePrompt.buttonFrame.submitOrderButton.MouseButton1Up:Connect(function()
    if (createOrderDebounce == false) then
        createOrderDebounce = true
        local items = {}
        for _,v in pairs(path.cashierGui.createOrder.summaryFrame.ScrollingFrame:GetChildren()) do 
            if v.Name == "itemFrame" and v:IsA("TextButton") then
                table.insert(items, v.TextLabel.Text)
            end
        end
        print(items)
        local orderSubmitted = game.ReplicatedStorage.LundstrongOrders.Events.createOrder:InvokeServer(path.cashierGui.usernamePrompt.usernameFrame.playerName.Value, items)
        if (orderSubmitted == true) then
            for _,v in pairs(path.cashierGui.createOrder.summaryFrame.ScrollingFrame:GetChildren()) do
                if (v:IsA("TextButton")) then
                    if (v.Name == "itemFrame") then
                        v:Destroy()
                    end
                end
            end
            path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text = ""
            createOrderDebounce = false
            Nofications:CreateNotification("The order has been submitted!")
        else
            createOrderDebounce = false
            Nofications:CreateNotification(orderSubmitted)
        end
        tween:Create(path.cashierGui.usernamePrompt, path.cashierGui.createOrder)
    end
end)
path.cashierGui.usernamePrompt.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.reportBugs)
end)
path.cashierGui.usernamePrompt.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.reportBugs)
end)
  -- reportBugs
path.cashierGui.reportBugs.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.reportBugs, path.cashierGui.home)
end)
path.cashierGui.reportBugs.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.reportBugs, path.cashierGui.home)
end)
path.cashierGui.reportBugs.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.reportBugs)
end)
path.cashierGui.reportBugs.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.reportBugs)
end)
  -- settings
path.cashierGui.settings.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.settings, path.cashierGui.home)
end)
path.cashierGui.settings.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.settings, path.cashierGui.home)
end)
path.cashierGui.settings.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.settings)
end)
path.cashierGui.settings.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.settings)
end)
  -- viewMenu
path.cashierGui.viewMenu.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.viewMenu, path.cashierGui.home)
end)
path.cashierGui.viewMenu.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.cashierGui.viewMenu, path.cashierGui.home)
end)
path.cashierGui.viewMenu.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.viewMenu)
end)
path.cashierGui.viewMenu.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.cashierGui.viewMenu)
end)
path.cashierGui.viewMenu.ScrollingFrame.UIListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.cashierGui.viewMenu.ScrollingFrame.UIListLayout.AbsoluteContentSize
	path.cashierGui.viewMenu.ScrollingFrame.CanvasSize = UDim2.new(0, 0, 0, absoluteSize.Y)
end)
-- * Fade IN
game.ReplicatedStorage:WaitForChild("LundstrongOrders"):WaitForChild("Events"):WaitForChild("enableGui").OnClientEvent:Connect(function(gui)
    if (gui == "cashierGui") then
        if (openBounce == false) then
            openBounce = true
            local tween1 = tweenService:Create(path.cashierGui.home.animFrame, tweeninfo, {Transparency = 0})
            local tween2 = tweenService:Create(path.cashierGui.home.bgGreenAnim, tweeninfo, {ImageTransparency = 0})
            local tween5 = tweenService:Create(path.cashierGui.home.animFrame, tweeninfo, {Transparency = 1})
            local tween6 = tweenService:Create(path.cashierGui.home.bgGreenAnim, tweeninfo, {ImageTransparency = 1})
            local tween7 = tweenService:Create(path.cashierGui.home.exitButton, tweeninfo, {BackgroundTransparency = 0})
            local tween8 = tweenService:Create(path.cashierGui.home.exitButton.TextButton, tweeninfo, {TextTransparency = 0})
            path.cashierGui.home.animFrame.Transparency = 0
            path.cashierGui.home.bgGreenAnim.ImageTransparency = 0
            path.cashierGui.home.exitButton.BackgroundTransparency = 1
            path.cashierGui.home.exitButton.TextButton.TextTransparency = 1
            path.cashierGuiFolder.cashierGui.Enabled = true
            tween1:Play()
            tween2:Play()
            tween2.Completed:Connect(function()
                path.cashierGui.home.Visible = true
                wait(0.2)
                tween5:Play()
                tween6:Play()
                tween7:Play()
                tween8:Play()
            end)
        end
    end
end)
