import { Players, TweenService } from "@rbxts/services";
import { getConfig } from "ReplicatedStorage/config";
import { cashierGui } from "./cashierGui";

const cashierGuiInstance = script.Parent!.WaitForChild("cashierGui") as cashierGui;
const config = getConfig();

type Category = cashierGui["createOrder"]["Categories"]["Categories"]["cloneCategory"];

// * createOrder
const createSummaryItem = (item: string) => {
	const clone = cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame.cloneFrame.Clone();
	clone.Name = "itemFrame";
	clone.Parent = cashierGuiInstance.createOrder.summaryFrame.ScrollingFrame;
	clone.TextLabel.Text = item;
	clone.Visible = true;
	clone.MouseButton1Up.Connect(() => {
		clone.Destroy();
	});
};

const categorySelected = (newCategory: Category) => {
	const rotateChevron = TweenService.Create(
		cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.dropdownButton,
		new TweenInfo(1),
		{ Rotation: 90 },
	);
	const lightenBackground = TweenService.Create(cashierGuiInstance.createOrder.categoryAnim, new TweenInfo(1), {
		BackgroundTransparency: 1,
	});
	rotateChevron.Completed.Connect(() => {
		cashierGuiInstance.createOrder.Categories.Visible = false;
		// remove items from the old category and add the new ones
		for (const item of cashierGuiInstance.createOrder.ScrollingFrame.GetChildren()) {
			if (item.IsA("TextButton") && item.Name === "itemFrame") {
				item.Destroy();
			}
		}
		for (const item of config.MenuItems[newCategory.Index.Value].Items) {
			const clone = cashierGuiInstance.createOrder.ScrollingFrame.cloneFrame.Clone();
			clone.Name = "itemFrame";
			clone.Parent = cashierGuiInstance.createOrder.ScrollingFrame;
			clone.Visible = true;
			clone.Text = item;
			clone.MouseButton1Up.Connect(() => {
				createSummaryItem(item);
			});
		}

		const hidden = cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory
			.Value as Category;
		hidden.Visible = true;
		cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory.Value = newCategory;
		cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.usernameText.Text =
			newCategory.usernameText.Text;
		cashierGuiInstance.createOrder.Category.usernameText.Text = newCategory.usernameText.Text;
		newCategory.Visible = false;

		lightenBackground.Play();
	});
	rotateChevron.Play();
};

// Add Items to scrollingFrame
for (const item of config.MenuItems[0].Items) {
	const clone = cashierGuiInstance.createOrder.ScrollingFrame.cloneFrame.Clone();
	clone.Name = "itemFrame";
	clone.Parent = cashierGuiInstance.createOrder.ScrollingFrame;
	clone.Visible = true;
	clone.Text = item;
	clone.MouseButton1Up.Connect(() => {
		createSummaryItem(item);
	});
}

// Category List (createOrder Frame)
// ? a forEach is used here so we can also get the index
config.MenuItems.forEach((category, index) => {
	const clone = cashierGuiInstance.createOrder.Categories.Categories.cloneCategory.Clone();
	clone.Name = "Category";
	clone.Parent = cashierGuiInstance.createOrder.Categories.Categories;
	clone.usernameText.Text = category.CategoryName;
	clone.Index.Value = index;
	clone.Visible = index === 0 ? false : true;

	if (index === 0) {
		cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.usernameText.Text = category.CategoryName;
		cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory.Value = clone;
		cashierGuiInstance.createOrder.Category.usernameText.Text = category.CategoryName;
	}

	clone.MouseButton1Up.Connect(() => {
		categorySelected(clone);
	});
	clone.dropdownButton.MouseButton1Up.Connect(() => {
		categorySelected(clone);
	});
	clone.usernameText.MouseButton1Up.Connect(() => {
		categorySelected(clone);
	});
});

if (cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory.Value) {
	cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.MouseButton1Up.Connect(() => {
		categorySelected(
			cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory.Value as Category,
		);
	});
	cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.usernameText.MouseButton1Up.Connect(() => {
		categorySelected(
			cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory.Value as Category,
		);
	});
	cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.dropdownButton.MouseButton1Up.Connect(() => {
		categorySelected(
			cashierGuiInstance.createOrder.Categories.Categories.selectedCategory.hiddenCategory.Value as Category,
		);
	});
}

// * usernamePrompt
cashierGuiInstance.usernamePrompt.usernameFrame.usernameText.GetPropertyChangedSignal("Text").Connect(() => {
	if (cashierGuiInstance.usernamePrompt.usernameFrame.usernameText.Text !== "") {
		const toReturn: Player[] = [];
		const playerInput = cashierGuiInstance.usernamePrompt.usernameFrame.usernameText.Text.lower();
		for (const player of Players.GetPlayers()) {
			if (string.sub(player.Name.lower(), 1, playerInput.size()) === playerInput) {
				toReturn.push(player);
			}
		}
		if (toReturn[0] && toReturn[0].IsA("Player")) {
			cashierGuiInstance.usernamePrompt.usernameFrame.playerName.Value = toReturn[0].Name;
			cashierGuiInstance.usernamePrompt.usernameFrame.usernamePrompt.Text = toReturn[0].Name;
			cashierGuiInstance.usernamePrompt.usernameFrame.usernameText.Text = string.sub(
				toReturn[0].Name,
				1,
				cashierGuiInstance.usernamePrompt.usernameFrame.usernameText.Text.size(),
			);
		} else {
			cashierGuiInstance.usernamePrompt.usernameFrame.usernamePrompt.Text = "";
		}
	} else {
		cashierGuiInstance.usernamePrompt.usernameFrame.usernamePrompt.Text = "";
	}
});
// * viewMenu
for (const category of config.MenuItems) {
	const dividerClone = cashierGuiInstance.viewMenu.ScrollingFrame.dividerClone.Clone();
	dividerClone.Parent = cashierGuiInstance.viewMenu.ScrollingFrame;
	dividerClone.Name = "Divider";
	dividerClone.TextLabel.Text = category.CategoryName;
	dividerClone.Visible = true;

	const itemGroupClone = cashierGuiInstance.viewMenu.ScrollingFrame.itemGroupClone.Clone();
	itemGroupClone.Parent = cashierGuiInstance.viewMenu.ScrollingFrame;
	itemGroupClone.Visible = true;
	itemGroupClone.Name = "itemFrameGroup";

	for (let i = 0; i < category.Items.size(); i = i + 4) {
		// ? + 4 here, as we're doing 4 at a time
		if (category.Items[i + 3] !== undefined) {
			itemGroupClone.Frame4.TextLabel.Text = category.Items[i + 3];
		} else {
			itemGroupClone.Frame4.Destroy();
		}
		if (category.Items[i + 2] !== undefined) {
			itemGroupClone.Frame3.TextLabel.Text = category.Items[i + 2];
		} else {
			itemGroupClone.Frame3.Destroy();
		}
		if (category.Items[i + 1] !== undefined) {
			itemGroupClone.Frame2.TextLabel.Text = category.Items[i + 1];
		} else {
			itemGroupClone.Frame2.Destroy();
		}
		itemGroupClone.Frame1.TextLabel.Text = category.Items[i];
	}
}
// * home
cashierGuiInstance.home.username.Text = Players.LocalPlayer.DisplayName;
