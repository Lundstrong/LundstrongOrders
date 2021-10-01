export type kioskGui = ScreenGui & {
	["createOrder"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["TextButton"]: TextButton;
		};
		["titleLabel"]: TextLabel;
		["ScrollingFrame"]: ScrollingFrame & {
			["UIGridLayout"]: UIGridLayout;
			["cloneFrame"]: TextButton & {
				["UICorner"]: UICorner;
				["TextLabel"]: TextButton;
			};
		};
		["summaryFrame"]: Frame & {
			["UICorner"]: UICorner;
			["itemDesc"]: TextLabel;
			["ScrollingFrame"]: ScrollingFrame & {
				["UIGridLayout"]: UIGridLayout;
				["cloneFrame"]: TextButton & {
					["UICorner"]: UICorner;
					["TextLabel"]: TextButton;
				};
			};
			["itemDesc"]: TextLabel;
		};
		["Categories"]: Frame & {
			["UICorner"]: UICorner;
			["Categories"]: ScrollingFrame & {
				["UIListLayout"]: UIListLayout;
				["selectedCategory"]: TextButton & {
					["UICorner"]: UICorner;
					["usernameText"]: TextButton;
					["dropdownButton"]: ImageButton;
				};
			};
		};
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["categoryAnim"]: Frame & {
			["UICorner"]: UICorner;
		};
		["Category"]: TextButton & {
			["UICorner"]: UICorner;
			["dropdownButton"]: ImageButton;
			["usernameText"]: TextButton;
		};
		["buttonFrame"]: Frame & {
			["UICorner"]: UICorner;
			["submitOrderButton"]: TextButton;
			["clearAllItemsButton"]: TextButton;
		};
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
	};
}
