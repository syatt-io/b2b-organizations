import React, { useEffect, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Input } from 'vtex.styleguide'

import { CustomField } from './AutoApproveSettings'
import { organizationCustomFieldsMessages as customFieldsMessages } from './utils/messages'

interface CustomFieldProps {
  index: number
  customFieldState: CustomField
  handleUpdate: (index: number, customField: CustomField) => void
}

const CustomField: React.FC<CustomFieldProps> = ({
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

interface CustomFieldsProps {
  updateCustomFields: (customFields: CustomField[]) => void
  customFieldsState: CustomField[]
}

const CustomFields: React.FC<CustomFieldsProps> = ({
  updateCustomFields,
  customFieldsState,
}) => {
  const { formatMessage } = useIntl()

  const [customFields, setCustomFields] = useState<CustomField[]>([
    { name: '', type: 'text' },
  ])

  useEffect(() => {
    setCustomFields(customFieldsState)
  }, [customFieldsState])

  const addCustomField = () => {
    setCustomFields([...customFields, { name: '', type: 'text' }])
  }

  const removeCustomField = () => {
    const customFieldsWithoutLastItem = customFields.slice(
      0,
      customFields.length - 1
    )

    setCustomFields(customFieldsWithoutLastItem)
    updateCustomFields(customFieldsWithoutLastItem)
  }

  const handleUpdate = (index: number, customField: CustomField) => {
    // populate customFields array with values from inputs
    const newCustomFields = [...customFields]

    newCustomFields[index] = customField
    setCustomFields(newCustomFields)

    updateCustomFields(newCustomFields)
  }

  return (
    <>
      <h4 className="mt6 t-heading-6">
        {formatMessage(customFieldsMessages.customFieldsExplanation)}
      </h4>

      {customFields.map((customField, index: number) => (
        <CustomField
          key={index}
          index={index}
          customFieldState={customField}
          handleUpdate={handleUpdate}
        />
      ))}

      <div className="mt3 flex">
        <Button
          variation="primary"
          onClick={() => addCustomField()}
          isLoading={false}
          disabled={customFields.length > 7}
        >
          <FormattedMessage id="admin/b2b-organizations.custom-fields.addField" />
        </Button>
        <div className="ml2">
          <Button
            variation="secondary"
            onClick={() => removeCustomField()}
            isLoading={false}
            disabled={customFields.length === 0}
          >
            <FormattedMessage id="admin/b2b-organizations.custom-fields.removeField" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default CustomFields
