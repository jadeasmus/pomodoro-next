import { supabase } from '../utils/supabase'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Logout() {
    
    const router = useRouter()

    useEffect(() => {
        const logout = async () => {
            await supabase.auth.signOut();
            router.push('/')
        } 

        logout()

    }, [])

    return (
        <p>Logging out ...</p>
    )
}