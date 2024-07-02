import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddItems(){
    const navigate = useNavigate();
    const [itemname, setItemName] = useState("");
    const [itemprice, setItemPrice] = useState("");
    const [shippingmethod, setShippingMethod] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [token, setToken] = useState(null);

    
    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handleItemPriceChange = (e) => {
        setItemPrice(e.target.value);
    }

    const handleShippingMethodChange = (e) => {
        setShippingMethod(e.target.value);
    }

    const [item, setitem] = useState([]);

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:3000/item', { itemname });
            setitem([...item, response.data]);
            setItemName('');
        } catch (error) {
            console.error('Error adding task', error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (itemname === "" || itemprice === "" || shippingmethod === "") {
            setErrorMessage("Please fill in all the fields.");
            return;
        }
    
    }

    return (
        <div className='additems'>
            <div className='additems--navbar'>
                <h1 className='additems--heading'>Add Items</h1>
                <span className='additems--add'>Add</span>
            </div>
            <div className='additems--contents'>
            <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="itemname">Item</label>
                        <input
                        type="text"
                        id="itemname"
                        placeholder="Item name"
                        value={itemname}
                        onChange={handleItemNameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="itemprice">Item Price</label>
                        <input
                        type="text"
                        id="itemprice"
                        placeholder=" Item Price"
                        value={itemprice}
                        onChange={handleItemPriceChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shippingmethod">Shipping Method</label>
                        <input
                        type="text"
                        id="shipping method"
                        placeholder="Shipping Method"
                        value={itemprice}
                        onChange={handleShippingMethodChange}
                        />
                    </div>
                    
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div className='additems--submit'>
                        <button type="button" className="additems--btn" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItems;