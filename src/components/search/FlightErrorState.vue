<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";

interface Props {
  message: string | null;
}

defineProps<Props>();

const emit = defineEmits<{
  retry: [];
}>();
</script>

<template>
  <section
    class="mx-auto flex max-w-xl flex-col items-center rounded-card border border-border-default bg-background-surface-default p-8 text-center shadow-card"
    role="alert"
  >
    <svg
      class="size-10 text-content-danger"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 9v4m0 4h.01M10.3 3.7 2.9 16.5A2 2 0 0 0 4.6 19.5h14.8a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
      />
    </svg>
    <h1 class="mt-4 text-lg font-bold text-content-primary">
      دریافت پروازها ناموفق بود
    </h1>
    <p class="mt-2 text-sm text-content-secondary">
      {{ message ?? "لطفاً دوباره تلاش کنید." }}
    </p>
    <BaseButton class="mt-6" @click="emit('retry')">
      تلاش دوباره
    </BaseButton>
  </section>
</template>
