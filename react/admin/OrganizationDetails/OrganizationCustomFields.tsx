/* eslint-disable no-console */

// TODO: Remove this console.log
import React, { useState } from 'react'
import type { FunctionComponent } from 'react'
import { Input, Button } from 'vtex.styleguide'
import { FormattedMessage, useIntl } from 'react-intl'

import { organizationCustomFieldsMessages as customFieldsMessages } from '../utils/messages'

// type Props = {}

const CustomFields: FunctionComponent = () =>
  // props: Props
  {
    const { formatMessage } = useIntl()

    const [customField1, setCustomField1] = useState('')
    const [customField2, setCustomField2] = useState('')
    const [customField3, setCustomField3] = useState('')
    const [customField4, setCustomField4] = useState('')
    const [customField5, setCustomField5] = useState('')
    const [customField6, setCustomField6] = useState('')
    const [customField7, setCustomField7] = useState('')
    const [customField8, setCustomField8] = useState('')
    const [customField9, setCustomField9] = useState('')
    const [customField10, setCustomField10] = useState('')

    const handleSave = () => {
      console.log(customField1)
      console.log(customField2)
    }

    const handleCancel = () => {
      console.log(customField1)
      console.log(customField2)
    }

    return (
      <>
        <p className="t-heading-5 mb0 pt4">
          {formatMessage(customFieldsMessages.customFieldsExplanation)}
        </p>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 1`}
            value={customField1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField1(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 2`}
            value={customField2}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField2(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 3`}
            value={customField3}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField3(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 4`}
            value={customField4}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField4(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 5`}
            value={customField5}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField5(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 6`}
            value={customField6}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField6(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 7`}
            value={customField7}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField7(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 8`}
            value={customField8}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField8(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 9`}
            value={customField9}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField9(e.target.value)
            }}
            required
          />
        </div>
        <div className="w-100 mv6">
          <Input
            autocomplete="off"
            size="large"
            label={`${formatMessage(
              customFieldsMessages.customFieldsTitleSingular
            )} 10`}
            value={customField10}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCustomField10(e.target.value)
            }}
            required
          />
        </div>
        <div className="mt3 flex">
          <Button
            variation="primary"
            onClick={() => handleSave()}
            isLoading={false}
            // disabled={data.getOrganizationRequestById.status !== 'pending'}
          >
            <FormattedMessage id="admin/b2b-organizations.costCenter-details.button.save" />
          </Button>
          <div className="ml2">
            <Button
              variation="secondary"
              onClick={() => handleCancel()}
              isLoading={false}
              // disabled={data.getOrganizationRequestById.status !== 'pending'}
            >
              <FormattedMessage id="admin/b2b-organizations.costCenter-details.button.cancel" />
            </Button>
          </div>
        </div>
      </>
    )
  }

export default CustomFields
