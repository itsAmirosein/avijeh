import type {
  ApiFlightLeg,
  ApiFlightSegment,
  ApiItinerary,
  BaggageAllowance,
  FlightCardPricing,
  FlightOption,
  FlightOptionList,
  FlightPoint,
} from './flight.types'

export function normalizeItinerary(
  itinerary: ApiItinerary,
): FlightOption {
  const firstLeg = itinerary.flights[0]
  const lastLeg = itinerary.flights[itinerary.flights.length - 1]

  if (!firstLeg || !lastLeg) {
    throw new Error(`Itinerary "${itinerary.id}" does not contain any flight legs.`)
  }

  const segments = itinerary.flights.flatMap((leg) => leg.flightsSegments)

  return {
    id: itinerary.id,
    card: {
      isFeatured: itinerary.isFeatured,
      airlines: segments.map((segment) => ({
        code: segment.airlineCode,
        title: segment.airlineTitle,
      })),
      flightNumbers: segments.map((segment) => segment.flightNumber),
      aircraftTypes: segments.map((segment) => segment.airplaneTitle),
      cabinTypes: itinerary.flights.map((leg) => leg.cabinType),
      departure: getDeparturePoint(firstLeg),
      arrival: getArrivalPoint(lastLeg),
      totalDurationMinutes: getTotalDurationMinutes(itinerary.flights),
      stops: itinerary.flights.reduce(
        (totalStops, leg) => totalStops + leg.stops,
        0,
      ),
      remainingSeats: firstLeg.remain,
      providerTitle: itinerary.providerTypeTitle,
      minimumBaggage: getMinimumBaggage(segments),
      pricing: getPricing(itinerary),
    },
  }
}

export function normalizeItineraries(
  itineraries: ApiItinerary[],
): FlightOptionList {
  return itineraries.map(normalizeItinerary)
}

function getDeparturePoint(leg: ApiFlightLeg): FlightPoint {
  return {
    airportCode: leg.departureAirportLocationCode,
    airportTitle: leg.departureAirportLocationTitle,
    airportPersianTitle: leg.departureAirportLocationPersianTitle,
    cityTitle: leg.departureCityTitle,
    cityPersianTitle: leg.departureCityPersianTitle,
    dateTime: leg.departureDateTime,
  }
}

function getArrivalPoint(leg: ApiFlightLeg): FlightPoint {
  return {
    airportCode: leg.arrivalAirportLocationCode,
    airportTitle: leg.arrivalAirportLocationTitle,
    airportPersianTitle: leg.arrivalAirportLocationPersianTitle,
    cityTitle: leg.arrivalCityTitle,
    cityPersianTitle: leg.arrivalCityPersianTitle,
    dateTime: leg.arrivalDateTime,
  }
}

function getTotalDurationMinutes(legs: ApiFlightLeg[]): number {
  return legs.reduce(
    (totalDuration, leg) => totalDuration + leg.elapsedTime,
    0,
  )
}

function getMinimumBaggage(
  segments: ApiFlightSegment[],
): BaggageAllowance {
  const allowances = segments.map(getSegmentBaggage)
  const allowancesWithWeight = allowances.filter(
    (allowance) => allowance.kilograms !== null,
  )

  if (allowancesWithWeight.length > 0) {
    return allowancesWithWeight.reduce((minimum, current) =>
      current.kilograms! < minimum.kilograms! ? current : minimum,
    )
  }

  return allowances[0] ?? { rawText: '', kilograms: null }
}

function getSegmentBaggage(
  segment: ApiFlightSegment,
): BaggageAllowance {
  const rawText = getBaggageText(segment)

  return {
    rawText,
    kilograms: parseKilograms(rawText),
  }
}

function getBaggageText(segment: ApiFlightSegment): string {
  const directBaggage = segment.baggages.trim()

  if (directBaggage) return directBaggage

  return (
    segment.baggageAllowance?.adult ??
    segment.baggageAllowance?.description ??
    ''
  ).trim()
}

//TODO: get this from api
function parseKilograms(value: string): number | null {
  const normalizedDigits = value
    .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))

  const match = normalizedDigits.match(/\d+(?:[.,]\d+)?/)

  if (!match) return null

  const kilograms = Number(match[0].replace(',', '.'))

  return Number.isFinite(kilograms) ? kilograms : null
}

function getPricing(itinerary: ApiItinerary): FlightCardPricing {
  const totalPrice = itinerary.totalPrice.parsedValue
  const listPrice = itinerary.listPrice.parsedValue

  return {
    listPrice: listPrice > totalPrice ? listPrice : null,
    totalPrice,
    discountAmount: itinerary.discount.parsedValue,
    commissionAmount: itinerary.commission.parsedValue,
    totalPriceIncludeCommission:
      itinerary.totalPriceIncludeCommission.parsedValue,
    currency: itinerary.currency,
    currencyTitle: itinerary.currencyTitle,
  }
}
