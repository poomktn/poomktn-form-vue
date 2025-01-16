<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup>
import { provide, watch } from "vue";
const inputs = ref([]);
const isValid = ref(false);

const register = (input) => {
  inputs.value.push(input);
};

const unregister = (input) => {
  inputs.value = inputs.value.filter((i) => i !== input);
};

const validate = () => {
  let errorText = ''
  isValid.value = true
  inputs.value.forEach((input) => {
    let { valid, errText } = input.inputValidate()
    if(!valid) {
      isValid.value = false
      if(!errorText) errorText = errText
    }
  });
  return { isValid: isValid.value , errorText };
};

const resetValidate = () => {
  inputs.value.forEach((input) => input.resetInputValidate());
};

const reset = () => {
  inputs.value.forEach((input) => input.resetInput());
};

provide("form", { register, unregister });
defineExpose({ validate, resetValidate, reset })
</script>
