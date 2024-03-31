import * as React from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export function ToySort({handleChange, sortBy}) {
  return (
    <FormControl sx={{m: 1, minWidth: 120}} size="small">
      <InputLabel id="demo-select-small-label">Sort By</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortBy}
        label=""
        onChange={handleChange}
        name="sortBy"
      >
        <MenuItem value="">
          <em>All</em>
        </MenuItem>
        <MenuItem value="name">Name</MenuItem>
        <MenuItem value="price">Price</MenuItem>
        <MenuItem value="createdAt">Created at</MenuItem>
      </Select>
    </FormControl>
  )
}
