// TODO: Remove this console.log block
/* eslint-disable no-console */

import React, {
  useState,
  // useMemo
} from 'react'
import { Input, Button } from 'vtex.styleguide'
import { FormattedMessage, useIntl } from 'react-intl'

import { organizationCustomFieldsMessages as customFieldsMessages } from './utils/messages'

interface CustomFieldProps {
  index: number
  handleUpdate: (index: number, value: string) => void
}

const CustomField: React.FC<CustomFieldProps> = ({ index, handleUpdate }) => {
  const { formatMessage } = useIntl()
  const [customField, setCustomField] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomField(e.target.value)
    handleUpdate(index, e.target.value)
  }

  return (
    <div className="w-100 mv6">
      <Input
        autocomplete="off"
        size="large"
        label={`${formatMessage(
          customFieldsMessages.customFieldsTitleSingular
        )} ${index + 1}`}
        value={customField}
        onChange={handleChange}
        required
      />
    </div>
  )
}

interface CustomFieldsProps {
  updateCustomFields: (customFields: string[]) => void
}

const CustomFields: React.FC<CustomFieldsProps> = ({ updateCustomFields }) =>
  // props: Props
  {
    const { formatMessage } = useIntl()

    const [customFields, setCustomFields] = useState<string[]>([])
    const [numberOfCustomFields, setNumberOfCustomFields] = useState<number[]>([
      0,
    ])

    const handleSave = () => {
      setNumberOfCustomFields([
        ...numberOfCustomFields,
        numberOfCustomFields.length,
      ])
    }

    const handleCancel = () => {
      // remove last item from numberOfCustomFields, but only if there is more than one item
      if (numberOfCustomFields.length > 1) {
        setNumberOfCustomFields([
          ...numberOfCustomFields.slice(0, numberOfCustomFields.length - 1),
        ])
      }
    }

    const handleUpdate = (index: number, value: string) => {
      // populate customFields array with values from inputs
      const newCustomFields = [...customFields]

      newCustomFields[index] = value
      setCustomFields(newCustomFields)

      updateCustomFields(newCustomFields)
    }

    return (
      <>
        <h3 className="t-heading-4 mt0">
          {formatMessage(customFieldsMessages.customFieldsExplanation)}
        </h3>

        {numberOfCustomFields.map(index => (
          <CustomField key={index} index={index} handleUpdate={handleUpdate} />
        ))}

        <div className="mt3 flex">
          <Button
            variation="primary"
            onClick={() => handleSave()}
            isLoading={false}
            disabled={numberOfCustomFields.length > 7}
          >
            {/* // TODO: fix text */}
            Add field &nbsp;
            <FormattedMessage id="admin/b2b-organizations.costCenter-details.button.save" />
          </Button>
          <div className="ml2">
            <Button
              variation="secondary"
              onClick={() => handleCancel()}
              isLoading={false}
              disabled={numberOfCustomFields.length === 1}
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
