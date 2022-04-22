import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './DashBoard.css';

export default function DashBoard(props){
    const data=props.loggedInuser;
    const [showModal,setShowModal]=useState(false);
    const [isEditing,setISEditing]=useState(false);
    const [showAddress,setShowAddress]=useState(false);
     const [editAddress,SetEditAddress] =useState(data.address);
    const navigate = useNavigate();

    function showModalHandler(){
        setShowModal(true);
    }

    function handleModal(){
        setShowModal(false);
        setShowAddress(false);
    }
    function handleEdit(){
        setISEditing(true);
    }

    function handleAddressChange(){
        setShowAddress(true);
    }
    function handleAddressEdit(event){
        SetEditAddress(event.target.value);
    }
    function handleEditedValue(){
         console.log(editAddress);
         data['address']=editAddress;
         localStorage.setItem('loggedIn',JSON.stringify(data));
         setISEditing(false);
    }

    function handleMyOrder(){
        navigate('/cart');
    }
    function handleWishList(){
        navigate('/wishList');
    }
    function handlePassChange(){
        navigate('/passwordUpdate')
    }

    return(
        <div className='dashBoard-container'>
            <h2>DashBoard</h2>
            <div className='dashBoard-otpions'>
                <div  onClick={handleMyOrder}>My Order</div>
                <div onClick={handleAddressChange}>MY Address</div>
                {showAddress && <Modal handleClose={handleModal}>
                    <div className='Edit-Address'>
                    <h3 style={{color:'rgb(18 18 130)'}}>My Address</h3> 
                        {!isEditing && <div>
                        <div>{data.address}  
                        <span><button className='editing' onClick={handleEdit}>Edit</button></span>
                        </div></div>}
                   {isEditing && <div>
                        <textarea  className='editing-textarea' type='text' onChange={handleAddressEdit} value={editAddress} />
                        <span><button className='editing ' onClick={handleEditedValue}>Save</button></span> 
                        </div>} 
                    </div>
                    </Modal>}
                <div onClick={handleWishList}>My WishList</div>
                <div onClick={showModalHandler}>My Details</div>
               { showModal && <Modal handleClose={handleModal}>
                   <div className='my-details'>
                       <h4 style={{color:'rgb(18 18 130)'}}>My Details</h4>
                       <i className="Photo fa-regular fa-circle-camera"></i>
                   <div>{data.name} </div>
                   <div>{data.email}</div>
                   <div>{data.age}</div>
                   <div>{data.address}</div>
                   </div>
                </Modal>}
                <div onClick={handlePassChange}>Password Update</div>
            </div>
            <Link to='/itemExlporer'>Back to Explorer</Link>
        </div>
    )
}