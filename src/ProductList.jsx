import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; 
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    // Calculăm numărul total de produse pentru cerculețul de pe coș
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg", description: "Removes mold spores.", cost: "18" },
                { name: "Boston Fern", image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg", description: "Adds humidity to the air.", cost: "20" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Easy to care for.", cost: "17" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg", description: "Purifies the air.", cost: "14" }
            ]
        },
        {
            category: "Aromatic Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400", description: "Calming scent.", cost: "20" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?w=400", description: "Sweet fragrance.", cost: "18" },
                { name: "Rosemary", image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg", description: "Great for cooking.", cost: "15" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg", description: "Refreshing aroma.", cost: "12" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Relieves stress.", cost: "14" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Beautiful flowering plant.", cost: "22" }
            ]
        }
    ];

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart((prevState) => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handleContinueShopping = (e) => {
        if (e) e.preventDefault();
        setShowCart(false);
    };

    // Stiluri inline (păstrate din codul tău)
    const styleObj = { backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '20px' };
    const styleA = { color: 'white', fontSize: '30px', textDecoration: 'none' };

    return (
        <div>
            <div className="navbar" style={styleObj}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" style={{height:'50px'}} />
                        <a href="/" onClick={(e) => {e.preventDefault(); onHomeClick();}} style={{textDecoration:'none'}}>
                            <div>
                                <h3 style={{ color: 'white', margin: 0 }}>Paradise Nursery</h3>
                                <i style={{ color: 'white', fontSize:'12px' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:'50px'}}>
                    <a href="#" onClick={(e) => handleContinueShopping(e)} style={styleA}>Plants</a>
                    <a href="#" onClick={(e) => handleCartClick(e)} style={styleA}>
                        <div style={{position:'relative'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                                <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8" fill="none" stroke="#faf9f9" strokeWidth="8"></path>
                            </svg>
                            <span style={{position:'absolute', top:'10px', right:'10px', backgroundColor:'red', borderRadius:'50%', padding:'2px 8px', fontSize:'16px'}}>{totalItems}</span>
                        </div>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index} style={{ width: '100%' }}>
                            <h2 style={{textAlign:'center', margin:'20px 0'}}>{category.category}</h2>
                            <div className="product-list" style={{display:'flex', flexWrap:'wrap', justifyContent:'center'}}>
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex} style={{border:'1px solid #ccc', margin:'10px', padding:'10px', width:'300px', borderRadius:'10px', textAlign:'center'}}>
                                        <img src={plant.image} alt={plant.name} style={{width:'100%', height:'200px', objectFit:'cover', borderRadius:'5px'}} />
                                        <div className="product-title" style={{fontWeight:'bold', fontSize:'20px'}}>{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">${plant.cost}</div>
                                        <button
                                            className="product-button"
                                            disabled={addedToCart[plant.name]}
                                            onClick={() => handleAddToCart(plant)}
                                            style={{backgroundColor: addedToCart[plant.name] ? '#ccc' : '#4CAF50', color:'white', border:'none', padding:'10px 20px', cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer', marginTop:'10px'}}
                                        >
                                            {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
