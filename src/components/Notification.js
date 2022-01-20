import React from 'react'


export default function Notification() {

    const showNotification = () => {
        const notification = new Notification('Timer is up!', {
            body: 'Look away from the screen and take your break.'
        })
    }

    if (Notification.permission === 'granted') {
        showNotification()

    } else if (Notification.permission !== 'denied') { // permission is default
        Notification.requestPermission().then(permission => {
            console.log(permission)
            if(permission === 'granted') {
                showNotification()
            }

        })
    }


    return (
        <div>
            
        </div>
    )
}
