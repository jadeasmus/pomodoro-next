import React from 'react'
import {v4} from 'uuid'
import Notification from './Notification'

const NotificationProvider = (props) => {

    const notifications = [
        {
            id: v4(), // generates random str for unique id
            title: 'Work timer is up!',
            message: 'Look away from the screen and take your break 🙌'
        },
    ]

    // console.log(notifications)

    return (
        <div className='relative'>
            <div className='fixed top-3 right-3 w-80 bg-white rounded-xl shadow-md overflow-hidden animate-slide'>
                {notifications.map(notif => {
                    return < Notification key={notif.id} {...notif} /> // ...notif (spreading) means all properties are passed in as props
                })}
                {/* <p>Hello world</p> */}
            </div>
            {props.children}
        </div>
    )
}

export default NotificationProvider;
