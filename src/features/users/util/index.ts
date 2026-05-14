import { ActionKey } from "../components/constant/action-config.constant";
import { UserStatus } from "../types/user";

export function getUserActions(status: UserStatus): ActionKey[] {
    switch (status) {
        case "active":
            return ["inactivate", "blacklist"];
        case "pending":
            return ["activate", "blacklist"];
        case "inactive":
            return ["activate"];
        case "blacklisted":
            return [];
    }
}