<template>
  <CustomForm ref="form">
    <CustomInput
      v-model="name"
      label="Name"
      :rules="[v => !!v || 'Name is required', v => v.length <= 10 || 'Max 10 characters']" />
    <CustomInput
      v-model="email"
      label="Email"
      :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalid email']" />
      <span>{{errMsg}}</span>
    <button type="button" @click="submitForm">Submit</button>
    <button type="button" @click="resetAllForm">Reset All</button>
    <button type="button" @click="resetErrorForm">Reset</button>
  </CustomForm>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const email = ref('');
const errMsg = ref('');
const form = ref(false);

const submitForm = () => {
  let { isValid, errorText } = form?.value.validate();
  if (isValid) {
    console.log('Form is valid!');
    errMsg.value = 'form is valid!'
  } else {
    errMsg.value = errorText
    console.log('Form is invalid!', errorText);
  }
};

const resetAllForm = () => {
  form?.value.reset();
  errMsg.value = ''
};

const resetErrorForm = () => {
  form?.value.resetValidate();
  errMsg.value = ''
};
</script>

<style lang="scss" scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  .form-group {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
    }

    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #45a049;
    }
  }
}
</style>
