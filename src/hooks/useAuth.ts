export function useAuth(){

    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (!user) return {isAuthLocal: false}
    const { email,  token, username, image } = user
    return {
        isAuthLocal: true,
        email,
        token,
        username,
        image
    }
}