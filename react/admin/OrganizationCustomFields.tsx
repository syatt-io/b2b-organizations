import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'

import GET_B2BSETTINGS from '../graphql/getB2BSettings.graphql'
import SAVE_B2BSETTINGS from '../graphql/saveB2BSettings.graphql'
import OrganizationCustomField from './OrganizationCustomField'
import { organizationCustomFieldsMessages as customFieldsMessages } from './utils/messages'

interface CustomFieldsProps {
  updateCustomFields: (customFields: CustomField[]) => void
  customFieldsState: CustomField[]
}

interface CustomField {
  name: string
  type: string
}

const CustomFields: React.FC<CustomFieldsProps> = () =>
  // {
  // updateCustomFields,
  // customFieldsState,
  // }
  {
    const { formatMessage } = useIntl()

    const [customFields, setCustomFields] = useState<CustomField[]>([
      { name: '', type: 'text' },
    ])

    // useEffect(() => {
    //   setCustomFields(customFieldsState)
    // }, [customFieldsState])

    const { data: b2bSettings } = useQuery(GET_B2BSETTINGS, {
      ssr: false,
    })

    const customFieldsData = b2bSettings?.getB2BSettings?.defaultCustomFields

    useEffect(() => {
      if (b2bSettings?.getB2BSettings) {
        setCustomFields(customFieldsData)
      }

      // return () => {
      //   second
      // }
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
      // updateCustomFields(customFieldsWithoutLastItem)
    }

    const handleUpdate = (index: number, customField: CustomField) => {
      // populate customFields array with values from inputs
      const newCustomFields = [...customFields]

      newCustomFields[index] = customField
      setCustomFields(newCustomFields)

      // updateCustomFields(newCustomFields)
    }

    const [saveB2BSettingsRequest] = useMutation(SAVE_B2BSETTINGS)

    const saveB2BSettings = () => {
      // const selectedPaymentTerms = paymentTermsState?.map((paymentTerms: any) => {
      //   return { name: paymentTerms.name, id: paymentTerms.paymentTermId }
      // })

      const B2BSettingsInput = {
        // autoApprove: autoApproveState,
        // defaultPaymentTerms: selectedPaymentTerms,
        // defaultPriceTables: priceTablesState,
        defaultCustomFields: customFields,
      }

      saveB2BSettingsRequest({
        variables: {
          input: B2BSettingsInput,
        },
      })
        .then(() => {
          // eslint-disable-next-line no-console
          console.log('saved correctly')
          // setAlertState(true)
        })
        .catch(() => {
          // toastMessage(settingMessage.toastUpdateFailure)
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
