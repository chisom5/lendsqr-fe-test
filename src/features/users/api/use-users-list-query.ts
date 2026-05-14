import { useQuery } from "@tanstack/react-query";
import { fetchUsersList } from "@/lib/users/users-api";
import type { UsersListQuery } from "@/features/users/types/user";

export const usersListQueryKey = (query: UsersListQuery) =>
  ["users", "list", query] as const;

export function useUsersListQuery(query: UsersListQuery) {
  return useQuery({
    queryKey: usersListQueryKey(query),
    queryFn: () => fetchUsersList(query),
    staleTime: 5 * 60 * 1000,  
    placeholderData: (prev) => prev,
  });
}
