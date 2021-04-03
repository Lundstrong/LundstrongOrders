local tween = game:GetService("TweenService")
local tweeninfo = TweenInfo.new(.75)
local module = {}

function module:Create(currentFrame: Frame, newFrame: Frame) 
    local tween1 = tween:Create(currentFrame.animFrame, tweeninfo, {Transparency = 0})
    local tween2 = tween:Create(currentFrame.bgGreenAnim, tweeninfo, {ImageTransparency = 0})
    local tween3 = tween:Create(currentFrame.exitButton, tweeninfo, {BackgroundTransparency = 1})
    local tween4 = tween:Create(currentFrame.exitButton.TextButton, tweeninfo, {TextTransparency = 1})
    local tween5 = tween:Create(newFrame.animFrame, tweeninfo, {Transparency = 1})
    local tween6 = tween:Create(newFrame.bgGreenAnim, tweeninfo, {ImageTransparency = 1})
    local tween7 = tween:Create(newFrame.exitButton, tweeninfo, {BackgroundTransparency = 0})
    local tween8 = tween:Create(newFrame.exitButton.TextButton, tweeninfo, {TextTransparency = 0})
    newFrame.animFrame.Transparency = 0
    newFrame.bgGreenAnim.ImageTransparency = 0
    newFrame.exitButton.BackgroundTransparency = 1
    newFrame.exitButton.TextButton.TextTransparency = 1
    tween1:Play()
    tween2:Play()
    tween3:Play()
    tween4:Play()
    tween4.Completed:Connect(function()
        currentFrame.Visible = false
        newFrame.Visible = true
        wait(0.1)
        tween5:Play()
        tween6:Play()
        tween7:Play()
        tween8:Play()
	end)
    tween8.Completed:Connect(function()
        print("Animation Complete")
		currentFrame.animFrame.Transparency = 1
		currentFrame.bgGreenAnim.ImageTransparency = 1
		currentFrame.exitButton.BackgroundTransparency = 0
		currentFrame.exitButton.TextButton.TextTransparency = 0
	end)
end

function module:CreateExitTween(currentFrame: Frame) 
    local tween1 = tween:Create(currentFrame.animFrame, tweeninfo, {Transparency = 0})
    local tween2 = tween:Create(currentFrame.bgGreenAnim, tweeninfo, {ImageTransparency = 0})
    local tween3 = tween:Create(currentFrame.exitButton, tweeninfo, {BackgroundTransparency = 1})
    local tween4 = tween:Create(currentFrame.exitButton.TextButton, tweeninfo, {TextTransparency = 1})
    tween1:Play()
    tween2:Play()
    tween3:Play()
    tween4:Play()
    tween4.Completed:Connect(function()
        currentFrame.Visible = false
        currentFrame.animFrame.Transparency = 1
		currentFrame.bgGreenAnim.ImageTransparency = 1
		currentFrame.exitButton.BackgroundTransparency = 0
		currentFrame.exitButton.TextButton.TextTransparency = 0
	end)
end

return module