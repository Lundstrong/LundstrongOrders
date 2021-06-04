-- * CREATE REP STORAGE ASSETS
local Configuration = require(workspace.LundstrongOrders.Configuration)
local PlayersService = game:GetService("Players")
local MarketplaceService = game:GetService("MarketplaceService")
local eventsFolder = game.ReplicatedStorage:WaitForChild("LundstrongOrders"):WaitForChild("Events")
local enableGui = eventsFolder.enableGui
if (workspace.LundstrongOrders:FindFirstChild("Models")) then
    for _,v in pairs(workspace.LundstrongOrders.Models:GetChildren()) do 
        if (v.Name == "Register") then
            v.mainPart.mainGui.Enabled = true
            v.mainPart.mainGui.Frame.ImageLabel.Image = Configuration.Branding.ImageId
            local clickDetector = Instance.new("ClickDetector")
            clickDetector.Parent = v.mainPart
            clickDetector.MouseClick:Connect(function(plr)
                if (Configuration.CashierSettings.GroupID) then
                    if (Configuration.CashierSettings.MinimumRankEnabled) then
                        if (plr:GetRankInGroup(Configuration.CashierSettings.GroupID) >= Configuration.CashierSettings.MinimumRank) then
                            print("Firing client with cashierGui")
                            enableGui:FireClient(plr, "cashierGui")
                        end
                    else
                        if (table.find(Configuration.CashierSettings.RankTable, plr:GetRankInGroup(Configuration.CashierSettings.GroupID))) then
                            print("Firing client with cashierGui")
                            enableGui:FireClient(plr, "cashierGui")
                        end
                    end
                else
                    print("Firing client with cashierGui")
                    enableGui:FireClient(plr, "cashierGui")
                end
            end)
        elseif (v.Name == "Kiosk") then
            v.mainPart.mainGui.Enabled = true
            v.mainPart.mainGui.Frame.ImageLabel.Image = Configuration.Branding.ImageId
            local clickDetector = Instance.new("ClickDetector")
            clickDetector.Parent = v.mainPart
            clickDetector.MouseClick:Connect(function(plr)
                if (Configuration.KioskSettings.GamepassRequired) then
                    if (MarketplaceService:UserOwnsGamePassAsync(plr.UserId, Configuration.KioskSettings.GamepassID)) then
                        print("Firing client with kioskGui")
                        enableGui:FireClient(plr, "kioskGui")
                    else
                        if (Configuration.KioskSettings.PromptPurchase) then
                            MarketplaceService:PromptGamePassPurchase(plr, Configuration.KioskSettings.GamepassID)
                        end
                    end
                else 
                    print("Firing client with kioskGui")
                    enableGui:FireClient(plr, "kioskGui")
                end
            end)
        elseif (v.Name == "PickupScreen") then
            for _,player in pairs(PlayersService:GetPlayers()) do     
                local clone = player.PlayerGui.LundstrongOrders.pickupScreenGui.pickupGuiClone:Clone()
                clone.Parent = player.PlayerGui.LundstrongOrders.pickupScreenGui
                clone.Name = "pickupGui"
                clone.Adornee = v.mainPart
            end
            local clone = game.StarterGui.LundstrongOrders.pickupScreenGui.pickupGuiClone:Clone()
            clone.Parent = game.StarterGui.LundstrongOrders.pickupScreenGui
            clone.Name = "pickupGui"
            clone.Adornee = v.mainPart
        elseif (v.Name == "hrScreen") then
            v.mainPart.mainGui.Enabled = true
            v.mainPart.mainGui.Frame.ImageLabel.Image = Configuration.Branding.ImageId
            local clickDetector = Instance.new("ClickDetector")
            clickDetector.Parent = v.mainPart
            clickDetector.MouseClick:Connect(function(plr)
                if (Configuration.hrScreenSettings.GroupID) then
                    if (Configuration.hrScreenSettings.MinimumRankEnabled) then
                        if (plr:GetRankInGroup(Configuration.hrScreenSettings.GroupID) >= Configuration.hrScreenSettings.MinimumRank) then
                            print("Firing client with hrScreenGui")
                            enableGui:FireClient(plr, "hrScreenGui")
                        end
                    else
                        if (table.find(Configuration.hrScreenSettings.RankTable, plr:GetRankInGroup(Configuration.hrScreenSettings.GroupID))) then
                            print("Firing client with hrScreenGui")
                            enableGui:FireClient(plr, "hrScreenGui")
                        end
                    end
                else
                    print("Firing client with hrScreenGui")
                    enableGui:FireClient(plr, "hrScreenGui")
                end
            end)
        elseif (v.Name == "OrderDisplay") then
            for _,player in pairs(PlayersService:GetPlayers()) do     
                local clone = player.PlayerGui.LundstrongOrders.chefClaimGui.chefClaimGuiClone:Clone()
                clone.Parent = player.PlayerGui.LundstrongOrders.chefClaimGui
                clone.Name = "chefClaimGui"
                clone.Adornee = v.mainPart
            end
            local clone = game.StarterGui.LundstrongOrders.chefClaimGui.chefClaimGuiClone:Clone()
            clone.Parent = game.StarterGui.LundstrongOrders.chefClaimGui
            clone.Name = "chefClaimGui"
            clone.Adornee = v.mainPart
        end
    end
else
    error("[Lundstrongorders] Unable to find models. Please make sure they are under the Models folder of Lundstrong Orders")
end
