<template>
  <BaseCard class="shifts">
    <div class="shifts__container--header">
      <h2 class="heading__secondary">Turnos da empresa</h2>

      <div class="shifts__container shifts__container--btn-group">
        <BaseButton
          v-if="!isEditing"
          class="btn__primary"
          icon="pi pi-pencil"
          label="Editar"
          @click="isEditing = true"
        />

        <BaseButton
          v-if="isEditing"
          class="btn__danger--outlined"
          icon="pi pi-times"
          label="Cancelar"
          @click="cancelEditing"
        />
        <BaseButton
          v-if="isEditing"
          type="submit"
          class="btn__secondary"
          icon="pi pi-save"
          label="Salvar alterações"
          @click.prevent="handleSubmit()"
        />
      </div>
    </div>

    <p class="body__primary">
      Para ajudar seus colaboradores com pontos, enviaremos notificações nos
      horários de início e fim de turno
    </p>
  </BaseCard>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loading: false,
      isEditing: false,
    };
  },
  methods: {
    cancelEditing() {
      this.isEditing = false;
    },
    handleSubmit() {
      console.log("submit");
    },
  },
};
</script>

<style scoped lang="scss">
.shifts {
  &__container {
    &--header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &--btn-group {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        width: max-content;
      }
    }
  }
}
</style>
