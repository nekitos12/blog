// user
const usernameMinLength = 4
const usernameMaxLength = 20


export const usernameField ={
    label: "Username",
    name: "username",
    type: "text",
    rules: {
        required: 'Поле обязательное для заполнения' ,
        minLength: {
            value: usernameMinLength,
            message: `Введите имя длиной ${usernameMinLength} - ${usernameMaxLength} символов`
        },
        maxLength: {
            value: usernameMaxLength,
            message: `Введите имя длиной ${usernameMinLength} - ${usernameMaxLength} символов`
        },
    }
}

const passwordMinLength = 4
const passwordMaxLength = 20

export const passwordField ={
    label: "Password",
    name: "password",
    type: "password",
    rules: {
        required: 'Поле обязательное для заполнения',
        minLength: {
            value: passwordMinLength,
            message: `Введите пароль длиной ${passwordMinLength} - ${passwordMaxLength} символов`
        },
        maxLength: {
            value: passwordMaxLength,
            message: `Введите пароль длиной ${passwordMinLength} - ${passwordMaxLength} символов`
        },
    }
}

export const confirmPasswordField= {
    label: "Repeat Password",
    name: "confirmPassword",
    type: "password",
    rules: {
        required: true,
        validate: null
    }

}

export const emailField ={
    label: "Email",
    name: "email",
    type: "email",
    rules: {
        required: 'Введите корректный email',
    }
}


