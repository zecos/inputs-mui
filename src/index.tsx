import * as React from 'react'
import styles from './styles.css'

import { createInput, createLayout, createMulti } from "@zecos/input"
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
  Button,
} from '@material-ui/core'
import { IFieldSingleState } from '@zecos/field/types'

const getErrorInfo = (state: IFieldSingleState) => {
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

export const TextInput = createInput(({helpers, props, state}) => {
  const {
    handleChange,
    handleBlur,
    label,
    id,
  } = helpers
  
  const { value } = state

  return (
    <TextField
      {...getErrorInfo(state)}
      label={label}
      id={id}
      margin="normal"
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      fullWidth
      {...props}
    />
  )
})

const renderOption = ([label, value]: [string, any]) => (
  <MenuItem key={value} value={value}>{label}</MenuItem>
)
export const SelectInput = createInput(({helpers, props, state}) => {
  const {
    handleChange,
    handleBlur,
    label,
    id,
  } = helpers
  
  const { options, ...moreProps } = props
  
  const { value } = state

  return <FormControl fullWidth margin="normal">
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      id={id}
      onChange={handleChange}
      value={value}
      onBlur={handleBlur}
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
export const RadioInput = createInput(({helpers, props, state}) => {
  const {
    label,
    name,
    handleChange,
    handleBlur,
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
        onChange={handleChange}
        onBlur={handleBlur}
        {...radioGroupProps}
      >
        {Object.entries(options).map(([label, key]) => {
          return renderRadio([label, key, radioProps])
        })}
      </RadioGroup>
    </FormControl>
  )
})

export const CheckboxInput = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers

  const { value } = state
  const boolVal = Boolean(value)

  return (
    <div>
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
    </div>
  )
})

export const SwitchInput = createInput(({helpers, props, actions, state}) => {
  const {
    id,
    label,
  } = helpers
  const { value } = state
  const boolVal = Boolean(value)

  return (
    <div>
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
    </div>
  )
})
export const SliderInput = createInput(({helpers, props, actions, state}) => {
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

const renderErrors = (error, i) => (
  <FormHelperText key={i}>
    {error.toString()}
  </FormHelperText>
)
export const GroupLayout = createLayout(({props, items, errors, helpers}) => {
  const Items = items
    .map(input => {
      const {Cmpt, helpers} = input
      return <Cmpt key={helpers.name} />
    })
  
  return (
    <div>
      <FormControl component="fieldset" error={!!errors.length}>
        {errors.map(renderErrors)}
      </FormControl>
      <FormLabel component="legend">{helpers.title}</FormLabel>
      <FormGroup row={props.row || false}>
        {Items}
      </FormGroup>
    </div>
  )
})




const defaultButtonProps = {
  variant: "outlined",
  type: "submit",
}
export const SimpleFormLayout = createLayout(({props, items, helpers, errors}) => {
  const { buttonProps, ...moreProps } = props
  const finalButtonProps = {
    ...defaultButtonProps,
    ...buttonProps,
  }
  return (
    <form {...moreProps}>
      <h3 className={styles.heading}>{helpers.title}</h3>
      <FormControl component="fieldset" error={!!errors.length}>
      {errors.map(renderErrors)}
      </FormControl>
      {items.map((Input, i) => (
        <span key={i}><Input.Cmpt key={i} /></span>
      ))}
      <div>
        <Button {...finalButtonProps}>Submit</Button>
      </div>
    </form>
  )
})


export const Multi:any = createMulti(({items, helpers, errors}) => {
  return <div>
    <h3 className={styles.heading}>{helpers.title}</h3>
    <FormControl component="fieldset" error={!!errors.length}>
    {errors.map(renderErrors)}
    </FormControl>
    {items.map((Input, i) => <Input.Cmpt key={i} />)}
  </div>
})