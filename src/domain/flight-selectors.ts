import type {
  CabinType,
  FilterOption,
  FlightFilterOptions,
  FlightOption,
  StopCategory,
  StopFilterOption,
  TimeRangeKey,
  TimeRangeDefinition,
} from "./flight.types";
import {
  AIRLINE_LOGO_URL_TEMPLATE,
  CABIN_LABELS,
  TIME_RANGE_DEFINITIONS,
  STOP_OPTIONS,
} from "@/config/flight-config";

type DateTimeField = "departure" | "arrival";

export function getFlightFilterOptions(
  flights: FlightOption[],
): FlightFilterOptions {
  return {
    departureTimeRanges: getTimeRangeOptions(flights, "departure"),
    airlines: getAirlineOptions(flights),
    aircraftTypes: getAircraftOptions(flights),
    cabinTypes: getCabinOptions(flights),
    stopCategories: getStopOptions(flights),
    departureAirports: getAirportOptions(flights, "departure"),
    arrivalAirports: getAirportOptions(flights, "arrival"),
  };
}

function getAirlineOptions(flights: FlightOption[]): FilterOption[] {
  const options = new Map<string, FilterOption>();

  flights.forEach((flight) => {
    flight.card.airlines.forEach((airline) => {
      addOptionWithMinimumPrice(
        options,
        {
          value: airline.code,
          label: airline.title,
          iconUrl: getAirlineLogoUrl(airline.code),
        },
        flight,
      );
    });
  });

  return [...options.values()];
}

function getAircraftOptions(flights: FlightOption[]): FilterOption[] {
  const options = new Map<string, FilterOption>();

  flights.forEach((flight) => {
    flight.card.aircraftTypes.forEach((aircraftType) => {
      addOptionWithMinimumPrice(
        options,
        {
          value: aircraftType,
          label: aircraftType,
        },
        flight,
      );
    });
  });

  return [...options.values()];
}

function getCabinOptions(flights: FlightOption[]): FilterOption<CabinType>[] {
  const options = new Map<CabinType, FilterOption<CabinType>>();

  flights.forEach((flight) => {
    flight.card.cabinTypes.forEach((cabinType) => {
      addOptionWithMinimumPrice(
        options,
        {
          value: cabinType,
          label: CABIN_LABELS[cabinType] ?? cabinType,
        },
        flight,
      );
    });
  });

  return [...options.values()];
}

function getAirportOptions(
  flights: FlightOption[],
  field: DateTimeField,
): FilterOption[] {
  const options = new Map<string, FilterOption>();

  flights.forEach((flight) => {
    const point = flight.card[field];

    if (!options.has(point.airportCode)) {
      options.set(point.airportCode, {
        value: point.airportCode,
        label: point.airportPersianTitle,
      });
    }
  });

  return [...options.values()];
}

function getStopOptions(flights: FlightOption[]): StopFilterOption[] {
  const options = new Map<StopCategory, StopFilterOption>();

  flights.forEach((flight) => {
    const option = getStopOptionForCount(flight.card.stops);

    addOptionWithMinimumPrice(options, option, flight);
  });

  return [...options.values()];
}

function getStopOptionForCount(stops: number): StopFilterOption {
  if (stops === 0) {
    return STOP_OPTIONS.none;
  }

  if (stops === 1) {
    return STOP_OPTIONS.once;
  }

  return STOP_OPTIONS.moreThanOne;
}

function getTimeRangeOptions(
  flights: FlightOption[],
  field: DateTimeField,
): FilterOption<TimeRangeKey>[] {
  return TIME_RANGE_DEFINITIONS.map((range) => {
    const matchingFlights = flights.filter((flight) =>
      isInTimeRange(flight.card[field].dateTime, range),
    );

    const cheapestFlight = getCheapestFlight(matchingFlights);

    return {
      value: range.key,
      label: range.label,
      ...(cheapestFlight ? getPriceFields(cheapestFlight) : {}),
    };
  });
}

function addOptionWithMinimumPrice<T extends string>(
  options: Map<T, FilterOption<T>>,
  option: Omit<FilterOption<T>, "minimumPrice" | "currencyTitle">,
  flight: FlightOption,
): void {
  const currentOption = options.get(option.value);
  const priceFields = getPriceFields(flight);
  const currentPrice = priceFields.minimumPrice;

  if (!currentOption) {
    options.set(option.value, {
      ...option,
      ...priceFields,
    });
    return;
  }

  if (
    currentPrice !== undefined &&
    (currentOption.minimumPrice === undefined ||
      currentPrice < currentOption.minimumPrice)
  ) {
    options.set(option.value, {
      ...currentOption,
      ...getPriceFields(flight),
    });
  }
}

function getCheapestFlight(flights: FlightOption[]): FlightOption | undefined {
  return flights.reduce<FlightOption | undefined>((cheapest, flight) => {
    const flightPrice = flight.card.pricing.totalPrice;

    if (!hasDisplayablePrice(flightPrice)) return cheapest;
    if (!cheapest) return flight;

    const cheapestPrice = cheapest.card.pricing.totalPrice;

    return hasDisplayablePrice(cheapestPrice) && flightPrice < cheapestPrice
      ? flight
      : cheapest;
  }, undefined);
}

function getPriceFields(
  flight: FlightOption,
): Pick<FilterOption, "minimumPrice" | "currencyTitle"> {
  const price = flight.card.pricing.totalPrice;

  if (!hasDisplayablePrice(price)) return {};

  return {
    minimumPrice: price,
    currencyTitle: flight.card.pricing.currencyTitle,
  };
}

function getAirlineLogoUrl(airlineCode: string): string {
  return AIRLINE_LOGO_URL_TEMPLATE(airlineCode);
}

function isInTimeRange(dateTime: string, range: TimeRangeDefinition): boolean {
  const minuteOfDay = getMinuteOfDay(dateTime);
  const startMinute = timeToMinute(range.start);
  const endMinute = timeToMinute(range.end);

  if (startMinute <= endMinute) {
    return minuteOfDay >= startMinute && minuteOfDay <= endMinute;
  }

  return minuteOfDay >= startMinute || minuteOfDay <= endMinute;
}

function getMinuteOfDay(dateTime: string): number {
  const match = dateTime.match(/T(\d{2}):(\d{2})/);

  if (!match) return 0;

  return Number(match[1]) * 60 + Number(match[2]);
}

function timeToMinute(time: string): number {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function hasDisplayablePrice(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}
