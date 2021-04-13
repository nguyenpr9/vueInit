import {
  required,
  email,
  digits,
  max,
  min,
  regex,
  confirmed,
  length,
} from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'
setInteractionMode('eager') // for understand: https://vee-validate.logaretm.com/v3/guide/interaction-and-ux.html#interaction-modes

extend('confirmed', {
  ...confirmed,
  message: '{_field_} xác nhận không giống nhau',
})

extend('length', {
  ...length,
  message: '{_field_} phải nằm trong khoảng {min} đến {max} ký tự',
})
extend('lBetween', {
  params: ['min', 'max'],
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  message: '{_field_} phải nằm trong khoảng {min} đến {max} ký tự',
})

extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} không được bỏ trống',
})

extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
})

extend('min', {
  ...min,
  message: '{_field_} may not be lower than {length} characters',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}',
})

extend('email', {
  ...email,
  message: '{_field_} không đúng định dạng email',
})
