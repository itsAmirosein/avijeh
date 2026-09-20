<script setup lang="ts">
import { tv } from "tailwind-variants";
import { FLIGHT_SORT_OPTIONS } from "@/config/flight-config";
import type { FlightSortKey } from "@/domain/flight.types";

const sortTabVariants = tv({
  base: "relative shrink-0 cursor-pointer px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-inset",
  variants: {
    active: {
      true: "font-medium text-content-accent after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-content-accent",
      false: "text-content-primary hover:bg-background-surface-subtle",
    },
  },
});

interface Props {
  modelValue: FlightSortKey;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: FlightSortKey];
}>();
</script>

<template>
  <div
    class="flex min-w-max items-stretch"
    role="group"
    aria-label="مرتب‌سازی نتایج پرواز"
  >
    <button
      v-for="option in FLIGHT_SORT_OPTIONS"
      :key="option.value"
      type="button"
      :class="sortTabVariants({ active: modelValue === option.value })"
      :aria-pressed="modelValue === option.value"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
