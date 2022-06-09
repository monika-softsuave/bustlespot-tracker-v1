import React from 'react'
import { useFormContext } from 'react-hook-form'

type Props = {
  children: React.ReactNode
  onFormSubmit: (formData: any) => void
  className?: string
}

const Form = (props: Props) => {
  const { children, className, onFormSubmit } = props
  const { handleSubmit } = useFormContext()

  return (
    <form className={className} style={{ width: '100%' }} onSubmit={handleSubmit(onFormSubmit)}>
      {children}
    </form>
  )
}

export default Form
