<script setup lang="ts">
import { computed, useId } from "vue";
import { tv, type VariantProps } from "tailwind-variants";

const checkboxVariants = tv({
  base: "flex shrink-0 items-center justify-center rounded border border-border-strong bg-background-surface-default text-content-inverse transition-colors peer-checked:border-background-action-primary peer-checked:bg-background-action-primary peer-focus-visible:ring-2 peer-focus-visible:ring-border-accent peer-focus-visible:ring-offset-2 peer-disabled:bg-background-surface-subtle peer-disabled:opacity-50",
  variants: {
    size: {
      sm: "size-4 text-[0.625rem]",
      md: "size-5 text-xs",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

interface Props {
  modelValue: boolean;
  id?: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: CheckboxVariants["size"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: undefined,
  description: undefined,
  disabled: false,
  size: "md",
  class: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
}>();

const generatedId = useId();
const checkboxId = computed(() => props.id ?? generatedId);

function handleChange(event: Event): void {
  emit("update:modelValue", (event.target as HTMLInputElement).checked);
}
</script>

<template>
  <label
    :for="checkboxId"
    :class="[
      'flex cursor-pointer items-start gap-2 text-sm text-content-primary',
      { 'cursor-not-allowed text-content-secondary': disabled },
      props.class,
    ]"
  >
    <input
      v-bind="$attrs"
      :id="checkboxId"
      :checked="modelValue"
      :disabled="disabled"
      type="checkbox"
      class="peer sr-only"
      @change="handleChange"
    />

    <span :class="checkboxVariants({ size })" aria-hidden="true">
      <span
        :class="[
          'transition-opacity',
          modelValue ? 'opacity-100' : 'opacity-0',
        ]"
      >
        &#10003;
      </span>
    </span>

    <span v-if="label || description || $slots.label" class="min-w-0">
      <slot name="label">
        <span v-if="label" class="block leading-5">{{ label }}</span>
      </slot>
      <span
        v-if="description"
        class="mt-0.5 block text-xs text-content-secondary"
      >
        {{ description }}
      </span>
    </span>

    <slot />
  </label>
</template>
