import React from 'react'
import '../App.css'

const Screen = ({ screenState }) => {
    if (!screenState) {
        return null
    } else {
        return (
            <div className='screen'></div>
        )
    }
}

export default Screen