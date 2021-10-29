import { $warn } from "@lundstrong/rbxts-transform-debug";
import Object from "@rbxts/object-utils";
import { Workspace } from "@rbxts/services";
import { defaultConfig } from "./defaultConfig";
import { ConfigSchema } from "./schema";

let configWarningShown = false;

// Show the recursive differences between two objects, without using values
function recursiveKeyDiff<A extends object, B extends A>(a: A, b: B, path?: string) {
	const keys = Object.keys(a);
	for (const key of keys as never[]) {
		if (a[key] === b[key]) continue;

		if (typeIs(a[key], "table") && typeIs(b[key], "table")) {
			recursiveKeyDiff(a[key] as A, b[key] as B, `${path !== undefined ? `${path}.` : ""}${key}`);
		} else if (a[key] && b[key] === undefined) {
			$warn(`${path !== undefined ? `${path}.` : ""}${key} =`, a[key]);
		}
	}
}

export const getConfig = (): ConfigSchema => {
	const configFile = Workspace.FindFirstChild("LundstrongOrders")?.FindFirstChild("Configuration");

	if (!configFile) {
		$warn("No configuration file found. Using defaults.");
	}

	const userConfig = require(configFile as ModuleScript) as ConfigSchema;

	// TODO: validate things (IE: Images) here!

	const config = { ...defaultConfig, ...userConfig };

	if (config !== userConfig) {
		if (!configWarningShown) {
			configWarningShown = true;
			$warn("Some configuration items do not exist in your config. The defaults have been used instead.");
			recursiveKeyDiff(defaultConfig, userConfig);
		}
	}

	return config;
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
