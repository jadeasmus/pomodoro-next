import React from 'react'
import { useEffect, useState } from 'react'

export default function Notification(props) {
    const [width, setWidth] = useState(0)
    const [intervalID, setIntervalID] = useState(null)

    const handleNotifTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5
                } else {
                    return prev
                }
            })
        }, 20) // .5 * 200iterations to get to 100% width, 200*20=4000 => 4 second long notif

        setIntervalID(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalID)
    }

    useEffect(() => {
        handleNotifTimer()
    }, [])

    return (
        <div onMouseEnter={ handlePauseTimer } onMouseLeave={ handleNotifTimer }>
            {/* Notif title & message */}
            <div className="p-2">
                <p className="font-bold">
                    {props.title}
                </p>
                <p className="pt-2">
                    {props.message}
                </p>
            </div>

            {/* Progress bar */}
            <div className="h-2 bg-red-400 mt-1" style={{width: `${width}%`}}></div>

        </div>
    )
}
