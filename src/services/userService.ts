import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// import {IArticle} from "../models/types/article";

interface NewUserRequest {
    username: string
    email:string
    password: string
}

interface UserResponse {
    username: string
    email:string
    bio?: string
    image?: string
    token: string
}

interface LoginUserRequest {
    email:string
    password: string
}

interface GetUserRequest {
    token: string
    body: {
        username?: string
        email?:string
        bio?: string
        image?: string
    }
}
interface UpdateUserResponse {
    data: {
        user: {
            username?: string
            email?: string
            bio?: string
            image?: string
        };
    }

}



export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({baseUrl: 'https://blog.kata.academy:/api/'}),
    tagTypes: ['user'],
    endpoints: (build) => ({
        setNewUser: build.mutation<UserResponse, NewUserRequest>({
            query: (body) => ({
                    url: '/users',
                    method: 'POST',
                    body: {user: body}
            }),
            invalidatesTags: ['user']
        }),
        loginUser: build.mutation<UserResponse, LoginUserRequest>({
            query: (body) => ({
                url:`/users/login`,
                method: 'POST',
                body: {user: body},

            }),
            invalidatesTags: ['user']
        }),
        getCurrentUser: build.mutation<UserResponse, GetUserRequest>({
            query: (token) => {
                return {
                    url: '/user',
                    headers: {
                        Authorization: `Token ${token}`
                    }
                }
            },
        }),
        updateUser: build.mutation<UpdateUserResponse, GetUserRequest>({
            query: ({body, token}) => {
                return {
                    url: '/user',
                    method: 'PUT',
                    headers: {
                        Authorization: `Token ${token}`
                    },
                    body: {user: body}
                }
            },
        }),
    })
})

export const { useSetNewUserMutation, useLoginUserMutation, useGetCurrentUserMutation, useUpdateUserMutation } = userAPI