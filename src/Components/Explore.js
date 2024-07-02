import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Explore() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get('https://run.mocky.io/v3/484a4684-87a9-462b-9cf0-25bc33c6fa1a'); 
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    return (
        <div className='additems'>
            <div className='additems--navbar'>
                <h1 className='additems--heading'>Explore</h1>
                <span className='additems--add'>Filter</span>
            </div>
            <div className='explore--search'>
                Search
            </div>
            <div className='explore--content'>
                {items.map((item) => (
                    <div key={item.id} className='explore--item'>
                        <img src={item.image_url} alt={item.item} className='explore--item-image' />
                        <div className='explore--item-details'>
                            <h5 className='explore--item-name'>{item.item}</h5>
                            <p className='explore--item-price'>Price: ${item.price}</p>
                            <p className='explore--shipping-method'>Shipping Method: {item.shipping_method || 'Not specified'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;
