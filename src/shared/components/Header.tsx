import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { LendsqrLogo } from "@/shared/components/branding/LendsqrLogo";

type HeaderProps = {
  onOpenSidebar?: () => void;
};

export function Header({ onOpenSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex min-h-[4.75rem] shrink-0 items-center border-b border-lendsqr-border bg-white/95 px-4 py-3 backdrop-blur md:px-8">
      <div className="w-full flex max-w-[1600px] flex-wrap items-center gap-3 md:flex-nowrap md:gap-6">
        <button
          type="button"
          className="inline-flex rounded-md p-2 text-lendsqr-muted hover:bg-lendsqr-surface lg:hidden"
          aria-label="Open navigation"
          onClick={onOpenSidebar}
        >
          <Menu className="h-6 w-6" />
        </button>

        <LendsqrLogo maxW="140px" className="max-lg:order-1"  />

        <div className="order-3 flex w-[400px] md:order-none relative lg:left-[10%]">
          <div className="relative w-full max-w-[400px] md:mx-auto">
            <input
              type="search"
              placeholder="Search for anything"
              className="h-10 w-full rounded-lg border border-lendsqr-border bg-lendsqr-surface/60 pl-4 pr-12 text-sm text-lendsqr-navy placeholder:text-lendsqr-muted/70 focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/20"
            />
            <button
              type="button"
              className="absolute right-1 top-1 inline-flex h-8 w-10 items-center justify-center rounded-md bg-lendsqr-primary text-white"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-4 md:gap-6">
          <a
            href="https://lendsqr.com"
            className="hidden text-sm font-medium text-lendsqr-muted underline-offset-4 hover:underline sm:inline"
          >
            Docs
          </a>
          <button
            type="button"
            className="relative text-lendsqr-muted hover:text-lendsqr-navy"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-lendsqr-primary" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-md py-1 text-left hover:bg-lendsqr-surface"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-lendsqr-primary/15 text-sm font-semibold text-lendsqr-navy ring-2 ring-white">
              A
            </span>
            <span className="hidden text-sm font-medium text-lendsqr-navy sm:inline">
              Adedeji
            </span>
            <ChevronDown className="hidden h-4 w-4 text-lendsqr-muted sm:inline" />
          </button>
        </div>
      </div>
    </header>
  );
}
