export type notification = ScreenGui & {
	["Container"]: Frame & {
		["Demo"]: Frame & {
			["Frame"]: Frame & {
				["UICorner"]: UICorner;
				["Text"]: Frame & {
					["Title"]: TextLabel;
					["Content"]: TextLabel;
				};
				["Progress"]: Frame & {
					["UICorner"]: UICorner;
				};
				["errorCode"]: TextLabel;
			};
		};
		["UIListLayout"]: UIListLayout;
	};
}
