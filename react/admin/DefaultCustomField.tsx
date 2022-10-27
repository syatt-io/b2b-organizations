import React, { useState, useEffect } from 'react'
import { Input, IconDelete, IconPlus, Toggle } from 'vtex.styleguide'
import { Button, Dropdown, useDropdownState, Flex } from '@vtex/admin-ui'

interface CustomFieldProps {
  index: number
  customField: CustomField
  name: string
  handleUpdate: (index: number, customField: CustomField) => void
}

interface DropdownValue {
  value: string
  label: string
}

const DefaultCustomField: React.FC<CustomFieldProps> = ({
  index,
  name,
  handleUpdate,
  customField,
  customField: { type, value, dropdownValues, useOnRegistration = false },
}) => {
  const [dropdownValuesLocal, setDropdownValuesLocal] = useState<
    DropdownValue[]
  >([])

  const [useOnRegistrationLocal, setUseOnRegistrationLocal] = useState(false)

  useEffect(() => {
    setDropdownValuesLocal(dropdownValues ?? [])
    setUseOnRegistrationLocal(!!useOnRegistration)
  }, [dropdownValues, useOnRegistration])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCustomField = {
      ...customField,
      name: e.target.value,
    }

    handleUpdate(index, updatedCustomField)
  }

  const fieldOptions = [
    {
      id: 0,
      label: 'Text',
    },
    {
      id: 1,
      label: 'Dropdown',
    },
  ]

  const dropdownState = useDropdownState({
    items: fieldOptions,

    initialSelectedItem:
      type === 'dropdown' ? fieldOptions[1] : fieldOptions[0],
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem?.label === 'Text') {
        handleUpdate(index, { type: 'text', name, value })

        setDropdownValuesLocal([])
      }
    },
  })

  const handleDropdownItemChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number,
    labelUpdate?: boolean
  ) => {
    const { value: eventValue } = e.target

    setDropdownValuesLocal(prev => {
      const newDropdownValues = [...prev]

      newDropdownValues[i] = {
        ...prev[i],
        ...(labelUpdate && { label: eventValue }),
        ...(!labelUpdate && { value: eventValue }),
      }

      const updatedCustomField = {
        // name: value,
        name: value ?? name,
        type: dropdownState.selectedItem?.id === 1 ? 'dropdown' : type,
        dropdownValues: newDropdownValues,
      }

      handleUpdate(index, updatedCustomField)

      return newDropdownValues
    })
  }

  const handleAddDropdownItem = () => {
    setDropdownValuesLocal(prev => {
      const newDropdownValues = [...prev]

      newDropdownValues.push({
        value: '',
        label: '',
      })

      return newDropdownValues
    })
  }

  const handleDeleteDropdownItem = (i: number) => {
    setDropdownValuesLocal(prev => {
      const newDropdownValues = [...prev]

      newDropdownValues.splice(i, 1)

      return newDropdownValues
    })
  }

  const handleToggle = () => {
    setUseOnRegistrationLocal(prev => {
      const updatedCustomField = {
        name: value ?? name,
        type,
        dropdownValues,
        useOnRegistration: !prev,
      }

      handleUpdate(index, updatedCustomField)

      return !prev
    })
  }

  return (
    <div className="w-100 mv6 flex">
      <Toggle
        checked={useOnRegistrationLocal}
        onChange={handleToggle}
        label="Show on registration form"
        className="flex flex-column w-100"
      />
      <Dropdown
        variant="primary"
        items={fieldOptions}
        state={dropdownState}
        renderItem={item => item?.label}
        label="Field Type"
        csx={{ width: '120px', marginTop: '28px', marginRight: '10px' }}
      />
      <Flex direction="column" className="w-100">
        <Input
          autocomplete="off"
          size="large"
          label={`${name}${
            dropdownState.selectedItem?.label === 'Dropdown'
              ? ' - Dropdown name:'
              : ''
          }`}
          value={customField.name}
          type={type}
          onChange={handleChange}
        />
        {/* Create inputs for value and label of a dropdown */}
        {dropdownValuesLocal ? (
          <Flex direction="column" className="w-100">
            {dropdownValuesLocal?.map(
              (dropdownValue: DropdownValue, i: number) => (
                <Flex
                  direction="row"
                  align="end"
                  className="w-80"
                  key={`dropdown${index}${i}`}
                >
                  <Input
                    autocomplete="off"
                    size="medium"
                    label="Value"
                    value={dropdownValue.value}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDropdownItemChange(e, i)
                    }
                  />
                  <Input
                    autocomplete="off"
                    size="medium"
                    label="Label"
                    value={dropdownValue.label}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDropdownItemChange(e, i, true)
                    }
                  />
                  <Button
                    icon={<IconDelete title="Delete" />}
                    aria-label="Delete line"
                    variant="secondary"
                    onClick={() => handleDeleteDropdownItem(i)}
                    csx={{
                      marginLeft: '10px',
                    }}
                  />
                </Flex>
              )
            )}
          </Flex>
        ) : null}
      </Flex>
      {dropdownState.selectedItem?.label === 'Dropdown' ? (
        <Button
          icon={<IconPlus title="Add field" />}
          aria-label="Add field"
          onClick={handleAddDropdownItem}
          csx={{
            marginTop: '28px',
            marginLeft: '10px',
          }}
        />
      ) : null}
      {/* // TODO - make deletion work per field, currently removes last item */}
      {/* <Button
        icon={<IconDelete title="Delete" />}
        aria-label="Delete line"
        csx={{
          marginTop: '28px',
          marginLeft: '10px',
        }}
      /> */}
    </div>
  )
}

export default DefaultCustomField
