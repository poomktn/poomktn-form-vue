<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup>
import { provide } from "vue";
import { useForm } from './useForm';

const {
  register,
  unregister,
  validate,
  resetValidate,
  reset,
} = useForm();

provide("form", { register, unregister });
defineExpose({ validate, resetValidate, reset })
</script>
