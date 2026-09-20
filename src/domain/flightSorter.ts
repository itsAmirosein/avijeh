import type {
  FlightOption,
  FlightOptionList,
  FlightSortKey,
} from "./flight.types";

export function sortFlights(
  flights: FlightOptionList,
  sortKey: FlightSortKey,
): FlightOptionList {
  if (sortKey === "default") {
    return flights;
  }

  return [...flights].sort(getComparator(sortKey));
}

function getComparator(sortKey: Exclude<FlightSortKey, "default">) {
  switch (sortKey) {
    case "cheapest":
      return compareByLowestPrice;
    case "mostExpensive":
      return compareByHighestPrice;
    case "fastest":
      return compareByShortestDuration;
    case "nearestDeparture":
      return compareByEarliestDeparture;
  }
}

function compareByLowestPrice(left: FlightOption, right: FlightOption): number {
  return compareNullableNumbers(
    left.card.pricing.totalPrice,
    right.card.pricing.totalPrice,
  );
}

function compareByHighestPrice(
  left: FlightOption,
  right: FlightOption,
): number {
  return compareNullableNumbers(
    left.card.pricing.totalPrice,
    right.card.pricing.totalPrice,
    -1,
  );
}

function compareByShortestDuration(
  left: FlightOption,
  right: FlightOption,
): number {
  return compareNullableNumbers(
    left.card.totalDurationMinutes,
    right.card.totalDurationMinutes,
  );
}

function compareByEarliestDeparture(
  left: FlightOption,
  right: FlightOption,
): number {
  return left.card.departure.dateTime.localeCompare(
    right.card.departure.dateTime,
  );
}

function compareNullableNumbers(
  left: number | null,
  right: number | null,
  direction: 1 | -1 = 1,
): number {
  if (left === null && right === null) return 0;
  if (left === null) return 1;
  if (right === null) return -1;

  return (left - right) * direction;
}
