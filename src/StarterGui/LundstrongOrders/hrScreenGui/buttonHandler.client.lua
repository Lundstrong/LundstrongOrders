local path = require(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.filePaths)
local tween = require(game.ReplicatedStorage.LundstrongOrders.tween)
local tweenService = game:GetService("TweenService")
local tweeninfo = TweenInfo.new(.75)
local openBounce = false

-- * Button Handlers
  -- Home
path.hrScreenGui.home.buttonFrame.manageOrdersButton.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.home, path.hrScreenGui.manageOrders)
end)
path.hrScreenGui.home.buttonFrame.pluginsButton.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.home, path.hrScreenGui.plugins)
end)
path.hrScreenGui.home.buttonFrame.gameSettingsButton.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.home, path.hrScreenGui.gameSettings)
end)
path.hrScreenGui.home.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.home)
end)
path.hrScreenGui.home.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.home)
end)
 -- Game Settings
path.hrScreenGui.gameSettings.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.gameSettings, path.hrScreenGui.home)
end)
path.hrScreenGui.gameSettings.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.gameSettings, path.hrScreenGui.home)
end)
path.hrScreenGui.gameSettings.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.gameSettings)
end)
path.hrScreenGui.gameSettings.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.gameSettings)
end)
-- Manage Orders
path.hrScreenGui.manageOrders.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.manageOrders, path.hrScreenGui.home)
end)
path.hrScreenGui.manageOrders.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.manageOrders, path.hrScreenGui.home)
end)
path.hrScreenGui.manageOrders.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.manageOrders)
end)
path.hrScreenGui.manageOrders.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.manageOrders)
end)
    -- Modal
path.hrScreenGui.modal.orderOptions.exitButton.MouseButton1Up:Connect(function()
    local tween2 = tweenService:Create(path.hrScreenGui.manageOrders.modalAnimFrame, TweenInfo.new(.5), { BackgroundTransparency = 1 })
    local tween1 = tweenService:Create(path.hrScreenGui.modal, TweenInfo.new(1), { Position = UDim2.new(0.5, 0, 1.5, 0) })
    tween1:Play()
    wait(0.5)
    tween2:Play()
    tween2.Completed:Connect(function()
        path.hrScreenGui.modal.Visible = false
    end)
end)
path.hrScreenGui.modal.orderOptions.exitButton.exitButtonText.MouseButton1Up:Connect(function()
    local tween2 = tweenService:Create(path.hrScreenGui.manageOrders.modalAnimFrame, TweenInfo.new(.5), { BackgroundTransparency = 1 })
    local tween1 = tweenService:Create(path.hrScreenGui.modal, TweenInfo.new(1), { Position = UDim2.new(0.5, 0, 1.5, 0) })
    tween1:Play()
    wait(0.5)
    tween2:Play()
    tween2.Completed:Connect(function()
        path.hrScreenGui.modal.Visible = false
    end)
end)
-- Staff Status
path.hrScreenGui.plugins.homeIcon.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.plugins, path.hrScreenGui.home)
end)
path.hrScreenGui.plugins.homeIcon.homeButton.MouseButton1Up:Connect(function()
    tween:Create(path.hrScreenGui.plugins, path.hrScreenGui.home)
end)
path.hrScreenGui.plugins.exitButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.plugins)
end)
path.hrScreenGui.plugins.exitButton.TextButton.MouseButton1Up:Connect(function()
    openBounce = false
    tween:CreateExitTween(path.hrScreenGui.plugins)
end)
-- * Scrolling Frame Handlers
path.hrScreenGui.gameSettings.ScrollingFrame.UIListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.hrScreenGui.gameSettings.ScrollingFrame.UIListLayout.AbsoluteContentSize
	path.hrScreenGui.gameSettings.ScrollingFrame.CanvasSize = UDim2.new(0, 0, 0, absoluteSize.Y)
end)
path.hrScreenGui.manageOrders.ScrollingFrame.UIListLayout:GetPropertyChangedSignal("AbsoluteContentSize"):Connect(function()
	local absoluteSize = path.hrScreenGui.manageOrders.ScrollingFrame.UIListLayout.AbsoluteContentSize
	path.hrScreenGui.manageOrders.ScrollingFrame.CanvasSize = UDim2.new(0, 0, 0, absoluteSize.Y)
end)
-- * Fade IN
game.ReplicatedStorage:WaitForChild("LundstrongOrders"):WaitForChild("Events"):WaitForChild("enableGui").OnClientEvent:Connect(function(gui)
    if (gui == "hrScreenGui") then
        if (openBounce == false) then
            openBounce = true
            local tween1 = tweenService:Create(path.hrScreenGui.home.animFrame, tweeninfo, {Transparency = 0})
            local tween2 = tweenService:Create(path.hrScreenGui.home.bgGreenAnim, tweeninfo, {ImageTransparency = 0})
            local tween5 = tweenService:Create(path.hrScreenGui.home.animFrame, tweeninfo, {Transparency = 1})
            local tween6 = tweenService:Create(path.hrScreenGui.home.bgGreenAnim, tweeninfo, {ImageTransparency = 1})
            local tween7 = tweenService:Create(path.hrScreenGui.home.exitButton, tweeninfo, {BackgroundTransparency = 0})
            local tween8 = tweenService:Create(path.hrScreenGui.home.exitButton.TextButton, tweeninfo, {TextTransparency = 0})
            path.hrScreenGui.home.animFrame.Transparency = 0
            path.hrScreenGui.home.bgGreenAnim.ImageTransparency = 0
            path.hrScreenGui.home.exitButton.BackgroundTransparency = 1
            path.hrScreenGui.home.exitButton.TextButton.TextTransparency = 1
            path.hrScreenGuiFolder.hrScreenGui.Enabled = true
            tween1:Play()
            tween2:Play()
            tween2.Completed:Connect(function()
                path.hrScreenGui.home.Visible = true
                wait(0.2)
                tween5:Play()
                tween6:Play()
                tween7:Play()
                tween8:Play()
            end)
        end
    end
end)
