import type { UserDetailRecord } from "@/types/user";

const STORAGE_PREFIX = "lendsqr:user-details:";

function keyForUser(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

function canUseStorage() {
  return typeof window !== "undefined" && !!window.localStorage;
}

export function readCachedUserDetail(
  userId: string,
): UserDetailRecord | null {
  if (!canUseStorage()) return null;

  try {
    const raw = localStorage.getItem(keyForUser(userId));

    if (!raw) return null;

    return JSON.parse(raw) as UserDetailRecord;
  } catch {
    return null;
  }
}

export function writeUserDetailToStorage(
  detail: UserDetailRecord,
) {
  if (!canUseStorage()) return;

  try {
    localStorage.setItem(
      keyForUser(detail.id),
      JSON.stringify(detail),
    );
  } catch {
    // quota exceeded / private mode
  }
}

export function mergeWithCachedDetail(
  userId: string,
  fresh: UserDetailRecord,
): UserDetailRecord {
  const cached = readCachedUserDetail(userId);

  if (!cached) return fresh;

  return {
    ...fresh,
    ...cached,
    id: fresh.id,
  };
}