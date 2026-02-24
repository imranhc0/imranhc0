interface FlashBannerProps {
  message?: string;
  type?: "success" | "error";
}

export function FlashBanner({ message, type = "success" }: FlashBannerProps) {
  if (!message) {
    return null;
  }

  const className =
    type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";

  return <p className={`rounded-xl border px-4 py-3 text-sm font-semibold ${className}`}>{message}</p>;
}
