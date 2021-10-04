import { $warn } from "@lundstrong/rbxts-transform-debug";
import { Workspace } from "@rbxts/services";
import { defaultConfig } from "./defaultConfig";
import { ConfigSchema } from "./schema";

export const getConfig = (): ConfigSchema => {
	const configFile = Workspace.FindFirstChild("LundstrongOrders")?.FindFirstChild("Configuration");

	if (!configFile) {
		$warn("No configuration file found. Using defaults.");
	}

	const userConfig = require(configFile as ModuleScript) as ConfigSchema;

	// TODO: validate things (IE: Images) here!

	return { ...userConfig, ...defaultConfig };
};

export const getAllItems = (): string[] => {
	const items = [];
	for (const category of getConfig().MenuItems) {
		for (const item of category.Items) {
			items.push(item);
		}
	}
	return items;
};
