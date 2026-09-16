export interface ApiMoney {
  source: string;
  parsedValue: number;
}

export interface ApiPriceDetail {
  passengerType: PassengerTypeCode;
  discount: ApiMoney;
  totalPrice: ApiMoney;
  commission: ApiMoney;
  totalPriceIncludeCommission: ApiMoney;
  listPrice: ApiMoney;
  totalTax: ApiMoney;
}

export interface ApiBaggageAllowance {
  adult: string | null;
  child: string | null;
  infant: string | null;
  description: string | null;
}

export interface ApiFlightSegment {
  departureAirportLocationCode: string;
  departureAirportLocationTitle: string;
  departureAirportLocationPersianTitle: string;
  departureCityTitle: string;
  departureCityPersianTitle: string;
  departureDateTime: string;
  arrivalAirportLocationCode: string;
  arrivalAirportLocationTitle: string;
  arrivalAirportLocationPersianTitle: string;
  arrivalCityTitle: string;
  arrivalCityPersianTitle: string;
  arrivalDateTime: string;
  duration: number;
  durationTime: string;
  flightNumber: string;
  fareClass: string;
  cabinType: string;
  airplaneTitle: string;
  airlineCode: string;
  airlineTitle: string;
  baggages: string | null;
  baggageAllowance: ApiBaggageAllowance | null;
}

export interface ApiFlightLeg {
  departureAirportLocationCode: string;
  departureAirportLocationTitle: string;
  departureAirportLocationPersianTitle: string;
  departureCityTitle: string;
  departureCityPersianTitle: string;
  departureDateTime: string;
  arrivalAirportLocationCode: string;
  arrivalAirportLocationTitle: string;
  arrivalAirportLocationPersianTitle: string;
  arrivalCityTitle: string;
  arrivalCityPersianTitle: string;
  arrivalDateTime: string;
  elapsedTime: number;
  stops: number;
  remain: number | null;
  cabinType: string;
  flightsSegments: ApiFlightSegment[];
}

export interface ApiItinerary {
  id: string;
  discount: ApiMoney;
  discountPercent: ApiMoney;
  totalPrice: ApiMoney;
  totalPriceIncludeCommission: ApiMoney;
  commission: ApiMoney;
  totalTax: ApiMoney;
  listPrice: ApiMoney;
  currency: string;
  currencyTitle: string;
  isFeatured: boolean;
  providerTypeTitle: string | null;
  isFlightSaleable: boolean;
  flights: ApiFlightLeg[];
  priceDetails: ApiPriceDetail[];
}

export interface ApiFlightSearchResponse {
  httpStatusCode: number;
  statusCode: number;
  messages: string[];
  result: {
    itineraries: ApiItinerary[];
  };
}

//domain

export type PassengerTypeCode = 0 | 1 | 2;

export type TimeRangeKey =
  | "earlyMorning"
  | "morning"
  | "noon"
  | "evening"
  | "night";

export type CabinType =
  | "Economy"
  | "Business"
  | "First"
  | "Premium"
  | "PremiumEconomy"
  | "Comfort"
  | "EconomyPlus"
  | "BusinessPremium"
  | (string & {});

export interface Airline {
  code: string;
  title: string;
}

export interface FlightPoint {
  airportCode: string;
  airportTitle: string;
  airportPersianTitle: string;
  cityTitle: string;
  cityPersianTitle: string;
  dateTime: string;
}

export interface BaggageAllowance {
  rawText: string;
  kilograms: number | null;
}

export interface FlightCardPricing {
  listPrice: number | null;
  totalPrice: number | null;
  discountAmount: number | null;
  commissionAmount: number | null;
  totalPriceIncludeCommission: number | null;
  currency: string;
  currencyTitle: string;
}

export interface FlightCardData {
  isFeatured: boolean;
  airlines: Airline[];
  flightNumbers: string[];
  aircraftTypes: string[];
  cabinTypes: CabinType[];
  departure: FlightPoint;
  arrival: FlightPoint;
  totalDurationMinutes: number;
  stops: number;
  remainingSeats: number | null;
  providerTitle: string | null;
  minimumBaggage: BaggageAllowance;
  pricing: FlightCardPricing;
}

export interface FlightOption {
  id: string;
  card: FlightCardData;
}

export type FlightOptionList = FlightOption[];

// filters

export interface FilterOption<T extends string = string> {
  value: T;
  label: string;
  iconUrl?: string;
  minimumPrice?: number;
  currencyTitle?: string;
}

export type StopCategory = "nonstop" | "oneStop" | "twoOrMoreStops";

export interface StopFilterOption extends FilterOption<StopCategory> {
  stops: 0 | 1 | 2;
}

export interface FlightFilters {
  departureTimeRanges: TimeRangeKey[];
  airlineCodes: string[];
  aircraftTypes: string[];
  cabinTypes: CabinType[];
  stopCategories: StopCategory[];
  departureAirportCodes: string[];
  arrivalAirportCodes: string[];
  flightNumber: string;
}

export interface FlightFilterOptions {
  departureTimeRanges: FilterOption<TimeRangeKey>[];
  airlines: FilterOption[];
  aircraftTypes: FilterOption[];
  stopCategories: StopFilterOption[];
  departureAirports: FilterOption[];
  arrivalAirports: FilterOption[];
  cabinTypes: FilterOption<CabinType>[];
}

export interface ActiveFlightFilters {
  departureTimeRanges: ReadonlySet<string>;
  airlineCodes: ReadonlySet<string>;
  aircraftTypes: ReadonlySet<string>;
  cabinTypes: ReadonlySet<string>;
  stopCategories: ReadonlySet<StopCategory>;
  departureAirportCodes: ReadonlySet<string>;
  arrivalAirportCodes: ReadonlySet<string>;
  normalizedFlightNumber: string;
}


export type FlightSortKey =
  | "default"
  | "cheapest"
  | "mostExpensive"
  | "fastest"
  | "nearestDeparture";


  export interface FlightSortOption {
  value: FlightSortKey;
  label: string;
}

export interface LoadMoreState {
  visibleCount: number;
}

//state

export type FlightSearchStatus = "idle" | "loading" | "success" | "error";

export interface FlightSearchState {
  status: FlightSearchStatus;
  errorMessage: string | null;
  allFlights: FlightOptionList;
  filters: FlightFilters;
  sort: FlightSortKey;
  loadMore: LoadMoreState;
}

//constants

export interface TimeRangeDefinition {
  key: TimeRangeKey;
  label: string;
  start: string;
  end: string;
}

export type StopOptionKey = "none" | "once" | "moreThanOne";

export type StopOptions = Record<StopOptionKey, StopFilterOption>;
