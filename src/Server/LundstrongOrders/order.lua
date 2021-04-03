local Order = {}
Order.__index = Order
local orders = {}
local DataStore2 = require(game.ServerScriptService.LundstrongOrders.DataStore2)
local Players = game:GetService("Players")
local config = require(workspace.LundstrongOrders.Configuration)

-- constructor
function Order.new(creator: Player, receiver: string, items: { [number] : string })
  local newOrder = setmetatable({},Order)
  local receiverPlayer
  for _,v in pairs(Players:GetPlayers()) do 
    if (v.Name == receiver) then 
      receiverPlayer =  v 
    end 
  end
  if (not receiverPlayer) then
    error("[LundstrongOrders] Unable to find player "..receiver)
  end
  -- Properties
  newOrder.orderReceiver = receiverPlayer
  newOrder.orderCreator = creator
  newOrder.orderClaimer = false
  newOrder.id = #orders + 1
  -- States
  newOrder.isClaimed = false
  newOrder.isCompleted = false

  -- Items
  newOrder.items = items

  print("Give point to creator?")

  if (creator.Name ~= receiver) then
    if (config.PointsSettings.PointsEnabled) then
      local pointsStore = DataStore2("points", creator)
      pointsStore:Increment(config.PointsSettings.PointsAwarded)
    end
  end

  print("INSERT?")
  table.insert(orders, newOrder)

  return newOrder
end

-- Methods
function Order:Claim(player: Player)
  self.isClaimed = true
  self.orderClaimer = player
  orders[self.id] = self
end

function Order:Complete()
  self.isCompleted = true
  print("Give point to self.orderClaimer")
  if (config.PointsSettings.PointsEnabled) then
    local pointsStore = DataStore2("points", self.orderClaimer)
    pointsStore:Increment(config.PointsSettings.PointsAwarded)
  end
  orders[self.id] = self
end

function Order:GetOrders()
  return orders
end

return Order
