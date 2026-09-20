import type {
  FlightFilters,
  FlightOption,
  FlightOptionList,
  StopCategory,
  TimeRangeDefinition,
  ActiveFlightFilters,
} from "./flight.types";
import { TIME_RANGE_DEFINITIONS } from "@/config/flight-config";

export function filterFlights(
  flights: FlightOptionList,
  filters: FlightFilters,
): FlightOptionList {
  const activeFilters = createActiveFilters(filters);

  return flights.filter((flight) => matchesFilters(flight, activeFilters));
}

function createActiveFilters(filters: FlightFilters): ActiveFlightFilters {
  return {
    departureTimeRanges: new Set(filters.departureTimeRanges),
    airlineCodes: new Set(filters.airlineCodes),
    aircraftTypes: new Set(filters.aircraftTypes),
    cabinTypes: new Set(filters.cabinTypes),
    stopCategories: new Set(filters.stopCategories),
    departureAirportCodes: new Set(filters.departureAirportCodes),
    arrivalAirportCodes: new Set(filters.arrivalAirportCodes),
    normalizedFlightNumber: normalizeFlightNumber(filters.flightNumber),
  };
}

function matchesFilters(
  flight: FlightOption,
  filters: ActiveFlightFilters,
): boolean {
  return (
    matchesAirlines(flight, filters.airlineCodes) &&
    matchesAnyValue(flight.card.aircraftTypes, filters.aircraftTypes) &&
    matchesAnyValue(flight.card.cabinTypes, filters.cabinTypes) &&
    matchesSingleValue(
      flight.card.departure.airportCode,
      filters.departureAirportCodes,
    ) &&
    matchesSingleValue(
      flight.card.arrival.airportCode,
      filters.arrivalAirportCodes,
    ) &&
    matchesSingleValue(
      getStopCategory(flight.card.stops),
      filters.stopCategories,
    ) &&
    matchesDepartureTimeRange(
      flight.card.departure.dateTime,
      filters.departureTimeRanges,
    ) &&
    matchesFlightNumber(
      flight.card.flightNumbers,
      filters.normalizedFlightNumber,
    )
  );
}

function matchesAirlines(
  flight: FlightOption,
  selectedAirlineCodes: ReadonlySet<string>,
): boolean {
  return (
    selectedAirlineCodes.size === 0 ||
    flight.card.airlines.some(({ code }) => selectedAirlineCodes.has(code))
  );
}

function matchesAnyValue(
  values: readonly string[],
  selectedValues: ReadonlySet<string>,
): boolean {
  return (
    selectedValues.size === 0 ||
    values.some((value) => selectedValues.has(value))
  );
}

function matchesSingleValue<T>(
  value: T,
  selectedValues: ReadonlySet<T>,
): boolean {
  return selectedValues.size === 0 || selectedValues.has(value);
}

function matchesDepartureTimeRange(
  departureDateTime: string,
  selectedRanges: ReadonlySet<string>,
): boolean {
  if (selectedRanges.size === 0) return true;

  return TIME_RANGE_DEFINITIONS.some(
    (range) =>
      selectedRanges.has(range.key) && isInTimeRange(departureDateTime, range),
  );
}

function getStopCategory(stops: number): StopCategory {
  if (stops === 0) return "nonstop";
  if (stops === 1) return "oneStop";

  return "twoOrMoreStops";
}

function matchesFlightNumber(
  flightNumbers: readonly string[],
  normalizedQuery: string,
): boolean {
  return (
    !normalizedQuery ||
    flightNumbers.some((flightNumber) =>
      normalizeFlightNumber(flightNumber).includes(normalizedQuery),
    )
  );
}

function normalizeFlightNumber(value: string): string {
  return value.trim().toLowerCase();
}

function getMinuteOfDay(dateTime: string): number {
  const match = dateTime.match(/T(\d{2}):(\d{2})/);

  if (!match) return 0;

  return Number(match[1]) * 60 + Number(match[2]);
}

function isInTimeRange(dateTime: string, range: TimeRangeDefinition): boolean {
  const minuteOfDay = getMinuteOfDay(dateTime);
  const startMinute = timeToMinute(range.start);
  const endMinute = timeToMinute(range.end);

  if (startMinute <= endMinute) {
    return minuteOfDay >= startMinute && minuteOfDay <= endMinute;
  }

// The night range crosses midnight, e.g. 20:01–00:00.
  return minuteOfDay >= startMinute || minuteOfDay <= endMinute;
}

function timeToMinute(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);

  return hours * 60 + minutes;
}
