import React from 'react'
import {
  Table,
  TBody,
  TBodyRow,
  TBodyCell,
  THead,
  THeadCell,
  useTableState,
  createColumns,
  Tag,
  IconEye,
  IconTrash,
} from '@vtex/admin-ui'
import { Dropdown, Modal, Button } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import {
  costCenterMessages,
  organizationMessages as messages,
  organizationCustomFieldsMessages as customFieldsMessages,
} from './utils/messages'
import DefaultCustomField from './DefaultCustomField'

// props are passed to the component
interface CustomFieldsTableProps {
  customFields: CustomField[]
  handleDelete: (index: number) => void
  handleUpdate: (index: number, customField: any) => void
}

const CustomFieldsTable: React.FC<CustomFieldsTableProps> = ({
  customFields,
  handleDelete,
  handleUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const [
    selectedCustomFieldIndex,
    setSelectedCustomFieldIndex,
  ] = React.useState<number>(0)

  // save custom filed locally
  const [localCustomField, setLocalCustomField] = React.useState<CustomField>({
    name: '',
    type: 'text',
    value: '',
    dropdownValues: [],
    useOnRegistration: false,
  })

  const handleUpdateLocal = (customField: CustomField) => {
    setLocalCustomField(customField)
  }

  const { formatMessage } = useIntl()

  const columns = createColumns([
    {
      id: 'name',
      header: 'Field Name',
      width: '2fr',
    },
    {
      id: 'type',
      header: 'Type',
      width: '2fr',
    },
    {
      id: 'dropdownValues',
      header: 'Dropdown Preview',
      width: '2fr',
      resolver: {
        type: 'root',
        render: ({ item }) => {
          return item.dropdownValues?.length ? (
            <Dropdown
              aria-label="Field Type"
              size="medium"
              options={item.dropdownValues ?? []}
              value={item.dropdownValues[0].value}
            ></Dropdown>
          ) : (
            <div></div>
          )
        },
      },
    },
    {
      id: 'useOnRegistration',
      header: 'Use on Registration',
      width: '1fr',
      resolver: {
        type: 'root',
        render: ({ item }) => {
          return (
            <Tag
              // if not set comes as null, converting to boolean
              label={`${!!item.useOnRegistration}`}
              variant={item.useOnRegistration ? 'green' : 'gray'}
              size="normal"
            ></Tag>
          )
        },
      },
    },
    {
      id: 'menu',
      resolver: {
        type: 'menu',
        actions: [
          {
            label: 'Edit',
            icon: <IconEye />,
            onClick: item => {
              toggleModal()

              const index = customFields.findIndex(
                customField => customField === item
              )

              setSelectedCustomFieldIndex(index)
              setLocalCustomField(item)
            },
          },
          {
            label: 'Delete',
            icon: <IconTrash />,
            onClick: item => {
              const index = customFields.findIndex(
                customField => customField === item
              )

              handleDelete(index)
            },
          },
        ],
      },
    },
  ])

  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    columns,
    // item type is built using columns which makes it incompatible with customFields type
    items: customFields as any,
  })

  return (
    <>
      <Table {...getTable()}>
        <THead>
          {columns.map(column => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item: any) => {
            return (
              <TBodyRow key={item.name}>
                {columns.map(column => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>

        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          responsiveFullScreen
          bottomBar={
            <div className="nowrap">
              <span className="mr4">
                <Button variation="tertiary" onClick={toggleModal}>
                  {formatMessage(messages.cancel)}
                </Button>
              </span>
              <span>
                <Button
                  variation="primary"
                  onClick={() => {
                    toggleModal()
                    handleUpdate(selectedCustomFieldIndex, localCustomField)
                  }}
                >
                  {formatMessage(costCenterMessages.update)}
                </Button>
              </span>
            </div>
          }
        >
          <DefaultCustomField
            customField={localCustomField}
            name={formatMessage(customFieldsMessages.customFieldsTitleSingular)}
            index={selectedCustomFieldIndex}
            handleUpdate={handleUpdateLocal}
          />
        </Modal>
      </Table>
    </>
  )
}

export default CustomFieldsTable
