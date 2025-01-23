import { ref } from "vue";
import type { allValueType, InputProps } from '~/types/formType';

export function useValidate(props: InputProps, emit: Function) {
  const errorTexts = ref<string[]>([]);
  const localValue = ref<allValueType>(props.modelValue);

  const inputValidate = () => {
    errorTexts.value = props.rules.map((rule) => rule(localValue.value)).filter((result) => result !== true);
    let errText = ''
    let valid = errorTexts.value.length === 0;
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

  const onInput = (newVal: allValueType) => {
    localValue.value = newVal
    emit("update:modelValue", newVal);
    inputValidate()
  }

  return {
    errorTexts,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput
  };
}
