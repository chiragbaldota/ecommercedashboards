import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () =>{
    const [products,setProducts] = useState([])

    useEffect(()=>{
       getProduct();
    },[])

    const getProduct = async()=>{
      let result = await fetch('http://localhost:5000/products',{
        headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      });
      result = await result.json();
      setProducts(result)
    }
    console.warn("products",products)

    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        if(result)
        {
            getProduct();
        }
    }

    const searchHandle = async (event)=>{
        console.warn(event.target.value)
        let key = event.target.value;
        if(key)
        {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            })
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else
        {
            getProduct()
        }
        
    }

    return(
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" className="search-product" placeholder="Search Products" onChange={searchHandle} />
            <ul>
                <li><b>S. No</b></li>
                <li><b>Name</b></li>
                <li><b>Price</b></li>
                <li><b>Category</b></li>
                <li><b>Operation</b></li>
            </ul>
            
            {
     products.length>0 ? products.map((item,index)=>
            <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>Rs {item.price}</li>
                <li>{item.category}</li>
                <li><button onClick={()=>deleteProduct(item._id)}>Delete</button>
                <Link to={"/update/"+item._id}>Update</Link>
                </li>
            </ul>
                )
                :<h1>No Product found</h1>
            }
        </div>
    )
}

export default ProductList;