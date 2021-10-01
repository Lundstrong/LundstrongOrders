import { Definitions, Middleware } from "@rbxts/net";
import { RateLimitError } from "@rbxts/net/out/middleware/RateLimitMiddleware";
import { Players } from "@rbxts/services";
import { t } from "@rbxts/t";
import { getAllItems } from "./config";
import { Error, Notification } from "./structures";

export const remotes = Definitions.Create({
	CreateOrder: Definitions.ServerFunction<(receiver: string, items: string[]) => Notification | Error>([
		Middleware.TypeChecking(t.string, t.array(t.valueOf(getAllItems()))),
		Middleware.RateLimit({
			MaxRequestsPerMinute: 1 / 6,
			ErrorHandler: function (errorData: RateLimitError) {
				const player = Players.GetPlayerByUserId(errorData.UserId);
				if (player) {
					// error handler is always on the server :)
					remotes.Server.Create("Notification").SendToPlayer(
						player,
						new Error(
							"The rate limit has been reached for the amount of orders that you can create per minute.",
							1,
						),
					);
				}
			},
		}),
	]),
	Notification: Definitions.ServerToClientEvent<[Notification: Notification | Error]>(),
});
