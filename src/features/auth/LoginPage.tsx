import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { LendsqrLogo } from "@/shared/components/branding/LendsqrLogo";
import LoginIllustration from '@/assets/login-illustration.svg?react';
import { loginSchema, type LoginFormValues } from "@/features/auth/login-schema";
import { isAuthenticatedSession, setAuthenticatedSession } from "@/lib/auth/session";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: string } | null)?.from;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (isAuthenticatedSession()) {
      navigate(from && from !== "/login" ? from : "/users", { replace: true });
    }
  }, [from, navigate]);

  const onSubmit = (_values: LoginFormValues) => {
    setAuthenticatedSession();
    navigate(from && from !== "/login" ? from : "/users", { replace: true });
  };

  return (
    <div className="min-h-screen bg-white lg:grid lg:min-h-screen lg:grid-cols-2">
      <section className="relative hidden flex-col overflow-hidden bg-white px-10 pb-16 pt-10 lg:flex">
        <LendsqrLogo className="absolute left-10 top-10 z-10" maxW='175px'/>
        <div className="flex flex-1 items-center justify-center px-6">
          <LoginIllustration />
        </div>
      </section>

      <section className="flex min-h-[60vh] flex-col justify-center border-lendsqr-border px-6 py-12 sm:px-10 lg:min-h-screen lg:border-l-2 lg:px-16">
        <div className="mx-auto w-full max-w-[344px] space-y-8">
          <div className="lg:hidden">
            <LendsqrLogo className="mb-10" maxW='175px'/>
          </div>
          <header>
            <h1 className="text-4xl font-bold tracking-tight text-lendsqr-navy">Welcome!</h1>
            <p className="mt-2 text-base text-lendsqr-muted">Enter details to login.</p>
          </header>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email"
                className="h-12 w-full rounded-md border border-lendsqr-border px-4 text-sm text-lendsqr-navy placeholder:text-lendsqr-muted/70 focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/25"
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email")}
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Password"
                  className="h-12 w-full rounded-md border border-lendsqr-border px-4 pr-16 text-sm text-lendsqr-navy placeholder:text-lendsqr-muted/70 focus:border-lendsqr-primary focus:outline-none focus:ring-2 focus:ring-lendsqr-primary/25"
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold uppercase tracking-wide text-lendsqr-primary"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
              {errors.password ? (
                <p className="mt-1 text-xs text-red-600" role="alert">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <div>
              <a
                href="#forgot"
                className="text-xs font-semibold uppercase tracking-wide text-lendsqr-primary hover:underline"
              >
                FORGOT PASSWORD?
              </a>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex h-12 w-full items-center justify-center rounded-md bg-lendsqr-primary text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
            >
              LOG IN
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
