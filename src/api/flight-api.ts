import type { ApiFlightSearchResponse } from '@/domain/flight.types'


const FLIGHT_SEARCH_DATA_URL = new URL(
  '../../data/response.json',
  import.meta.url,
).href

export async function fetchFlights(): Promise<ApiFlightSearchResponse> {
  const response = await fetch(FLIGHT_SEARCH_DATA_URL)

  if (!response.ok) {
    throw new Error(`Could not load flights (HTTP ${response.status}).`)
  }

  const data: unknown = await response.json()

  if (!isFlightSearchResponse(data)) {
    throw new Error('The flight response has an invalid structure.')
  }

  return data
}

function isFlightSearchResponse(
  value: unknown,
): value is ApiFlightSearchResponse {
  if (typeof value !== 'object' || value === null) return false

  const response = value as {
    result?: { itineraries?: unknown }
  }

  return Array.isArray(response.result?.itineraries)
}
