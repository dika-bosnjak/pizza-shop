import axios from "axios";

const API_URL = '/order'


//CREATE ORDER
const createOrder = async (orderData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(`${API_URL}`,  orderData, config)
    return response.data.data
}

//GET ORDERS FOR USER
const getOrdersForUser = async (token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/userOrders`, config)
    return response.data.orders
}

//GET SINGLE ORDER
const getSingleOrder = async (id, token) =>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(`${API_URL}/${id}`, config)
    return response.data
}


const orderService = {
    createOrder,
    getOrdersForUser,
    getSingleOrder
}



export default orderService