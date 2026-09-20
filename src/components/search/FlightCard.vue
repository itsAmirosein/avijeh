<script setup lang="ts">
import { computed } from "vue";

import {
  formatBaggage,
  formatCabinTypes,
  formatDuration,
  formatPrice,
  formatRemainingSeats,
  formatStops,
  formatTime,
  getAirlineLogoUrl,
} from "@/domain/flightFormatters";
import type { FlightCardData } from "@/domain/flight.types";

import { BADGE_STYLE, CART_ACTIONS } from "./constants";

interface Props {
  flight: FlightCardData;
}

const props = defineProps<Props>();

const primaryAirline = computed(() => props.flight.airlines[0]);
const airlineLogoUrl = computed(() =>
  primaryAirline.value ? getAirlineLogoUrl(primaryAirline.value.code) : null,
);
const totalPrice = computed(() =>
  formatPrice(
    props.flight.pricing.totalPrice,
    props.flight.pricing.currencyTitle,
  ),
);
const listPrice = computed(() =>
  formatPrice(
    props.flight.pricing.listPrice,
    props.flight.pricing.currencyTitle,
  ),
);
const discountAmount = computed(() =>
  formatPrice(
    props.flight.pricing.discountAmount,
    props.flight.pricing.currencyTitle,
  ),
);
const commissionAmount = computed(() =>
  formatPrice(
    props.flight.pricing.commissionAmount,
    props.flight.pricing.currencyTitle,
  ),
);
const remainingSeats = computed(() =>
  formatRemainingSeats(props.flight.remainingSeats),
);
const baggage = computed(() => formatBaggage(props.flight.minimumBaggage));
const cabinTypes = computed(() => formatCabinTypes(props.flight.cabinTypes));
const hasBaggage = computed(() =>
  Boolean(props.flight.minimumBaggage.rawText.trim()),
);
const hasCabinType = computed(() => props.flight.cabinTypes.length > 0);
</script>

<template>
  <article
    class="overflow-hidden rounded-card border border-border-default bg-background-surface-default shadow-card"
  >
    <div class="flex flex-row max-sm:flex-col">
      <div class="relative px-4 py-3 sm:px-5 flex-5">
        <div
          class="flex min-h-6 flex-wrap items-center gap-1.5 pl-0 pr-28 text-xs"
        >
          <span
            v-if="flight.isFeatured"
            class="order-first rounded-lg bg-background-accent-subtle px-2.5 py-1 font-medium text-content-accent"
          >
            پیشنهاد بوکینگ
          </span>

          <span
            v-for="(aircraftType, index) in flight.aircraftTypes"
            :key="`${aircraftType}-${index}`"
            :class="BADGE_STYLE"
          >
            {{ aircraftType }}
          </span>

          <span v-if="hasBaggage" :class="BADGE_STYLE">
            {{ baggage }}
          </span>

          <span v-if="hasCabinType" :class="BADGE_STYLE">
            {{ cabinTypes }}
          </span>

          <span v-if="remainingSeats" class="mr-1 text-content-secondary">
            {{ remainingSeats }}
          </span>
        </div>

        <div class="flex gap-x-2">
          <div class="flex flex-1 items-center gap-2">
            <img
              v-if="airlineLogoUrl"
              :src="airlineLogoUrl"
              :alt="primaryAirline?.title ?? ''"
              class="size-12 rounded-control border border-border-default object-contain p-1"
            />

            <div class="text-right">
              <p
                class="max-w-20 truncate text-xs font-bold text-content-primary"
              >
                {{ primaryAirline?.title ?? "—" }}
              </p>
              <p class="mt-1 text-xs text-content-secondary" dir="ltr">
                {{ flight.flightNumbers[0] ?? "—" }}
              </p>
            </div>
          </div>

          <div
            class="mt-5 w-full flex-5 grid min-h-19 grid-cols-[8rem_minmax(7rem,1fr)_8rem] items-center gap-2"
          >
            <section class="text-right">
              <p class="text-xl font-bold leading-none text-content-primary">
                {{ formatTime(flight.departure.dateTime) }}
              </p>
              <p class="mt-2 truncate text-xs leading-4 text-content-primary">
                {{ flight.departure.airportPersianTitle }}
              </p>
            </section>

            <section class="text-center">
              <p class="text-[0.6875rem] text-content-secondary">
                {{ formatStops(flight.stops) }}
              </p>
              <div
                class="mt-1 flex items-center gap-2 text-content-secondary"
                aria-hidden="true"
              >
                <span class="h-px flex-1 bg-border-default" />
                <span class="text-base leading-none">✈</span>
                <span class="h-px flex-1 bg-border-default" />
              </div>
              <p class="mt-1 text-[0.6875rem] text-content-secondary">
                {{ formatDuration(flight.totalDurationMinutes) }}
              </p>
            </section>

            <section class="text-left">
              <p class="text-xl font-bold leading-none text-content-primary">
                {{ formatTime(flight.arrival.dateTime) }}
              </p>
              <p class="mt-2 truncate text-xs leading-4 text-content-primary">
                {{ flight.arrival.airportPersianTitle }}
              </p>
            </section>
          </div>
        </div>

        <p
          v-if="flight.providerTitle"
          class="mt-3 truncate text-right text-xs text-content-secondary"
        >
          تأمین‌کننده: {{ flight.providerTitle }}
        </p>

        <div
          class="cursor-pointer mt-2 flex justify-start gap-7 text-xs text-content-accent"
        >
          <span v-for="value in CART_ACTIONS">{{ value.label }}</span>
        </div>
      </div>

      <aside
        class="border-t border-border-default px-4 py-3 lg:border-t-0 lg:border-r flex-1"
      >
        <div class="flex h-full flex-col justify-center text-center">
          <p
            v-if="listPrice"
            class="text-xs text-content-secondary line-through"
          >
            {{ listPrice }}
          </p>

          <p
            v-if="totalPrice"
            class="mt-2 text-xl font-bold text-content-primary"
          >
            {{ totalPrice }}
          </p>
          <p v-else class="mt-2 text-sm text-content-secondary">قیمت نامشخص</p>

          <p
            v-if="discountAmount"
            class="mt-3 rounded-md bg-background-danger-subtle px-2 py-0.5 text-xs text-content-danger"
          >
            تخفیف: {{ discountAmount }}
          </p>

          <p
            v-if="commissionAmount"
            class="mt-1 rounded-md bg-background-success-subtle px-2 py-0.5 text-xs text-content-success"
          >
            کمیسیون: {{ commissionAmount }}
          </p>

          <div
            class="mt-3 rounded-control bg-background-action-primary px-4 py-2.5 text-sm font-bold text-content-inverse"
          >
            انتخاب بلیط
          </div>

          <p class="mt-2 text-[0.625rem] text-content-secondary">
            مجموع ۳ مسافر
          </p>
        </div>
      </aside>
    </div>
  </article>
</template>
