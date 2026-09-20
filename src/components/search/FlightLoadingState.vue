<template>
  <article
    class="flex gap-x-2 mx-auto max-w-7xl space-y-3"
    aria-busy="true"
    aria-live="polite"
  >
    <section
      class="w-1/4 flex flex-col justify-around animate-pulse rounded-card border border-border-default bg-background-surface-default p-5 shadow-card"
    >
      <div
        v-for="index in 5"
        :key="index"
        class="animate-pulse rounded-card border border-none bg-background-surface-default shadow-card"
        aria-hidden="true"
      >
        <div class="h-28 rounded bg-background-surface-subtle" />
      </div>
    </section>

    <section class="flex flex-col gap-y-4 w-3/4">
      <div
        v-for="index in 5"
        :key="index"
        class="animate-pulse rounded-card border border-border-default bg-background-surface-default p-5 shadow-card"
        aria-hidden="true"
      >
        <div class="h-5 w-32 rounded bg-background-surface-subtle" />
        <div class="mt-6 grid grid-cols-3 gap-6">
          <div class="h-12 rounded bg-background-surface-subtle" />
          <div class="h-12 rounded bg-background-surface-subtle" />
          <div class="h-12 rounded bg-background-surface-subtle" />
        </div>
      </div>
    </section>
  </article>
</template>
