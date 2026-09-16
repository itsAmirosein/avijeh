import { computed, reactive, readonly } from "vue";
import { fetchFlights } from "@/api/flight-api";
import { ITEMS_PER_LOAD, INITIAL_FLIGHT_FILTERS } from "@/config/flight-config";
import { filterFlights } from "@/domain/flight-filters";
import { normalizeItineraries } from "@/domain/flight-normalizer";
import { getFlightFilterOptions } from "@/domain/flight-selectors";
import { sortFlights } from "@/domain/flight-sorter";
import type {
  FlightFilters,
  FlightSearchState,
  FlightSortKey,
} from "@/domain/flight.types";

export function useFlightSearch() {
  const state = reactive<FlightSearchState>({
    status: "idle",
    errorMessage: null,
    allFlights: [],
    filters: createInitialFilters(),
    sort: "default",
    loadMore: { visibleCount: ITEMS_PER_LOAD },
  });

  const filterOptions = computed(() =>
    getFlightFilterOptions(state.allFlights),
  );

  const filteredFlights = computed(() =>
    filterFlights(state.allFlights, state.filters),
  );

  const sortedFlights = computed(() =>
    sortFlights(filteredFlights.value, state.sort),
  );

  const visibleFlights = computed(() =>
    sortedFlights.value.slice(0, state.loadMore.visibleCount),
  );

  const totalResultsCount = computed(() => filteredFlights.value.length);

  const hasMore = computed(
    () => state.loadMore.visibleCount < sortedFlights.value.length,
  );

  async function loadFlights(): Promise<void> {
    if (state.status === "loading" || state.status === "success") return;

    state.status = "loading";
    state.errorMessage = null;

    try {
      const response = await fetchFlights();

      state.allFlights = normalizeItineraries(response.result.itineraries);
      state.status = "success";
    } catch (error) {
      state.status = "error";
      state.errorMessage = getErrorMessage(error);
    }
  }

  function setFilters(nextFilters: FlightFilters): void {
    // finding a better way than clone
    state.filters = cloneFilters(nextFilters);
    resetVisibleCount();
  }

  function setSort(sort: FlightSortKey): void {
    if (state.sort === sort) return;

    state.sort = sort;
    resetVisibleCount();
  }

  function clearFilters(): void {
    setFilters(createInitialFilters());
  }

  function loadMore(): void {
    if (!hasMore.value) return;

    state.loadMore.visibleCount += ITEMS_PER_LOAD;
  }

  function resetVisibleCount(): void {
    state.loadMore.visibleCount = ITEMS_PER_LOAD;
  }

  return {
    state: readonly(state),
    filterOptions,
    filteredFlights,
    sortedFlights,
    visibleFlights,
    totalResultsCount,
    hasMore,
    loadFlights,
    setFilters,
    setSort,
    clearFilters,
    loadMore,
  };
}

function createInitialFilters(): FlightFilters {
  return cloneFilters(INITIAL_FLIGHT_FILTERS);
}

// Find a better way to keep the state immutable.
function cloneFilters(filters: FlightFilters): FlightFilters {
  return {
    departureTimeRanges: [...filters.departureTimeRanges],
    airlineCodes: [...filters.airlineCodes],
    aircraftTypes: [...filters.aircraftTypes],
    cabinTypes: [...filters.cabinTypes],
    stopCategories: [...filters.stopCategories],
    departureAirportCodes: [...filters.departureAirportCodes],
    arrivalAirportCodes: [...filters.arrivalAirportCodes],
    flightNumber: filters.flightNumber,
  };
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Could not load flight results.";
}
