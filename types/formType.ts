export interface InputValidateProps {
  inputValidate: () => { valid: boolean, errText: string }
  resetInputValidate: () => void
  resetInput: () => void
}

export type rulesProps = (input?: allValueType) => string | boolean
export type RenderValueType = string | number
export type allValueType = RenderValueType | boolean

export interface InputProps {
  modelValue: RenderValueType;
  rules: ((v: RenderValueType) => boolean | string)[];
  onUpdateModelValue: (value: allValueType) => void;
  validateOnInput: boolean;
  validateOnBlur: boolean;
}
