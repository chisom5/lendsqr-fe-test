import { Guarantor } from "@/types/user";
import { type UserDetailsTopCardProps } from "./DetailsTopCard";

interface UserDetailsContentCardProps extends Pick<UserDetailsTopCardProps, "activeTab" | "data"> {
    tabCopy?: React.ReactNode
}

function DetailField({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-lendsqr-muted">{label}</p>
            <p className="text-base font-medium text-lendsqr-navy break-all">{value}</p>
        </div>
    );
}

export function UserDetailsContentCard({ data, activeTab, tabCopy }: UserDetailsContentCardProps) {

    const { personalInformation: p, educationAndEmployment: e, socials: s, guarantors } = data;

    return (
        <>
            {activeTab === "General details" ? (
                <div className="space-y-10 rounded-lg border border-lendsqr-border bg-white p-6 shadow-card md:p-8">
                    <section className="space-y-6">
                        <h2 className="text-base font-medium text-lendsqr-navy">Personal information</h2>
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">
                            <DetailField label="Full name" value={p.fullName} />
                            <DetailField label="Phone number" value={p.phoneNumber} />
                            <DetailField label="Email address" value={p.emailAddress} />
                            <DetailField label="BVN" value={p.bvn} />
                            <DetailField label="Gender" value={p.gender} />
                            <DetailField label="Marital status" value={p.maritalStatus} />
                            <DetailField label="Children" value={p.children} />
                            <DetailField label="Type of residence" value={p.typeOfResidence} />
                        </div>
                    </section>

                    <section className="space-y-6 border-t border-lendsqr-border pt-8">
                        <h2 className="text-base font-medium text-lendsqr-navy">Education and employment</h2>
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                            <DetailField label="Level of education" value={e.levelOfEducation} />
                            <DetailField label="Employment status" value={e.employmentStatus} />
                            <DetailField label="Sector of employment" value={e.sectorOfEmployment} />
                            <DetailField label="Duration of employment" value={e.durationOfEmployment} />
                            <DetailField label="Office email" value={e.officeEmail} />
                            <DetailField label="Monthly income" value={e.monthlyIncome} />
                            <DetailField label="Loan repayment" value={e.loanRepayment} />
                        </div>
                    </section>

                    <section className="space-y-6 border-t border-lendsqr-border pt-8">
                        <h2 className="text-base font-medium text-lendsqr-navy">Socials</h2>
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                            <DetailField label="Twitter" value={s.twitter} />
                            <DetailField label="Facebook" value={s.facebook} />
                            <DetailField label="Instagram" value={s.instagram} />
                        </div>
                    </section>

                    <section className="space-y-6 border-t border-lendsqr-border pt-8">
                        <h2 className="text-base font-medium text-lendsqr-navy">
                            Guarantors
                        </h2>

                        {guarantors.map((g: Guarantor, index: number) => (
                            <div
                                key={`${g.emailAddress}-${index}`}
                                className="space-y-6 pt-6 pb-6 border-b last:border-b-0 border-lendsqr-border"
                            >
                                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
                                    <DetailField label="Full name" value={g.fullName} />
                                    <DetailField label="Phone number" value={g.phoneNumber} />
                                    <DetailField label="Email address" value={g.emailAddress} />
                                    <DetailField label="Relationship" value={g.relationship} />
                                </div>
                            </div>
                        ))}
                    </section>



                </div>
            ) : (
                <div className="rounded-lg border border-lendsqr-border bg-white p-6 shadow-card md:p-8">
                    {tabCopy}
                </div>
            )}
        </>
    )
}