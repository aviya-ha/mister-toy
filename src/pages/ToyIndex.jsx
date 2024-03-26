import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { ToysList } from '../cmps/ToysList.jsx'
import { loadToys, removeToy } from '../store/actions/toy.actions.js'



export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }


    if (!toys) return <h1>loading...</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the bast toys in on place</h1>
            <Link to="/toy/edit" ><button>Add new toy</button> </Link>
            <main>
                <ToysList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />

            </main>
        </section>
    )

}