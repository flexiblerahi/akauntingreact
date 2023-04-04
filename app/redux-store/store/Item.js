import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const baseURL = 'https://dev.otadjer.com/inventory-items?company_id=1&page=1&limit=10'

const Item = () => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.data);
};

useEffect(() => {
    if (data === null) {
        const itemData = async () => {
            const itemList = await axios(baseURL)
            dispatch({
                type: "update-data", payload: itemList.data
            });
        };
        itemData();
    }
}, [data])

export default Item;