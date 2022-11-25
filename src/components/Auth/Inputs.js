import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Grid,TextField,IconButton,InputAdornment } from '@material-ui/core';

const Inputs = ({ name,handleChange,label,half,autoFocus,type,handleShowPassword }) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
        name={name}
        onChange={handleChange}
        variant='outlined'
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' ? {
            endAdornment : (
                <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                        {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                    </IconButton>
                </InputAdornment>
            ),
        } : null}
         />
    </Grid>
  )
}

export default Inputs