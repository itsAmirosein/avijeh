import { AIRLINE_LOGO_URL_TEMPLATE, CABIN_LABELS } from "@/config/flight-config";
import type { BaggageAllowance, CabinType } from "./flight.types";

const PERSIAN_NUMBER_FORMATTER = new Intl.NumberFormat("fa-IR");
const EMPTY_DISPLAY_VALUE = "—";

//Formats the domain amount with its currency for UI display
export function formatPrice(
  value: number | null,
  currencyTitle: string,
): string | null {
  if (!isDisplayableNumber(value)) return null;

  const formattedValue = formatNumber(value);
  const normalizedCurrencyTitle = currencyTitle.trim();

  return normalizedCurrencyTitle
    ? `${formattedValue} ${normalizedCurrencyTitle}`
    : formattedValue;
}

// Formats the ISO time as HH:mm without applying the browser timezone
export function formatTime(dateTime: string): string {
  const match = dateTime.match(/T(\d{2}):(\d{2})/);

  return match ? `${match[1]}:${match[2]}` : EMPTY_DISPLAY_VALUE;
}

// Formats the normalized total duration in minutes
export function formatDuration(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes) || totalMinutes < 0) {
    return EMPTY_DISPLAY_VALUE;
  }

  const minutes = Math.round(totalMinutes);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${formatNumber(remainingMinutes)} دقیقه`;
  if (remainingMinutes === 0) return `${formatNumber(hours)} ساعت`;

  return `${formatNumber(hours)} ساعت و ${formatNumber(remainingMinutes)} دقیقه`;
}

// Formats the actual stop count
export function formatStops(stops: number): string {
  if (!Number.isInteger(stops) || stops < 0) return EMPTY_DISPLAY_VALUE;
  if (stops === 0) return "بدون توقف";

  return `${formatNumber(stops)} توقف`;
}

// Maps the technical cabinType to its configured Persian label
export function formatCabinType(
  cabinType: CabinType | null | undefined,
): string {
  if (!cabinType) return EMPTY_DISPLAY_VALUE;

  return CABIN_LABELS[cabinType] ?? cabinType;
}

// Supports multi-leg itineraries by displaying all cabin types.
export function formatCabinTypes(cabinTypes: readonly CabinType[]): string {
  if (cabinTypes.length === 0) return EMPTY_DISPLAY_VALUE;

  return cabinTypes.map(formatCabinType).join("، ");
}

// Returns the normalized baggage text
export function formatBaggage(baggage: BaggageAllowance): string {
  return baggage.rawText.trim() || EMPTY_DISPLAY_VALUE;
}

// Returns null when seat availability is missing 
export function formatRemainingSeats(seats: number | null): string | null {
  if (!Number.isInteger(seats) || seats! < 0) return null;

  return `${formatNumber(seats!)} صندلی خالی`;
}

// Builds the airline logo URL
export function getAirlineLogoUrl(airlineCode: string): string | null {
  const normalizedAirlineCode = airlineCode.trim();

  return normalizedAirlineCode
    ? AIRLINE_LOGO_URL_TEMPLATE(normalizedAirlineCode)
    : null;
}

// Uses Persian number formatting
function formatNumber(value: number): string {
  return PERSIAN_NUMBER_FORMATTER.format(value);
}

function isDisplayableNumber(value: number | null): value is number {
  return value !== null && Number.isFinite(value) && value >= 0;
}