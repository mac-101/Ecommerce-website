import Products from "./product"

export default function Home() {
    
    return(
        <>
            <div>
                <div>
                    <Products group="first" limit={12} />
                    <Products group="second" limit={6}/>
                </div>
            </div>
        </>
    )
}