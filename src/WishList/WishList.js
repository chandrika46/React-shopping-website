
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WishList.css';

export default function WishList (){
    const wishList=JSON.parse(localStorage.getItem('wishList'));
    const [wishListUpdate,setWishListUpdate]=useState(wishList);
    const navigate=useNavigate();

    function handleRemove(id){
        let listAfterRemove=wishListUpdate;
        listAfterRemove=listAfterRemove.filter(item=>item.key!==id);
        setWishListUpdate(listAfterRemove);
        localStorage.setItem('wishList',JSON.stringify(listAfterRemove));
    }

    function handleNavigation(){
        navigate('/itemExlporer');
    }
    return(
        <div>
            <h2> Your WishList </h2> 
            <div className='wishList-item-conatiner'>
            {wishList.map(item=>(
                <div className='wishList-item'>
                    <div className='wishList-remove-button' onClick={()=>handleRemove(item.key)}>X</div>
                    <div>{item.productName}</div>
                    <div><span><b>Price :</b></span>{item.price}</div>
                    <div><span><b>Color :</b></span>{item.color}</div>
                </div>
            ))}
            </div>
            <button className='view-products' onClick={handleNavigation}>View Products</button>
        </div>
    )
}