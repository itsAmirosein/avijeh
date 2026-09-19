<script setup lang="ts">
import { computed, onMounted } from "vue";
import FlightCard from "@/components/search/FlightCard.vue";
import { useFlightSearch } from "@/composables/use-flight-search";

const { visibleFlights, loadFlights } = useFlightSearch();
const flights = computed(() => visibleFlights.value);

onMounted(loadFlights);
</script>

<template>
  <main class="min-h-screen bg-background-primary-default p-4 sm:p-8">
    <div v-if="flights.length" class="mx-auto max-w-5xl flex flex-col gap-y-2">
      <FlightCard v-for="cart in flights" :flight="cart.card" />
    </div>
  </main>
</template>
