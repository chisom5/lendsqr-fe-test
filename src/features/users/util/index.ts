import { UserStatus } from "@/types/user";
import { ActionKey } from "../components/constant/action-config.constant";

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