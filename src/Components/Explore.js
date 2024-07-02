import React, { useState, useEffect } from 'react';
import img from '../Assets/image.png';
import axios from 'axios';

function Explore(props) {
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/item');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className='explore'>
            <div className='explore--navbar'>
                <h1 className='explore--heading'>Explore</h1>
                <span className='explore--filter'>Filter</span>
            </div>
            <div className='explore--search'>
                Search
            </div>
            <div className='explore--content'>
                {items.map((item, index) => (
                    <div key={index} className='explore--percontent'>
                        <div className='explore--itemimage'>
                            <img src={img} alt='Item' />
                        </div>
                        <div className='explore--itemname'>{item.itemname}</div>
                        <div className='explore--itemprice'>{item.itemprice}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Explore;
