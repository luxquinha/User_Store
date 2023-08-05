
function RodaPe(){
    let date = new Date()
    return(
        <div style={{backgroundColor: '#CCC'}}>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}

export default RodaPe