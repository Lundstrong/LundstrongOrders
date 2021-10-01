export type hrScreenGui = ScreenGui & {
	["home"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["buttonFrame"]: Frame & {
			["UICorner"]: UICorner;
			["manageOrdersButton"]: TextButton;
			["gameSettingsButton"]: TextButton;
			["pluginsButton"]: TextButton;
		};
		["welcomeLabel"]: TextLabel;
		["username"]: TextLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["TextButton"]: TextButton;
		};
		["bgGreenAnim"]: ImageLabel;
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
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
	["gameSettings"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["TextButton"]: TextButton;
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
				["itemName"]: Frame & {
					["TextLabel"]: TextLabel;
				};
				["itemValue"]: Frame & {
					["TextLabel"]: TextLabel;
					["UICorner"]: UICorner;
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
	["plugins"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["TextButton"]: TextButton;
		};
		["titleLabel"]: TextLabel;
		["ScrollingFrame"]: ScrollingFrame & {
			["noPlugins"]: Frame & {
				["TextLabel"]: TextLabel;
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
		["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
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
	["manageOrders"]: Frame & {
		["UICorner"]: UICorner;
		["bgGreen"]: ImageLabel;
		["bgGreenAnim"]: ImageLabel;
		["exitButton"]: TextButton & {
			["UICorner"]: UICorner;
			["TextButton"]: TextButton;
		};
		["titleLabel"]: TextLabel;
		["ScrollingFrame"]: ScrollingFrame & {
			["UIListLayout"]: UIListLayout;
			["orderClone"]: Frame & {
				["UICorner"]: UICorner;
				["ImageFrame"]: Frame & {
					["UICorner"]: UICorner;
					["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
					["ImageLabel"]: ImageLabel & {
						["UICorner"]: UICorner;
					};
				};
				["viewMoreButton"]: TextButton & {
					["UICorner"]: UICorner;
					["viewMoreButtonText"]: TextButton;
				};
				["TextLabel"]: TextLabel;
				["Username"]: TextLabel;
				["orderStatus"]: TextLabel;
				["orderId"]: TextLabel;
			};
			["noOrdersFound"]: TextLabel;
		};
		["homeIcon"]: TextButton & {
			["UICorner"]: UICorner;
			["homeButton"]: ImageButton;
		};
		["animFrame"]: Frame & {
			["UICorner"]: UICorner;
		};
		["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		["lundstrongOrdersLogo"]: ImageLabel & {
			["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		};
		["modalAnimFrame"]: Frame & {
			["UICorner"]: UICorner;
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
	["modal"]: Frame & {
		["UICorner"]: UICorner;
		["UIAspectRatioConstraint"]: UIAspectRatioConstraint;
		["orderOptions"]: Frame & {
			["titleLabel"]: TextLabel;
			["menuItems"]: Frame & {
				["UICorner"]: UICorner;
				["ScrollingFrame"]: ScrollingFrame & {
					["UIListLayout"]: UIListLayout;
					["Padding"]: Frame;
					["itemGroupClone"]: Frame & {
						["itemFrame"]: Frame & {
							["UICorner"]: UICorner;
							["TextLabel"]: TextLabel;
						};
					};
				};
			};
			["menuItemsLabel"]: TextLabel;
			["menuItemsLabel"]: TextLabel;
			["exitButton"]: TextButton & {
				["UICorner"]: UICorner;
				["exitButtonText"]: TextButton;
			};
			["deleteOrderButton"]: TextButton & {
				["UICorner"]: UICorner;
				["deleteOrderButtonText"]: TextButton;
			};
			["ID"]: IntValue;
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
}
