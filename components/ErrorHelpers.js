import Store from './Store'

export const handleErrors = (response, saveToken) => {
    if (!response.ok) {
        throw response;
    }
    if (saveToken) {
        Store("set", "token", response.headers.get("Authorization"))
    }
    return response.json();
}