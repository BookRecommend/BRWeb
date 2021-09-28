import axios from 'axios';

const END_POINT = `${process.env.REACT_APP_END_POINT}`;

// 비동기 작업 함수
export const getBestseller = (code) => {
    return axios.get(`${END_POINT}/bestseller`, code);
}

export const getLibrarychart = (criteria) => {
    return axios.get(`${END_POINT}/library`, criteria);
}

export const getSearchresult = (criteria) => {
    return axios.get(`${END_POINT}/search`, criteria);
}

export const getUserinfo = (username) => {
    return axios.post(`${END_POINT}/member/login`, username);
}

export const getBookinfo = (criteria) => {
    return axios.get(`${END_POINT}/result`, criteria);
}

export const updateUserinfo = (user) => {
    return axios.put(`${END_POINT}/member`, user);
}

export const deleteSearchhistory = (book) => {
    return axios.delete(`${END_POINT}/member/history`, book);
}

export const deleteUser = (username) => {
    return axios.delete(`${END_POINT}/member`, username);
}