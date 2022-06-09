import React, { ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { useFieldHook, useGetFieldError } from 'src/components/Form/hooks'
import { Rules } from 'src/components/Form/formTypes'
import { StandardTextFieldProps, TextField } from '@mui/material'
import { isEmpty, isFunction } from 'lodash'

interface Props extends StandardTextFieldProps {
  rules?: Rules
  name: string
  defaultValue?: string | any[]
  disabledErrorIcon?: boolean
  onValueChange?: (value: any) => void
  endAdornment?: ReactNode
  maxLength?: number
}

const Input = ({
  name,
  rules,
  defaultValue = '',
  helperText,
  placeholder,
  onValueChange,
  maxLength,
  ...props
}: Props) => {
  const { control } = useFormContext()
  const errorMsg = useGetFieldError(name)
  useFieldHook(name)
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, ...otherFields } }) => {
        return (
          <TextField
            margin='normal'
            label={props.label}
            size='small'
            autoComplete='off'
            placeholder={placeholder}
            {...otherFields}
            {...props}
            inputProps={{ maxLength }}
            onChange={(event: { target: { value: any } }) => {
              onChange(event.target.value)
              isFunction(onValueChange) && onValueChange(event.target.value)
            }}
            className={props?.className}
            error={!isEmpty(errorMsg)}
            helperText={
              <span
                className={'errorText'}
                style={{
                  fontSize: '12px',
                  visibility: !isEmpty(errorMsg) || !isEmpty(helperText) ? 'visible' : 'hidden',
                }}
              >
                {isEmpty(errorMsg) ? helperText : errorMsg} &nbsp;
              </span>
            }
          />
        )
      }}
    />
  )
}

export default Input
