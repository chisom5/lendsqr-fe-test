import type { UserDetailRecord } from "@/features/users/types/user";

const STORAGE_PREFIX = "lendsqr:user-details:";

function keyForUser(userId: string) {
  return `${STORAGE_PREFIX}${userId}`;
}

export function readCachedUserDetail(userId: string): UserDetailRecord | null {
  try {
    const raw = localStorage.getItem(keyForUser(userId));
    if (!raw) return null;
    return JSON.parse(raw) as UserDetailRecord;
  } catch {
    return null;
  }
}

export function writeUserDetailToStorage(detail: UserDetailRecord) {
  try {
    localStorage.setItem(keyForUser(detail.id), JSON.stringify(detail));
  } catch {
    /* quota or private mode */
  }
}

export function mergeWithCachedDetail(
  userId: string,
  fresh: UserDetailRecord,
): UserDetailRecord {
  const cached = readCachedUserDetail(userId);
  if (!cached) return fresh;
  return { ...fresh, ...cached, id: fresh.id };
}
