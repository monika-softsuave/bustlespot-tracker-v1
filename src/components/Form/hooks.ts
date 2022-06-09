import { useFormContext, useWatch } from 'react-hook-form'
import { get, isEmpty } from 'lodash'
import { useEffect, useMemo } from 'react'

export const useGetFieldError = (name: string) => {
  const context = useFormContext()
  return get(context, `formState.errors.${name}.message`, '')
}

export const useFieldHook = (name: string) => {
  const { unregister } = useFormContext()
  useEffect(() => {
    return () => unregister(name)
  }, [unregister, name])
}

export const useDisabled = (customKeys?: string[]): boolean => {
  const { getValues } = useFormContext()
  const fieldValues = getValues();
  const availableKeys = Object.keys(fieldValues).filter(key => customKeys?.includes(key))
  const payload = useWatch({ name: isEmpty(customKeys) ? Object.keys(fieldValues) : availableKeys })

  let isDisabled = false
  isDisabled = useMemo(() => {
    if (isEmpty(payload)) {
      isDisabled = true
    } else {
      payload.forEach(value => {
        if (isEmpty(value)) {
          isDisabled = true
        }
      })
    }
    return isDisabled
  }, [payload, getValues])

  return isDisabled
}

export const useGetFormErrors = () => {
  const context = useFormContext()
  const errors = useMemo(() => {
    return get(context, 'formState.errors', '')
  }, [context])
  return { ...errors }
}

export const useSubmitDisable = (customKeys?: string[]): boolean => {
  const isDisabled = useDisabled(customKeys)
  const errors = useGetFormErrors()
  const disabled = useMemo(() => {
    if (!isEmpty(errors)) {
      return true
    } else {
      return isDisabled
    }
  }, [errors, isDisabled])
  return disabled
}
