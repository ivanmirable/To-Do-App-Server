import { body } from "express-validator";
 
export const loginValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min:5}),
]

 
export const registerValidation = [
    body('email', 'неверный формат почты').isEmail(),
    body('password', 'Пароль должен содержать не менее 5 символов').isLength({min:5}),
    body('fullName', 'Укажите имя').isLength({min:3}),
    body('avatarUrl', 'Неверная ссылка на картинку').optional().isURL(),
]

export const noteCreateValidation = [
    body('tittle','Нету заголовка').isLength({min:3}).isString(),
    body('description', 'Введите текст заметки').isLength({min:3}).isString(),
    body('completed', 'Укажите имя').isLength({min:3}),
    body('tags', 'Неверный формат тэгов').optional().isString(),
]