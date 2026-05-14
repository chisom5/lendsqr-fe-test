import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/lib/users/users-api";
import {
  readCachedUserDetail,
  writeUserDetailToStorage,
} from "@/lib/users/user-details-storage";

export const userDetailQueryKey = (userId: string) =>
  ["users", "detail", userId] as const;

export function useUserDetailQuery(userId: string | undefined) {
  return useQuery({
    queryKey: userDetailQueryKey(userId ?? ""),
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) throw new Error("Missing user id");
      const detail = await fetchUserById(userId);
      writeUserDetailToStorage(detail);
      return detail;
    },
    placeholderData: () => {
      if (!userId) return undefined;
      return readCachedUserDetail(userId) ?? undefined;
    },
    staleTime: 30_000,
  });
}
