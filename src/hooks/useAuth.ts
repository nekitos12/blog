export function useAuth(){

    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) return {isAuthLocal: false}
    const { email, accessToken, uid } = user
    console.log(email)
    return {
        isAuthLocal: true,
        email,
        accessToken,
        uid
    }
}