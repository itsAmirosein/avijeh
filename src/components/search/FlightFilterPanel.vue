<script setup lang="ts">
import type { DeepReadonly } from "vue";
import BaseAccordion from "@/components/ui/BaseAccordion.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import FlightFilterSection from "@/components/search/FlightFilterSection.vue";
import type { FlightFilterOptions, FlightFilters } from "@/domain/flight.types";

type CheckboxFilterKey = Exclude<keyof FlightFilters, "flightNumber">;

interface Props {
  modelValue: DeepReadonly<FlightFilters>;
  filterOptions: FlightFilterOptions;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: FlightFilters];
  clear: [];
}>();

function updateCheckboxFilter(
  key: CheckboxFilterKey,
  values: string[],
): void {
  emit("update:modelValue", {
    ...createMutableFilters(),
    [key]: values,
  });
}

function updateFlightNumber(flightNumber: string): void {
  emit("update:modelValue", {
    ...createMutableFilters(),
    flightNumber,
  });
}

/** Props readonly هستند؛ قبل از emit، مالکیت آرایه‌های state جدید را به parent می‌دهیم. */
function createMutableFilters(): FlightFilters {
  return {
    departureTimeRanges: [...props.modelValue.departureTimeRanges],
    airlineCodes: [...props.modelValue.airlineCodes],
    aircraftTypes: [...props.modelValue.aircraftTypes],
    cabinTypes: [...props.modelValue.cabinTypes],
    stopCategories: [...props.modelValue.stopCategories],
    departureAirportCodes: [...props.modelValue.departureAirportCodes],
    arrivalAirportCodes: [...props.modelValue.arrivalAirportCodes],
    flightNumber: props.modelValue.flightNumber,
  };
}
</script>

<template>
  <aside
    class="w-full overflow-hidden rounded-card border border-border-default bg-background-surface-default shadow-card"
    aria-label="فیلتر نتایج پرواز"
  >
    <header class="flex items-center justify-between border-b border-border-default px-4 py-4">
      <h2 class="text-base font-bold text-content-primary">فیلتر نتایج</h2>
      <BaseButton variant="ghost" size="sm" @click="emit('clear')">
        پاک کردن فیلترها
      </BaseButton>
    </header>

    <BaseAccordion title="زمان حرکت پرواز">
      <FlightFilterSection
        :options="filterOptions.departureTimeRanges"
        :model-value="modelValue.departureTimeRanges"
        @update:model-value="updateCheckboxFilter('departureTimeRanges', $event)"
      />
    </BaseAccordion>

    <BaseAccordion title="ایرلاین">
      <FlightFilterSection
        :options="filterOptions.airlines"
        :model-value="modelValue.airlineCodes"
        @update:model-value="updateCheckboxFilter('airlineCodes', $event)"
      />
    </BaseAccordion>

    <BaseAccordion title="تعداد توقف">
      <FlightFilterSection
        :options="filterOptions.stopCategories"
        :model-value="modelValue.stopCategories"
        @update:model-value="updateCheckboxFilter('stopCategories', $event)"
      />
    </BaseAccordion>

    <BaseAccordion title="فرودگاه مبدا">
      <FlightFilterSection
        :options="filterOptions.departureAirports"
        :model-value="modelValue.departureAirportCodes"
        @update:model-value="updateCheckboxFilter('departureAirportCodes', $event)"
      />
    </BaseAccordion>

    <BaseAccordion title="فرودگاه مقصد">
      <FlightFilterSection
        :options="filterOptions.arrivalAirports"
        :model-value="modelValue.arrivalAirportCodes"
        @update:model-value="updateCheckboxFilter('arrivalAirportCodes', $event)"
      />
    </BaseAccordion>

    <BaseAccordion title="نوع هواپیما">
      <FlightFilterSection
        :options="filterOptions.aircraftTypes"
        :model-value="modelValue.aircraftTypes"
        @update:model-value="updateCheckboxFilter('aircraftTypes', $event)"
      />
    </BaseAccordion>

    <BaseAccordion title="نوع کابین">
      <FlightFilterSection
        :options="filterOptions.cabinTypes"
        :model-value="modelValue.cabinTypes"
        @update:model-value="updateCheckboxFilter('cabinTypes', $event)"
      />
    </BaseAccordion>

    <div class="p-4">
      <BaseInput
        :model-value="modelValue.flightNumber"
        placeholder="جستجوی شماره پرواز"
        aria-label="جستجوی شماره پرواز"
        @update:model-value="updateFlightNumber"
      />
    </div>
  </aside>
</template>
