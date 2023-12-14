import { jwtDecode } from "jwt-decode"

export function getAuthToken() {
    const token = localStorage.getItem('token');
  
    return token;
}

export function tokenLoader() {
    const token = getAuthToken();
    return token;
}

export function getUserID() {
    const token  = localStorage.getItem('token');
    if(token) {
        try {
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;
            return userId;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return null;
}