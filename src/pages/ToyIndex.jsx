import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToysList } from '../cmps/ToysList.jsx'
import { loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'



export function ToyIndex() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }


    if (!toys) return <h1>loading...</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the bast toys in on place</h1>
            {user && user.isAdmin && <Link to="/toy/edit" ><button>Add new toy</button> </Link>}
            <ToyFilter
                onSetFilter={onSetFilter} filterBy={filterBy}
            />
            <main>
                <ToysList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                    user={user}
                />

            </main>
        </section>
    )

}