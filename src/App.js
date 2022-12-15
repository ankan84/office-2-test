
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

import axios from 'axios'
const baseUrl = `http://localhost:5000`


function App() {

  const [data, setData] = useState()
  const [submitPage, setSubmitPage] = useState(true)
  const [id, setId] = useState()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image_url, setImageUrl] = useState('')
  const [loader, setLoader] = useState(false)
  const formData = new FormData();
  formData.append('id', id)
  formData.append('name', name);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('price', price);
  formData.append('image_url', image_url);



  useEffect(() => {
    axios.get(`${baseUrl}/get/products`, () => {

    }).then((response) => {
      setData(response.data)
    }).catch(() => {

    })
  }, [loader])

  const create_products = (e) => {



    e.preventDefault()

    setLoader(true)
    if (submitPage === true) {
      axios.post(`${baseUrl}/create/products`, formData).then((response) => {
        if (response.status === 200) {
          setLoader(false)
        } else {
          setLoader(false)
        }

      }).catch(() => {
        setLoader(false)
      })
    } else {

      axios.put(`${baseUrl}/edit/products`, formData).then((response) => {
        if (response.status === 200) {

          setLoader(false)
        } else {
          setLoader(false)
        }

      }).catch(() => {
        setLoader(false)
      })
    }


  }

  const edit_product = (_id) => {
    setSubmitPage(false)
    axios.post(`${baseUrl}/get/productsbyid`, { _id }).then((response) => {
      setId(response.data._id)
      setName(response.data.name)
      setDescription(response.data.description)
      setCategory(response.data.category)
      setPrice(response.data.price)

    }).catch((e) => {

    })
  }


  const delete_products = (_id) => {

    axios.delete(`${baseUrl}/delete/products`, { _id }).then((response) => {

      if (response.status === 200) {

        axios.get(`${baseUrl}/get/products`, () => {

        }).then((response) => {
          setData(response.data)
        }).catch(() => {

        })
      }
    }).catch((e) => {

    })
  }

  return (
    <div className="main-div">

      <div className="content-div">
        <div className="left">
          <h4>Product list</h4>
          {
            data && data.length === 0 ? <p>Empty products Add now</p> : <></>
          }


          <div className="product">

            <div className="row">

              {
                data ? data.map((ele, index) => {

                  return (<>


                    <div className="col-md-4 mt-2" key={ele._id}>
                      <div className="card " style={{ width: "13rem" }}>
                        <div className="icon" onClick={() => {
                          edit_product(ele._id)
                        }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                          </svg>
                        </div>

                        <img src={ele.image_url} class="card-img-top" alt="..." />
                        <div className="card-body">
                          <h5 className="card-title">{ele.name} </h5>
                          <p className="card-text">{ele.description.substring(0, 45)}</p>
                          <p className="card-text">{ele.price}/-</p>
                          <p className="card-title">Category:-{'>'}{ele.category}/-</p>
                          <a href="#" onClick={()=>{
                            delete_products(ele._id)
                          }} className="btn btn-danger">Go somewhere</a>



                        </div>
                      </div>
                    </div>
                  </>

                  )

                }) : (<></>)

              }







            </div>
          </div>
        </div>
        <div className="right">
          {submitPage ? <h4>Add product</h4> : <h4>Update product</h4>
          }
          {loader != true ?
            <div className="add-product">
              <form onSubmit={create_products}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">Product Name</label>
                  <input type="text" onChange={(e) => {
                    setName(e.target.value)
                  }} value={name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Product Description</label>
                  <input type="text" onChange={(e) => {
                    setDescription(e.target.value)
                  }} value={description} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Category :-{'>'} </label>
                  <select name="" id="" value={category} onChange={(e) => {
                    setCategory(e.target.value)
                  }} >
                    <option value="Electronics">Electronics</option>
                    <option value="Home">Home </option>
                    <option value="Mobile">Mobile</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Grocery">Grocery</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Price</label>
                  <input type="text" onChange={(e) => {
                    setPrice(e.target.value)
                  }} value={price} className="form-control" id="exampleInputPassword1" />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Image</label>
                  <input type="file" onChange={(e) => {
                    setImageUrl(e.target.files[0])
                  }} className="form-control" id="exampleInputPassword1" />
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
              <button style={{ marginTop: "10px", border: "none" }} onClick={() => {
                setSubmitPage(true)
              }}>GO TO ADD  PRODUCT</button>
            </div>


            : <>loding...</>
          }
        </div>
      </div>
    </div>

  )
}

export default App