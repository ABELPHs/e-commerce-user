import React, { useEffect, useState } from "react";
import { ProductGrid } from "../components";
import Box from '@mui/material/Box';
import { API } from "../../services/api";

export const MainPage = () => {
    
    const [products, setProducts] = useState({
        top_products: [],
        explore_products: [],
        new_products: [],
    });
    useEffect(()=> {
        API.get.mainPage().then((result) => {
            setProducts(result);
        });
    }, products);
    return (
        <>
            <Box padding={'40px'}>
                <Box sx={{marginTop: '20px'}}>
                    <ProductGrid products={products['explore_products']} />
                </Box>
                <div hidden={products['new_products'].length == 0}>
                    <Box sx={{marginTop: '20px'}}>
                        <h2>New products</h2>
                        <ProductGrid products={products['new_products']} />
                    </Box>
                </div>
                <div hidden={products['top_products'].length == 0}>
                    <Box sx={{marginTop: '20px', marginBottom: '40px'}}>
                        <h2>Top products</h2>
                        <ProductGrid products={products['top_products']} />
                    </Box>
                </div>
            </Box>
        </>
    )

}