import { remotes } from "ReplicatedStorage/remotes";
import { showNotification } from "./notificationHandler";

const receiveNotification = remotes.Client.Get("SendNotification");
receiveNotification.Connect(showNotification);
