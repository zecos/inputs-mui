import * as React from 'react'
import { createInput } from "@zecos/inputs"
import DateFnsUtils from '@date-io/date-fns'

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers'

export const TimePickerInput = createInput(({helpers, props, actions, state}) => {
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

export const DatePickerInput = createInput(({helpers, props, actions, state}) => {
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
