import { TextField, Typography, Box } from '@mui/material';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useComponentStore } from './stores/ZustandStores';
import Product from './Types/Product';
import Fuse from 'fuse.js';

const ProductSearcher = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([] as Product[]);
  const {closeProductSearcher, products} = useComponentStore();

  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.7 }, // Title has 70% influence
      { name: 'tags', weight: 0.3 }   // Tags have 30% influence
    ],
    threshold: 0.3, // Lower threshold means stricter matching
    includeScore: true // Include match score in results
  };

  // Create memoized Fuse instance
  const fuse = useMemo(() => new Fuse(products, fuseOptions), []);

  useEffect(() => {
    const results = searchTerm ? fuse.search(searchTerm).map((result) => result.item) : products;
    setSearchResults(results);
  }, [searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  const searcherRef = useRef<HTMLDivElement>(null);
  const onClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const searcher = searcherRef.current;
    if (searcher && !searcher.contains(event.target as Node))
      closeProductSearcher();
  };

  return (
    <div
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0)",
        pointerEvents: "auto",
      }}
      onClick={onClickOutside}
    >
      <Box
        sx={{
          position: "absolute", top: "2%", right: {md: "6%"},
          display: "flex", flexDirection: "column",
          width: {md: "30%"}, height: {md: "40%"},
          gap: "10px"
        }}
        className="ProductSearcher"
        ref={searcherRef}
      >
        <Box
          sx={{
            width: "100%", height: "3vw",
            display: "flex", flexDirection: "row", alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "16px"
          }}
          className="SearchInput"
        >
          <TextField
            placeholder="Looking for a product?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="SearchField"
            sx={{
              flexGrow: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
              input: {
                color: "white",
                fontSize: {md: "24px"}
              }
            }}
          />
          <Typography
            sx={{
              width: "30px", height: "30px",
              alignItems: "center", justifyContent: "center", display: "flex",
              fontSize: "36px", fontFamily: "'Poppins', sans-serif", fontWeight: "300",
              color: "rgba(255, 255, 255, 0.4)",
              "&:hover": {
                cursor: "pointer",
                color: "rgba(255, 255, 255, 0.6)",
              },
              marginRight: "16px"
            }}
            onClick={clearSearch}
            className="ClearSearchButton"
          >
            &times;
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex", flexDirection: "column", justifyContent: "start", alginItems: "center",
            flexGrow: 1, gap: "10px",
            overflowY: "scroll", scrollbarWidth: 0, "&::-webkit-scrollbar": { display: "none" },
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "16px",
            padding: "20px", boxSizing: "border-box"
          }}
          className="SearchItems"
        >
          {searchResults && searchResults.map((product) => {
            return (
              <Box
                sx={{
                  display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center",
                  height: "25%", gap: "30px",
                  padding: "3px", boxSizing: "border-box",
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "rgba(255, 255, 255, 0.05)"
                  }
                }}
                className="SearchItem"
              >
                <Box
                  component="img"
                  src={product.images[0].src}
                  sx={{
                    height: "100%", aspectRatio: "1 / 1",
                    backgroundColor: "rgb(255, 255, 255)",
                  }}
                  className="SearchItemImage"
                />
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", sm: "20px" },
                      fontFamily: "'Poppins', sans-serif", fontWeight: "normal",
                      color: "rgba(255, 255, 255, 0.83)",
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden"
                    }}
                    className="SearchItemTitle"
                  >
                    {product.title}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </div>
  );
};

export default ProductSearcher;