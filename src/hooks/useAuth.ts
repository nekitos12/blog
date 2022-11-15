import {useAppSelector} from "./useTypedSelector";


export function useAuth(){
    const { email, accessToken, uid } = useAppSelector(state => state.user)
    return {
        isAuth: !!email,
        email,
        accessToken,
        uid
    }
}