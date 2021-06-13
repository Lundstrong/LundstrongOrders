local path = require(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.cashierGui.filePaths)
local config = require(workspace.LundstrongOrders.Configuration)
local tweenService = game:GetService("TweenService")
local tweeninfo = TweenInfo.new(1)

local function getTableKeys(tab)
    local keyset = {}
    for _,v in ipairs(tab) do
      for k,_ in pairs(v) do
        keyset[#keyset + 1] = k -- More effective/optimised than table.insert(keyset,k)
      end
    end
    return keyset
end

local function deepCopy(original) -- See https://developer.roblox.com/en-us/articles/Cloning-tables for more info
	local copy = {}
	for k, v in pairs(original) do
		if type(v) == "table" then
			v = deepCopy(v)
		end
		copy[k] = v
	end
	return copy
end

local function createSummaryItem(item)
    local clone = path.cashierGui.createOrder.summaryFrame.ScrollingFrame.cloneFrame:Clone()
    clone.Parent = path.cashierGui.createOrder.summaryFrame.ScrollingFrame
    clone.Visible = true
    clone.TextLabel.Text = item.TextLabel.Text
    clone.Name = "itemFrame"
    clone.MouseButton1Up:Connect(function()
        clone:Destroy()
    end)
    clone.TextLabel.MouseButton1Up:Connect(function()
        clone:Destroy()
    end)
end

-- * Cats (Cashier -> Create Order)
for i,v in pairs(getTableKeys(config.MenuItems.MenuItems)) do
    if (i == 1) then
        path.cashierGui.createOrder.Categories.Categories.selectedCategory.usernameText.Text = v
        path.cashierGui.createOrder.Categories.Categories.selectedCategory.LayoutOrder = i
        path.cashierGui.createOrder.Category.usernameText.Text = v
        -- Add items.
        for _,itemText in pairs(config.MenuItems.MenuItems[i][v]) do
            local clone = path.cashierGui.createOrder.ScrollingFrame.cloneFrame:Clone()
            clone.Parent = path.cashierGui.createOrder.ScrollingFrame
            clone.Visible = true
            clone.TextLabel.Text = itemText.ItemName
            clone.Name = "itemFrame"
            clone.MouseButton1Up:Connect(function()
                createSummaryItem(clone)
            end)
            clone.TextLabel.MouseButton1Up:Connect(function()
                createSummaryItem(clone)
            end)
        end
    else
        local clone = path.cashierGui.createOrder.Categories.Categories.selectedCategory:Clone()
        clone.Parent = path.cashierGui.createOrder.Categories.Categories
        clone.usernameText.Text = v
        clone.Name = "Category"
        clone.LayoutOrder = i
    end
end
path.cashierGui.createOrder.Categories.Categories.CanvasSize = UDim2.new(0,0,0, ((#path.cashierGui.createOrder.Categories.Categories:GetChildren() - 1 ) * 40))
if (#path.cashierGui.createOrder.Categories.Categories:GetChildren() < 5) then
    path.cashierGui.createOrder.Categories.Size = UDim2.new(0.192, 0, ((#path.cashierGui.createOrder.Categories.Categories:GetChildren() - 1 ) * 0.068), 0)
end
for _,v in pairs(path.cashierGui.createOrder.Categories.Categories:GetChildren()) do
    if v:IsA("TextButton") then
        if (#path.cashierGui.createOrder.Categories.Categories:GetChildren() < 5) then
            v.Size = UDim2.new(1, 0, 1/(#path.cashierGui.createOrder.Categories.Categories:GetChildren() -1), 0)
        else
            v.Size = UDim2.new(1, -12, 1/(#path.cashierGui.createOrder.Categories.Categories:GetChildren() -1), 0)
        end
    end
end
local function catSelected(newCat)
    -- Bg
    local tween2 = tweenService:Create(path.cashierGui.createOrder.categoryAnim, tweeninfo, { BackgroundTransparency = 1 })
    -- Rotate
    local tween1 = tweenService:Create(path.cashierGui.createOrder.Categories.Categories.selectedCategory.dropdownButton, tweeninfo, { Rotation = 90 })
    path.cashierGui.createOrder.Category.usernameText.Text = newCat.usernameText.Text
    tween1:Play()
    tween1.Completed:Connect(function()
        path.cashierGui.createOrder.Categories.Visible = false
        wait(0.5)
        for _,v in pairs(path.cashierGui.createOrder.ScrollingFrame:GetChildren()) do
            if v:IsA("TextButton") then
                if v.Name == "itemFrame" then
                    v:Destroy()
                end
            end
        end
        for _,itemText in pairs(config.MenuItems.MenuItems[newCat.LayoutOrder][newCat.usernameText.Text]) do
            local clone = path.cashierGui.createOrder.ScrollingFrame.cloneFrame:Clone()
            clone.Parent = path.cashierGui.createOrder.ScrollingFrame
            clone.Visible = true
            clone.TextLabel.Text = itemText.ItemName
            clone.Name = "itemFrame"
            clone.MouseButton1Up:Connect(function()
                createSummaryItem(clone)
            end)
            clone.TextLabel.MouseButton1Up:Connect(function()
                createSummaryItem(clone)
            end)
        end
        tween2:Play()
    end)
end
for _,v in pairs(path.cashierGui.createOrder.Categories.Categories:GetChildren()) do
    if v:IsA("TextButton") then
        v.MouseButton1Up:Connect(function()
            catSelected(v)
        end)
        v.dropdownButton.MouseButton1Up:Connect(function()
            catSelected(v)
        end)
        v.usernameText.MouseButton1Up:Connect(function()
            catSelected(v)
        end)
    end
end
-- * Autofill (Taken from BAE Code)
local Players = game:GetService("Players")
path.cashierGui.usernamePrompt.usernameFrame.usernameText:GetPropertyChangedSignal("Text"):Connect(function()
    if (path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text ~= "") then
        local toReturn = {}
        local Segment = path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text
        local lowerSegment = string.lower(path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text)
        for _,b in next,Players:GetPlayers() do
            if string.sub(b.DisplayName:lower(),1,#Segment) == lowerSegment then
                table.insert(toReturn,b)
            end
        end
        if type(toReturn[1]) == "userdata" then
            path.cashierGui.usernamePrompt.usernameFrame.playerName.Value = toReturn[1].Name
            path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text = toReturn[1].DisplayName
            path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text = string.sub(path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text, 1, string.len(path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text))
        else
            path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text = "" -- No Username
        end
    else
        path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text = "" -- No Username
    end
end)
-- * Cats (Cashier -> View Menu)
for i,v in pairs(getTableKeys(config.MenuItems.MenuItems)) do
    -- Add Div.
    local divClone = path.cashierGui.viewMenu.ScrollingFrame.dividerClone:Clone()
    divClone.Parent = path.cashierGui.viewMenu.ScrollingFrame
    divClone.Name = "divider"
    divClone.TextLabel.Text = v
    divClone.Visible = true
    -- Add items.
    local items = deepCopy(config.MenuItems.MenuItems[i][v])
    while (items[1]) do
        local clone = path.cashierGui.viewMenu.ScrollingFrame.itemGroupClone:Clone()
        clone.Parent = path.cashierGui.viewMenu.ScrollingFrame
        clone.Visible = true
        clone.Name = "itemFrameGroip"
        if (items[4]) then
            clone.Frame4.TextLabel.Text = items[4].ItemName
            table.remove(items, 4)
        else
            clone.Frame4:Destroy()
        end
        if (items[3]) then
            clone.Frame3.TextLabel.Text = items[3].ItemName
            table.remove(items, 3)
        else
            clone.Frame3:Destroy()
        end
        if (items[2]) then
            clone.Frame2.TextLabel.Text = items[2].ItemName
            table.remove(items, 2)
        else
            clone.Frame2:Destroy()
        end
        clone.Frame1.TextLabel.Text = items[1].ItemName
        table.remove(items, 1)
    end
end
-- Username
path.cashierGui.home.username.Text = game.Players.LocalPlayer.DisplayName
