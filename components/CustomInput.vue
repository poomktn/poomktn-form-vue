<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      :id="id"
      :name="name"
      :value="modelValue"
      @input="(e) => onInput(e.target.value)"
      @change="onChange"
      :class="{ error: errorTexts.length }"
    />
    <div v-show="showError" class="error-messages">
      <p>{{ errorTexts[0] }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  id: String,
  name: String,
  modelValue: [String, Number], // Input value (v-model)
  rules: {
    type: Array,
    default: () => [], // Validation rules
  },
  label: String,
  showError: {
    type: Boolean,
    default: true
  },
  validateOnBlur: {
    type: Boolean,
    default: false
  },
  validateOnInput: {
    type: Boolean,
    default: true
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const form = inject("form", null); // Access form context

const { errorTexts, inputValidate, resetInputValidate, resetInput, onInput, actionOnBlur } = useValidate(props, emit);

const onChange = (e) => {
  emit('change', e)
  actionOnBlur()
}

onMounted(() => {
  form?.register({ inputValidate, resetInputValidate, resetInput });
});

onBeforeUnmount(() => {
  form?.unregister({ inputValidate, resetInputValidate, resetInput });
});
</script>

<style scoped>
.input-wrapper {
  margin-bottom: 1rem;
}
.error {
  border-color: red;
}
.error-messages {
  color: red;
  font-size: 0.8rem;
}
</style>
