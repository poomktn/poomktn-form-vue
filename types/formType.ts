export interface InputValidateProps {
  inputValidate: () => { valid: boolean, errText: string }
  resetInputValidate: () => void
  resetInput: () => void
}

export type rulesProps = (input?: allValueType) => string | boolean

export type allValueType = string | number | boolean

export interface InputProps {
  modelValue: allValueType;
  rules: Function[];
  onUpdateModelValue: (value: allValueType) => void;
}
