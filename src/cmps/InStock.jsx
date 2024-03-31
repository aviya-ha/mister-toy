import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export function InStock({ handleChange, inStock }) {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">In Stock</InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={inStock}
                label=""
                onChange={handleChange}
                name="inStock"
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
            </Select>
        </FormControl>
    );
}