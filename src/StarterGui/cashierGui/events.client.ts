import { TweenService } from "@rbxts/services";
import { remotes } from "ReplicatedStorage/remotes";
import { fireableGuiTypes } from "ReplicatedStorage/structures";
import { showNotification } from "StarterGui/notification/notificationHandler";
import { CreateEntryTween, CreateExitTween, CreateFrameToFrameTween } from "StarterGui/util/animations";
import { cashierGui } from "./cashierGui";

const cashierGuiInstance = script.Parent!.WaitForChild("cashierGui") as cashierGui;
const enableGui = remotes.Client.Get("EnableGui");
const createOrder = remotes.Client.Get("CreateOrder");

let isGuiOpen = false;
let createOrderDebounce = false;

// * Remote Events
enableGui.Connect((guiType) => {
	if (guiType === fireableGuiTypes.cashierGui) {
		if (isGuiOpen === false) {
			isGuiOpen = true;
			cashierGuiInstance.Enabled = true;
			CreateEntryTween(cashierGuiInstance.home);
		}
	}
});

// * Button Handlers
// Home Frame
cashierGuiInstance.home.buttonFrame.createOrderButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.home, cashierGuiInstance.createOrder);
});

cashierGuiInstance.home.buttonFrame.reportBugButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.home, cashierGuiInstance.reportBugs);
});

cashierGuiInstance.home.buttonFrame.viewMenuButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.home, cashierGuiInstance.viewMenu);
});

cashierGuiInstance.home.settingButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.home, cashierGuiInstance.settings);
});

cashierGuiInstance.home.exitButton.MouseButton1Up.Connect(() => {
	CreateExitTween(cashierGuiInstance.home);
	isGuiOpen = false;
});

// createOrder
cashierGuiInstance.createOrder.homeIcon.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.createOrder, cashierGuiInstance.home);
});
cashierGuiInstance.createOrder.homeIcon.homeButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.createOrder, cashierGuiInstance.home);
});
const openCategorySelector = () => {
	const darkenBackground = TweenService.Create(cashierGuiInstance.createOrder.categoryAnim, new TweenInfo(0.75), {
		BackgroundTransparency: 0.2,
	});
	const rotateChevron = TweenService.Create(
		cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.dropdownButton,
		new TweenInfo(1.5),
		{ Rotation: 0 },
	);
	darkenBackground.Completed.Connect(() => {
		cashierGuiInstance.createOrder.Categories.Visible = true;
		rotateChevron.Play();
	});
	darkenBackground.Play();
};
cashierGuiInstance.createOrder.Category.MouseButton1Up.Connect(openCategorySelector);
cashierGuiInstance.createOrder.Category.usernameText.MouseButton1Up.Connect(openCategorySelector);
cashierGuiInstance.createOrder.Category.dropdownButton.MouseButton1Up.Connect(openCategorySelector);
cashierGuiInstance.createOrder.ScrollingFrame.UIGridLayout.GetPropertyChangedSignal("AbsoluteContentSize").Connect(
	() => {
		const absoluteSize = cashierGuiInstance.createOrder.ScrollingFrame.UIGridLayout.AbsoluteContentSize;
		cashierGuiInstance.createOrder.ScrollingFrame.CanvasSize = UDim2.fromOffset(absoluteSize.X, absoluteSize.Y);
	},
);
cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame.UIGridLayout.GetPropertyChangedSignal(
	"AbsoluteContentSize",
).Connect(() => {
	const absoluteSize = cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame.UIGridLayout.AbsoluteContentSize;
	cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame.CanvasSize = UDim2.fromOffset(
		absoluteSize.X,
		absoluteSize.Y,
	);
});
cashierGuiInstance.createOrder.exitButton.MouseButton1Up.Connect(() => {
	CreateExitTween(cashierGuiInstance.createOrder);
	isGuiOpen = false;
});
cashierGuiInstance.createOrder.buttonFrame.clearAllItemsButton.MouseButton1Up.Connect(() => {
	for (const item of cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame.GetChildren()) {
		if (item.IsA("TextButton") && item.Name === "itemFrame") {
			item.Destroy();
		}
	}
});
cashierGuiInstance.createOrder.buttonFrame.submitOrderButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.createOrder, cashierGuiInstance.usernamePrompt);
});
cashierGuiInstance.usernamePrompt.buttonFrame.backButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.usernamePrompt, cashierGuiInstance.createOrder);
});
cashierGuiInstance.usernamePrompt.buttonFrame.submitOrderButton.MouseButton1Up.Connect(() => {
	if (createOrderDebounce === false) {
		createOrderDebounce = true;
		const items: string[] = [];
		for (const item of cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame.GetChildren()) {
			if (item.IsA("TextButton") && item.Name === "itemFrame") {
				const TextLabel = item.FindFirstChildWhichIsA("TextLabel");
				if (TextLabel) {
					items.push(TextLabel.Text);
				}
			}
		}
		const notification = createOrder.CallServer(
			cashierGuiInstance.usernamePrompt.usernameFrame.playerName.Value,
			items,
		);
		showNotification(notification);
		createOrderDebounce = false;
		CreateFrameToFrameTween(cashierGuiInstance.usernamePrompt, cashierGuiInstance.createOrder);
	}
});
cashierGuiInstance.usernamePrompt.exitButton.MouseButton1Up.Connect(() => {
	CreateExitTween(cashierGuiInstance.usernamePrompt);
	isGuiOpen = false;
});
// reportBugs
cashierGuiInstance.reportBugs.homeIcon.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.reportBugs, cashierGuiInstance.home);
});
cashierGuiInstance.reportBugs.homeIcon.homeButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.reportBugs, cashierGuiInstance.home);
});
cashierGuiInstance.reportBugs.exitButton.MouseButton1Up.Connect(() => {
	CreateExitTween(cashierGuiInstance.reportBugs);
	isGuiOpen = false;
});
// settings
cashierGuiInstance.settings.homeIcon.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.settings, cashierGuiInstance.home);
});
cashierGuiInstance.settings.homeIcon.homeButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.settings, cashierGuiInstance.home);
});
cashierGuiInstance.settings.exitButton.MouseButton1Up.Connect(() => {
	CreateExitTween(cashierGuiInstance.settings);
	isGuiOpen = false;
});
cashierGuiInstance.settings.content.UIListLayout.GetPropertyChangedSignal("AbsoluteContentSize").Connect(() => {
	const absoluteSize = cashierGuiInstance.settings.content.UIListLayout.AbsoluteContentSize;
	cashierGuiInstance.settings.content.CanvasSize = UDim2.fromOffset(absoluteSize.X, absoluteSize.Y);
});
// viewMenu
cashierGuiInstance.viewMenu.homeIcon.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.viewMenu, cashierGuiInstance.home);
});
cashierGuiInstance.viewMenu.homeIcon.homeButton.MouseButton1Up.Connect(() => {
	CreateFrameToFrameTween(cashierGuiInstance.viewMenu, cashierGuiInstance.home);
});
cashierGuiInstance.viewMenu.exitButton.MouseButton1Up.Connect(() => {
	CreateExitTween(cashierGuiInstance.viewMenu);
	isGuiOpen = false;
});
cashierGuiInstance.viewMenu.ScrollingFrame.UIListLayout.GetPropertyChangedSignal("AbsoluteContentSize").Connect(() => {
	const absoluteSize = cashierGuiInstance.viewMenu.ScrollingFrame.UIListLayout.AbsoluteContentSize;
	cashierGuiInstance.viewMenu.ScrollingFrame.CanvasSize = UDim2.fromOffset(absoluteSize.X, absoluteSize.Y);
});
