<script>
import { useForm } from "vee-validate";
import { storeToRefs } from "pinia";
import { loginSchema } from "~/utils/schemas";

export default {
  setup() {
    const router = useRouter();
    const { authenticated } = storeToRefs(useAuthStore());

    const { handleSubmit } = useForm({
      initialValues: { username: "atuny0", password: "9uQFF1Lh" },
      validationSchema: loginSchema,
    });
    const onSubmit = handleSubmit((formValues) => formValues);

    return { router, authenticated, onSubmit };
  },
  data() {
    return { isLoading: false, formData: {} };
  },
  methods: {
    async login() {
      this.isLoading = true;

      try {
        this.formData = await this.onSubmit();
        await this.$axios.post("/api/login", this.formData);

        if (this.authenticated) {
          this.router.push("/");
        }
      } catch (error) {
        console.error("err", error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <div class="card">
    <h2>Login</h2>

    <form>
      <BaseInputText name="username" placeholder="Insira seu usuário" />
      <BaseInputPassword name="password" placeholder="Insira sua senha" />

      <BaseButton
        type="submit"
        label="Login"
        :loading="isLoading"
        class="btn__secondary"
        @click.prevent="login"
      />
    </form>
  </div>
</template>
