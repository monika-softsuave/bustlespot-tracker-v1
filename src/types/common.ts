export interface IOption {
  value: string
  label: string | number | JSX.Element | Element
}

export interface IList extends Record<string, any> {
  name: string
}
