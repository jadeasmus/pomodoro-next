import {useEffect} from 'react'
import { supabase } from '../utils/supabase'

export default function login() {

    useEffect(() => {
        supabase.auth.signIn({
            provider: 'spotify'
        })
    }, [])

    return (
        <p>Loggin in ...</p>
    )
}
