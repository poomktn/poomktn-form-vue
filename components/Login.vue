<template>
  <CustomForm ref="form">
    <CustomInput v-model="info.name" @change="convertToNumber" label="Name" name="name"
      :rules="[v => !!v || 'Name is required', v => !isNaN(Number(v)) || 'Need number', v => v.length <= 10 || 'Max 10 characters']" />
    <CustomInput v-model="info.email" label="Email"
      :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalid email']" />
    <span>{{ errMsg }}</span>
    <CustomInput v-model="info.test" @change="convertToNumber" label="test" name="test" :validate-on-input="false"
      :rules="[v => !!v || 'test is required', v => !isNaN(Number(v)) || 'Need number', v => v.length <= 10 || 'Max 10 characters']" />
    <button type="button" @click="submitForm">Submit</button>
    <button type="button" @click="resetAllForm">Reset All</button>
    <button type="button" @click="resetErrorForm">Reset</button>
  </CustomForm>
  <CustomInput v-model="sep" @change="e => toNumber(e, sep.value)" label="sep" name="sep" validate-on-blur
      :rules="[v => !!v || 'sep is required', v => !isNaN(Number(v)) || 'Need number', v => v.length <= 10 || 'Max 10 characters']" />
</template>

<script setup>
import { ref } from 'vue';

const info = reactive({
  name: '',
  email: '',
  test: ''
});
const sep = ref('');
const errMsg = ref('');
const form = ref(null);

const toNumber = (e, temp) => {
  const { value } = e.target
  temp = Number(value) || value
}

const convertToNumber = (e) => {
  const { name, value } = e.target
  info[name] = Number(value) || value
}

const submitForm = () => {
  let { isValid, errorText } = form?.value.validate();
  if (isValid) {
    console.log(info)
    console.log('Form is valid!');
    errMsg.value = 'form is valid!'
  } else {
    console.log(info)
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
