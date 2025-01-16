import { ref, watch } from "vue";

type allValueType = string | number | boolean

interface InputProps {
  modelValue: allValueType
  rules: Function[]
}

export function useInput(props: InputProps, emit: Function) {
  const errorTexts = ref<string[]>([]);

  const inputValidate = () => {
    errorTexts.value = props.rules.map((rule) => rule(props.modelValue)).filter((result) => result !== true);
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
    emit("update:modelValue", '');
    resetInputValidate();
  };

  const onInput = (newVal: allValueType) => {
    emit("update:modelValue", newVal);
    inputValidate()
  }

  // // Sync with props.modelValue
  // watch(
  //   () => props.modelValue,
  //   () => { inputValidate() }
  // );

  return {
    errorTexts,
    inputValidate,
    resetInputValidate,
    resetInput,
    onInput
  };
}
