import { z } from "zod";

export const usersFilterSchema = z.object({
  organization: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  phoneNumber: z.string().optional(),
  status: z.string().optional(),
  /** Single calendar day — maps to both `dateFrom` and `dateTo` in the list query. */
  joinedDate: z.string().optional(),
});

export type UsersFilterFormValues = z.infer<typeof usersFilterSchema>;
