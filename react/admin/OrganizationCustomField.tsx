import React, { useEffect, useState } from 'react'
import {
  // FormattedMessage
  useIntl,
} from 'react-intl'
import {
  // Button
  Input,
} from 'vtex.styleguide'

// import type { CustomField } from './AutoApproveSettings'
import { organizationCustomFieldsMessages as customFieldsMessages } from './utils/messages'

interface CustomFieldProps {
  index: number
  customFieldState: CustomField
  handleUpdate: (index: number, customField: CustomField) => void
}

interface CustomField {
  name: string
  type: 'text'
}

const OrganizationCustomField: React.FC<CustomFieldProps> = ({
  index,
  handleUpdate,
  customFieldState,
}) => {
  const { formatMessage } = useIntl()
  const [customField, setCustomField] = useState<CustomField>({
    name: '',
    type: 'text',
  })

  useEffect(() => {
    setCustomField(customFieldState)
  }, [customFieldState])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCustomField = {
      ...customField,
      name: e.target.value,
    }

    setCustomField(updatedCustomField)
    handleUpdate(index, updatedCustomField)
  }

  return (
    <div className="w-100 mv6">
      <Input
        autocomplete="off"
        size="large"
        label={`${formatMessage(
          customFieldsMessages.customFieldsTitleSingular
        )} ${index + 1}`}
        value={customField.name}
        onChange={handleChange}
        type={customField.type}
        required
      />
    </div>
  )
}

export default OrganizationCustomField
