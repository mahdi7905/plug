import React, {useState, useContext} from 'react'
import FileBase from 'react-file-base64'
import axios from 'axios'
import ProCard from '../../components/procard/ProCard'
import "./admin.css"
import { ProductContext } from '../../context/productContext'


const Admin = () => {
  const {dispatch, state:products} = useContext(ProductContext)
  const [product, setProduct]=useState({
    type:null,
    price:0,
    size:0,
    media:null
  })
  const createProduct = async ()=>{
    console.log(product)
    try {
      const {data} = await axios.post("http://localhost:7000/api/products/add-product",product)
      console.log("created product", data.product)
      dispatch({type:"NEW_PRODUCT", payload: data.product})
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <section>
      <div className="add-product-area">
        <div className="form-area">
          <input className='add-pro-inp' onChange={(e)=>setProduct({...product, type:e.target.value})} type="text" placeholder='Product Type'/>
          <input className='add-pro-inp' onChange={(e)=>setProduct({...product, price:e.target.value})} type="number" placeholder='Product price'/>
          <input className='add-pro-inp' onChange={(e)=>setProduct({...product, size:e.target.value})} type="number" placeholder='Product Size'/>
          <FileBase type='file' multiple={false} onDone={({base64}) => setProduct({...product, media: base64})}/>
          <button className='add-pro-btn' onClick={createProduct}>Add Product</button>
        </div>
        {
          product.media && (
            <img src={product.media || ""} alt="" style={{width:"200px", height:"200px", objectFit:"cover", margin:"10px auto"}}/>
          )
        }
      </div>
      <div className="products">
        {
        products.map(item=><ProCard key={item._id} type={item.type} media={item.media} size={item.size} price={item.price}/>)
      }
      </div>
      
    </section>
  )
}

export default Admin