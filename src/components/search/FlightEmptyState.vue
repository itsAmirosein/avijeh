<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";

const emit = defineEmits<{
  "clear-filters": [];
}>();
</script>

<template>
  <section
    class="rounded-card border border-border-default bg-background-surface-default p-8 text-center shadow-card"
    aria-live="polite"
  >
    <svg
      class="mx-auto size-10 text-content-secondary"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.5"
      />
    </svg>

    <h1 class="mt-4 text-lg font-bold text-content-primary">پروازی پیدا نشد</h1>
    <p class="mt-2 text-sm text-content-secondary">
      با فیلترها یا شماره پرواز انتخاب‌شده، نتیجه‌ای وجود ندارد.
    </p>
    <BaseButton variant="secondary" class="mt-6" @click="emit('clear-filters')">
      پاک کردن فیلترها
    </BaseButton>
  </section>
</template>
