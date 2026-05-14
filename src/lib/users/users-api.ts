import type {
  UserDetailRecord,
  UserListRecord,
  UsersListQuery,
  UsersListResponse,
} from "@/types/user";
import { getUserCatalog } from "@/lib/users/mock-user-data";

const MOCK_LATENCY_MS = 450;

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function filterUsersByQuery(
  all: UserDetailRecord[],
  query: Pick<
    UsersListQuery,
    | "organization"
    | "username"
    | "email"
    | "phoneNumber"
    | "status"
    | "dateFrom"
    | "dateTo"
  >,
): UserDetailRecord[] {
  const org = query.organization?.trim();
  const username = query.username?.trim();
  const email = query.email?.trim();
  const phone = query.phoneNumber?.trim();
  const status = query.status;
  const from = query.dateFrom;
  const to = query.dateTo;

  return all.filter((u) => {
    if (org && !normalize(u.organization).includes(normalize(org))) return false;
    if (username && !normalize(u.username).includes(normalize(username)))
      return false;
    if (email && !normalize(u.email).includes(normalize(email))) return false;
    if (phone && !u.phoneNumber.includes(phone)) return false;
    if (status && u.status !== status) return false;
    if (from && u.dateJoined < from) return false;
    if (to && u.dateJoined > to) return false;
    return true;
  });
}

export async function fetchUsersList(
  query: UsersListQuery,
): Promise<UsersListResponse> {
  const url = import.meta.env.VITE_USERS_API_URL;

  // fallback to local mock
  if (!url) {
    await sleep(MOCK_LATENCY_MS);

    const all = getUserCatalog();
    const filtered = filterUsersByQuery(all, query);

    const start = (query.page - 1) * query.pageSize;

    return {
      items: filtered
        .slice(start, start + query.pageSize)
        .map(toListRecord),
      total: filtered.length,
      page: query.page,
      pageSize: query.pageSize,
    };
  }
  const params = new URLSearchParams({
    _page: String(query.page),
    _per_page: String(query.pageSize),
  });

  const response = await fetch(
    `${url}/users?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return {
    items: result.data.map(toListRecord),
    total: result.items,
    page: query.page,
    pageSize: query.pageSize,
  };
}

function toListRecord(u: UserDetailRecord): UserListRecord {
  return {
    id: u.id,
    organization: u.organization,
    username: u.username,
    email: u.email,
    phoneNumber: u.phoneNumber,
    dateJoined: u.dateJoined,
    status: u.status,
  };
}

export async function fetchUserById(userId: string): Promise<UserDetailRecord> {
  const url = import.meta.env.VITE_USERS_API_URL;

  if (!url) {
    await sleep(MOCK_LATENCY_MS);

    const all = getUserCatalog();

    const found = all.find((u) => u.id === userId);

    if (!found) {
      throw new Error("User not found");
    }

    return found;
  }

  const response = await fetch(
    `${url}/users/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const result = await response.json();

  return result;
}
