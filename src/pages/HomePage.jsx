

export function HomePage(){

const imgUrl = 'https://www.earthtoys.net/cdn/shop/files/NaturalWoodenCar2_1024x1024.webp?v=1683105655'
    
return (
        <section className="home-hero">
            <h1>Safe wooden toys for your child</h1>
            {<img src= {imgUrl} alt="wooden toy" />}
        </section >
    )
}