import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'


function Account() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return <>
        <section className="heading">
            <h1>Welcome {user && user.name}</h1>
            <p>Account</p>
        </section>
        <section className="content">
            <h2>Personal Details</h2>
            <div className="note">
                    <b>Name :</b> <i>{user && user.name}</i>
            </div>
            <div className="note">
                    <b>Email :</b> <i>{user && user.email}</i>
            </div>
            
        </section>
    </>
}

export default Account