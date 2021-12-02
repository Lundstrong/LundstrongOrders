import { $warn } from "@lundstrong/rbxts-transform-debug";
import { Definitions, Middleware } from "@rbxts/net";
import { RateLimitError } from "@rbxts/net/out/middleware/RateLimitMiddleware";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { getAllItems, getConfig } from "./config";
import { Error, fireableGuiTypes, Notification, Order } from "./structures";

const isOrder: t.check<Order> = (value): value is Order => value instanceof Order;

const onRateLimitError = (errorData: RateLimitError, userfacingEventName: string): void => {
	const player = Players.GetPlayerByUserId(errorData.UserId);
	if (player) {
		// error handler is always on the server :)
		$warn(`Cooldown for ${userfacingEventName} hasn't expired for ${errorData.UserId}`);
		remotes.Server.Get("SendNotification").SendToPlayer(
			player,
			new Error(`Slow down! Your cooldown hasn't expired for ${userfacingEventName}.`, 0xc),
		);
	}
};

export const remotes = Definitions.Create({
	CreateOrder: Definitions.ServerFunction<(receiver: string, items: string[]) => Notification | Error>([
		Middleware.TypeChecking(t.string, t.array(t.valueOf(getAllItems()))),
		Middleware.RateLimit({
			MaxRequestsPerMinute: getConfig().Cooldowns.OrderCooldown / 60,
			ErrorHandler: (errorData) => onRateLimitError(errorData, "creating orders"),
		}),
	]),
	ClaimOrder: Definitions.ServerFunction<(order: Order) => Notification | Error>([
		Middleware.TypeChecking(isOrder),
		Middleware.RateLimit({
			MaxRequestsPerMinute: getConfig().Cooldowns.ClaimCooldown / 60,
			ErrorHandler: (errorData) => onRateLimitError(errorData, "claiming orders"),
		}),
	]),
	CompleteOrder: Definitions.ServerFunction<(order: Order) => Notification | Error>([
		Middleware.TypeChecking(isOrder),
		Middleware.RateLimit({
			MaxRequestsPerMinute: getConfig().Cooldowns.CompleteCooldown / 60,
			ErrorHandler: (errorData) => onRateLimitError(errorData, "completing orders"),
		}),
	]),
	DeleteOrder: Definitions.ServerFunction<(order: Order) => Notification | Error>([
		Middleware.TypeChecking(isOrder),
		Middleware.RateLimit({
			MaxRequestsPerMinute: getConfig().Cooldowns.DeleteOrderCooldown / 60,
			ErrorHandler: (errorData) => onRateLimitError(errorData, "deleting orders"),
		}),
	]),
	OrderCacheUpdate: Definitions.ServerToClientEvent<[Orders: Map<number, Order>]>(),
	SendNotification: Definitions.ServerToClientEvent<[Notification: Notification | Error]>(),
	EnableGui: Definitions.ServerToClientEvent<[GuiType: fireableGuiTypes]>(),
});
