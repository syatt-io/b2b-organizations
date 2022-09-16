import React, { useState, useEffect } from 'react'
import { Input, IconDelete, IconPlus, Toggle, Dropdown } from 'vtex.styleguide'
import { Button, Flex } from '@vtex/admin-ui'

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

  const fieldOptionsNew = [
    {
      value: 'text',
      label: 'Text',
    },
    {
      value: 'dropdown',
      label: 'Dropdown',
    },
  ]

  const [dropdownState, setDropdownState] = useState('text')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedCustomField = {
      ...customField,
      name: e.target.value,
    }

    handleUpdate(index, updatedCustomField)
  }

  const handleDropdownChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'text') {
      setDropdownState(fieldOptionsNew[0].value)

      handleUpdate(index, {
        ...customField,
        type: 'text',
        dropdownValues: [],
      })

      setDropdownValuesLocal([])
    } else {
      setDropdownState(fieldOptionsNew[1].value)

      const updatedCustomField = {
        ...customField,
        type: 'dropdown' as const,
        dropdownValues: [],
      }

      handleUpdate(index, updatedCustomField)
    }
  }

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
        name: value ?? name,
        type: dropdownState === 'dropdown' ? 'dropdown' : type,
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

  useEffect(() => {
    setDropdownState(
      type === 'dropdown' ? fieldOptionsNew[1].value : fieldOptionsNew[0].value
    )
  }, [type])

  return (
    <div className="w-100 mv6 flex">
      <Toggle
        checked={useOnRegistrationLocal}
        onChange={handleToggle}
        label="Show on registration form"
        className="flex flex-column w-100"
      />

      <Dropdown
        label="Field Type"
        size="large"
        options={fieldOptionsNew ?? []}
        onChange={handleDropdownChange}
        value={dropdownState}
      />
      <Flex direction="column" className="w-100">
        <Input
          autocomplete="off"
          size="large"
          label={`${name}${
            dropdownState === 'dropdown' ? ' - Dropdown name:' : ''
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
      {dropdownState === 'dropdown' ? (
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
