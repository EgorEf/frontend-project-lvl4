const getUserDataFromLocalStorage = () => JSON.parse(localStorage.getItem('user')) || {};

export const getUsername = () => {
    const userDataFromLocalStorage = getUserDataFromLocalStorage();
    return userDataFromLocalStorage?.username || null;
};

export const getToken = () => {
    const userDataFromLocalStorage = getUserDataFromLocalStorage();
    return userDataFromLocalStorage?.token || null;
};
