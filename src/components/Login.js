import React from 'react'
import loginService from "../services/login";
import blogService from '../services/blogs'

const Login = ({ username, setUsername, password, setPassword, user, setUser, setErrorMessage }) => {

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })

            // tallennetaan käyttäjä selaimen local storageen istunnon ajaksi
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        }
        catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    return(
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default Login