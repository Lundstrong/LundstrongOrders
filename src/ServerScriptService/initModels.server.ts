import { $error, $print, $warn } from "@lundstrong/rbxts-transform-debug";
import { MarketplaceService, Players, StarterGui, Workspace } from "@rbxts/services";
import { validateTree } from "@rbxts/validate-tree";
import { getConfig } from "ReplicatedStorage/config";
import { remotes } from "ReplicatedStorage/remotes";
import { fireableGuiTypes } from "ReplicatedStorage/structures";

const configuration = getConfig();
const enableGui = remotes.Server.Create("EnableGui");

const modelsFolder = Workspace.WaitForChild("LundstrongOrders").FindFirstChild("Models");

// Tree Defintions
// ? We use tree definitions, so we don't have a WaitForChild spam!
const screenGuiTree = {
	$className: "Model",
	mainPart: {
		$className: "BasePart",
		mainGui: {
			$className: "SurfaceGui",
			Frame: {
				$className: "Frame",
				ImageLabel: "ImageLabel",
			},
		},
	},
} as const;
const pickupScreenTree = {
	$className: "Instance",
	LundstrongOrders: {
		$className: "Folder",
		pickupScreenGui: {
			$className: "Folder",
			pickupGuiClone: "SurfaceGui",
		},
	},
} as const;
const OrderDisplayScreenTree = {
	$className: "Instance",
	LundstrongOrders: {
		$className: "Folder",
		chefClaimGui: {
			$className: "Folder",
			chefClaimGuiClone: "SurfaceGui",
		},
	},
} as const;

if (modelsFolder) {
	for (const model of modelsFolder.GetChildren()) {
		if (model.Name === "Register") {
			if (validateTree(model, screenGuiTree)) {
				const gui = model.mainPart.mainGui;
				gui.Enabled = true;
				gui.Frame.ImageLabel.Image = configuration.Branding.imageId;
				const ClickDetector = new Instance("ClickDetector");
				ClickDetector.Parent = model.mainPart;
				ClickDetector.MouseClick.Connect((plr) => {
					if (configuration.CashierGuiSettings.GroupId !== false) {
						if (configuration.CashierGuiSettings.MinimumRankEnabled) {
							if (
								plr.GetRankInGroup(configuration.CashierGuiSettings.GroupId) >=
								configuration.CashierGuiSettings.MinimumRank
							) {
								$print(`Firing ${plr.UserId} with cashierGui`);
								enableGui.SendToPlayer(plr, fireableGuiTypes.cashierGui);
							}
						} else {
							if (
								configuration.CashierGuiSettings.RankTable.includes(
									plr.GetRankInGroup(configuration.CashierGuiSettings.GroupId),
								)
							) {
								$print(`Firing ${plr.UserId} with cashierGui`);
								enableGui.SendToPlayer(plr, fireableGuiTypes.cashierGui);
							}
						}
					} else {
						$print(`Firing ${plr.UserId} with cashierGui`);
						enableGui.SendToPlayer(plr, fireableGuiTypes.cashierGui);
					}
				});
			} else {
				$warn(
					"A register models' setup was unsucessful, due to the fact that the model didn't have the required children.",
				);
			}
		} else if (model.Name === "Kiosk") {
			if (validateTree(model, screenGuiTree)) {
				const gui = model.mainPart.mainGui;
				gui.Enabled = true;
				gui.Frame.ImageLabel.Image = configuration.Branding.imageId;
				const ClickDetector = new Instance("ClickDetector");
				ClickDetector.Parent = model.mainPart;
				ClickDetector.MouseClick.Connect((plr) => {
					if (configuration.KioskSettings.GamepassRequired) {
						if (
							MarketplaceService.UserOwnsGamePassAsync(plr.UserId, configuration.KioskSettings.GamepassID)
						) {
							$print(`Firing ${plr.UserId} with kioskGui`);
							enableGui.SendToPlayer(plr, fireableGuiTypes.kioskGui);
						} else {
							if (configuration.KioskSettings.PromptPurchase) {
								MarketplaceService.PromptGamePassPurchase(plr, configuration.KioskSettings.GamepassID);
							}
						}
					}
				});
			} else {
				$warn(
					"A kiosk models' setup was unsucessful, due to the fact that the model didn't have the required children.",
				);
			}
		} else if (model.Name === "PickupScreen") {
			for (const player of Players.GetPlayers()) {
				const PlayerGui = player.WaitForChild("PlayerGui") as PlayerGui;
				if (validateTree(PlayerGui, pickupScreenTree)) {
					const clonedGui = PlayerGui.LundstrongOrders.pickupScreenGui.pickupGuiClone.Clone();
					clonedGui.Parent = PlayerGui.LundstrongOrders.pickupScreenGui;
					clonedGui.Name = "pickupGui";
					clonedGui.Adornee = model.WaitForChild("mainPart") as BasePart;
				}
			}
			if (validateTree(StarterGui, pickupScreenTree)) {
				const clonedGui = StarterGui.LundstrongOrders.pickupScreenGui.pickupGuiClone.Clone();
				clonedGui.Parent = StarterGui.LundstrongOrders.pickupScreenGui;
				clonedGui.Name = "pickupGui";
				clonedGui.Adornee = model.WaitForChild("mainPart") as BasePart;
			}
		} else if (model.Name === "hrScreen") {
			if (validateTree(model, screenGuiTree)) {
				const gui = model.mainPart.mainGui;
				gui.Enabled = true;
				gui.Frame.ImageLabel.Image = configuration.Branding.imageId;
				const ClickDetector = new Instance("ClickDetector");
				ClickDetector.Parent = model.mainPart;
				ClickDetector.MouseClick.Connect((plr) => {
					if (configuration.hrScreenSettings.GroupId !== false) {
						if (configuration.hrScreenSettings.MinimumRankEnabled) {
							if (
								plr.GetRankInGroup(configuration.hrScreenSettings.GroupId) >=
								configuration.hrScreenSettings.MinimumRank
							) {
								$print(`Firing ${plr.UserId} with hrScreen`);
								enableGui.SendToPlayer(plr, fireableGuiTypes.hrScreenGui);
							}
						} else {
							if (
								configuration.hrScreenSettings.RankTable.includes(
									plr.GetRankInGroup(configuration.hrScreenSettings.GroupId),
								)
							) {
								$print(`Firing ${plr.UserId} with hrScreen`);
								enableGui.SendToPlayer(plr, fireableGuiTypes.hrScreenGui);
							}
						}
					} else {
						$print(`Firing ${plr.UserId} with hrScreen`);
						enableGui.SendToPlayer(plr, fireableGuiTypes.hrScreenGui);
					}
				});
			} else {
				$warn(
					"A hrScreen model's setup was unsucessful, due to the fact that the model didn't have the required children.",
				);
			}
		} else if (model.Name === "OrderDisplay") {
			for (const player of Players.GetPlayers()) {
				const PlayerGui = player.WaitForChild("PlayerGui") as PlayerGui;
				if (validateTree(PlayerGui, OrderDisplayScreenTree)) {
					const clonedGui = PlayerGui.LundstrongOrders.chefClaimGui.chefClaimGuiClone.Clone();
					clonedGui.Parent = PlayerGui.LundstrongOrders.chefClaimGui;
					clonedGui.Name = "pickupGui";
					clonedGui.Adornee = model.WaitForChild("mainPart") as BasePart;
				}
			}
			if (validateTree(StarterGui, OrderDisplayScreenTree)) {
				const clonedGui = StarterGui.LundstrongOrders.chefClaimGui.chefClaimGuiClone.Clone();
				clonedGui.Parent = StarterGui.LundstrongOrders.chefClaimGui;
				clonedGui.Name = "pickupGui";
				clonedGui.Adornee = model.WaitForChild("mainPart") as BasePart;
			}
		}
	}
} else {
	$error("Unable to find models. Please make sure they are under Workspace -> LundstrongOrders -> Models");
}

export {};
