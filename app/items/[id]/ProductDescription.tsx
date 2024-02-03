export default function ProductDescription({stub}:{stub: any}){
    return(
        <main>
            <h2>{stub?.productName}</h2>
            <h4>Description</h4>
            <br/>
            <p>{stub?.description}</p>
            <br/>
            {/* currency is not shown */}
            <strong>Price: {stub?.productPrice}</strong>
            <br/>
            <strong>Tag: </strong>{stub?.productTag}
        </main>
    )
}