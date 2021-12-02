import DataStore2 from "@rbxts/datastore2";
import { Players } from "@rbxts/services";
import { getConfig } from "ReplicatedStorage/config";
import { remotes } from "ReplicatedStorage/remotes";
import { Error, Notification, Order } from "ReplicatedStorage/structures";

const createOrder = remotes.Server.Get("CreateOrder");
const claimOrder = remotes.Server.Get("ClaimOrder");
const completeOrder = remotes.Server.Get("CompleteOrder");
const deleteOrder = remotes.Server.Get("DeleteOrder");
const orderCacheEvent = remotes.Server.Get("OrderCacheUpdate");
const sendNotification = remotes.Server.Get("SendNotification");

const config = getConfig();
DataStore2.Combine("DATA", "points");
const orderCache = new Map<number, Order>();

// * Remote Callbacks
createOrder.SetCallback((creator, receiver, items) => {
	const receiverPlayer = Players.GetPlayers().find((player) => player.Name === receiver);
	if (receiverPlayer) {
		const order = new Order(creator, receiverPlayer, items);
		orderCache.set(order.id, order);
		orderCacheEvent.SendToAllPlayers(orderCache);
		// TODO: Fire API Event
		if (creator.UserId !== receiverPlayer.UserId) {
			if (config.Points.PointsEnabled === true) {
				const points = DataStore2<number>("points", creator);
				points.Increment(config.Points.PointsAwarded);
			}
			sendNotification.SendToPlayer(
				receiverPlayer,
				new Notification(
					"New Order",
					`${creator.DisplayName} has created an order for you. This order is known as #${order.id}`,
					10,
				),
			);
			return new Notification(
				"Order Created",
				`Order #${order.id} has been sucessfully created for ${creator.DisplayName}.`,
				10,
			);
		} else {
			return new Notification("Order Created", `Order #${order.id} has been sucessfully created.`, 10);
		}
	} else {
		return new Error("Unable to find the player. Have they left the game?", 4);
	}
});

claimOrder.SetCallback((player, order) => {
	if (order === orderCache.get(order.id)) {
		if (order.isCompleted === false) {
			if (config.OrderBoardSettings.GroupId !== false && config.OrderBoardSettings.GroupId !== 0) {
				if (config.OrderBoardSettings.MinimumRankEnabled) {
					if (
						player.GetRankInGroup(config.OrderBoardSettings.GroupId) < config.OrderBoardSettings.MinimumRank
					) {
						return new Error("You aren't ranked high enough to claim an order.", 3);
					}
				} else {
					if (
						!config.OrderBoardSettings.RankTable.includes(
							player.GetRankInGroup(config.OrderBoardSettings.GroupId),
						)
					) {
						return new Error("You don't have the required rank to claim an order.", 3);
					}
				}
			}
			order.Claim(player);
			// TODO: Fire API Event
			orderCache.set(order.id, order);
			orderCacheEvent.SendToAllPlayers(orderCache);
			return new Notification("Order Claimed", `Your order has been claimed by ${player.DisplayName}`, 10);
		} else {
			return new Error("Cannot claim a completed order!", 0xa);
		}
	} else {
		return new Error("The order does not match the server's cache. Are you exploting?", 0xe);
	}
});

completeOrder.SetCallback((player, order) => {
	if (order === orderCache.get(order.id)) {
		if (order.isClaimed === false) {
			if (orderCache.get(order.id)!.claimer?.UserId === player.UserId) {
				order.Complete();
				// TODO: Fire API Event
				orderCache.set(order.id, order);
				orderCacheEvent.SendToAllPlayers(orderCache);
				return new Notification("Order Claimed", `Your order has been claimed by ${player.DisplayName}`, 10);
			} else {
				return new Error("You cannot complete an order you didn't claim! Are you exploting?", 0xe);
			}
		} else {
			return new Error("Cannot complete an unclaimed order!", 0xa);
		}
	} else {
		return new Error("The order does not match the server's cache. Are you exploting?", 0xe);
	}
});

deleteOrder.SetCallback((player, order) => {
	if (order === orderCache.get(order.id)) {
		if (order.isCompleted === false) {
			if (config.hrScreenSettings.GroupId !== false && config.hrScreenSettings.GroupId !== 0) {
				if (config.hrScreenSettings.MinimumRankEnabled) {
					if (player.GetRankInGroup(config.hrScreenSettings.GroupId) < config.hrScreenSettings.MinimumRank) {
						return new Error("You aren't ranked high enough to delete an order.", 3);
					}
				} else {
					if (
						!config.OrderBoardSettings.RankTable.includes(
							player.GetRankInGroup(config.hrScreenSettings.GroupId),
						)
					) {
						return new Error("You don't have the required rank to delete an order.", 3);
					}
				}
			}
			order.Delete();
			// TODO: Fire API Event
			orderCache.set(order.id, order);
			orderCacheEvent.SendToAllPlayers(orderCache);
			return new Notification("Order Deleted", `Your order has been deleted by ${player.DisplayName}`, 10);
		} else {
			return new Error("Cannot delete a completed order!", 0xa);
		}
	} else {
		return new Error("The order does not match the server's cache. Are you exploting?", 0xe);
	}
});

// * Leaderstats
if (config.Points.PointsEnabled) {
	Players.PlayerAdded.Connect((player) => {
		const points = DataStore2<number>("points", player);

		if (!player.FindFirstChild("leaderstats")) {
			const leaderstats = new Instance("Folder");
			leaderstats.Name = "leaderstats";
			leaderstats.Parent = player;
		}

		const leaderstats = player.WaitForChild("leaderstats") as Folder; // a type-asserton is valid here - as we've made sure it exists!

		const pointsValue = new Instance("NumberValue");
		pointsValue.Name = "Points";
		pointsValue.Value = points.Get(0);
		pointsValue.Parent = leaderstats;

		points.OnUpdate((newValue) => {
			pointsValue.Value = newValue;
		});
	});

	for (const player of Players.GetPlayers()) {
		const points = DataStore2<number>("points", player);

		if (!player.FindFirstChild("leaderstats")) {
			const leaderstats = new Instance("Folder");
			leaderstats.Name = "leaderstats";
			leaderstats.Parent = player;
		}

		const leaderstats = player.WaitForChild("leaderstats") as Folder; // a type-assertion is valid here - as we've made sure it exists!

		const pointsValue = new Instance("NumberValue");
		pointsValue.Name = "Points";
		pointsValue.Value = points.Get(0);
		pointsValue.Parent = leaderstats;

		points.OnUpdate((newValue) => {
			pointsValue.Value = newValue;
		});
	}
}

// * PlayerRemoving
Players.PlayerRemoving.Connect((player) => {
	let changesMade = false;
	for (const [, order] of orderCache) {
		if (order.receiver.UserId === player.UserId) {
			if (order.isClaimed === false) {
				order.Delete();
				changesMade = true;
			}
		}
	}
	if (changesMade === true) {
		orderCacheEvent.SendToAllPlayers(orderCache);
	}
});
