import { t } from "@rbxts/t";

export class Order {
	creator;
	receiver;
	items;
	isClaimed = false;
	isCompleted = false;

	constructor(creator: Player, receiver: Player, items: string[]) {
		this.creator = creator;
		this.receiver = receiver;
		this.items = items;
	}
}

export class Notification {
	title;
	text;

	constructor(title: string, text: string) {
		this.title = title;
		this.text = text;
	}
}

export class Error extends Notification {
	code;

	constructor(userFacingError: string, code: number) {
		super("Error", userFacingError);
		this.code = code;
	}
}
