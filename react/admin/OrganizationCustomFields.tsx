// TODO: Remove this console.log block
/* eslint-disable no-console */

import React, { useState, useEffect } from 'react'
import { Input, Button } from 'vtex.styleguide'
import { FormattedMessage, useIntl } from 'react-intl'

import { organizationCustomFieldsMessages as customFieldsMessages } from './utils/messages'
import { CustomField } from './AutoApproveSettings'

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
    // remove last item from numberOfCustomFields, but only if there is more than one item
    if (customFields.length > 1) {
      setCustomFields([...customFields.slice(0, customFields.length - 1)])
    }
  }

  const handleUpdate = (index: number, customField: CustomField) => {
    console.log(index, customField)
    // populate customFields array with values from inputs
    const newCustomFields = [...customFields]

    newCustomFields[index] = customField
    setCustomFields(newCustomFields)

    updateCustomFields(newCustomFields)
  }

  return (
    <>
      <h3 className="t-heading-4 mt0">
        {formatMessage(customFieldsMessages.customFieldsExplanation)}
      </h3>

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
          {/* // TODO: fix text */}
          Add field &nbsp;
          <FormattedMessage id="admin/b2b-organizations.costCenter-details.button.save" />
        </Button>
        <div className="ml2">
          <Button
            variation="secondary"
            onClick={() => removeCustomField()}
            isLoading={false}
            disabled={customFields.length === 1}
          >
            {/* // TODO: fix text */}
            Remove Field &nbsp;
            <FormattedMessage id="admin/b2b-organizations.costCenter-details.button.cancel" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default CustomFields
