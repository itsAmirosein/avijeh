<script setup lang="ts" generic="Value extends string">
import BaseCheckbox from "@/components/ui/BaseCheckbox.vue";
import { formatPrice } from "@/domain/flightFormatters";
import type { FilterOption } from "@/domain/flight.types";

interface Props {
  options: readonly FilterOption<Value>[];
  modelValue: readonly Value[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: Value[]];
}>();

function isSelected(value: Value): boolean {
  return props.modelValue.includes(value);
}

function updateSelection(value: Value, selected: boolean): void {
  if (selected) {
    emit("update:modelValue", [...props.modelValue, value]);
    return;
  }

  emit(
    "update:modelValue",
    props.modelValue.filter((selectedValue) => selectedValue !== value),
  );
}

function getMinimumPrice(option: FilterOption<Value>): string | null {
  return formatPrice(option.minimumPrice ?? null, option.currencyTitle ?? "");
}
</script>

<template>
  <ul class="space-y-3 px-4 pb-4">
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
</template>
