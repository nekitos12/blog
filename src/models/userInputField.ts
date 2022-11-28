// user
const usernameMinLength = 3
const usernameMaxLength = 20

export const usernameField = {
  label: 'Username',
  name: 'username',
  type: 'text',
  rules: {
    required: 'Поле обязательное для заполнения',
    minLength: {
      value: usernameMinLength,
      message: `Введите имя длиной ${usernameMinLength} - ${usernameMaxLength} символов`,
    },
    maxLength: {
      value: usernameMaxLength,
      message: `Введите имя длиной ${usernameMinLength} - ${usernameMaxLength} символов`,
    },
  },
}

const passwordMinLength = 6
const passwordMaxLength = 40

export const passwordField = {
  label: 'Password',
  name: 'password',
  type: 'password',
  rules: {
    required: 'Поле обязательное для заполнения',
    minLength: {
      value: passwordMinLength,
      message: `Введите пароль длиной ${passwordMinLength} - ${passwordMaxLength} символов`,
    },
    maxLength: {
      value: passwordMaxLength,
      message: `Введите пароль длиной ${passwordMinLength} - ${passwordMaxLength} символов`,
    },
  },
}

export const newPasswordField = {
  label: 'New password',
  name: 'newPassword',
  type: 'password',
  rules: {
    required: 'Поле обязательное для заполнения',
    minLength: {
      value: passwordMinLength,
      message: `Введите пароль длиной ${passwordMinLength} - ${passwordMaxLength} символов`,
    },
    maxLength: {
      value: passwordMaxLength,
      message: `Введите пароль длиной ${passwordMinLength} - ${passwordMaxLength} символов`,
    },
  },
}

export const confirmPasswordField = {
  label: 'Repeat Password',
  name: 'confirmPassword',
  type: 'password',
  rules: {
    required: true,
    validate: null,
  },
}

export const emailField = {
  label: 'Email address',
  name: 'email',
  type: 'email',
  rules: {
    required: 'Введите корректный email',
  },
}

export const avatarField = {
  label: 'Avatar image (url)',
  name: 'avatarURL',
  type: 'url',
  rules: {
    required: false,
    pattern: {
      value: 'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)',
      message: 'invalid url address',
    },
  },
}
