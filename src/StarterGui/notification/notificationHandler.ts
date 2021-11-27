import { TweenService } from "@rbxts/services";
import { Error, Notification } from "ReplicatedStorage/structures";
import { notification } from "./notification";

export const showNotification = (notification: Notification | Error) => {
	const notificationGui = script.Parent!.WaitForChild("notification") as notification;

	const clone = notificationGui.Container.Demo.Clone();
	clone.Parent = notificationGui.Container;
	clone.Name = "Notification";
	clone.Frame.Text.Title.Text = notification.title;
	clone.Frame.Text.Content.Text = notification.text;

	if (notification instanceof Error) {
		clone.Frame.errorCode.Visible = true;
		clone.Frame.errorCode.Text = `Error Code: ${notification.code}`;
	}

	const showAnimation = TweenService.Create(clone.Frame, new TweenInfo(1), {
		Position: new UDim2(0.05, 0, 0.05, 0),
	});
	const progressBarAnimation = TweenService.Create(
		clone.Frame.Progress,
		new TweenInfo(notification.time, Enum.EasingStyle.Linear, Enum.EasingDirection.Out),
		{
			BackgroundColor3: Color3.fromRGB(90, 137, 149),
			Size: new UDim2(0, 0, 0.05, 0),
		},
	);
	const hideAnimation = TweenService.Create(clone.Frame, new TweenInfo(1), {
		Position: new UDim2(0.05, 0, 1.05, 0),
	});

	showAnimation.Completed.Connect(() => {
		progressBarAnimation.Play();
	});

	progressBarAnimation.Completed.Connect(() => {
		hideAnimation.Play();
	});

	hideAnimation.Completed.Connect(() => {
		clone.Destroy();
	});

	showAnimation.Play();
	(script.Parent!.WaitForChild("Sound") as Sound).Play();
};
