import React from 'react'

const Note = ({ content, clearEntry }) => {
    return (
        <li>{content.de}. {content.en}, {content.ru} <button id={content.id} onClick={clearEntry}>Delete</button> </li>
    )
}

export default Note