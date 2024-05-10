<template>
  <FileUpload
    name="imgs[]"
    url="/api/upload"
    accept="image/png"
    :multiple="true"
    :max-file-size="5000000"
    :pt="{
      root: 'upload',
    }"
    @upload="onTemplatedUpload($event)"
    @select="onSelectedFiles"
  >
    <template
      #header="{ chooseCallback, uploadCallback, clearCallback, files }"
    >
      <div class="upload__header">
        <BaseButton
          class="btn__primary"
          icon="pi pi-plus"
          :label="!isNarrowScreen ? 'Escolher arquivo' : ''"
          @click="chooseCallback()"
        />
        <BaseButton
          class="btn__primary"
          icon="pi pi-upload"
          :label="!isNarrowScreen ? 'Fazer upload' : ''"
          :disabled="!files || files.length === 0"
          @click="uploadCallback"
        />
        <BaseButton
          class="btn__primary"
          icon="pi pi-times"
          :label="!isNarrowScreen ? 'Cancelar' : ''"
          :disabled="!files || files.length === 0"
          @click="clearCallback()"
        />
      </div>
    </template>

    <template
      #content="{
        files,
        uploadedFiles,
        removeUploadedFileCallback,
        removeFileCallback,
      }"
    >
      <div
        v-if="files.length || uploadedFiles.length"
        class="upload__content upload__display"
      >
        <div v-if="files.length > 0" class="">
          <TransitionGroup>
            <div
              v-for="(file, index) of files"
              :key="file.name + file.type + file.size"
              class="upload__file"
            >
              <div class="upload__file--info">
                <figure class="upload__file--img">
                  <img :alt="file.name" :src="file.objectURL" />
                </figure>

                <div class="body__primary">
                  <p>{{ file.name }}</p>

                  <div class="upload__file--stats">
                    <span> {{ formatSize(file.size) }} </span>
                    <BaseBadge label="Pendente" type="warn" />
                  </div>
                </div>
              </div>

              <div>
                <BaseButton
                  icon="pi pi-times"
                  class="btn__danger--text"
                  @click="
                    onRemoveTemplatingFile(file, removeFileCallback, index)
                  "
                />
              </div>
            </div>
          </TransitionGroup>
        </div>

        <div v-if="uploadedFiles.length > 0">
          <TransitionGroup>
            <div
              v-for="(file, index) of uploadedFiles"
              :key="file.name + file.type + file.size"
              class="upload__file"
            >
              <div class="upload__file--info">
                <figure class="upload__file--img">
                  <img :alt="file.name" :src="file.objectURL" />
                </figure>

                <div class="body__primary">
                  <p>{{ file.name }}</p>

                  <div class="upload__file--stats">
                    <span> {{ formatSize(file.size) }} </span>
                    <BaseBadge label="Completo" type="success" />
                  </div>
                </div>
              </div>

              <div>
                <BaseButton
                  icon="pi pi-times"
                  class="btn__danger--text"
                  @click="removeUploadedFileCallback(index)"
                />
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>
    </template>

    <template #empty>
      <div class="upload__content">
        <p class="body__primary">
          Arraste os arquivos para essa área para fazer upload.
        </p>
      </div>
    </template>
  </FileUpload>
</template>

<script lang="ts">
import {
  FileUploadSelectEvent,
  FileUploadUploadEvent,
} from "primevue/fileupload";

export default {
  emits: ["on-upload"],
  setup() {
    const { matchScreenSize } = useWindow("modal");
    return { matchScreenSize };
  },
  data() {
    return {
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
      isNarrowScreen: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  unmounted() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    onRemoveTemplatingFile(
      file: File,
      removeFileCallback: Function,
      index: number,
    ) {
      removeFileCallback(index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
    },
    onClearTemplatingUpload(clear: Function) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
    },
    onSelectedFiles(event: FileUploadSelectEvent) {
      this.files = event.files;
      this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size));
      });
    },
    uploadEvent(callback: Function) {
      callback();
    },
    onTemplatedUpload(event: FileUploadUploadEvent) {
      this.$emit("on-upload", event);
      this.$toast.add({
        severity: "success",
        summary: "Successo",
        detail: "Operação realizada com sucesso",
        life: 4000,
      });
    },
    formatSize(bytes: number) {
      const k = 1024;
      const dm = 3;
      const sizes = this.$primevue.config.locale.fileSizeTypes;

      if (bytes === 0) {
        return `0 ${sizes[0]}`;
      }

      const i = Math.floor(Math.log(bytes) / Math.log(k));
      const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

      return `${formattedSize} ${sizes[i]}`;
    },
    handleResize() {
      if (this.matchScreenSize) {
        this.isNarrowScreen = true;
      } else {
        this.isNarrowScreen = false;
      }
    },
  },
};
</script>

<style lang="scss">
.upload {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid map-get($color-scheme-light, "$color-neutral-neutral-5");

  &__display {
    display: grid;
    flex-direction: column;
    gap: 8px;
  }

  &__header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background-color: map-get($color-scheme-light, "$color-neutral-neutral-6");
    border-bottom: 1px solid
      map-get($color-scheme-light, "$color-neutral-neutral-5");

    button {
      width: max-content;
    }
  }

  &__content {
    padding: 16px;
  }

  &__file {
    padding: 12px;
    border-radius: 8px;
    border: 1px solid map-get($color-scheme-light, "$color-neutral-neutral-5");

    display: flex;
    align-items: center;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    &--img {
      width: 130px;
      border-radius: 8px;
      overflow: hidden;

      img {
        max-width: 100%;
      }
    }

    &--info {
      display: flex;
      align-items: center;
      gap: 24px;

      @include respond(phone) {
        align-items: flex-start;
        flex-direction: column;
        gap: 12px;
      }
    }

    &--stats {
      display: flex;
      align-items: center;
      gap: 8px;

      @include respond(phone) {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  }
}

.dark-mode .upload {
  border: 1px solid map-get($color-scheme-dark, "$color-neutral-neutral-5");

  &__header {
    background-color: map-get($color-scheme-dark, "$color-neutral-neutral-6");
  }

  &__file {
    border: 1px solid map-get($color-scheme-light, "$color-neutral-neutral-5");
  }
}
</style>
