<template>
  <UiModal>
    <div class="recover-code login fadein animation-duration-500">
      <div class="recover-code__header">
        <h1 class="heading__tertiary">Código de recuperação</h1>
        <p class="body__primary">
          Insira o código que enviamos para seu e-mail
          <span class="highlight"> {{ recoverEmail }} </span>.
        </p>
      </div>

      <div class="recover-code__body">
        <form class="form">
          <div class="form__control">
            <label class="caption__primary">
              Código de recuperação
              <BaseInputText
                name="code"
                placeholder="Insira o código de recuperação"
                :wrong-crendentials-message="wrongCodeMessage"
              />
            </label>
          </div>
        </form>
      </div>

      <div
        v-if="showInvalidCodeArea && !showTalkToSupportArea"
        class="recover-code__resend fadein animation-duration-500"
      >
        <p class="caption__secondary">
          <span>Reenviar código em</span>
          <span
            >00:{{
              resendDuration < 10 ? `0${resendDuration}` : resendDuration
            }}
            {{ resendDuration === 1 ? "segundo" : "segundos" }}</span
          >
        </p>

        <BaseButton
          :disabled="resendDuration !== 0"
          label="Reenviar código"
          class="btn__primary--text"
          @click.prevent="resendCode"
        />
      </div>

      <BaseButton
        v-if="showTalkToSupportArea"
        class="btn__primary--text fadein animation-duration-500"
        label="Falar com suporte"
      />

      <div class="recover-code__footer">
        <BaseButton
          label="Voltar"
          class="btn__primary--outlined"
          @click.prevent="goBack"
        />
        <BaseButton
          label="Confirmar"
          :loading="loading"
          class="btn__primary"
          @click.prevent="sendRecoverCode"
        />
      </div>
    </div>
  </UiModal>
</template>

<script lang="ts">
import { mapActions } from "pinia";
import { useForm } from "vee-validate";
import { RecoverCode } from "~/interfaces/auth/auth.interface";
import { recoverCode } from "~/utils/schemas";

export default {
  props: {
    recoverEmail: { type: String, default: "", required: true },
  },
  emits: ["changeStep"],
  setup() {
    const { handleSubmit, resetForm } = useForm({
      initialValues: { code: "" },
      validationSchema: recoverCode,
    });
    const onSubmit = handleSubmit((formValues) => formValues);

    return { onSubmit, resetForm };
  },
  data() {
    return {
      loading: false,
      formData: {} as RecoverCode | undefined,
      wrongCodeMessage: "",
      resendDuration: 0,
      recoverAttemps: 0,
      showInvalidCodeArea: false,
      showTalkToSupportArea: false,
    };
  },
  methods: {
    ...mapActions(useAuthStore, ["recoverPassword", "recoverCode"]),
    startTimer() {
      this.resendDuration = 5;
      const intervalId = setInterval(() => {
        this.resendDuration = this.resendDuration - 1;

        if (this.resendDuration === 0) {
          this.wrongCodeMessage = "";
          clearInterval(intervalId);
        }
      }, 1000);
    },
    goBack() {
      this.$emit("changeStep", "recover");
    },
    async resendCode() {
      this.startTimer();
      this.recoverAttemps++;

      if (this.recoverAttemps === 4) {
        this.showInvalidCodeArea = false;
        this.showTalkToSupportArea = true;

        return;
      }

      try {
        await this.recoverPassword({ username: "999.999.999-99" });

        this.$toast.add({
          severity: "success",
          summary: "E-mail enviado",
          detail: "Verifique seu e-mail para copiar o código de recuperação.",
          life: 4000,
        });
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });
      }
    },
    async sendRecoverCode() {
      try {
        this.formData = await this.onSubmit();
        if (!this.formData) return;

        this.loading = true;

        const status = await this.recoverCode(this.formData);

        if (status && status === "success")
          return this.$emit("changeStep", "change");

        if (status.response.status === 400) {
          this.showInvalidCodeArea = true;
          this.wrongCodeMessage = "código inválido";
        }
      } catch (error) {
        this.$toast.add({
          severity: "error",
          summary: "Algo deu errado",
          detail: "Tente novamente mais tarde.",
          life: 4000,
        });

        this.resetForm({
          values: { code: "" },
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.recover-code {
  display: grid;
  gap: 16px;

  &__header {
    display: grid;
    gap: 0.8rem;
  }

  &__resend {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: map-get($color-scheme-light, "$color-neutral-neutral-2");
      display: block;
    }

    button {
      width: max-content;
    }
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
}

.highlight {
  color: map-get($color-scheme-light, "$color-feedback-warning-4");
  font-weight: bold;
}
</style>
