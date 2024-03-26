import { ToyPreview } from "./ToyPreview.jsx"



export function ToysList({ toys }) {

    return (
        <ul className="toy-list clean-list">
            {toys.map(toy =>

                <li className="toy-preview" key={toy._id}>
                    <ToyPreview toy={toy} />
                    <div>
                        <button>x</button>
                        <button>Edit</button>
                    </div>

                    <button className="buy">
                        Add to Cart
                    </button>
                </li>

            )

            }
        </ul>
    )
}