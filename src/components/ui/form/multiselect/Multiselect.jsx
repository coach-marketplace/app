import React, { useState } from 'react'

import Downshift from 'downshift'
import { Field, Tag } from '../../index'

import './Multiselect.css'

export default function Mutliselect({
  title,
  items,
  addSelectedItem,
  removeSelectedItem,
  selectedItems,
}) {
  const [inputValue, setInputValue] = useState('')

  const onInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const getFilteredItems = () => {
    return items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase()),
    )
  }

  const handleChange = (selection) => {
    addSelectedItem(selection)
    setInputValue('')
  }

  return (
    <>
      <Downshift
        selectedItem={inputValue}
        onChange={(selection) => handleChange(selection)}
      >
        {({
          getLabelProps,
          getInputProps,
          getButtonProps,
          getMenuProps,
          getItemProps,
          isOpen,
          toggleMenu,
          clearSelection,
          selectedItem,
          highlightedIndex,
        }) => {
          const _inputProps = getInputProps({
            value: inputValue,
            onChange: onInputChange,
          })
          return (
            <div>
              <Field label={title} {..._inputProps} />
              <ul
                {...getMenuProps()}
                className="menu"
                style={
                  isOpen && getFilteredItems().length > 0
                    ? { borderBottom: 'solid 1px #AAA' }
                    : {}
                }
              >
                {isOpen &&
                  getFilteredItems().map((item, index) => (
                    <li
                      {...getItemProps({ item, index })}
                      style={
                        index === highlightedIndex
                          ? {
                              backgroundColor: '#bde4ff',
                              cursor: 'grab',
                            }
                          : {}
                      }
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          )
        }}
      </Downshift>
      <div style={{ display: 'flex' }}>
        {selectedItems.map((item, index) => {
          return (
            <Tag
              closeable={true}
              text={item}
              onDelete={() => removeSelectedItem(index)}
            />
          )
        })}
      </div>
    </>
  )
}
