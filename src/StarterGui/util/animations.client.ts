import { TweenService } from "@rbxts/services";
const tweeninfo = new TweenInfo(0.75);

interface animatableFrame extends Frame {
	animFrame: Frame;
	bgGreenAnim: ImageLabel;
	exitButton: TextButton & {
		TextButton: TextButton;
	};
}

export const CreateTween = (currentFrame: animatableFrame, newFrame: animatableFrame) => {
	const coverUI = TweenService.Create(currentFrame.animFrame, tweeninfo, { Transparency: 0 });
	const invertColours = TweenService.Create(currentFrame.bgGreenAnim, tweeninfo, { ImageTransparency: 0 });
	const removeExitButton1 = TweenService.Create(currentFrame.exitButton, tweeninfo, { BackgroundTransparency: 1 });
	const removeExitButton2 = TweenService.Create(currentFrame.exitButton.TextButton, tweeninfo, {
		TextTransparency: 1,
	});
	const unCoverUI = TweenService.Create(currentFrame.animFrame, tweeninfo, { Transparency: 1 });
	const normalColours = TweenService.Create(currentFrame.bgGreenAnim, tweeninfo, { ImageTransparency: 1 });
	const showExitButton1 = TweenService.Create(currentFrame.exitButton, tweeninfo, { BackgroundTransparency: 0 });
	const showExitButton2 = TweenService.Create(currentFrame.exitButton.TextButton, tweeninfo, {
		TextTransparency: 0,
	});
	removeExitButton2.Completed.Connect(() => {
		currentFrame.Visible = false;
		newFrame.Visible = true;
		task.wait(0.1);
		unCoverUI.Play();
		normalColours.Play();
		showExitButton1.Play();
		showExitButton2.Play();
	});
	showExitButton2.Completed.Connect(() => {
		currentFrame.animFrame.Transparency = 1;
		currentFrame.bgGreenAnim.ImageTransparency = 1;
		currentFrame.exitButton.BackgroundTransparency = 0;
		currentFrame.exitButton.TextButton.TextTransparency = 0;
	});
	newFrame.animFrame.Transparency = 0;
	newFrame.bgGreenAnim.ImageTransparency = 0;
	newFrame.exitButton.BackgroundTransparency = 1;
	newFrame.exitButton.TextButton.TextTransparency = 1;

	coverUI.Play();
	invertColours.Play();
	removeExitButton1.Play();
	removeExitButton2.Play();
};

export const CreateExitTween = (currentFrame: animatableFrame) => {
	const coverUI = TweenService.Create(currentFrame.animFrame, tweeninfo, { Transparency: 0 });
	const invertColours = TweenService.Create(currentFrame.bgGreenAnim, tweeninfo, { ImageTransparency: 0 });
	const removeExitButton1 = TweenService.Create(currentFrame.exitButton, tweeninfo, { BackgroundTransparency: 1 });
	const removeExitButton2 = TweenService.Create(currentFrame.exitButton.TextButton, tweeninfo, {
		TextTransparency: 1,
	});
	removeExitButton2.Completed.Connect(() => {
		currentFrame.Visible = false;
		currentFrame.animFrame.Transparency = 1;
		currentFrame.bgGreenAnim.ImageTransparency = 1;
		currentFrame.exitButton.BackgroundTransparency = 0;
		currentFrame.exitButton.TextButton.TextTransparency = 0;
	});
	coverUI.Play();
	invertColours.Play();
	removeExitButton1.Play();
	removeExitButton2.Play();
};
