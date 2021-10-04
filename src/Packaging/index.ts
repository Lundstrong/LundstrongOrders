// ! THIS FILE MUST NOT HAVE IMPORTED LIBRARIES OR ELSE THE BUILD BREAKS
// ! Please check the output before comitting, to make sure there is no importing.
// ! The only exception to this is compile-time transformers
import { $error, $git, $print } from "@lundstrong/rbxts-transform-debug";
// ? Using game.GetService instead of @rbxts/services as we can't have imports
const ReplicatedStorage = game.GetService("ReplicatedStorage");
const Players = game.GetService("Players");
const StarterGui = game.GetService("StarterGui");
const ServerScriptService = game.GetService("ServerScriptService");
const { Commit, LatestTag } = $git();

export = function () {
	const repStorage = script.FindFirstChild("ReplicatedStorage");
	const guiObjects = script.FindFirstChild("StarterGui");
	const server = script.FindFirstChild("ServerScriptService");

	if (repStorage) {
		repStorage.Parent = ReplicatedStorage;
		repStorage.Name = "LundstrongOrders";
	} else {
		$error(
			"Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Shared)",
		);
	}

	if (guiObjects) {
		for (const Player of Players.GetPlayers()) {
			for (const guiInstance of guiObjects.GetChildren()) {
				guiInstance.Clone().Parent = Player.WaitForChild("PlayerGui");
			}
		}
		for (const guiInstance of guiObjects.GetChildren()) {
			guiInstance.Clone().Parent = StarterGui;
		}
	} else {
		$error(
			"Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Client)",
		);
	}

	if (server) {
		server.Parent = ServerScriptService;
		server.Name = "LundstrongOrders";
	} else {
		$error(
			"Unable to load a main module of the system. Try shutting down this sever to fix the issue. (Module: Server)",
		);
	}

	print("-----------------");
	$print("Loaded.");
	$print(`Commit: ${Commit}`);
	$print(`Version: ${LatestTag !== "" ? LatestTag : "refer to commit"}`);
	print("-----------------");
};
