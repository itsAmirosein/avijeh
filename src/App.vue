<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "./components/ui/BaseButton.vue";
import BaseCheckbox from "./components/ui/BaseCheckbox.vue";
import BaseInput from "./components/ui/BaseInput.vue";

const check = ref(false);
</script>

<template>
  <div class="flex w-full justify-center h-screen items-center gap-2">
    <BaseInput />
    <BaseButton loading text="button" size="lg" />
    <BaseCheckbox v-model="check" />
  </div>
</template>

<style scoped></style>
