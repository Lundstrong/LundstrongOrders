local path = require(game.Players.LocalPlayer.PlayerGui.LundstrongOrders.hrScreenGui.filePaths)
local config = require(workspace.LundstrongOrders.Configuration)
local tweenService = game:GetService("TweenService")

local function getTableKeys(tab)
    local keyset = {}
    for _,v in ipairs(tab) do
      for k,_ in pairs(v) do
        keyset[#keyset + 1] = k -- More effective/optimised than table.insert(keyset,k)
      end
    end
    return keyset
end

local function getConfigKeys(tab)
    local keyset = {}
    for k,_ in pairs(tab) do
       keyset[#keyset + 1] = k -- More effective/optimised than table.insert(keyset,k)
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

local function splitTable(tbl)
    local result = ""
    for k, v in pairs(tbl) do
        -- Check the key type (ignore any numerical keys - assume its an array)
        if type(k) == "string" then
            result = result.."[\""..k.."\"]".."="
        end

        -- Check the value type
        if type(v) == "table" then
            result = result..splitTable(v)
        elseif type(v) == "boolean" then
            result = result..tostring(v)
        else
            result = result..v
        end
        result = result..", "
    end
    -- Remove leading commas from the result
    if result ~= "" then
        result = result:sub(1, result:len()-2)
    end
    return result
end

-- View Menu
for _,v in pairs(getConfigKeys(config)) do
    if (v ~= "MenuItems") then
        -- Add Div.
        local divClone = path.hrScreenGui.gameSettings.ScrollingFrame.dividerClone:Clone()
        divClone.Parent = path.hrScreenGui.gameSettings.ScrollingFrame
        divClone.Name = "divider"
        divClone.TextLabel.Text = v
        divClone.Visible = true
        -- Add items.
        local items = deepCopy(config[v])
        for k,iv in pairs(items) do
            local clone = path.hrScreenGui.gameSettings.ScrollingFrame.itemGroupClone:Clone()
            clone.Parent = path.hrScreenGui.gameSettings.ScrollingFrame
            clone.Visible = true
            clone.Name = "itemFrameGroup"
            clone.itemName.TextLabel.Text = k
            if (typeof(iv) == "table") then
                iv = splitTable(iv)
            end
            clone.itemValue.TextLabel.Text = tostring(iv)
        end
    end
end

-- Manage Orders
local orderInstances = {}
game.ReplicatedStorage.LundstrongOrders.Events.orderList.OnClientEvent:Connect(function(orders)
    path.hrScreenGui.manageOrders.ScrollingFrame.noOrdersFound.Visible = false
    for _,v in pairs(orders) do 
        if (orderInstances[v.id]) then
            local status = "unclaimed"
            if (v.isClaimed) then
                status = "claimed"
            end
            if (v.isCompleted) then
                status = "completed"
            end
            orderInstances[v.id].orderStatus.Text = status
        else
            local clone = path.hrScreenGui.manageOrders.ScrollingFrame.orderClone:Clone()
            clone.Parent = path.hrScreenGui.manageOrders.ScrollingFrame
            clone.Visible = true
            clone.Name = "Order"
            clone.Username.Text = "for "..v.orderReceiver.Name
            clone.ImageFrame.ImageLabel.Image = "rbxthumb://type=Avatar&id="..v.orderReceiver.UserId.."&w=720&h=720"
            clone.orderId.Text = "Order #"..v.id
            local status = "unclaimed"
            if (v.isClaimed) then
                status = "claimed"
            end
            if (v.isCompleted) then
                status = "completed"
            end
            
            clone.orderStatus.Text = status
            clone.viewMoreButton.MouseButton1Up:Connect(function()
                -- Fill Modal Data
                for _,child in pairs(path.hrScreenGui.modal.orderOptions.menuItems.ScrollingFrame:GetChildren()) do
                    if (child.Name == "Item") then
                        child:Destroy()
                    end
                end
                for _,itemData in pairs(v.items) do
                    local item = path.hrScreenGui.modal.orderOptions.menuItems.ScrollingFrame.itemGroupClone:Clone()
                    item.Parent = path.hrScreenGui.modal.orderOptions.menuItems.ScrollingFrame
                    item.Name = "Item"
                    item.Visible = true
                    item.itemFrame.TextLabel.Text = itemData
                end
                -- Tween
                local tween1 = tweenService:Create(path.hrScreenGui.manageOrders.modalAnimFrame, TweenInfo.new(.5), { BackgroundTransparency = .2 })
                local tween2 = tweenService:Create(path.hrScreenGui.modal, TweenInfo.new(1), { Position = UDim2.new(0.5, 0, 0.5, 0) })

                path.hrScreenGui.modal.Position = UDim2.new(0.5, 0, 1.5, 0)
                path.hrScreenGui.modal.Visible = true

                tween1:Play()
                tween2:Play()
            end)
            clone.viewMoreButton.viewMoreButtonText.MouseButton1Up:Connect(function()
                -- Fill Modal Data
                for _,child in pairs(path.hrScreenGui.modal.orderOptions.menuItems.ScrollingFrame:GetChildren()) do
                    if (child.Name == "Item") then
                        child:Destroy()
                    end
                end
                for _,itemData in pairs(v.items) do
                    local item = path.hrScreenGui.modal.orderOptions.menuItems.ScrollingFrame.itemGroupClone:Clone()
                    item.Parent = path.hrScreenGui.modal.orderOptions.menuItems.ScrollingFrame
                    item.Name = "Item"
                    item.Visible = true
                    item.itemFrame.TextLabel.Text = itemData
                end
                -- Tween
                local tween1 = tweenService:Create(path.hrScreenGui.manageOrders.modalAnimFrame, TweenInfo.new(.5), { BackgroundTransparency = .2 })
                local tween2 = tweenService:Create(path.hrScreenGui.modal, TweenInfo.new(1), { Position = UDim2.new(0.5, 0, 0.5, 0) })

                path.hrScreenGui.modal.Position = UDim2.new(0.5, 0, 1.5, 0)
                path.hrScreenGui.modal.Visible = true

                tween1:Play()
                tween2:Play()
            end)
            orderInstances[v.id] = clone
        end
    end
end)

--[[ * Autofill (Taken from BAE Code)
local Players = game:GetService("Players")
path.cashierGui.usernamePrompt.usernameFrame.usernameText:GetPropertyChangedSignal("Text"):Connect(function()
    if (path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text ~= "") then
        local toReturn = {}
        local Segment = path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text
        local lowerSegment = string.lower(path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text)
        for _,b in next,Players:GetPlayers() do
            if string.sub(b.Name:lower(),1,#Segment) == lowerSegment then
                table.insert(toReturn,b)
            end
        end
        if type(toReturn[1]) == "userdata" then
            path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text = toReturn[1].Name
            path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text = string.sub(path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text, 1, string.len(path.cashierGui.usernamePrompt.usernameFrame.usernameText.Text))
        else
            path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text = "" -- No Username
        end
    else
        path.cashierGui.usernamePrompt.usernameFrame.usernamePrompt.Text = "" -- No Username
    end
end) --]]

-- Username
path.hrScreenGui.home.username.Text = game.Players.LocalPlayer.Name
