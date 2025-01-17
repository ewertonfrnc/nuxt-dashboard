<template>
  <div class="adjusts">
    <header class="adjusts__header">
      <p class="caption__primary">Solicitante:</p>
      <p>
        <span class="body__secondary">{{ employee.name }}</span>
        <span class="caption__primary">{{ employee.role }}</span>
      </p>

      <div class="adjusts__approval">
        <BaseCheckbox
          :checked="approveAll"
          input-id="approval"
          @checkbox-value="handleApproveAll"
        />
        <label class="body__primary" for="approval">Aprovar tudo</label>
      </div>
    </header>

    <section class="adjusts__group">
      <Accordion :pt="{ root: 'accordion' }">
        <AccordionTab
          v-for="(request, index) in requests"
          :key="index"
          :pt="{
            root: 'accordion__tab',
            headerAction: 'accordion__header-action',
          }"
        >
          <template #headericon="{ isTabActive }">
            <div class="accordion__tab--icon">
              <i
                :class="[
                  'pi',
                  isTabActive ? 'pi-chevron-down' : 'pi-chevron-right',
                ]"
              ></i>
            </div>
          </template>

          <template #header>
            <div class="accordion__header">
              <h6 class="heading__senary">{{ request.title }}</h6>
            </div>

            <div class="accordion__button-group">
              <div class="accordion__button-group--time">
                <i
                  :class="[
                    'caption__primary pi',
                    request.negative ? 'pi-arrow-down' : 'pi-arrow-up positive',
                  ]"
                />
                <span
                  :class="['caption__primary', !request.negative && 'positive']"
                >
                  {{ request.total }}
                </span>
              </div>
            </div>

            <BaseSplitButton
              :approve-all="approveAll"
              :request="request"
              :requests="approvedRequests"
              @button-handler="buttonHandler"
            />
          </template>

          <template #default>
            <div class="adjusts__container">
              <div class="adjusts__content">
                <div class="adjusts__motive">
                  <p class="body__secondary">
                    Justificativa: {{ request.motive }}
                  </p>
                </div>

                <div class="adjusts__diff">
                  <div>
                    <div class="adjusts__overview adjusts__overview--negative">
                      <span v-if="!matchScreenSize" class="heading__quinary"
                        >Antes</span
                      >
                      <i
                        v-if="!matchScreenSize"
                        :class="[
                          'caption__primary pi',
                          request.beforeTotal.negative
                            ? 'pi-arrow-down'
                            : 'pi-arrow-up',
                        ]"
                      />
                      <span class="body__primary">
                        {{ request.beforeTotal.total }}
                      </span>
                    </div>

                    <div
                      v-for="(hour, idx) in request.beforeHours"
                      :key="idx"
                      class="adjusts__display"
                    >
                      <div class="adjusts__item">
                        <span class="caption__primary adjusts__item--label">
                          Check-in
                        </span>
                        <span class="body__primary"> {{ hour.in }} </span>
                      </div>

                      <div class="adjusts__item">
                        <span class="caption__primary adjusts__item--label">
                          Check-out
                        </span>
                        <span class="body__primary"> {{ hour.out }} </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div class="adjusts__overview adjusts__overview--positive">
                      <span v-if="!matchScreenSize" class="heading__quinary"
                        >Depois</span
                      >
                      <i
                        v-if="!matchScreenSize"
                        :class="[
                          'caption__primary pi',
                          request.afterTotal.negative
                            ? 'pi-arrow-down'
                            : 'pi-arrow-up',
                        ]"
                      />
                      <span class="body__primary">
                        {{ request.afterTotal.total }}
                      </span>
                    </div>

                    <div
                      v-for="(hour, idx) in request.afterHours"
                      :key="idx"
                      class="adjusts__display"
                    >
                      <div v-if="hour.in" class="adjusts__item">
                        <span class="caption__primary adjusts__item--label">
                          Check-in
                        </span>
                        <span
                          :class="[
                            'body__primary',
                            hour.changedIn && 'adjusts__item--highlight',
                          ]"
                        >
                          {{ hour.in }}
                        </span>
                      </div>

                      <div v-if="hour.out" class="adjusts__item">
                        <span class="caption__primary adjusts__item--label">
                          Check-out
                        </span>
                        <span
                          :class="[
                            'body__primary',
                            hour.changedIn && 'adjusts__item--highlight',
                          ]"
                        >
                          {{ hour.out }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </AccordionTab>
      </Accordion>
    </section>
  </div>
</template>

<script lang="ts">
import { WorkLog } from "~/interfaces/employee/employee.interface";

export default {
  props: {
    employee: { type: Object, required: true },
    adjusts: { type: Array<WorkLog>, required: true },
    loading: { type: Boolean, default: false, required: true },
    approveAll: { type: Boolean, default: false, required: true },
    showErrorMessage: { type: Boolean, default: false, required: true },
    cancelHandler: { type: Function, required: true },
    confirmHandler: { type: Function, required: true },
  },
  emits: ["button-handler", "approved-all"],
  setup() {
    const { matchScreenSize } = useWindow("phone");
    return { matchScreenSize };
  },
  data() {
    return {
      selectedAll: this.approveAll,
      requests: this.adjusts,
      updatedRequests: [] as WorkLog[],
      rejectedRequests: new Set<WorkLog>(),
      approvedRequests: new Set<WorkLog>(),
    };
  },
  watch: {
    approveAll(newValue) {
      newValue ? this.handleApproveAll(newValue) : (this.selectedAll = false);
    },
  },
  unmounted() {
    this.updatedRequests = [];
    this.removeApproval();
    this.selectedAll = false;
    this.$emit("approved-all", this.selectedAll);
  },
  methods: {
    footerActionHandler(btnClicked: string) {
      if (btnClicked === "confirm") this.confirmHandler();
      else this.cancelHandler();
    },
    buttonHandler(request: WorkLog) {
      if (request.approved) {
        this.rejectedRequests.delete(request);
        this.approvedRequests.add(request);
      } else {
        this.approvedRequests.delete(request);
        this.rejectedRequests.add(request);
      }

      this.selectedAll = this.approvedRequests.size === this.adjusts.length;
      this.$emit("approved-all", this.selectedAll);

      this.updatedRequests = [
        ...this.approvedRequests,
        ...this.rejectedRequests,
      ];

      this.$emit("button-handler", this.updatedRequests);
    },
    handleApproveAll(value: boolean) {
      this.selectedAll = value;
      this.$emit("approved-all", this.selectedAll);

      this.rejectedRequests.clear();

      for (const request of this.requests) {
        if (this.approvedRequests.has(request)) return;
        request.approved = true;
        this.approvedRequests.add(request);
      }

      this.updatedRequests = [...this.approvedRequests];
      this.$emit("button-handler", this.updatedRequests);
    },
    removeApproval() {
      this.requests.forEach((item) => delete item.approved);
    },
  },
};
</script>

<style lang="scss">
.accordion {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__tab {
    &--icon {
      font-size: 10px;
    }
  }

  &__header-action {
    border: $border-light;
    border-radius: $border-radius;
    padding: 8px 16px;

    display: flex;
    gap: 7px;
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: auto;

    @include respond(phone) {
      max-width: 100px;

      h6 {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  &__button-group {
    &--time {
      display: flex;
      align-items: center;
      gap: 4px;

      color: map-get($color-scheme-light, "$color-feedback-danger-0");

      .positive {
        color: map-get($color-scheme-light, "$color-feedback-success-0");
      }
    }
  }
}

.dark-mode .accordion {
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
}

.adjusts {
  width: 600px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-right: 5px;
  position: relative;

  @include respond(modal) {
    width: 100%;
  }

  &__header {
    z-index: 999;
    position: sticky;
    top: 0;
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-7");
    padding: 10px 0;

    p span {
      display: block;

      &:first-child {
        color: map-get($color-scheme-light, "$color-neutral-neutral-2");
      }

      &:last-child {
        color: map-get($color-scheme-light, "$color-neutral-neutral-3");
      }
    }
  }

  &__approval {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;

    label {
      cursor: pointer;
    }
  }

  &__motive {
    padding: 4px 12px;
    border-radius: 18px;
    border: 1px solid map-get($color-scheme-light, "$color-neutral-neutral-5");
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-5");
    text-wrap: wrap;
  }

  &__container {
    margin-top: -17px;
    padding: 44px 17px 17px 17px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid map-get($color-scheme-light, "$color-neutral-neutral-4");
    border-top-style: none;
  }

  &__content {
    width: 420px;
    margin: 0 auto;
    display: grid;
    gap: 16px;

    @include respond(phone) {
      width: 100%;
    }
  }

  &__overview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding: 4px 12px;
    border-radius: 100px;

    span:first-child {
      margin-right: auto;
      color: map-get($color-scheme-light, "$color-neutral-neutral-2");
    }

    &--negative {
      background-color: map-get(
        $color-scheme-light,
        "$color-feedback-danger-1"
      );

      .pi,
      span:last-child {
        color: map-get($color-scheme-light, "$color-feedback-danger-0");
      }
    }

    &--positive {
      background-color: map-get(
        $color-scheme-light,
        "$color-feedback-success-1"
      );

      .pi,
      span:last-child {
        color: map-get($color-scheme-light, "$color-feedback-success-0");
      }
    }
  }

  &__diff {
    display: grid;
    grid-template-columns: 1fr 1fr;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 24px;

      @include respond(phone) {
        gap: 12px;
      }
    }

    & > div:first-child {
      padding: 10px 20px 10px 0;
      position: relative;
      border-right: 1px solid
        map-get($color-scheme-light, "$color-neutral-neutral-4");

      &::after {
        content: "";
        height: 100%;
      }

      @include respond(phone) {
        padding: 10px;
      }
    }

    & > div:nth-child(2) {
      padding: 10px 0 10px 20px;

      @include respond(phone) {
        padding: 10px;
      }
    }
  }

  &__display {
    width: 100%;
    display: flex;
    justify-content: space-between;

    @include respond(phone) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 3px;

    &--label {
      color: map-get($color-scheme-light, "$color-neutral-neutral-2");
    }

    &--highlight {
      color: map-get($color-scheme-light, "$color-feedback-warning-0");
    }

    &:first-child {
      padding-bottom: 8px;
    }

    span:nth-child(2) {
      padding: 10px 7px 10px 0;
    }
  }
}

.dark-mode .adjusts {
  &__header {
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-7");

    p span {
      &:first-child {
        color: map-get($color-scheme-dark, "$color-neutral-neutral-2");
      }
      &:last-child {
        color: map-get($color-scheme-dark, "$color-neutral-neutral-3");
      }
    }
  }

  &__motive {
    border: 1px solid map-get($color-scheme-dark, "$color-neutral-neutral-5");
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-5");
  }

  &__container {
    border: 1px solid map-get($color-scheme-dark, "$color-neutral-neutral-4");
    border-top-style: none;
  }

  &__overview {
    span:first-child {
      color: map-get($color-scheme-dark, "$color-neutral-neutral-2");
    }

    &--negative {
      background-color: map-get($color-scheme-dark, "$color-feedback-danger-1");

      .pi,
      span:last-child {
        color: map-get($color-scheme-dark, "$color-feedback-danger-0");
      }
    }

    &--positive {
      background-color: map-get(
        $color-scheme-dark,
        "$color-feedback-success-1"
      );

      .pi,
      span:last-child {
        color: map-get($color-scheme-dark, "$color-feedback-success-0");
      }
    }
  }

  &__diff {
    & > div:first-child {
      border-right: 1px solid
        map-get($color-scheme-dark, "$color-neutral-neutral-4");
    }
  }

  &__item {
    &--label {
      color: map-get($color-scheme-dark, "$color-neutral-neutral-2");
    }

    &--highlight {
      color: map-get($color-scheme-dark, "$color-feedback-warning-0");
    }
  }
}
</style>
