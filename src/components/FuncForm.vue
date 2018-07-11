<template>
  <!-- <div>
    <div>
      <label>
        <i>Use this form to test a function or the
          <a href="https://github.com/openfaas/faas-cli">faas-cli</a> for more options.</i>
      </label>
    </div>
    <label>Define the function below:</label>
    <form novalidate class="md-layout" @submit.prevent="submit">

      <div class="md-layout md-gutter">
        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('image')">
            <md-tooltip md-direction="bottom">Docker image name and tag to use for function i.e. functions/alpine:latest</md-tooltip>
            <label for="docker-image">Docker image:</label>
            <md-input name="docker-image" id="docker-image" v-model="form.image" :disabled="sending" required maxlength="200" />
            <span class="md-error" v-if="!$v.form.image.required">The Docker image is required</span>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('service')">
            <md-tooltip md-direction="bottom">Name of the function - must be a valid DNS entry</md-tooltip>
            <label for="service-name">Function name:</label>
            <md-input name="service-name" id="service-name" v-model="form.service" :disabled="sending" required maxlength="200" />
            <span class="md-error" v-if="!$v.form.service.required">The Function name is required</span>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('envProcess')">
            <md-tooltip md-direction="bottom">Process to run as your function i.e. 'env' or 'shasum'. Ignore if using OpenFaaS templates</md-tooltip>
            <label for="env-process">Function process (optional):</label>
            <md-input name="env-process" id="env-process" v-model="form.envProcess" :disabled="sending" maxlength="200" />
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field :class="getValidationClass('network')">
            <md-tooltip md-direction="bottom">Docker Swarm network, not required for other providers. Default: func_functions</md-tooltip>
            <label for="network">Network (Swarm):</label>
            <md-input name="network" id="network" v-model="form.network" :disabled="sending" maxlength="200" />
          </md-field>
        </div>
      </div>
    </form>
  </div> -->
  <v-form v-model="valid">
    <v-text-field v-model="form.image" :counter="10" label="Docker image:" required></v-text-field>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  props: ['model'],
  data() {
    return {
      form: {
        image: null,
        service: null,
        envProcess: null,
        network: null,
        envVars: null,
        labels: null,
      },
      sending: false,
    }
  },
  watch: {
    model(val, oldVal) {
      if (val !== oldVal) {
        this.form.image = val.image;
        this.form.service = val.name;
        this.form.envProcess = val.envProcess;
        this.form.network = val.network;
        this.form.envVars = val.envVars;
        this.form.labels = val.labels;
      }
    }
  },
  validations: {
    form: {
      image: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(200)
      },
      service: {
        required,
        minLength: minLength(2),
        maxLength: maxLength(200)
      },
      envProcess: {
        minLength: minLength(0),
        maxLength: maxLength(200)
      },
      network: {
        minLength: minLength(0),
        maxLength: maxLength(200)
      },
    }
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm() {
      this.$v.$reset()
      this.form.image = null;
      this.form.service = null;
      this.form.envProcess = null;
      this.form.network = null;
    },
    submit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const data = JSON.parse(JSON.stringify(this.form));
        this.$emit('submitted', data);
      }
    }
  }
}
</script>

<style scoped>
</style>
