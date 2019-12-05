import * as React from 'react'
import { createInput } from "@zecos/inputs"
import { TextField, Select, MenuItem, FormControl, InputLabel, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core'

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
    <div>
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
  <MenuItem key={value} value={value}>{label}</MenuItem>
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

const renderRadio = ([label, value, radioProps]) => (
  <FormControlLabel
    key={value}
    value={value}
    control={<Radio color="primary" {...radioProps} />}
    label={label}
  />
)
export const radio = createInput(({helpers, props, state}) => {
  const {
    label,
    name,
    onChange,
    onBlur,
    title,
  } = helpers
  const { value } = state
  
  const { options, radioProps, ...radioGroupProps } = props

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...radioGroupProps}
      >
        {Object.entries(options).map(([label, key]) => {
          return renderRadio([label, key, radioProps])
        })}
      </RadioGroup>
    </FormControl>
  )
})

