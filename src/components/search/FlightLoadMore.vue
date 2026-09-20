<script setup lang="ts">
import BaseButton from "@/components/ui/BaseButton.vue";

const emit = defineEmits<{
  "load-more": [];
}>();
</script>

<template>
  <div class="flex justify-center">
    <BaseButton variant="secondary" size="md" @click="emit('load-more')">
      نمایش بیشتر
    </BaseButton>
  </div>
</template>
