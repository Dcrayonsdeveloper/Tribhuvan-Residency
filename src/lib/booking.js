// Central booking action for The Tribhuvan Residency.
// Bookings are handled by our Asia Tech OTA channel manager. Rather than embed
// it in a cramped iframe (which trapped guests behind its own popups on mobile),
// we send guests straight to the full booking page.

export const ASIA_TECH_BOOKING_URL =
  "https://asiatech.in/booking_engine/index3?token=Nzc0Mg==";

// On phones: navigate in the same tab — the most reliable path (no lost tabs,
// no popup blockers, and the Back button returns to the site).
// On larger screens: open a new tab so the website stays open behind it.
export function openBookingEngine() {
  if (typeof window === "undefined") return;
  const isMobile = window.matchMedia("(max-width: 640px)").matches;
  if (isMobile) {
    window.location.href = ASIA_TECH_BOOKING_URL;
  } else {
    window.open(ASIA_TECH_BOOKING_URL, "_blank", "noopener,noreferrer");
  }
}
