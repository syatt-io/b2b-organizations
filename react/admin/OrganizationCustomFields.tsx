import React, { useEffect, useState, useContext } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, ToastContext } from 'vtex.styleguide'

import GET_B2BSETTINGS from '../graphql/getB2BSettings.graphql'
import SAVE_B2BSETTINGS from '../graphql/saveB2BSettings.graphql'
import OrganizationCustomField from './OrganizationCustomField'
import {
  organizationCustomFieldsMessages as customFieldsMessages,
  organizationSettingsMessages as settingMessage,
} from './utils/messages'

interface CustomFieldsProps {
  updateCustomFields: (customFields: CustomField[]) => void
  customFieldsState: CustomField[]
}

export interface CustomField {
  name: string
  type: 'text'
}

const CustomFields: React.FC<CustomFieldsProps> = () => {
  const { formatMessage } = useIntl()

  const [customFields, setCustomFields] = useState<CustomField[]>([
    { name: '', type: 'text' },
  ])

  const { data: b2bSettings } = useQuery(GET_B2BSETTINGS, {
    ssr: false,
  })

  const customFieldsData = b2bSettings?.getB2BSettings?.defaultCustomFields

  useEffect(() => {
    if (b2bSettings?.getB2BSettings) {
      setCustomFields(customFieldsData)
    }
  }, [customFieldsData])

  const addCustomField = () => {
    setCustomFields([...customFields, { name: '', type: 'text' }])
  }

  const removeCustomField = () => {
    const customFieldsWithoutLastItem = customFields.slice(
      0,
      customFields.length - 1
    )

    setCustomFields(customFieldsWithoutLastItem)
  }

  const handleUpdate = (index: number, customField: CustomField) => {
    // populate customFields array with values from inputs
    const newCustomFields = [...customFields]

    newCustomFields[index] = customField
    setCustomFields(newCustomFields)
  }

  const [saveB2BSettingsRequest] = useMutation(SAVE_B2BSETTINGS)

  // ------
  // Toast setup
  const { showToast } = useContext(ToastContext)

  const translateMessage = (message: MessageDescriptor) => {
    return formatMessage(message)
  }

  const toastMessage = (message: MessageDescriptor) => {
    const translatedMessage = translateMessage(message)
    const action = undefined

    showToast({ message: translatedMessage, duration: 5000, action })
  }

  const saveB2BSettings = () => {
    const B2BSettingsInput = {
      defaultCustomFields: customFields,
    }

    saveB2BSettingsRequest({
      variables: {
        input: B2BSettingsInput,
      },
    })
      .then(() => {
        toastMessage(settingMessage.toastUpdateFailure)
      })
      .catch(() => {
        toastMessage(settingMessage.toastUpdateFailure)
      })
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Button
          variation="primary"
          onClick={() => {
            saveB2BSettings()
          }}
        >
          Save Settings
        </Button>
      </div>
      <h4 className="mt6 t-heading-6">
        {formatMessage(customFieldsMessages.customFieldsExplanation)}
      </h4>

      {customFields?.map((customField, index: number) => (
        <OrganizationCustomField
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
          disabled={customFields?.length > 7}
        >
          <FormattedMessage id="admin/b2b-organizations.custom-fields.addField" />
        </Button>
        <div className="ml2">
          <Button
            variation="secondary"
            onClick={() => removeCustomField()}
            isLoading={false}
            disabled={customFields?.length === 0}
          >
            <FormattedMessage id="admin/b2b-organizations.custom-fields.removeField" />
          </Button>
        </div>
      </div>
    </>
  )
}

export default CustomFields
