
function RodaPe(){
    let date = new Date()
    return(
        <div style={{backgroundColor: '#CCC', textAlign: 'center'}}>
            <p>{date.toLocaleTimeString()}</p>
        </div>
    )
}

export default RodaPe