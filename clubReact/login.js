import React from "react";

const header = <header><h1>Login in your acount</h1></header>;

function Login() {
    return (
        <>
        {header}
        <main>
            <p>Enjor skating</p>
            <form>
                <label>Email: </label>
                <input type="email"/>
                <label>Password: </label>
                <input type="password"/>
                <button type="button">Login</button>
            </form>
        </main>
        </>
    )
}

export default Login;