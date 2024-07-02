import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import img from '../Assets/image.png'
import axios from 'axios';

function Explore(props){
    const [item, setitem] = useState([]);

    const fetchitem = async () => {
        try {
            const response = await axios.get('http://localhost:3000/item');
            setitem(response.data);
        } catch (error) {
            console.error('Error fetching item', error);
        }
    };

    
    useEffect(() => {
        fetchitem();
    }, []);

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
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>{props.itemname}</div>
                    <div className='explore--itemprice'>{props.itemprice}</div>
                </div>
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
                
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
                
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
                
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
                
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
                
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
                
                <div className='explore--percontent'>
                    <div className='explore--itemimage'><img src = {img}></img></div>
                    <div className='explore--itemname'>Name</div>
                    <div className='explore--itemprice'>Price</div>
                </div>
            </div>
        </div>
    )
}

export default Explore;