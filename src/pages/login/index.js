import React from "react";
import { Link } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import toast from "react-hot-toast";

function Login() {
    const [user, setUser] = React.useState({
        email: '',
        password: '',
    })

    const loginUser = async () => {
        try {
            const response = await LoginUser(user);
            if(response.success) {
                toast.success(response.message);
                localStorage.setItem("token", response.data);
                window.location.href = "/";
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="h-screen bg-primary flex items-center justify-center">
            <div className="bg-white shadow-md p-5 flex flex-col gap-5 w-96">
                <h1 className="text-2xl uppercase">NAT Chat - Login</h1>
                <hr/>
                <input type="text"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Enter your email"
                />
                <input type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Enter your password"
                />

                <button className="contained-btn" onClick={loginUser}>
                    Login
                </button>

                <Link to="/register" className="underline">
                    Don't have an account? Register
                </Link>
            </div>
        </div>
    )
}

export default Login