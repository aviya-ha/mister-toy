import { useEffect, useState } from "react"


export function ToySort({ onSetSort, sortBy }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })
    
    useEffect(() => {
        onSetSort(sortByToEdit)

    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        
        setSortByToEdit(prevSort => ({
            ...prevSort,
            [field]: value,
        }))
    }

     function handleChangeCheckbox({ target }){
        const field = target.name
        const checked = target.checked

        setSortByToEdit(prevSort => ({
            ...prevSort,
            [field]: checked,
        }))
     }

    return (<>
        <select
            className="sort-type"
            name="type"
            value={sortByToEdit.type}
            onChange={handleChange}
        >
            <option value={''}>----</option>
            <option value="createAt">Date</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>
        <label>
            <input
                type="checkbox"
                name="desc"
                checked={sortByToEdit.desc > 0}
                onChange={handleChangeCheckbox}
            />
            Descending
        </label>
    </>
    )
}
