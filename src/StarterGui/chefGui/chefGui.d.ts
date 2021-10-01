export type chefGui = ScreenGui & {
	["main"]: Frame & {
		["UICorner"]: UICorner;
		["Frame"]: Frame & {
			["UICorner"]: UICorner;
			["TextButton"]: TextButton;
		};
		["username"]: TextLabel;
		["Items"]: Frame & {
			["UICorner"]: UICorner;
			["ScrollingFrame"]: ScrollingFrame & {
				["UIListLayout"]: UIListLayout;
				["cloneFrame"]: Frame & {
					["UICorner"]: UICorner;
					["TextLabel"]: TextLabel;
				};
				["topPadding"]: Frame;
			};
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
