import axios from "../../utils/axios";

export const getTransactions = async ({ tType, tSearch }) => {
    let queryString = "";

    if (tType !== "") {
        queryString += `&type=${tType}`;
    }
    if (tSearch !== "") {
        queryString += `&name_like=${tSearch}`;
    }
    const response = await axios.get(`/transactions/?_sort=id&_order=desc${queryString}`);

    return response.data;
};

export const addTransaction = async (data) => {
    const response = await axios.post("/transactions", data);

    return response.data;
};

export const editTransaction = async (id, data) => {
    const response = await axios.put(`/transactions/${id}`, data);

    return response.data;
};

export const deleteTransaction = async (id) => {
    const response = axios.delete(`/transactions/${id}`);

    return response.data;
};
