import React from 'react'
// import { useIntl } from 'react-intl'
import { Input } from 'vtex.styleguide'

import type { CustomField } from './OrganizationCustomFields'

interface CustomFieldProps {
  index: number
  handleUpdate: (index: number, customField: CustomField) => void
  fieldLabel: string
  fieldValue: string
  fieldType: 'text'
  isDefaultCustomField?: boolean
}

const OrganizationCustomField: React.FC<CustomFieldProps> = ({
  index,
  handleUpdate,
  fieldLabel,
  fieldValue,
  fieldType,
  isDefaultCustomField,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCustomField = {
      type: fieldType,
      // name: e.target.value,
      name: isDefaultCustomField ? e.target.value : fieldLabel,
      value: e.target.value,
    }

    handleUpdate(index, updatedCustomField)
  }

  return (
    <div className="w-100 mv6">
      <Input
        autocomplete="off"
        size="large"
        label={fieldLabel}
        value={fieldValue}
        type={fieldType}
        onChange={handleChange}
      />
    </div>
  )
}

export default OrganizationCustomField
