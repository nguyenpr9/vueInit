<script>
import { authMethods } from '@state/helpers'
export default {
  page: {
    title: 'Login',
  },
  data() {
    return {
      loading: false,
      loginForm: {},
      failsAuth: 0,
    }
  },
  methods: {
    ...authMethods,
    getValidationState({ errors, valid }) {
      return errors[0] ? false : valid ? true : null
    },
    countDownChanged(dismissCountDown) {
      this.failsAuth = dismissCountDown
    },
    login(validate) {
      validate().then(async (success) => {
        if (!success) {
          const el = document.querySelector('.is-invalid')
          el.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
          el.focus()
          return
        }
        try {
          this.loading = true
          await this.logIn(this.loginForm)
          await this.setMe()
          await this.$router.push('/')
        } catch {
          this.failsAuth = 2
          this.loginForm.password = null
          requestAnimationFrame(() => {
            this.$refs.observerLogin.reset()
          })
        } finally {
          this.loading = false
        }
      })
    },
  },
}
</script>

<template>
  <div class="account-pages my-5 pt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card overflow-hidden">
            <div class="bg-soft-primary">
              <div class="row">
                <div class="col-7">
                  <div class="text-primary p-4">
                    <h5 class="text-primary">Welcome Back !</h5>
                    <p>Sign in to continue to Skote.</p>
                  </div>
                </div>
                <div class="col-5 align-self-end">
                  <img
                    src="@assets/images/profile-img.png"
                    alt
                    class="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <div>
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img
                      src="@assets/images/logo.svg"
                      alt
                      class="rounded-circle"
                      height="34"
                    />
                  </span>
                </div>
              </div>
              <div class="p-2">
                <b-alert
                  fade
                  :show="failsAuth"
                  variant="danger"
                  class="mt-3"
                  dismissible
                  @dismiss-count-down="countDownChanged"
                  >Tài khoản hoặc mật khẩu không đúng!</b-alert
                >

                <v-observer ref="observerLogin" v-slot="{ validate }">
                  <b-form @submit.stop.prevent="login(validate)">
                    <v-provider
                      v-slot="validationContext"
                      name="Tên đăng nhập"
                      rules="required"
                    >
                      <b-form-group
                        label="Tên đăng nhập"
                        label-class="font-weight-medium"
                      >
                        <b-form-input
                          v-model.trim="loginForm.username"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </v-provider>
                    <v-provider
                      v-slot="validationContext"
                      name="Mật khẩu"
                      rules="required"
                    >
                      <b-form-group
                        label="Mật khẩu"
                        label-class="font-weight-medium"
                      >
                        <b-form-input
                          v-model.trim="loginForm.password"
                          type="password"
                          :state="getValidationState(validationContext)"
                        ></b-form-input>
                        <b-form-invalid-feedback>{{
                          validationContext.errors[0]
                        }}</b-form-invalid-feedback>
                      </b-form-group>
                    </v-provider>
                    <b-button
                      type="submit"
                      variant="primary"
                      :disabled="loading"
                      block
                    >
                      <b-spinner v-if="loading" small></b-spinner>
                      Đăng nhập
                    </b-button>
                  </b-form>
                </v-observer>
              </div>
            </div>
          </div>
          <div class="mt-5 text-center">
            <p>
              © {{ new Date().getFullYear() }} Skote. Crafted with
              <i class="mdi mdi-heart text-danger"></i> by Themesbrand
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
