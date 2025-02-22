import { useContext } from "react"
import { AuthContext } from "../Authprovider"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


const Login = () => {
    const {handleGoogleLogin} = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            await handleGoogleLogin();
            navigate("/"); 
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sign in successfully",
              showConfirmButton: false,
              timer: 1500
            });
        } catch (error) {
            console.error("Login Failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Sign in to Task Manager</h2>
            <button
              onClick={handleLogin}
              className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Sign in with Google
            </button>
          </div>
        </div>
    );
}

export default Login