import * as React from 'react'
import styles from "./styles.css"
import { createInput } from "@zecos/inputs"

import TextField from "@material-ui/core/TextField"
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'


const getErrorInfo = state => {
  const {errors, touched} = state
  const hasErrors = Boolean(errors.length)
  let errInfo = {}
  if (touched && hasErrors) {
    errInfo = {
      error: true,
      helperText: errors[0].toString(),
    }
  }
  return errInfo
}

export const text = createInput(({helpers, props, state}) => {
  const {
    onChange,
    onBlur,
    label,
    id,
  } = helpers
  
  const { value } = state


  return (
    <div className={styles.textFieldContainer}>
      <TextField
        {...getErrorInfo(state)}
        label={label}
        id={id}
        margin="normal"
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        fullWidth
        {...props}
      />
    </div>
  )
})

const renderOption = ([label, value]) => (
  <MenuItem value={value}>{label}</MenuItem>
)
export const select = createInput(({helpers, props, state}) => {
  const {
    onChange,
    onBlur,
    label,
    id,
  } = helpers
  
  const { options, ...moreProps } = props
  
  const { value } = state

  return <FormControl fullWidth margin="normal">
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      id={id}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      fullWidth
      {...moreProps}
    >
      {Object.entries(options).map(renderOption)}
    </Select>
  </FormControl>
})