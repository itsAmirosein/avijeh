<script setup lang="ts">
import FlightSortTabs from "@/components/search/FlightSortTabs.vue";
import type { FlightSortKey } from "@/domain/flight.types";

interface Props {
  totalResults: number;
  sort: FlightSortKey;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:sort": [value: FlightSortKey];
}>();
</script>

<template>
  <section aria-label="ابزارهای نتایج پرواز">
    <div
      class="overflow-x-auto rounded-card border border-border-default bg-background-surface-default shadow-card"
    >
      <div class="flex min-w-max items-center">
        <div
          class="flex shrink-0 items-center gap-2 px-4 text-sm text-content-secondary"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M4 7h16M7 12h10m-7 5h4"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.5"
            />
          </svg>
          <span>مرتب شده بر اساس:</span>
        </div>

        <FlightSortTabs
          :model-value="sort"
          @update:model-value="emit('update:sort', $event)"
        />
      </div>
    </div>

    <p class="mt-4 text-sm font-medium text-content-primary">
      {{ totalResults }} پرواز یافت شد
    </p>
  </section>
</template>
