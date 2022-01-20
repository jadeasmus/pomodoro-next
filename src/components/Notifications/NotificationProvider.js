import { useReducer, useState, useContext, createContext } from 'react'
import { v4 } from 'uuid'
import Notification from './Notification'


// make dispatch available to everything nested inside this component -> <App />
export const NotificationContext = createContext()

const NotificationProvider = (props) => { 
    // useReducer: a way to perform different logic on your state, depending on action 'type'
    // call dispatch() to set action
    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type) {
            case 'ADD_NOTIFICATION':
                return [...state, {...action.payload}] // spread in array of notif objects , spread in dispatch copy of notif obj
            case 'REMOVE_NOTIFICATION':
                return state.filter(e => { e.id !== action.id }) // if curr id matches dispatch id it will return false and be removed from the state
            default:
                return state
        }
    }, [
        {
            id: v4(), // generates random str for unique id
            type: 'BREAK',
            title: 'Work timer is up!',
            message: 'Look away from the screen and take your break 🙌'
        },
        // {
        //     id: v4(), // generates random str for unique id
        //     type: 'WORK',
        //     title: 'Break timer is up!',
        //     message: 'Take a deep breath. Get back into flow. 👊'
        // }
    ])


    // console.log(notifications)

    return (
        <NotificationContext.Provider value={ dispatch } className='relative'>
            <div className='fixed top-3 right-3 w-80 bg-white rounded-xl shadow-md overflow-hidden'>
                {state.map(notif => {
                    return < Notification dispatch={dispatch} key={notif.id} {...notif} /> // ...notif (spreading) means all properties are passed in as props
                })}
                {/* <p>Hello world</p> */}
            </div>
            {props.children}
        </NotificationContext.Provider>
    )
}

export default NotificationProvider;
