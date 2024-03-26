import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'


import { ToysList } from '../cmps/ToysList.jsx'
import { loadToys } from '../store/actions/toy.actions.js'



export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)

    useEffect(() => {
        loadToys()
            .catch(err => {
                showErrorMsg('Cannot load toys!')
            })
    }, [])


if (!toys) return <h1>loading...</h1>
    return (
        <section className='toy-index-container'>
            <h1>All the bast toys in on place</h1>
            <main>
                <ToysList
                    toys={toys}
                />

            </main>
        </section>
    )

}