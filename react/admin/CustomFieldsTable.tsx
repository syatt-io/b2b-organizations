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
  Modal,
  useModalState,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalDismiss,
  ModalButton,
  ModalFooter,
  Button,
} from '@vtex/admin-ui'
import { Dropdown } from 'vtex.styleguide'

// props are passed to the component
interface CustomFieldsTableProps {
  customFields: any
  handleDelete: (index: number) => void
}

const CustomFieldsTable: React.FC<CustomFieldsTableProps> = ({
  customFields,
  handleDelete,
}) => {
  const modal = useModalState()

  const toggleModal = () => {
    modal.toggle()
  }

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
              // label="Field Type"
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
      header: 'UseOnRegistration',
      width: '1fr',
      resolver: {
        type: 'root',
        render: ({ item }) => {
          return <Tag label={`${!!item.useOnRegistration}`} size="normal"></Tag>
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
              // eslint-disable-next-line no-console
              console.log(item, 'edit3')
            },
          },
          {
            label: 'Delete',
            icon: <IconTrash />,
            onClick: item => {
              // eslint-disable-next-line no-console
              console.log(item)
              handleDelete(1)
            },
          },
        ],
      },
    },
  ])

  /**
   * The hook returns the Table state
   */
  const { data, getBodyCell, getHeadCell, getTable } = useTableState({
    /**
     * Columns shape, read more about it on the rendering section
     */
    columns,
    /**
     * List of items to render
     */
    items: customFields,
  })

  /**
   * You must use the `state` prop so that your Table comes to life
   * This is the only prop that is required
   */
  return (
    <>
      <Table
        {...getTable()}
        className="test"
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
          // target a child element
        }}
      >
        <THead>
          {columns.map(column => (
            <THeadCell {...getHeadCell(column)} />
          ))}
        </THead>
        <TBody>
          {data.map((item: any) => {
            return (
              <TBodyRow
                key={item.name}
                // onClick={() => alert(`Item: ${item.name}`)}
              >
                {columns.map(column => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>

        <Button onClick={modal.toggle}>Toggle modal</Button>
        <Modal state={modal} backdrop={'sup'} size="medium">
          <ModalHeader>
            <ModalTitle>Update Custom Field</ModalTitle>
            <ModalDismiss />
          </ModalHeader>
          <ModalContent>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam non
            tincidunt lacus. Vivamus sed ullamcorper ipsum, vitae pharetra sem.
            Quisque dapibus tellus ex, vehicula suscipit quam scelerisque
            egestas. Donec feugiat pulvinar fringilla. Morbi sed risus a augue
            interdum imperdiet. Maecenas fermentum felis quis sollicitudin
            cursus. Vestibulum massa felis, laoreet at turpis vel, ornare
            tristique mi. Fusce ultrices auctor neque dapibus consequat. Fusce
            eu sagittis dui, quis gravida augue. Aenean dignissim odio ac nibh
            volutpat porta. Integer at pretium justo.
          </ModalContent>
          <ModalFooter>
            <ModalButton variant="secondary">Cancel</ModalButton>
            <ModalButton>Confirm</ModalButton>
          </ModalFooter>
        </Modal>
      </Table>
    </>
  )
}

export default CustomFieldsTable
