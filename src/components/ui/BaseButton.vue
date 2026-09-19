<script setup lang="ts">
import { computed } from "vue";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "cursor-pointer inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      primary:
        "bg-background-action-primary text-content-inverse hover:bg-background-action-primary/90",
      secondary:
        "border border-border-default bg-background-surface-default text-content-primary hover:bg-background-surface-subtle",
      ghost: "text-content-primary hover:bg-background-surface-subtle",
      danger:
        "bg-content-danger text-content-inverse hover:bg-content-danger/90",
    },
    size: {
      sm: "min-h-8 px-3 text-sm",
      md: "min-h-10 px-4 text-sm",
      lg: "min-h-12 px-5 text-base",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface Props {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  class?: string;
  text?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
  type: "button",
  disabled: false,
  loading: false,
  class: "",
});

const isDisabled = computed(() => props.disabled || props.loading);
</script>

<template>
  <button
    :type="type"
    :disabled="isDisabled"
    :class="[buttonVariants({ variant, size }), props.class]"
  >
    <span
      v-if="loading"
      class="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    />
    <slot>
      <p>
        {{ props.text }}
      </p>
    </slot>
  </button>
</template>
