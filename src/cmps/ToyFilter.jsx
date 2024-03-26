import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { ToySort } from "./ToySort.jsx"


export function ToyFilter({ filterBy, onSetFilter, onSetSort , sortBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter, 30))

    useEffectUpdate(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className="car-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                value={filterByToEdit.txt}
                onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                value={filterByToEdit.maxPrice || ''}
                onChange={handleChange}
                />

                <label htmlFor="inStock">by stock:</label>
                <select name="inStock" id="inStock" onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="inStock">In stock</option>
                    <option value="outStock">Out of stoke</option>
                </select>

                <ToySort onSetSort={onSetSort} sortBy={sortBy}/>



            </form>

        </section>
    )
}