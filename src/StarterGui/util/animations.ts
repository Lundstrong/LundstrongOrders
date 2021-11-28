import { TweenService } from "@rbxts/services";

interface animatableFrame extends Frame {
	animFrame: Frame;
	bgGreenAnim: ImageLabel;
	exitButton: TextButton;
}

export const CreateFrameToFrameTween = (currentFrame: animatableFrame, newFrame: animatableFrame) => {
	const coverUI = TweenService.Create(currentFrame.animFrame, new TweenInfo(0.75), { Transparency: 0 });
	const invertColours = TweenService.Create(currentFrame.bgGreenAnim, new TweenInfo(0.75), { ImageTransparency: 0 });
	const removeExitButton = TweenService.Create(currentFrame.exitButton, new TweenInfo(0.75), { Transparency: 1 });
	const unCoverUI = TweenService.Create(newFrame.animFrame, new TweenInfo(0.75), { Transparency: 1 });
	const normalColours = TweenService.Create(newFrame.bgGreenAnim, new TweenInfo(0.75), { ImageTransparency: 1 });
	const showExitButton = TweenService.Create(newFrame.exitButton, new TweenInfo(0.75), { Transparency: 0 });
	removeExitButton.Completed.Connect(() => {
		currentFrame.Visible = false;
		newFrame.Visible = true;
		task.wait(0.1);
		unCoverUI.Play();
		normalColours.Play();
		showExitButton.Play();
	});
	showExitButton.Completed.Connect(() => {
		currentFrame.animFrame.Transparency = 1;
		currentFrame.bgGreenAnim.ImageTransparency = 1;
		currentFrame.exitButton.Transparency = 0;
	});
	newFrame.animFrame.Transparency = 0;
	newFrame.bgGreenAnim.ImageTransparency = 0;
	newFrame.exitButton.Transparency = 1;

	coverUI.Play();
	invertColours.Play();
	removeExitButton.Play();
};

export const CreateEntryTween = (currentFrame: animatableFrame) => {
	const fadeOutAnimationFrame = TweenService.Create(currentFrame.animFrame, new TweenInfo(1), {
		Transparency: 1,
	});
	const fadeOutLeftAnimationFrame = TweenService.Create(currentFrame.bgGreenAnim, new TweenInfo(1), {
		ImageTransparency: 1,
	});
	const fadeInExitButton = TweenService.Create(currentFrame.exitButton, new TweenInfo(1), {
		Transparency: 0,
	});

	currentFrame.animFrame.Transparency = 0;
	currentFrame.bgGreenAnim.ImageTransparency = 0;
	currentFrame.exitButton.Transparency = 1;
	currentFrame.Visible = true;

	fadeOutAnimationFrame.Play();
	fadeOutLeftAnimationFrame.Play();
	fadeInExitButton.Play();
};

export const CreateExitTween = (currentFrame: animatableFrame) => {
	const coverUI = TweenService.Create(currentFrame.animFrame, new TweenInfo(0.75), { Transparency: 0 });
	const invertColours = TweenService.Create(currentFrame.bgGreenAnim, new TweenInfo(0.75), { ImageTransparency: 0 });
	const removeExitButton = TweenService.Create(currentFrame.exitButton, new TweenInfo(0.75), { Transparency: 1 });

	removeExitButton.Completed.Connect(() => {
		currentFrame.Visible = false;
		currentFrame.animFrame.Transparency = 1;
		currentFrame.bgGreenAnim.ImageTransparency = 1;
		currentFrame.exitButton.Transparency = 0;
	});
	coverUI.Play();
	invertColours.Play();
	removeExitButton.Play();
};
