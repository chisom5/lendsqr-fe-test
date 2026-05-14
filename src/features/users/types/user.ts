
export type UserStatus = "active" | "inactive" | "pending" | "blacklisted";


export type UserSummary = {
  label: string;
  value: string;
  tone: string;
  icon: React.ElementType
}
export type UserListRecord = {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: UserStatus;
};

export type PersonalInformation = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
};

export type EducationAndEmployment = {
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
};

export type Socials = {
  twitter: string;
  facebook: string;
  instagram: string;
};

export type Guarantor = {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
};

export type UserDetailRecord = UserListRecord & {
  customerId: string;
  profileTier: 1 | 2 | 3;
  accountBalance: number;
  bankAccountNumber: string;
  bankName: string;
  personalInformation: PersonalInformation;
  educationAndEmployment: EducationAndEmployment;
  socials: Socials;
  guarantors: [Guarantor, Guarantor];
};

export type UsersListQuery = {
  page: number;
  pageSize: number;
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  status?: UserStatus | "";
  dateFrom?: string;
  dateTo?: string;
};

export type UsersListResponse = {
  items: UserListRecord[];
  total: number;
  page: number;
  pageSize: number;
};



