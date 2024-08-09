import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from 'axios';
import { toast } from "react-toastify";

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevData) => {
        return {...prevData, [name]: value};
    });
  };

//   useEffect(() => {
//     console.log(formData)
//   }, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const _FormData = new FormData();
        _FormData.append('name', formData.name);
        _FormData.append('description', formData.description);
        _FormData.append('price', Number(formData.price));
        _FormData.append('category', formData.category);
        _FormData.append('image', image);

        const response = await axios.post(`${url}/api/food/add`, _FormData);
        if (response.data.success) {
            setFormData({
                name: '',
                description: '',
                price: '',
                category: 'Salad',
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
            console.log('Error occured during upload!');
        }
    }

  return (
    <div className="add">
      <form onSubmit={handleSubmit} className="flex-col">
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload area" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={formData.name} type="text" name="name" placeholder="Type here" />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={formData.description}
            name="description"
            rows={"6"}
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select name="category" onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noddles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={formData.price} type="number" name="price" placeholder="$20" />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
