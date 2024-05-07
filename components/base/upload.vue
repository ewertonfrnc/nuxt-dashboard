<template>
  <FileUpload
    name="imgs[]"
    url="/api/upload"
    accept="image/png"
    :multiple="true"
    :max-file-size="1000000"
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
          label="Escolher arquivo"
          @click="chooseCallback()"
        />
        <BaseButton
          class="btn__primary"
          icon="pi pi-upload"
          label="Fazer upload"
          :disabled="!files || files.length === 0"
          @click="uploadEvent(uploadCallback)"
        />
        <BaseButton
          class="btn__primary"
          icon="pi pi-times"
          label="Cancelar"
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
      <div v-if="files.length" class="upload__content">
        <div v-if="files.length > 0">
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
          <h5>Completed</h5>
          <div class="">
            <div
              v-for="(file, index) of uploadedFiles"
              :key="file.name + file.type + file.size"
              class=""
            >
              <div>
                <img
                  role="presentation"
                  :alt="file.name"
                  :src="file.objectURL"
                  width="100"
                  height="50"
                />
              </div>

              <span class="font-semibold">{{ file.name }}</span>

              <div>{{ formatSize(file.size) }}</div>
              <Badge value="Completed" class="mt-3" severity="success" />
              <Button
                icon="pi pi-times"
                outlined
                rounded
                severity="danger"
                @click="removeUploadedFileCallback(index)"
              />
            </div>
          </div>
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
export default {
  data() {
    return {
      files: [],
      totalSize: 0,
      totalSizePercent: 0,
    };
  },
  methods: {
    onRemoveTemplatingFile(file, removeFileCallback, index) {
      removeFileCallback(index);
      this.totalSize -= parseInt(this.formatSize(file.size));
      this.totalSizePercent = this.totalSize / 10;
    },
    onClearTemplatingUpload(clear) {
      clear();
      this.totalSize = 0;
      this.totalSizePercent = 0;
    },
    onSelectedFiles(event) {
      this.files = event.files;
      this.files.forEach((file) => {
        this.totalSize += parseInt(this.formatSize(file.size));
      });
    },
    uploadEvent(callback) {
      this.totalSizePercent = this.totalSize / 10;
      callback();
    },
    onTemplatedUpload() {
      this.$toast.add({
        severity: "info",
        summary: "Success",
        detail: "File Uploaded",
        life: 3000,
      });
    },
    formatSize(bytes) {
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
  },
};
</script>

<style lang="scss">
.upload {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid map-get($color-scheme-light, "$color-neutral-neutral-5");

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
    }

    &--stats {
      display: flex;
      align-items: center;
      gap: 8px;
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
