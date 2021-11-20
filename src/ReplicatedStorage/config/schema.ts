export interface ConfigSchema {
	Branding: {
		Name: string;
		ImageId: string;
	};

	Cooldowns: {
		OrderCooldown: number;
		ClaimCooldown: number;
		CompleteCooldown: number;
		DeleteOrderCooldown: number;
	};

	CashierGuiSettings: {
		GroupId: false | number;
		MinimumRankEnabled: boolean;
		MinimumRank: number;
		RankTable: number[];
	};

	KioskSettings: {
		GamepassRequired: boolean;
		GamepassID: number;
		PromptPurchase: boolean;
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
