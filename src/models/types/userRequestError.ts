export enum UserFormError {
    userNotFound = 'user-not-found',
    wrongPassword = 'wrong-password',
    emailInUse = 'email-already-in-use',
}

export enum UserFormErrorMessage {
    userNotFound = 'Пользователь с указанным email не зарегистрирован',
    wrongPassword = 'Неверный пароль',
    emailInUse = 'Пользователь с указанным email уже зарегистрирован'
}