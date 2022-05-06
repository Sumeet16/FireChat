import React, { useRef, useState, useEffect } from "react"
import axios from 'axios'
import { useHistory } from "react-router-dom"
import { ChatEngine } from 'react-chat-engine'
import { useAuth } from "../contexts/AuthContext"
import { auth } from "../firebase"

export default function Chats() {
    const didMountRef = useRef(false)
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        await auth.signOut()
        history.push("/")
    }

    async function getFile(url) {
        let response = await fetch(url);
        let data = await response.blob();
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true

            if (!user || user === null) {
                history.push("/")
                return
            }

            axios.get(
                'https://api.chatengine.io/users/me/',
                {
                    headers: {
                        "project-id": '9ad86cde-63bb-43bb-b8e0-2dc4b5c8cd8e',
                        "user-name": user.email,
                        "user-secret": user.uid
                    }
                }
            )

                .then(() => setLoading(false))

                .catch(e => {
                    let formdata = new FormData()
                    formdata.append('email', user.email)
                    formdata.append('username', user.email)
                    formdata.append('secret', user.uid)

                    getFile(user.photoURL)
                        .then(avatar => {
                            formdata.append('avatar', avatar, avatar.name)

                            axios.post(
                                'https://api.chatengine.io/users/',
                                formdata,
                                { headers: { "private-key": "a4482c7f-0957-4afe-854f-b420fe0a53fe" } }
                            )
                                .then(() => setLoading(false))
                                .catch(e => console.log('e', e.response))
                        })
                })

        }
    }, [user, history])


    if (!user || loading) return <div />

    return (
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    Firechat🔥
                </div>

                <div onClick={handleLogout} className='logout-tab'>
                    Logout
                </div>
            </div>

            <ChatEngine
                height='calc(100vh - 66px)'
                projectID='9ad86cde-63bb-43bb-b8e0-2dc4b5c8cd8e'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    )
}