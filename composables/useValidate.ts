import { ref } from "vue";
import type { emitType, InputProps, RenderValueType } from '~/types/formType';

export function useValidate({ rules = [], modelValue = '', validateOnBlur = false, validateOnInput = true }: InputProps, emit: emitType) {
  const errorTexts = ref<string[]>([]);
  const localValue = ref<RenderValueType>(modelValue);

  const inputValidate = () => {
    errorTexts.value = rules.map((rule) => rule(localValue.value as string)).filter((result) => result !== true) as string[];
    let errText = ''
    const valid = errorTexts.value.length === 0;
    if (!valid) {
      errText = errorTexts.value[0]
    }
    return { valid, errText }
  };

  const resetInputValidate = () => {
    errorTexts.value = [];
  };

  const resetInput = () => {
    localValue.value = ''
    emit("update:modelValue", '');
    resetInputValidate();
  };

  const onInput = (newVal: RenderValueType) => {
    localValue.value = newVal
    emit("update:modelValue", newVal);
    if (!validateOnBlur && validateOnInput) inputValidate();
  }

  const actionOnBlur = () => {
    if (validateOnBlur) inputValidate();
  };

  return {
    errorTexts,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput,
    actionOnBlur,
  };
}
