// Scaling by @Reselim
// https://devforum.roblox.com/t/218157/6?u=sasial
// adapted for TS by @sasial

import { GuiService, Workspace } from "@rbxts/services";

const camera = Workspace.CurrentCamera;
const [TopInset, BottomInset] = GuiService.GetGuiInset();

const targets: UIScale[] = [];

const update = () => {
	if (camera) {
		const size = camera.ViewportSize.sub(TopInset.add(BottomInset));
		for (const target of targets) {
			const targetSize = (target.FindFirstChild("Size") as Vector3Value).Value; // essentially we're storing a Vector2 in a Vector3 value, as Vector2 values don't exist!
			const targetScale = (target.FindFirstChild("Scale") as NumberValue).Value;
			const scale = (1 / math.max(targetSize.X / size.X, targetSize.Y / size.Y)) * targetScale;
			print(scale, scale > 1 ? 1 : scale);
			target.Scale = scale > 1 ? 1 : scale; // stop large devices from scaling the GUI larger!
		}
	}
};

for (const object of (script.Parent as Instance).GetDescendants()) {
	if (object.IsA("UIScale")) {
		const size = object.FindFirstChild("Size");
		const scale = object.FindFirstChild("Scale");
		if (size?.IsA("Vector3Value") && scale?.IsA("NumberValue")) {
			targets.push(object);
		}
	}
}

update();
camera?.GetPropertyChangedSignal("ViewportSize").Connect(update);
