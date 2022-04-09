import React from 'react';
import { TextField, Grid, InputAdornment, IconButton} from '@material-ui/core';

import Visibality from '@material-ui/icons/Visibility';
import VisibalityOff from '@material-ui/icons/VisibilityOff';


//why inside curly braces
const Input =({name, handleChange, label, half, autoFocus,type,handleShowPassword}) => {
  return (
    <Grid item xs={12} sm={half?6:12}>
      <TextField
      name={name}
      onChange={handleChange}
      variant='outlined'
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={name==='password' ? {
        endAdornment:(
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
                {type==='password'?<Visibality/>:<VisibalityOff/>}
            </IconButton>
          </InputAdornment>
                      )
                    }:null
                  }
      />
    </Grid>
      )
    }

export default Input;
