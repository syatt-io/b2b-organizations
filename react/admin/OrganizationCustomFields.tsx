import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Spinner } from 'vtex.styleguide'
import { useToast } from '@vtex/admin-ui'

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
  /**
   * Hooks
   */
  const { formatMessage } = useIntl()
  const showToast = useToast()

  /**
   * States
   */

  const [customFields, setCustomFields] = useState<CustomField[]>([])

  /**
   * Queries
   */
  const { data: b2bSettings, loading: b2bSettingsLoading } = useQuery(
    GET_B2BSETTINGS,
    {
      ssr: false,
    }
  )

  /**
   * Mutations
   */
  const [saveB2BSettingsRequest] = useMutation(SAVE_B2BSETTINGS)

  /**
   * Functions
   */
  const translateMessage = (message: MessageDescriptor) => {
    return formatMessage(message)
  }

  const toastMessage = (
    message: MessageDescriptor,
    type: 'error' | 'info' | 'success' | 'warning'
  ) => {
    const translatedMessage = translateMessage(message)

    showToast({ message: translatedMessage, duration: 5000, type })
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
        toastMessage(settingMessage.toastUpdateSuccess, 'success')
      })
      .catch(() => {
        toastMessage(settingMessage.toastUpdateFailure, 'error')
      })
  }

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

  /**
   * Effects
   */

  const customFieldsData = b2bSettings?.getB2BSettings?.defaultCustomFields

  useEffect(() => {
    if (customFieldsData) {
      // in case customFields comes as null, make an empty array
      setCustomFields(customFieldsData ?? [])
    }
  }, [customFieldsData])

  return (
    <>
      <div className="flex justify-end items-center">
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

      {b2bSettingsLoading ? (
        <Spinner />
      ) : (
        customFields.map((customField, index: number) => (
          <OrganizationCustomField
            key={index}
            index={index}
            customFieldState={customField}
            handleUpdate={handleUpdate}
          />
        ))
      )}

      <div className="mt3 flex">
        <Button
          variation="primary"
          onClick={() => addCustomField()}
          disabled={customFields?.length > 7}
        >
          <FormattedMessage id="admin/b2b-organizations.custom-fields.addField" />
        </Button>

        <div className="ml2">
          <Button
            variation="secondary"
            onClick={() => removeCustomField()}
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
