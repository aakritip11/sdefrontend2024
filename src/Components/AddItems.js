import React, { useState } from 'react';
import axios from 'axios';

function AddItems({ onAddItem }) {
    const [itemname, setItemName] = useState("");
    const [itemprice, setItemPrice] = useState("");
    const [shippingMethod, setShippingMethod] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleItemNameChange = (e) => {
        setItemName(e.target.value);
    }

    const handleItemPriceChange = (e) => {
        setItemPrice(e.target.value);
    }

    const handleShippingMethodChange = (e) => {
        setShippingMethod(e.target.value);
    }

    const shippingMethods = ["Standard", "Express", "Next Day"];

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (itemname === "" || itemprice === "" || shippingMethod === "") {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/item', { itemname, itemprice, shippingMethod });
            onAddItem(response.data);
            setItemName('');
            setItemPrice('');
            setShippingMethod('');
            setErrorMessage('');
        } catch (error) {
            console.error('Error adding item', error);
            setErrorMessage('Failed to add item. Please try again.');
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
                            placeholder="Item Price"
                            value={itemprice}
                            onChange={handleItemPriceChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="shippingmethod">Shipping Method</label>
                        <select
                            id="shippingmethod"
                            value={shippingMethod}
                            onChange={handleShippingMethodChange}
                        >
                            <option value="" disabled>Select Shipping Method</option>
                            {shippingMethods.map((method) => (
                                <option key={method} value={method}>
                                    {method}
                                </option>
                            ))}
                        </select>
                    </div>

                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <div className='additems--submit'>
                        <button type="submit" className="additems--btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddItems;