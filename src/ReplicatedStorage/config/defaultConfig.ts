import { ConfigSchema } from "./schema";

export const defaultConfig: ConfigSchema = {
	Branding: {
		Name: game.Name,
		imageId: "rbxassetid://952441662",
	},
	Cooldowns: {
		OrderCooldown: 7,
		ClaimCooldown: 20,
		CompleteCooldown: 20,
		DeleteOrderCooldown: 60,
	},
	CashierGuiSettings: {
		GroupId: false,
		MinimumRankEnabled: false,
		MinimumRank: 0,
		RankTable: [],
	},
	OrderBoardSettings: {
		GroupId: false,
		MinimumRankEnabled: false,
		MinimumRank: 0,
		RankTable: [],
	},
	KioskSettings: {
		GamepassRequired: false,
		GamepassID: 0,
		PromptPurchase: true,
	},
	hrScreenSettings: {
		GroupId: false,
		MinimumRankEnabled: false,
		MinimumRank: 0,
		RankTable: [],
	},
	PickupScreenSettings: {
		CompletedOrdersTime: 15,
	},
	MenuItems: [
		// {
		// 	CategoryName: "Entree",
		// 	Items: ["Garlic Bread"],
		// },
		// {
		// 	CategoryName: "Mains",
		// 	Items: ["Steak & Chips", "Mac 'n' Cheese"],
		// },
		// {
		// 	CategoryName: "Deserts",
		// 	Items: ["Chocolate Cake", "Donuts"],
		// },
	],
};
