export type chefClaimGuiClone = SurfaceGui & {
	["Frame"]: Frame & {
		["bgGreen"]: ImageLabel;
		["ScrollingFrame"]: ScrollingFrame & {
			["UIGridLayout"]: UIGridLayout;
			["cloneFrame"]: Frame & {
				["Frame"]: Frame & {
					["UICorner"]: UICorner;
					["ImageLabel"]: ImageLabel;
					["TextLabel"]: TextLabel;
					["TextButton"]: TextButton & {
						["UICorner"]: UICorner;
						["TextButton"]: TextButton;
					};
				};
				["ID"]: IntValue;
			};
		};
		["UICorner"]: UICorner;
	};
}
