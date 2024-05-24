 
 
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react' 


const AddProduct = () => {

const [image,setImage] = useState(false);
 
    const [productDetails ,setProductDetails ] = useState({
        name:"",
        image:"",
        category:"",
        new_price:"",
        old_price:"",
        
        })
        
const imageHandler = (e) =>{
    setImage(e.target.files[0]);
    
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
}
const Add_Product = async () => {
  try {
      const formData = new FormData();
      formData.append('product', image);
   

      const uploadResponse = await fetch('http://localhost:4000/upload', {
          method:"POST",
          body:formData,
      });

      if (!uploadResponse.ok) {
          throw new Error('Image upload failed');
      }

      const uploadData = await uploadResponse.json();
      const product = { ...productDetails, image: uploadData.image_url };

      const addProductResponse = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify(product),
      });

      if (!addProductResponse.ok) {
          throw new Error('Product addition failed');
      }

      const addProductData = await addProductResponse.json();
      if (addProductData.success) {
          alert("Product Added Successfully");
      } else {
          throw new Error('Product addition failed');
      }
  } catch (error) {
      console.error('Error:', error);
      alert("Failed to add product. Please try again later.");
  }
}

  return (
    <div className='add-product'>
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
            <p>Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
        </div>
        <div className="addproduct-itemfield">
            <p>Offer Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='addproduct-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area}  className='addproduct-thumbnail-img'  alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input"  hidden/>
      </div>
      <button onClick={()=>{Add_Product()}} className='product-btn'> ADD</button>
    </div>
  )
}

export default AddProduct
