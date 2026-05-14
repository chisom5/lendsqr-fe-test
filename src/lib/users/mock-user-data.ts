import type {
  UserDetailRecord,
  UserListRecord,
  UserStatus,
} from "@/types/user";
import { mulberry32 } from "@/lib/users/mulberry32";

const ORGS = [
  "Lendsqr",
  "Irorun",
  "Lendstar",
  "CloudBank",
  "Providus Microfinance",
] as const;

const FIRST = [
  "Grace",
  "Adedeji",
  "Chidi",
  "Amara",
  "Tunde",
  "Ngozi",
  "Emeka",
  "Funke",
  "Ibrahim",
  "Yewande",
] as const;

const LAST = [
  "Effiom",
  "Oladipo",
  "Nwosu",
  "Bello",
  "Adeyemi",
  "Okonkwo",
  "Eze",
  "Lawal",
  "Mohammed",
  "Ajayi",
] as const;

const STATUSES: UserStatus[] = [
  "active",
  "inactive",
  "pending",
  "blacklisted",
];

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)]!;
}

function pad(n: number, w = 3) {
  return String(n).padStart(w, "0");
}

function formatCustomerId(seed: number) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "LSQF";
  const r = mulberry32(seed + 999);
  for (let i = 0; i < 7; i++) out += chars[Math.floor(r() * chars.length)]!;
  return out;
}

function buildDetail(seed: number, list: UserListRecord): UserDetailRecord {
  const r = mulberry32(seed);
  const tier = (1 + Math.floor(r() * 3)) as 1 | 2 | 3;
  const guarantor = (): UserDetailRecord["guarantors"][0] => ({
    fullName: `${pick(r, FIRST)} ${pick(r, LAST)}`,
    phoneNumber: `080${pad(Math.floor(r() * 1e8), 8)}`,
    emailAddress: `${list.username}${Math.floor(r() * 99)}@example.com`,
    relationship: pick(r, ["Sister", "Brother", "Cousin", "Friend", "Colleague"]),
  });

  return {
    ...list,
    customerId: formatCustomerId(seed),
    profileTier: tier,
    accountBalance: Math.floor(r() * 5_000_000) + 50_000,
    bankAccountNumber: `${Math.floor(r() * 9e9) + 1e9}`,
    bankName: pick(r, ["Providus Bank", "GTBank", "Access Bank", "Zenith Bank"]),
    personalInformation: {
      fullName: list.username.replace(".", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      phoneNumber: list.phoneNumber,
      emailAddress: list.email,
      bvn: `${Math.floor(r() * 9e10) + 1e10}`,
      gender: pick(r, ["Female", "Male", "Other"]),
      maritalStatus: pick(r, ["Single", "Married", "Divorced"]),
      children: pick(r, ["None", "1", "2", "3+"]),
      typeOfResidence: pick(r, ["Parent's Apartment", "Owned", "Rented"]),
    },
    educationAndEmployment: {
      levelOfEducation: pick(r, ["B.Sc", "M.Sc", "OND", "HND", "Ph.D"]),
      employmentStatus: pick(r, ["Employed", "Self-employed", "Unemployed"]),
      sectorOfEmployment: pick(r, ["FinTech", "Healthcare", "Education", "Agriculture"]),
      durationOfEmployment: pick(r, ["0-1 years", "2-4 years", "5+ years"]),
      officeEmail: `office.${list.username}@work.test`,
      monthlyIncome: pick(r, ["₦200,000.00 - ₦400,000.00", "₦400,000.00 - ₦600,000.00"]),
      loanRepayment: pick(r, ["40,000", "80,000", "120,000"]),
    },
    socials: {
      twitter: `@${list.username}`,
      facebook: `${list.username}.fb`,
      instagram: `@${list.username}_`,
    },
    guarantors: [guarantor(), guarantor()],
  };
}

export function generateUserCatalog(count = 500): UserDetailRecord[] {
  const rand = mulberry32(42);
  const items: UserDetailRecord[] = [];

  for (let i = 0; i < count; i++) {
    const fi = pick(rand, FIRST);
    const la = pick(rand, LAST);
    const uname = `${fi.toLowerCase()}.${la.toLowerCase()}${i}`;
    const org = pick(rand, ORGS);
    const joined = new Date(2018 + Math.floor(rand() * 6), Math.floor(rand() * 12), 1 + Math.floor(rand() * 27));
    const list: UserListRecord = {
      id: `user-${i + 1}`,
      organization: org,
      username: uname,
      email: `${uname}@${org.toLowerCase().replace(/\s+/g, "")}.com`,
      phoneNumber: `0${7 + Math.floor(rand() * 3)}${pad(Math.floor(rand() * 1e9), 9)}`,
      dateJoined: joined.toISOString().slice(0, 10),
      status: pick(rand, STATUSES),
    };
    items.push(buildDetail(i + 1, list));
  }

  return items;
}

let cached: UserDetailRecord[] | null = null;

export function getUserCatalog(): UserDetailRecord[] {
  if (!cached) cached = generateUserCatalog(500);
  return cached;
}
