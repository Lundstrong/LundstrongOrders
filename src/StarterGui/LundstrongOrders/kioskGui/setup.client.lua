local path = require(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.kioskGui.filePaths)
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

local function createSummaryItem(item)
    local clone = path.kioskGui.createOrder.summaryFrame.ScrollingFrame.cloneFrame:Clone()
    clone.Parent = path.kioskGui.createOrder.summaryFrame.ScrollingFrame
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

-- * Cats (Create Order)
for i,v in pairs(getTableKeys(config.MenuItems.MenuItems)) do
    if (i == 1) then
        path.kioskGui.createOrder.Categories.Categories.selectedCategory.usernameText.Text = v
        path.kioskGui.createOrder.Categories.Categories.selectedCategory.LayoutOrder = i
        path.kioskGui.createOrder.Category.usernameText.Text = v
        -- Add items.
        for _,itemText in pairs(config.MenuItems.MenuItems[i][v]) do
            local clone = path.kioskGui.createOrder.ScrollingFrame.cloneFrame:Clone()
            clone.Parent = path.kioskGui.createOrder.ScrollingFrame
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
        local clone = path.kioskGui.createOrder.Categories.Categories.selectedCategory:Clone()
        clone.Parent = path.kioskGui.createOrder.Categories.Categories
        clone.usernameText.Text = v
        clone.Name = "Category"
        clone.LayoutOrder = i
    end
end
path.kioskGui.createOrder.Categories.Categories.CanvasSize = UDim2.new(0,0,0, ((#path.kioskGui.createOrder.Categories.Categories:GetChildren() - 1 ) * path.kioskGui.createOrder.Category.AbsoluteSize.Y))
if (#path.kioskGui.createOrder.Categories.Categories:GetChildren() < 5) then
    path.kioskGui.createOrder.Categories.Size = UDim2.new(0.192, 0, ((#path.kioskGui.createOrder.Categories.Categories:GetChildren() - 1 ) * 0.068), 0)
    path.kioskGui.createOrder.Category.usernameText.Size = UDim2.new(0.712, 0, 0.8, 0)
end
for _,v in pairs(path.kioskGui.createOrder.Categories.Categories:GetChildren()) do
    if v:IsA("TextButton") then
        if (#path.kioskGui.createOrder.Categories.Categories:GetChildren() < 5) then
            v.Size = UDim2.new(1, 0, 1/(#path.kioskGui.createOrder.Categories.Categories:GetChildren() -1), 0)
        else
            v.Size = UDim2.new(1, -12, 1/(#path.kioskGui.createOrder.Categories.Categories:GetChildren() -1), 0)
        end
    end
end
local function catSelected(newCat)
    -- Bg
    local tween2 = tweenService:Create(path.kioskGui.createOrder.categoryAnim, tweeninfo, { BackgroundTransparency = 1 })
    -- Rotate
    local tween1 = tweenService:Create(path.kioskGui.createOrder.Categories.Categories.selectedCategory.dropdownButton, tweeninfo, { Rotation = 90 })
    path.kioskGui.createOrder.Category.usernameText.Text = newCat.usernameText.Text
    tween1:Play()
    tween1.Completed:Connect(function()
        path.kioskGui.createOrder.Categories.Visible = false
        wait(0.5)
        for _,v in pairs(path.kioskGui.createOrder.ScrollingFrame:GetChildren()) do
            if v:IsA("TextButton") then
                if v.Name == "itemFrame" then
                    v:Destroy()
                end
            end
        end
        for _,itemText in pairs(config.MenuItems.MenuItems[newCat.LayoutOrder][newCat.usernameText.Text]) do
            local clone = path.kioskGui.createOrder.ScrollingFrame.cloneFrame:Clone()
            clone.Parent = path.kioskGui.createOrder.ScrollingFrame
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
for _,v in pairs(path.kioskGui.createOrder.Categories.Categories:GetChildren()) do
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
