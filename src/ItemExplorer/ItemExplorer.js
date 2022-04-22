// import Data from '../data.json';
import {v4 as uuid} from 'uuid';
import React, { useState, useEffect } from 'react';
import './ItemExplorer.css';

const Data = [
    {
        "productName":"Shoes",
        "price":100,
        "rating":4,
        "image": require('../assets/shoes.jpg'),
        "quantity":1,
        "category":"clothing",
        "color":"black"
    },
    {
        "productName":"Carrot",
        "price":50,
        "rating":4,
        "image":require('../assets/carrot.jpg'),
        "quantity":1,
        "category":"grocery",
        "color":"orange"
    },
    {
        "productName":"Apple",
        "price":100,
        "rating":5,
        "image":require('../assets/apple.jpg'),
        "quantity":1,
        "category":"grocery",
        "color":"red"
    },
    {
        "productName":"Switchboard",
        "price":500,
        "rating":4.5,
        "image":require('../assets/switchboard.jpg'),
        "quantity":1,
        "category":"electrical",
        "color":"white"
    },
    {
        "productName":"Chair",
        "price":600,
        "rating":4,
        "image":require('../assets/chair.jpg'),
        "quantity":1,
        "category":"furniture",
        "color":"white"
    },
    {
        "productName":"Table",
        "price":4000,
        "rating":4.8,
        "image":require('../assets/table.jpg'),
        "quantity":1,
        "category":"furniture",
        "color":"brown"
    },
    {
        "productName":"TubeLight",
        "price":100,
        "rating":5,
        "image":require('../assets/tubelight.jpg'),
        "quantity":1,
        "category":"electrical",
        "color":"white"
    },
    {
        "productName":"Shirt",
        "price":800,
        "rating":4,
        "image":require('../assets/shirt.jpg'),
        "quantity":1,
        "category":"clothing",
        "color":"blue"
    },
    {
        "productName":"Thava",
        "price":900,
        "rating":4,
        "image":require('../assets/thava.jpg'),
        "quantity":1,
        "category":"kitchen",
        "color":"black"
    },
    {
        "productName":"Grinder",
        "price":1000,
        "rating":4,
        "image":require('../assets/grinder.jpg'),
        "quantity":1,
        "category":"kitchen",
        "color":"red"
    },
    {
        "productName":"Phone",
        "price":20000,
        "rating":4,
        "image":require('../assets/phone.jpg'),
        "quantity":1,
        "category":"electronics",
        "color":"black"
    },
    {
        "productName":"Laptop",
        "price":50000,
        "rating":4.7,
        "image":require('../assets/laptop.jpg'),
        "quantity":0,
        "category":"electronics",
        "color":"silver"
    }
]


export default function ItemExplorer(props){
    const [ loader, setIsLoader ] = useState(true);
    const [filteredItem,setFilteredItem]=useState('');
    const showAdd =props.loggedUser;
    const itemList = Data.map(item=>({...item, key:uuid()}));
    useEffect(() => {
        setTimeout(() => setIsLoader(false), 1000)
      }, []);

      function handleOnClick(selectedItem){
          let cartList=JSON.parse(localStorage.getItem('cartList') || '[]' );
          cartList.push(selectedItem);
          localStorage.setItem('cartList',JSON.stringify(cartList));
          window.alert(`${selectedItem.productName} added to cart`);
          //props.AddToCarts(selectedItem);
      }

      function handleFilter(event){
        setFilteredItem(event.target.value);
        console.log(filteredItem);
    }

      function handleWishList(wishListItem){
          const wishList=JSON.parse(localStorage.getItem('wishList') || '[]' );
           let hasDuplicte=wishList.some((item)=>{
                return wishListItem.productName === item.productName;
           })
           if(!hasDuplicte){
               wishList.push(wishListItem);
           }
          localStorage.setItem('wishList',JSON.stringify(wishList));
      }
    return(
        <div className='item-explorer-container'>
            <h2>Items Explorer</h2>
            <div className='search-bar'>
               <input type='text' onChange={handleFilter} value={filteredItem} placeholder="Search" />
            </div>
            <ul className='Item-list'>
            {loader && <h1>Loading...</h1>}
            {!loader && itemList.filter(item=>{
                   if(filteredItem==='')
                   return item;
                   else if(item.productName.toLowerCase().includes(filteredItem.toLowerCase()))
                   return item;
            }).map(item=>(
                <div className='items' key={item.key}>
                   <div className='item-image'><img src={item.image} /></div>
                   <h4>{item.productName}</h4>
                   <div>Price : {item.price}</div>
                   <div>Rating : {item.rating}</div>
                   <div>Quantity : {item?.quantity}</div>
                   <div>Category : {item.category}</div>
                   <div>Color : {item?.color}</div>
                   <div className='cart-add-fav-buttons'>
                   {showAdd && <button className='add-cart-button' onClick={()=>handleOnClick(item)}>Add +</button>}
                   {showAdd && <i className="favorite fa-regular fa-heart" onClick={()=>handleWishList(item)}></i>}
                   </div>
               </div>
            ))}
            </ul>
        </div>
    )
}