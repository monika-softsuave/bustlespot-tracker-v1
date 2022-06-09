import { RegisterOptions } from 'react-hook-form/dist/types/validator'

export type Rules = Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
