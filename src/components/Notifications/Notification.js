import React from 'react'
import { useEffect, useState } from 'react'

export default function Notification(props) {
    const [width, setWidth] = useState(0)
    const [intervalID, setIntervalID] = useState(null)
    const [exit, setExit] = useState(false)

    const handleNotificationTimer = () => {
        const id = setInterval(() => {
            setWidth((prev) => {
                if (prev < 100) {
                    return prev + 0.5
                }
                clearInterval(id)
                return prev
            })
        }, 20) // .5 * 200iterations to get to 100% width, 200*20=4000 => 4 second long notif

        setIntervalID(id)
    }

    const handlePauseTimer = () => {
        clearInterval(intervalID)
    }

    useEffect(() => {
        handleNotificationTimer()
    }, [])

    const handleCloseNotification = () => {
        handlePauseTimer() // clear the interval
        setExit(true)
        setTimeout(() => {
            // remove state from the dom
            props.dispatch({
                type: 'REMOVE_NOTIFICATION',
                id: props.id,
            })
        }, 400) // 

    }

    useEffect(() => {
        if (width === 100) {
            handleCloseNotification()
        }
    }, [width]) // each time width updates, check if at 100 

    return (
        <div onMouseEnter={ handlePauseTimer } onMouseLeave={ handleNotificationTimer }>
            {/* Notif title & message */}
            <div className="p-2 w-80">
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
