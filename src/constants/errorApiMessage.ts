export type HttpErrorKey = 'default' | number

const ERROR_API_MESSAGES = new Map<HttpErrorKey, string>([
    [400, 'data is invalid'],
    [401, 'something wrong, please login again'],
    [403, 'forbidden'],
    [404, 'not found'],
    [500, 'someting wrong, please try again later'],
    ['default', 'something wrong'],
])

export type ErrorApiMesages = typeof ERROR_API_MESSAGES

export { ERROR_API_MESSAGES }