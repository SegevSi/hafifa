import { createError  } from 'http-json-errors'


const getData = async (url: string) => {
    const res = await fetch(url);

    const resData = await res.json()

    if (!res.ok) {
        throw createError(res.status, resData);
    }

    return resData;
};

// todo type method literal
const fetchWithBody = async (url: string, data = {}, method: string) => {
    const res = await fetch(url, {
        method: method,
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const resData = await res.json()

    if (!res.ok) {
        throw createError(res.status, resData);
    }

    return resData;
};

const patchData = async (url: string, data = {}) => {
    return await fetchWithBody(url, data, "PATCH");
};


const putData = async (url: string, data = {}) => {
    return await fetchWithBody(url, data, "PUT");
};

const postData = async (url: string, data = {}) => {
    return await fetchWithBody(url, data, "POST");
};

const deleteData = async (url: string, data = {}) => {
    return await fetchWithBody(url, data, "DELETE");
};

export { getData, patchData, putData, deleteData, postData}