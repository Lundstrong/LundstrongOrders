export type pickupGuiClone = SurfaceGui & {
	["Frame"]: Frame & {
		["UICorner"]: UICorner;
		["complete"]: Frame & {
			["Frame"]: Frame & {
				["TextLabel"]: TextLabel;
				["UICorner"]: UICorner;
			};
			["Items"]: Frame & {
				["UICorner"]: UICorner;
				["orderList"]: ScrollingFrame & {
					["UIListLayout"]: UIListLayout;
					["cloneFrame"]: Frame & {
						["ID"]: IntValue;
						["Frame"]: Frame & {
							["UICorner"]: UICorner;
							["ImageLabel"]: ImageLabel;
							["username"]: TextLabel;
							["orderNumber"]: TextLabel;
						};
					};
					["padding"]: Frame;
				};
			};
		};
		["prep"]: Frame & {
			["Frame"]: Frame & {
				["TextLabel"]: TextLabel;
				["UICorner"]: UICorner;
			};
			["Items"]: Frame & {
				["UICorner"]: UICorner;
				["orderList"]: ScrollingFrame & {
					["padding"]: Frame;
					["cloneFrame"]: Frame & {
						["ID"]: IntValue;
						["Frame"]: Frame & {
							["UICorner"]: UICorner;
							["ImageLabel"]: ImageLabel;
							["username"]: TextLabel;
							["orderNumber"]: TextLabel;
						};
					};
					["UIListLayout"]: UIListLayout;
				};
			};
		};
	};
}
