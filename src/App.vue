<script setup lang="ts">
import { onMounted } from "vue";
import FlightCard from "@/components/search/FlightCard.vue";
import FlightEmptyState from "@/components/search/FlightEmptyState.vue";
import FlightErrorState from "@/components/search/FlightErrorState.vue";
import FlightFilterPanel from "@/components/search/FlightFilterPanel.vue";
import FlightLoadMore from "@/components/search/FlightLoadMore.vue";
import FlightLoadingState from "@/components/search/FlightLoadingState.vue";
import FlightToolbar from "@/components/search/FlightToolbar.vue";
import { useFlightSearch } from "@/composables/useFlightSearch";

const {
  state,
  filterOptions,
  visibleFlights,
  totalResultsCount,
  hasMore,
  loadFlights,
  loadMore,
  setFilter,
  setSort,
  clearFilters,
} = useFlightSearch();

onMounted(loadFlights);
</script>

<template>
  <main class="min-h-screen bg-background-primary-default p-4 sm:p-8">
    <FlightLoadingState
      v-if="state.status === 'idle' || state.status === 'loading'"
    />

    <FlightErrorState
      v-else-if="state.status === 'error'"
      :message="state.errorMessage"
      @retry="loadFlights"
    />

    <div
      v-else
      class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]"
    >
      <FlightFilterPanel
        :model-value="state.filters"
        :filter-options="filterOptions"
        @update-filter="setFilter"
        @clear="clearFilters"
      />

      <section class="min-w-0">
        <FlightToolbar
          v-if="totalResultsCount > 0"
          class="mb-4"
          :total-results="totalResultsCount"
          :sort="state.sort"
          @update:sort="setSort"
        />

        <template v-if="visibleFlights.length">
          <div class="space-y-3">
            <FlightCard
              v-for="flight in visibleFlights"
              :key="flight.id"
              :flight="flight.card"
            />
          </div>

          <FlightLoadMore v-if="hasMore" class="mt-6" @load-more="loadMore" />
        </template>

        <FlightEmptyState v-else @clear-filters="clearFilters" />
      </section>
    </div>
  </main>
</template>
