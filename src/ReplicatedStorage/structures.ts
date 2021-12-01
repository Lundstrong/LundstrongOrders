export class Order {
	static last_id = 0;

	items;
	id;

	creator;
	receiver;
	claimer?: Player;

	isClaimed = false;
	isCompleted = false;
	isDeleted = false;

	constructor(creator: Player, receiver: Player, items: string[]) {
		this.creator = creator;
		this.receiver = receiver;
		this.items = items;
		this.id = ++Order.last_id; // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Increment
	}

	Claim(claimer: Player) {
		this.isClaimed = true;
		this.claimer = claimer;
	}

	Complete() {
		this.isCompleted = true;
	}

	Delete() {
		this.isDeleted = true;
		this.isClaimed = true;
		this.isCompleted = true;
	}
}

export class Notification {
	title;
	text;
	time = 5;

	constructor(title: string, text: string, time?: number) {
		this.title = title;
		this.text = text;
		if (time !== undefined) {
			this.time = time;
		}
	}
}

export class Error extends Notification {
	code;

	constructor(userFacingError: string, code: number) {
		super("Error", userFacingError);
		this.code = code;
	}
}

// * These GUI types can be "fired" to the client via the API or internal scripts.
// ? a const enum is used here, so values are replaced at the transpile, instead of needing to have extra code at run-time.
export const enum fireableGuiTypes {
	cashierGui,
	kioskGui,
	hrScreenGui,
}
