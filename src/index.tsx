import * as React from 'react'
import { createInput, createLayout } from "@zecos/inputs"
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  FormHelperText,
  Switch,
  Slider,
} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers'


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

export const useText = createInput(({helpers, props, state}) => {
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
export const useSelect = createInput(({helpers, props, state}) => {
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
export const useRadio = createInput(({helpers, props, state}) => {
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

export const useCheckbox = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers

  const { value } = state
  const boolVal = Boolean(value)

  return (
    <FormControlLabel
      id={id}
      control={
        <Checkbox
          checked={boolVal}
          onChange={() => actions.setValue(!boolVal)}
          value={boolVal}
          color="primary"
          {...props}
        />
      }
      label={label}
    />
  )
})

export const useSwitch = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers
  const { value } = state
  const boolVal = Boolean(value)

  return (
    <FormControlLabel
      id={id}
      control={
        <Switch
          checked={boolVal}
          onChange={() => actions.setValue(!boolVal)}
          value={boolVal}
          color="primary"
          {...props}
        />
      }
      label={label}
    />
  )
})

const renderErrors = (error, i)=> <FormHelperText key={i}>{error.toString()}</FormHelperText>
export const useGroup = createLayout(({props, inputs, errors, helpers}) => {
  const Inputs = inputs
    .map(input => {
      const {Cmpt, helpers} = input
      return <Cmpt key={helpers.name} />
    })
  
  return (
    <FormControl component="fieldset" error={!!errors.length}>
      <FormLabel component="legend">{helpers.title}</FormLabel>
      <FormGroup row={props.row || false}>
        {Inputs}
      </FormGroup>
      {errors.map(renderErrors)}
    </FormControl>
  )
})

export const useTimePicker = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers
  const {value} = state
  const dateVal = new Date(value)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardTimePicker
        margin="normal"
        id={id}
        variant="inline"
        label={label}
        value={dateVal}
        onChange={newDate => actions.setValue(newDate)}
        KeyboardButtonProps={{
          'aria-label': 'change time',
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  );
})

export const useDatePicker = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers
  const {value} = state
  const dateVal = new Date(value)

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        margin="normal"
        variant="inline"
        id={id}
        label={label}
        format="MM/dd/yyyy"
        value={dateVal}
        onChange={newDate => actions.setValue(newDate)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        {...props}
      />
    </MuiPickersUtilsProvider>
  )
})

export const useSlider = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers

  const {value} = state
  let heightStyle = {}
  if (props.orientation === "vertical") {
    const height = typeof props.height !== "undefined" ? props.height : 300
    heightStyle = {height, paddingBottom: 0, paddingTop: 12}
  }

  return <>
    <FormLabel component="legend">{label}</FormLabel>
    <div style={heightStyle}>
    <Slider
      value={value}
      onChange={(_e, newVal) => actions.setValue(newVal)}
      aria-labelledby={id}
      getAriaValueText={() => value.toString()}
      step={1}
      {...props}
    />
    </div>
    </>
})

