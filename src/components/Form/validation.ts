import { isEmpty, trim } from 'lodash'

import { commonContents } from 'src/contents/common'
import { Regex } from 'src/lib/regex'
import { Rules } from './formTypes'

export const EmailRules: Rules = {
  required: {
    value: true,
    message: commonContents.emailRequiredError,
  },
  pattern: {
    value: Regex.email,
    message: commonContents.emailValidError,
  },
}
export const PasswordLoginRules: Rules = {
  required: {
    value: true,
    message: commonContents.passRequiredError,
  },
  validate: (value?: string) => (isEmpty(trim(value)) ? commonContents.passRequiredError : true),
}

export const ConfirmPasswordRules: Rules = {
  required: {
    value: true,
    message: commonContents.passRequiredError,
  },
}
