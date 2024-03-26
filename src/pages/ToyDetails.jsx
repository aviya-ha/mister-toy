import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service.js"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()


    useEffect(() => {
        if (toyId) loadtoy()
    }, [])

    function loadtoy() {
        toyService.getById(toyId)
            .then(toy => setToy(toy))
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }
    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p>⛐</p>
            {toy.desc &&
                <p>{toy.desc}</p>
            }
            {!toy.desc &&
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
            }
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;
            <Link to={`/toy`}>Back</Link>
        </section>
    )
}