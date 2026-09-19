<script setup lang="ts">
interface Props {
  title: string;
  defaultOpen?: boolean;
}

withDefaults(defineProps<Props>(), {
  defaultOpen: true,
});
</script>

<template>
  <details
    :open="defaultOpen"
    class="group border-b border-border-default last:border-b-0"
  >
    <summary
      class="flex cursor-pointer list-none items-center justify-between px-4 py-4 marker:content-none [&::-webkit-details-marker]:hidden"
    >
      <span
        class="text-sm font-bold text-content-primary"
        role="heading"
        aria-level="3"
      >
        {{ title }}
      </span>
      <svg
        class="size-4 text-content-primary transition-transform group-open:rotate-180"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="m5 12 5-5 5 5"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </svg>
    </summary>

    <slot />
  </details>
</template>
