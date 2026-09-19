<script setup lang="ts">
import BaseCheckbox from "@/components/ui/BaseCheckbox.vue";
import { formatPrice } from "@/domain/flight-formatters";
import type { FilterOption } from "@/domain/flight.types";

interface Props {
  title: string;
  options: readonly FilterOption[];
  modelValue: readonly string[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string[]];
}>();

function isSelected(value: string): boolean {
  return props.modelValue.includes(value);
}

function updateSelection(value: string, selected: boolean): void {
  if (selected) {
    emit("update:modelValue", [...props.modelValue, value]);
    return;
  }

  emit(
    "update:modelValue",
    props.modelValue.filter((selectedValue) => selectedValue !== value),
  );
}

function getMinimumPrice(option: FilterOption): string | null {
  return formatPrice(option.minimumPrice ?? null, option.currencyTitle ?? "");
}
</script>

<template>
  <section class="border-b border-border-default px-4 py-4 last:border-b-0">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-bold text-content-primary">{{ title }}</h3>
      <span class="text-xs text-content-primary" aria-hidden="true">⌃</span>
    </div>

    <ul class="mt-3 space-y-3">
      <li v-for="option in options" :key="option.value">
        <BaseCheckbox
          :model-value="isSelected(option.value)"
          :label="option.label"
          class="w-full"
          @update:model-value="updateSelection(option.value, $event)"
        >
          <template v-if="option.iconUrl" #label>
            <span class="flex items-center gap-2 leading-5">
              <img
                :src="option.iconUrl"
                :alt="''"
                class="size-4 object-contain"
              />
              <span>{{ option.label }}</span>
            </span>
          </template>

          <span
            v-if="getMinimumPrice(option)"
            class="mr-auto text-xs text-content-secondary"
          >
            {{ getMinimumPrice(option) }}
          </span>
        </BaseCheckbox>
      </li>
    </ul>
  </section>
</template>
