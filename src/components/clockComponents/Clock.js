import React, { useState, useEffect } from 'react'

let Clock = () => {
    const [clock, setClock] = useState(new Date().toLocaleTimeString([], { timeStyle: 'medium' }))
    let ticking = () => {
        setInterval(() => setClock(new Date().toLocaleTimeString([],
            { timeStyle: 'medium' })), 1000)
    }

    useEffect(() => {
        ticking()
        return () => {
            clearInterval(setClock())
        }
    }, [])
    return (
        <div className="clock">
            <h2>{clock}</h2>
        </div>
    )
}

export default Clock