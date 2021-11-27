export type cashierGui = ScreenGui & {
	["settings"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["UIPadding"]: UIPadding;
		};
		["welcomeLabel"]: TextLabel;
		["content"]: ScrollingFrame & {
			["themes"]: Frame & {
				["light"]: Frame & {
					["UICorner"]: UICorner;
					["TextButton"]: TextButton;
				};
				["dark"]: Frame & {
					["UICorner"]: UICorner;
					["TextButton"]: TextButton;
				};
				["TextLabel"]: TextLabel;
			};
			["languages"]: Frame & {
				["Greek"]: Frame & {
					["UICorner"]: UICorner;
					["TextButton"]: TextButton;
				};
				["Flipino"]: Frame & {
					["UICorner"]: UICorner;
					["TextButton"]: TextButton;
				};
				["TextLabel"]: TextLabel;
			};
			["credits"]: Frame & {
				["TextLabel"]: TextLabel;
				["TextLabel"]: TextLabel;
				["UIListLayout"]: UIListLayout;
			};
			["UIListLayout"]: UIListLayout;
		};
		["homeIcon"]: TextButton & {
			["UICorner"]: UICorner;
			["homeButton"]: ImageButton;
		};
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
	};
	["reportBugs"]: Frame & {
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["UIPadding"]: UIPadding;
		};
		["titleLabel"]: TextLabel;
		["Frame"]: Frame & {
			["UICorner"]: UICorner;
			["submitBug'"]: TextButton;
		};
		["Frame"]: Frame & {
			["UICorner"]: UICorner;
			["usernameText"]: TextBox;
		};
		["Frame"]: Frame & {
			["reportText"]: TextBox;
			["UICorner"]: UICorner;
		};
		["homeIcon"]: TextButton & {
			["homeButton"]: ImageButton;
			["UICorner"]: UICorner;
		};
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["UICorner"]: UICorner;
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["Frame"]: Frame & {
			["TextLabel"]: TextLabel;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
	};
	["usernamePrompt"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["titleLabel"]: TextLabel;
		["usernameFrame"]: Frame & {
			["UICorner"]: UICorner;
			["usernameText"]: TextBox;
			["usernamePrompt"]: TextLabel;
			["playerName"]: StringValue;
		};
		["buttonFrame"]: Frame & {
			["UICorner"]: UICorner;
			["submitOrderButton"]: TextButton;
			["backButton"]: TextButton;
		};
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["UIPadding"]: UIPadding;
		};
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
	};
	["viewMenu"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["UIPadding"]: UIPadding;
		};
		["titleLabel"]: TextLabel;
		["ScrollingFrame"]: ScrollingFrame & {
			["dividerClone"]: Frame & {
				["TextLabel"]: TextLabel;
				["Frame"]: Frame & {
					["UICorner"]: UICorner;
				};
			};
			["itemGroupClone"]: Frame & {
				["Frame1"]: Frame & {
					["UICorner"]: UICorner;
					["TextLabel"]: TextLabel;
				};
				["Frame4"]: Frame & {
					["UICorner"]: UICorner;
					["TextLabel"]: TextLabel;
				};
				["Frame2"]: Frame & {
					["UICorner"]: UICorner;
					["TextLabel"]: TextLabel;
				};
				["Frame3"]: Frame & {
					["UICorner"]: UICorner;
					["TextLabel"]: TextLabel;
				};
			};
			["UIListLayout"]: UIListLayout;
		};
		["homeIcon"]: TextButton & {
			["UICorner"]: UICorner;
			["homeButton"]: ImageButton;
		};
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
	};
	["home"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["buttonFrame"]: Frame & {
			["UICorner"]: UICorner;
			["viewMenuButton"]: TextButton;
			["reportBugButton"]: TextButton;
			["createOrderButton"]: TextButton;
		};
		["settingButton"]: ImageButton;
		["welcomeLabel"]: TextLabel;
		["username"]: TextLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["UIPadding"]: UIPadding;
		};
		["bgGreenAnim"]: ImageLabel;
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
	};
	["createOrder"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["UIPadding"]: UIPadding;
		};
		["titleLabel"]: TextLabel;
		["ScrollingFrame"]: ScrollingFrame & {
			["UIGridLayout"]: UIGridLayout;
			["cloneFrame"]: TextButton & {
				["UICorner"]: UICorner;
				["UIPadding"]: UIPadding;
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
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["categoryAnim"]: Frame & {
			["UICorner"]: UICorner;
		};
		["buttonFrame"]: Frame & {
			["UICorner"]: UICorner;
			["submitOrderButton"]: TextButton;
			["clearAllItemsButton"]: TextButton;
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
		["Category"]: TextButton & {
			["UICorner"]: UICorner;
			["dropdownButton"]: ImageButton;
			["usernameText"]: TextButton;
		};
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["UIScale"]: UIScale & {
			["Scale"]: NumberValue;
			["Size"]: Vector3Value;
		};
		["homeIcon"]: TextButton & {
			["UICorner"]: UICorner;
			["homeButton"]: ImageButton;
		};
	};
}
