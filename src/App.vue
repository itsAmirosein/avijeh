<script setup lang="ts">
import { onMounted } from "vue";
import FlightCard from "@/components/search/FlightCard.vue";
import FlightFilterPanel from "@/components/search/FlightFilterPanel.vue";
import FlightToolbar from "@/components/search/FlightToolbar.vue";
import { useFlightSearch } from "@/composables/use-flight-search";

const {
  state,
  filterOptions,
  visibleFlights,
  totalResultsCount,
  loadFlights,
  setFilters,
  setSort,
  clearFilters,
} = useFlightSearch();

onMounted(loadFlights);
</script>

<template>
  <main class="min-h-screen bg-background-primary-default p-4 sm:p-8">
    <p v-if="state.status === 'loading'" class="text-content-secondary">
      در حال دریافت پروازها...
    </p>

    <p v-else-if="state.status === 'error'" class="text-content-danger">
      {{ state.errorMessage }}
    </p>

    <div v-else class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
      <section class="min-w-0">
        <FlightToolbar
          class="mb-4"
          :total-results="totalResultsCount"
          :sort="state.sort"
          @update:sort="setSort"
        />

        <div v-if="visibleFlights.length" class="space-y-3">
          <FlightCard
            v-for="flight in visibleFlights"
            :key="flight.id"
            :flight="flight.card"
          />
        </div>

        <p v-else class="rounded-card bg-background-surface-default p-6 text-content-secondary shadow-card">
          پروازی مطابق فیلترهای انتخاب‌شده پیدا نشد.
        </p>
      </section>

      <FlightFilterPanel
        :model-value="state.filters"
        :filter-options="filterOptions"
        @update:model-value="setFilters"
        @clear="clearFilters"
      />
    </div>
  </main>
</template>
