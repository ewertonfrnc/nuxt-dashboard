<template>
  <Accordion>
    <AccordionTab
      v-for="(request, index) in requests"
      :key="index"
      :pt="{
        root: 'accordion__tab',
        headerAction: 'accordion__header-action',
      }"
    >
      <template #header>
        <div class="accordion__header">
          <h6 class="heading__senary">{{ request.date }}</h6>
        </div>

        <div class="accordion__button-group">
          <div class="accordion__button-group--time">
            <i
              :class="[
                'pi',
                request.negative ? 'pi-arrow-down' : 'pi-arrow-up positive',
                'caption__primary',
              ]"
            />
            <span
              :class="['caption__primary', !request.negative && 'positive']"
            >
              {{ request.before.total }}
            </span>
          </div>

          <BaseSplitButton
            :approve-all="approveAll"
            :request="request"
            :requests="approvedRequests"
            @button-handler="buttonHandler"
          />
        </div>
      </template>

      <template #default>
        <div class="accordion__content">
          <p class="body__secondary">Justificativa: {{ "Esquecimento" }}</p>

          <div class="accordion__diff">
            <div class="accordion__diff--before">
              <div class="accordion__total-hour accordion__total-hour--before">
                <span class="heading__quinary">Antes</span>
                <i class="pi pi-arrow-down" />
                <span class="body__primary">
                  {{ request.before.total }}
                </span>
              </div>

              <div class="accordion__times-container">
                <div class="accordion__time-count">
                  <p
                    v-for="(checkIn, index) in request.before.checkins"
                    :key="index"
                  >
                    <span class="caption__primary">Check-in</span>
                    <span class="body__primary time-count">
                      {{ checkIn.time }}
                    </span>
                  </p>
                </div>
                <div class="accordion__time-count">
                  <p
                    v-for="(checkOut, index) in request.before.checkouts"
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

            <div class="accordion__diff--after">
              <div class="accordion__total-hour accordion__total-hour--after">
                <span class="heading__quinary">Depois</span>
                <i class="pi pi-arrow-up" />
                <span class="body__primary">
                  {{ request.after.total }}
                </span>
              </div>

              <div class="accordion__times-container">
                <div class="accordion__time-count">
                  <p
                    v-for="(checkIn, index) in request.after.checkins"
                    :key="index"
                  >
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

                <div class="accordion__time-count">
                  <p
                    v-for="(checkOut, index) in request.after.checkouts"
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
    </AccordionTab>
  </Accordion>
</template>

<script lang="ts">
import { PropType } from "vue";
import { mapActions } from "pinia";
import { Request, User } from "~/interfaces/time-sheet/time-sheet.interface";

export default {
  props: {
    user: { type: Object as PropType<User>, required: true },
    approveAll: { type: Boolean, default: false, required: true },
  },
  emits: ["button-handler", "approved-all"],
  data() {
    return {
      requests: this.user.requests,
      updatedRequests: [] as Request[],
      rejectedRequests: new Set<Request>(),
      approvedRequests: new Set<Request>(),
    };
  },
  watch: {
    approveAll(newValue) {
      newValue && this.handleApproveAll();
    },
  },
  unmounted() {
    this.updatedRequests = [];
    this.removeApproval();
    this.$emit("approved-all", false);
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["updateRequestsApproval"]),
    buttonHandler(request: Request) {
      if (request.approved) {
        this.rejectedRequests.delete(request);
        this.approvedRequests.add(request);
      } else {
        this.approvedRequests.delete(request);
        this.rejectedRequests.add(request);
      }

      if (this.approvedRequests.size === this.user.requests.length) {
        this.$emit("approved-all", true);
      } else {
        this.$emit("approved-all", false);
      }

      this.updatedRequests = [
        ...this.approvedRequests,
        ...this.rejectedRequests,
      ];

      this.$emit("button-handler", this.updatedRequests);
    },
    handleApproveAll() {
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
      const newRequests = [];

      for (const request of this.requests) {
        delete request.approved;
        newRequests.push(request);
      }

      this.requests = newRequests;
    },
  },
};
</script>

<style lang="scss" scoped></style>
