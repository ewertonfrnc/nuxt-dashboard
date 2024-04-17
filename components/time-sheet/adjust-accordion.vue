<template>
  <Accordion>
    <AccordionTab
      v-for="(request, index) in user.requests"
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
            :requests="updatedRequests"
            :request="request"
            :approve-all="approveAll"
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
      updatedRequests: [] as Request[],
      rejectedRequests: new Set<Request>(),
      approvedRequests: new Set<Request>(),
    };
  },
  unmounted() {
    this.updatedRequests = [];
  },
  methods: {
    ...mapActions(useTimeSheetStore, ["updateRequestsApproval"]),
    buttonHandler(request: Request) {
      if (request.approved) {
        this.approvedRequests.add(request);
      } else {
        this.rejectedRequests.add(request);
      }

      if (this.approvedRequests.size === this.user.requests.length) {
        this.$emit("approved-all");
      }

      this.updatedRequests = [
        ...this.approvedRequests,
        ...this.rejectedRequests,
      ];

      console.log("updatedRequests", ...this.updatedRequests);

      this.$emit("button-handler", this.updatedRequests);
    },
  },
};
</script>

<style scoped lang="scss"></style>
