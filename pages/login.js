import {useEffect} from 'react'
import { supabase } from '../utils/supabase'

export default function login() {

    useEffect(() => {
        const login = async () => {
            await supabase.auth.signIn({
                provider: 'spotify'
            })
        }

        login()
        
    }, [])

    return (
        <p>Loggin in ...</p>
    )
}
