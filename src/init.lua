local ps = game:GetService("Players")
return function()
	if script:FindFirstChild("Server") then
		script:FindFirstChild("Server").LundstrongOrders.Parent = game:GetService("ServerScriptService")
	else
		error("[LundstrongOrders] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Server)")
	end
	if script:FindFirstChild("ReplicatedStorage") then
		script:FindFirstChild("ReplicatedStorage").LundstrongOrders.Parent = game:GetService("ReplicatedStorage")
	else
		error("[LundstrongOrders] Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Shared/RepS)")
	end
	if (script:FindFirstChild("StarterGui")) then
		for _,i in pairs(ps:GetPlayers()) do
			for _,v in pairs(script.StarterGui:GetChildren()) do
				v:Clone().Parent = i.PlayerGui
			end
		end
		for _,v in pairs(script.StarterGui:GetChildren()) do
			v.Parent = game.StarterGui
		end
	else
		error("[LundstrongOrders] Unable to load a main module of the system. Try shutting down this server to fix the issue. (Module: Client)")
	end
end
