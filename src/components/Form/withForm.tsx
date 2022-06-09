import React, { ComponentProps } from 'react'
import { useForm, FormProvider, Mode } from 'react-hook-form'

const withForm = (
  Component: React.ComponentType<any>,
  mode: Mode = 'onChange' || 'onTouched',
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'> = 'onChange',
) => {
  return (props: ComponentProps<any>) => {
    const methods = useForm({ mode, reValidateMode: reValidateMode })
    return (
      <FormProvider {...methods}>
        <Component {...props} />
      </FormProvider>
    )
  }
}

export default withForm
