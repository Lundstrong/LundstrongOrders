export type notification = ScreenGui & {
	["Container"]: Frame & {
		["Demo"]: Frame & {
			["Frame"]: Frame & {
				["UICorner"]: UICorner;
				["Frame"]: Frame;
				["textFrame"]: Frame & {
					["TextLabel"]: TextLabel;
				};
			};
		};
		["UIListLayout"]: UIListLayout;
	};
}
