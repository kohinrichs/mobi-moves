import React from "react"
import { useHistory } from "react-router-dom"
import "./Move.css"

export const MoveCard = ({ move }, { MoveForForm }) => {

const history = useHistory()

 const handleClick = (event) => {
     debugger
     MoveForForm(event.target.value)
}

    return (
        <section className="move">
            <h3 className="move__name">{move.name}</h3>
            <button onClick={() => {
                history.push(`/moves/detail/${move.id}`)
            }}>Details</button>

             <button value={`${move.id}`} onClick={handleClick}>Add to Workout</button>

        </section>
    )
}

// class MoveCard extends React.Component {

//     someFn = () => {
//         let ListInfo = 
//         this.props.callbackFromParent(listInfo);
//         },
//         render () {
//             [...]
//         }
// }