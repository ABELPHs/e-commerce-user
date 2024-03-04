import React, { useEffect, useState } from "react";
import { ProductGrid } from "../components";
import Box from '@mui/material/Box';
import { API } from "../../services/api";

export const SearchPage = ({
    search
}) => {
    
    const [products, setProducts] = useState({
        products: [],
    });
    useEffect(()=> {
        API.get.pageSearch({
            k: search
        }).then((result) => {
            setProducts(result);
        });
    }, [search]);
    return (
        <>
            <Box padding={'40px'}>
                <Box sx={{marginTop: '20px', marginBottom: '40px'}}>
                    <ProductGrid products={products['products']} />
                </Box>
            </Box>
        </>
    )

}