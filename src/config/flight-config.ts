import type {
  FlightSortOption,
  TimeRangeDefinition,
  StopOptions,
} from "@/domain/flight.types";

export const ITEMS_PER_LOAD = 20;

export const AIRLINE_LOGO_URL_TEMPLATE = (logoName: string) =>
  `https://cdn01.booking.ir/airlineLogo/${logoName}.png`;

export const TIME_RANGE_DEFINITIONS: TimeRangeDefinition[] = [
  { key: "earlyMorning", label: "صبح زود", start: "00:01", end: "08:00" },
  { key: "morning", label: "صبح", start: "08:01", end: "12:00" },
  { key: "noon", label: "ظهر", start: "12:01", end: "16:00" },
  { key: "evening", label: "عصر", start: "16:01", end: "20:00" },
  { key: "night", label: "شب", start: "20:01", end: "00:00" },
];

export const CABIN_LABELS: Record<string, string> = {
  Economy: "اکونومی",
  First: "فرست کلاس",
  Business: "بیزینس",
  Premium: "پریمیوم",
  PremiumEconomy: "پریمیوم اکونومی",
  Comfort: "کامفورت",
  EconomyPlus: "اکونومی پلاس",
  BusinessPremium: "بیزینس پریمیوم",
};

export const FLIGHT_SORT_OPTIONS: FlightSortOption[] = [
  { value: "default", label: "بهترین پیشنهاد" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "mostExpensive", label: "گران‌ترین" },
  { value: "fastest", label: "سریع‌ترین" },
  { value: "nearestDeparture", label: "نزدیک‌ترین زمان" },
];

export const STOP_OPTIONS: StopOptions = {
  none: {
    value: "nonstop",
    label: "بدون توقف",
    stops: 0,
  },
  once: {
    value: "oneStop",
    label: "یک توقف",
    stops: 1,
  },
  moreThanOne: {
    value: "twoOrMoreStops",
    label: "بیش از 2 توقف",
    stops: 2,
  },
};
