import {  useState} from 'react'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'



export function useSignup() {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (name,place,age,phone,education,email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:4000/api/user/signup',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name,place,age,phone,education,email, password})
            }
        )
        const json = await response.json()

        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
           alert('user registration successful')
           navigate('/login')
        }
 
    }


  return { signup, isLoading, error}
}


