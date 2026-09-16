<script setup lang="ts">
import { computed, useId } from "vue";
import { tv, type VariantProps } from "tailwind-variants";

const inputVariants = tv({
  variants: {
    size: {
      sm: "h-8 text-sm",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
    },
    state: {
      default: "border-border-default",
      error: "border-content-danger focus:border-content-danger focus:ring-content-danger/20",
    },
  },
  defaultVariants: {
    size: "md",
    state: "default",
  },
});

type InputVariants = VariantProps<typeof inputVariants>;

interface Props {
  modelValue?: string;
  id?: string;
  label?: string;
  hint?: string;
  error?: string;
  type?: string;
  size?: InputVariants["size"];
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  id: undefined,
  label: undefined,
  hint: undefined,
  error: undefined,
  type: "text",
  size: "md",
  class: "",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const generatedId = useId();
const inputId = computed(() => props.id ?? generatedId);
const descriptionId = computed(() => `${inputId.value}-description`);
const hasError = computed(() => Boolean(props.error));

function handleInput(event: Event): void {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}
</script>

<template>
  <div :class="props.class">
    <label
      v-if="label"
      :for="inputId"
      class="mb-2 block text-sm font-medium text-content-primary"
    >
      {{ label }}
    </label>

    <input
      v-bind="$attrs"
      :id="inputId"
      :value="modelValue"
      :type="type"
      :aria-invalid="hasError || undefined"
      :aria-describedby="hint || error ? descriptionId : undefined"
      :class="[
        'w-full rounded-control border bg-background-surface-default px-3 text-content-primary outline-none transition-colors placeholder:text-content-secondary focus:border-border-accent focus:ring-2 focus:ring-border-accent/20 disabled:cursor-not-allowed disabled:bg-background-surface-subtle disabled:text-content-secondary',
        inputVariants({ size, state: hasError ? 'error' : 'default' }),
      ]"
      @input="handleInput"
    />

    <p
      v-if="hint || error"
      :id="descriptionId"
      class="mt-1 text-xs"
      :class="hasError ? 'text-content-danger' : 'text-content-secondary'"
    >
      {{ error || hint }}
    </p>
  </div>
</template>
