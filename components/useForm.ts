import { ref } from "vue";
import type { InputValidateProps } from '~/types/formType';

export function useForm() {
  const inputs = ref<InputValidateProps[]>([]);

  const register = (input: InputValidateProps) => {
    inputs.value.push(input);
  };

  const unregister = (input: InputValidateProps) => {
    inputs.value = inputs.value.filter((i) => i !== input);
  };

  const validate = () => {
    let errorText = ''
    let isValid = true
    inputs.value.forEach((input) => {
      let { valid, errText } = input.inputValidate()
      if (!valid) {
        isValid = false
        if (!errorText) errorText = errText
      }
    });
    return { isValid, errorText };
  };

  const resetValidate = () => {
    inputs.value.forEach((input) => input.resetInputValidate());
  };

  const reset = () => {
    inputs.value.forEach((input) => input.resetInput());
  };

  return {
    register,
    unregister,
    validate,
    resetValidate,
    reset
  };
}
