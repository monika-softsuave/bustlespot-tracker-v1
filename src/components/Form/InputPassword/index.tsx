import React, { useCallback, useState } from 'react'
import { StandardTextFieldProps, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { isEmpty } from 'lodash'
import { Controller, useFormContext } from 'react-hook-form'

import { useFieldHook, useGetFieldError } from 'src/components/Form/hooks'
import { Rules } from 'src/components/Form/formTypes'
import { IconButton } from './index.styled'

interface Props extends StandardTextFieldProps {
  rules?: Rules
  name: string
  maxLength?: number
}

const InputPassword = ({ name, rules, maxLength, helperText, defaultValue = '', ...props }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const handleMouseDownPassword = useCallback((event: MouseEvent) => {
    event.preventDefault()
  }, [])
  const handleClickShowPassword = useCallback(() => {
    setShowPassword((presShowPassword) => !presShowPassword)
  }, [])

  useFieldHook(name)

  const { control } = useFormContext() // retrieve all hook methods
  const errorMsg = useGetFieldError(name)
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field }) => {
        return (
          <TextField
            type={showPassword ? 'text' : 'password'}
            margin='normal'
            inputProps={{ maxLength }}
            size='small'
            {...field}
            {...props}
            error={!isEmpty(errorMsg)}
            helperText={
              <span
                style={{
                  fontSize: '12px',
                  visibility: !isEmpty(errorMsg) || !isEmpty(helperText) ? 'visible' : 'hidden',
                }}
              >
                {isEmpty(errorMsg) ? helperText : errorMsg} &nbsp;
              </span>
            }
            InputProps={{
              endAdornment: (
                <IconButton
                  aria-label='toggle password visibility'
                  data-testid='visibility_toggle'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                  className={'visibility'}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              ),
            }}
          />
        )
      }}
    />
  )
}

export default InputPassword
