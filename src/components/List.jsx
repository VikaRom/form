import React from 'react';


const Card = ({data}) => {
    return (
        <div className="card">
            <p>{data.name}</p>
            <p>{data.email}</p>
            <p>{data.phone}</p>
            <p>{data.detals}</p>
        </div>
    )
}

const List = ({ list }) => {
    if (!list.length) return <h1>empty list of forms</h1>

    return (
        <div className="cards">
            {list.map(item => <Card data={item}/>)}
        </div>
    )
}
export default List