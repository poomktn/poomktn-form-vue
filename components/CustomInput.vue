<template>
  <div class="input-wrapper">
    <label>{{ label }}</label>
    <input
      :value="modelValue"
      @input="(e) => onInput(e.target.value)"
      :class="{ error: errorTexts.length }"
    />
    <div v-if="showError" class="error-messages">
      <p>{{ errorTexts[0] }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount } from "vue";
import { useInput } from "./useInput";

const props = defineProps({
  modelValue: [String, Number], // Input value (v-model)
  rules: {
    type: Array,
    default: () => [], // Validation rules
  },
  label: String,
  showError: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(["update:modelValue"]);

const form = inject("form", null); // Access form context

const { errorTexts, inputValidate, resetInputValidate, resetInput, onInput } = useInput(props, emit);

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
