export interface ConfigSchema {
	Branding: {
		Name: string;
		imageId: string;
	};

	CashierGuiSettings: {
		GroupId: false | number;
		MinimumRankEnabled: boolean;
		MinimumRank: number;
		RankTable: number[];
		OrderCooldown: number;
	};

	KioskSettings: {
		GamepassRequired: boolean;
		GamepassID: number;
		PromptPurchase: boolean;
		OrderCooldown: number;
	};

	OrderBoardSettings: {
		GroupId: false | number;
		MinimumRankEnabled: boolean;
		MinimumRank: number;
		RankTable: number[];
	};

	hrScreenSettings: {
		GroupId: false | number;
		MinimumRankEnabled: boolean;
		MinimumRank: number;
		RankTable: number[];
	};

	PickupScreenSettings: {
		CompletedOrdersTime: number;
	};

	MenuItems: {
		CategoryName: string;
		Items: string[];
	}[];
}
