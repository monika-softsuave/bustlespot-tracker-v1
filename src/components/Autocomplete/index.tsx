import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Autocomplete as MUIAutocomplete, AutocompleteProps } from '@mui/material'
import { Box } from '@mui/material'
import { IOption } from 'src/types/common'
import { isFunction, omit } from 'lodash'
import { AutoselectEvent } from 'src/types/event'

type SelectProps = Omit<
  AutocompleteProps<IOption, boolean, false, boolean>,
  'renderInput' | 'options' | 'onChange' | 'value' | 'size'
>
export type ValueType = string | IOption | (string | IOption)[] | null | undefined

interface Props extends SelectProps {
  options: Array<IOption>
  onChange?: (value: ValueType, event: AutoselectEvent) => void
  label?: string
  value?: ValueType
  size?: 'small' | 'medium'
}

export const Autocomplete = React.forwardRef((props: Props, ref: any) => {
  const { options, onChange, label, value, size = 'medium' } = props

  return (
    <Box>
      <MUIAutocomplete
        {...omit(props, ['options', 'onChange', 'value', 'size'])}
        value={value || null}
        ref={ref}
        options={options}
        onChange={(event:AutoselectEvent, value: ValueType) => isFunction(onChange) && onChange(value, event)}
        renderInput={(params) => <TextField {...params} label={label} size={size} />}
      />
    </Box>
  )
})
