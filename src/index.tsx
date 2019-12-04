import * as React from 'react'
import styles from "./styles.css"
import { createInput } from "@zecos/inputs"

import TextField from "@material-ui/core/TextField"

export const text = createInput(({helpers, props, state}) => {
  const {
    onChange,
    onBlur,
    label,
    id,
  } = helpers
  
  const { errors, value, touched } = state

  const hasErrors = Boolean(errors.length)
  let errInfo = {}
  if (touched && hasErrors) {
    errInfo = {
      error: true,
      helperText: errors[0].toString(),
    }
  }

  return (
    <div className={styles.textFieldContainer}>
      <TextField
        {...errInfo}
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