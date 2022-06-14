import { IList, IOption } from 'src/types/common'
import { IOrganisation } from 'src/types/organization'
import { IProject } from 'src/types/project'

export const getOptions = (list: Array<IList | IProject | IOrganisation > = [], valueKey: string): Array<IOption> => {
  const options: Array<IOption> = list.map((item) => ({
    value: valueKey ? String(item[valueKey]) || '' : item.name,
    label: String(item.name) || '',
  }))

  return options
}
