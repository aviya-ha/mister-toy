


export function ToyPreview({ toy }) {

    return <>
        
        <img src={toy.img}  />
        <h1>{toy.name}</h1>
        <h3>{toy.price}$</h3>
    </>
}