import lendsqrLogoUrl from "@/assets/lendsqr-logo.svg";

type LendsqrLogoProps = {
  className?: string;
  /** Max width for the mark (Figma asset scales down in dense chrome). */
  maxW?: string;
};

export function LendsqrLogo({ className = "", maxW = "175px" }: LendsqrLogoProps) {
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <img
        src={lendsqrLogoUrl}
        alt="Lendsqr"
        className="h-8 w-auto object-contain object-left md:h-9"
        style={{ maxWidth: maxW }}
      />
    </div>
  );
}
