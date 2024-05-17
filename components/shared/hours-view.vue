<template>
  <div class="hours-view__content">
    <div class="hours-view__diff">
      <div class="hours-view__diff--before">
        <div
          v-if="showTotal"
          class="hours-view__total-hour hours-view__total-hour--before"
        >
          <span class="heading__quinary">Antes</span>
          <i class="pi pi-arrow-down" />
          <span class="body__primary">
            {{ requests.before.total }}
          </span>
        </div>

        <div class="hours-view__times-container">
          <div class="hours-view__time-count">
            <p
              v-for="(checkIn, index) in requests.before.checkins"
              :key="index"
            >
              <span class="caption__primary">Check-in</span>
              <span class="body__primary time-count">
                {{ checkIn.time }}
              </span>
            </p>
          </div>
          <div class="hours-view__time-count">
            <p
              v-for="(checkOut, index) in requests.before.checkouts"
              :key="index"
            >
              <span class="caption__primary">Check-out</span>
              <span class="body__primary time-count">
                {{ checkOut.time }}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div class="hours-view__diff--after">
        <div
          v-if="showTotal"
          class="hours-view__total-hour hours-view__total-hour--after"
        >
          <span class="heading__quinary">Depois</span>
          <i class="pi pi-arrow-up" />
          <span class="body__primary">
            {{ requests.after.total }}
          </span>
        </div>

        <div class="hours-view__times-container">
          <div class="hours-view__time-count">
            <p v-for="(checkIn, index) in requests.after.checkins" :key="index">
              <span class="caption__primary">Check-in</span>
              <span
                :class="[
                  'body__primary',
                  'time-count',
                  checkIn.manipulated && 'manipulated',
                ]"
              >
                {{ checkIn.time }}
              </span>
            </p>
          </div>

          <div class="hours-view__time-count">
            <p
              v-for="(checkOut, index) in requests.after.checkouts"
              :key="index"
            >
              <span class="caption__primary">Check-out</span>
              <span
                :class="[
                  'body__primary',
                  'time-count',
                  checkOut.manipulated && 'manipulated',
                ]"
              >
                {{ checkOut.time }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import { Request } from "~/interfaces/time-sheet/time-sheet.interface";

export default {
  props: {
    requests: { type: Object as PropType<Request>, required: true },
    showTotal: { type: Boolean, default: false, required: true },
  },
};
</script>

<style lang="scss" scoped>
.hours-view {
  &__tab {
    margin-bottom: 0.5rem;
  }

  &__header-action {
    padding: 0.8rem 1.6rem;
    border: $border-light;
    border-radius: 0.8rem;
    display: flex;
    gap: 1rem;

    position: relative;
  }

  &__button-group {
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 1rem;

    &--time {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      color: map-get($color-scheme-light, "$color-feedback-danger-0");

      .positive {
        color: map-get($color-scheme-light, "$color-feedback-success-0");
      }
    }
  }

  &__content {
    padding: 2.4rem 1.7rem 1.7rem 1.7rem;
    border-bottom-left-radius: 0.8rem;
    border-bottom-right-radius: 0.8rem;
    margin-top: -1rem;
    border: $border-light;
    border-top-style: none;
    color: map-get($color-scheme-light, "$color-neutral-neutral-2");

    & > p {
      margin: 0 0 1rem 8rem;
    }
  }

  &__diff {
    display: flex;
    justify-content: center;

    &--before {
      width: 20rem;
      padding-right: 2rem;
      border-right: 1px solid
        map-get($color-scheme-light, "$color-neutral-neutral-4");
    }

    &--after {
      width: 20rem;
      padding-left: 2rem;
    }
  }

  &__total-hour {
    margin-bottom: 2rem;
    padding: 0.4rem 1.2rem;
    border-radius: 10rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: map-get($color-scheme-light, "$color-neutral-neutral-2");

    .pi {
      font-size: 1.4rem;
    }

    &--before {
      background-color: map-get(
        $color-scheme-light,
        "$color-feedback-danger-1"
      );

      .pi + span {
        color: map-get($color-scheme-light, "$color-feedback-danger-0");
      }
    }

    &--after {
      background-color: map-get(
        $color-scheme-light,
        "$color-feedback-success-1"
      );

      .pi + span {
        color: map-get($color-scheme-light, "$color-feedback-success-0");
      }
    }
  }

  &__times-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  &__time-count {
    p {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .time-count {
        color: map-get($color-scheme-light, "$color-neutral-neutral-0");
      }

      .manipulated {
        color: map-get($color-scheme-light, "$color-feedback-warning-0");
      }

      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }
}

.dark-mode .hours-view {
  &__tab {
    margin-bottom: 0.5rem;
  }

  &__header-action {
    border: $border-dark;
  }

  &__button-group {
    &--time {
      color: map-get($color-scheme-dark, "$color-feedback-danger-0");

      .positive {
        color: map-get($color-scheme-dark, "$color-feedback-success-0");
      }
    }
  }

  &__content {
    border: $border-dark;
    border-top-style: none;
    color: map-get($color-scheme-dark, "$color-neutral-neutral-2");
  }

  &__diff {
    &--before {
      border-right: 1px solid
        map-get($color-scheme-dark, "$color-neutral-neutral-4");
    }
  }

  &__total-hour {
    color: map-get($color-scheme-dark, "$color-neutral-neutral-2");

    &--before {
      background-color: map-get($color-scheme-dark, "$color-feedback-danger-1");

      .pi + span {
        color: map-get($color-scheme-dark, "$color-feedback-danger-0");
      }
    }

    &--after {
      background-color: map-get(
        $color-scheme-dark,
        "$color-feedback-success-1"
      );

      .pi + span {
        color: map-get($color-scheme-dark, "$color-feedback-success-0");
      }
    }
  }

  &__time-count {
    p {
      .time-count {
        color: map-get($color-scheme-dark, "$color-neutral-neutral-0");
      }

      .manipulated {
        color: map-get($color-scheme-dark, "$color-feedback-warning-0");
      }
    }
  }
}
</style>
