import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { removeProduct } from './reducers'

function Cart() {
    // const [data,setData]=useState()
    let data=useSelector((state)=>{
        return state.counterSlice.cart
    })
    const dispatch=useDispatch()
    // useEffect(()=>{
     
    // },[data])
    const delete_products=(id)=>{
         
       dispatch(removeProduct(id))
       
    }
  return (
    <div className="product">

    <div className="row">


        {
            data ?data.map((ele, index) => {

                return (<>


                    <div className="col-md-4 mt-2" key={index}>
                     {
                        console.log(ele)
                     }
                        <div className="card " style={{ width: "13rem" }}>
                            

                            <img src={ele.payload.image_url} class="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{ele.payload.name} </h5>
                                <p className="card-text">{ele.payload.description.substring(0, 45)}</p>
                                <p className="card-text">{ele.payload.price}/-</p>
                                <p className="card-title">Category:-{'>'}{ele.payload.category}/-</p>
                                <a  onClick={() => {
                                     delete_products(index)
                                }} className="btn btn-danger">Delete Product</a>
                            



                            </div>
                        </div>
                    </div>
                </>

                )

            }) : (<></>)

        }



     



    </div>
</div>


  )
}

export default Cart