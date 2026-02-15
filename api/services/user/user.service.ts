import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getUserData = () => {
    const token = Cookies.get("token")
    if (!token) return null
    const decodedToken = jwtDecode(token)
    console.log(decodedToken)
    return decodedToken
}