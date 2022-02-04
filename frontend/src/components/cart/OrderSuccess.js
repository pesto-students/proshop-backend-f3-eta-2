import React, { Fragment, useEffect } from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Link } from 'react-router-dom'
import { CLEAR_CART_ITEMS } from '../../constants/cartConstants'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
    const dispatch = useDispatch()
    const newOrder = useSelector((state) => state.newOrder)
    const { success} = newOrder

    useEffect(()=> {
        if(success){
            dispatch({type: CLEAR_CART_ITEMS })
        }
    })
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/order_success.png" alt="Order Success" width="200" height="200" />

                    <h2>Your Order has been placed successfully.</h2>

                    <Link to="/orders/me">Go to Orders</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
