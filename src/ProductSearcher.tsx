import { TextField, Typography, Box } from "@mui/material";
import { useState, useEffect, useRef, useMemo } from "react";
import { useComponentStore } from "./stores/ZustandStores";
import Product from "./Types/Product";
import Fuse from "fuse.js";
import mannequinData from "./data/MannequinData"; // Import mannequinData

const ProductSearcher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([] as Product[]);
  const { closeProductSearcher, products } = useComponentStore();

  // Filter products to include only those with IDs present in mannequinData
  const filteredProducts = useMemo(() => {
    const mannequinIds = mannequinData.map((item) => item.id);
    return products.filter((product) => mannequinIds.includes(product.id));
  }, [products]);

  const fuseOptions = {
    keys: [
      { name: "title", weight: 0.7 }, // Title has 70% influence
      { name: "tags", weight: 0.3 }, // Tags have 30% influence
    ],
    threshold: 0.3, // Lower threshold means stricter matching
    includeScore: true, // Include match score in results
  };

  // Create memoized Fuse instance with filtered products
  const fuse = useMemo(
    () => new Fuse(filteredProducts, fuseOptions),
    [filteredProducts]
  );

  useEffect(() => {
    const results = searchTerm
      ? fuse.search(searchTerm).map((result) => result.item)
      : filteredProducts;
    setSearchResults(results);
  }, [searchTerm, fuse, filteredProducts]);

  const clearSearch = () => {
    setSearchTerm("");
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
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0)",
        pointerEvents: "auto",
      }}
      onClick={onClickOutside}
    >
      <Box
        sx={{
          position: "absolute",
          top: "2%",
          right: { xs: "20%", sm: "15%", md: "10%", lg: "10%" },
          display: "flex",
          flexDirection: "column",
          width: { xs: "70%", sm: "55%", md: "50%", lg: "30%" },
          height: { xs: "50%", sm: "50%", md: "40%", lg: "50%" },
          gap: "10px",
        }}
        className="ProductSearcher"
        ref={searcherRef}
      >
        <Box
          sx={{
            width: "100%",
            height: { xs: "5vh", sm: "5vh", md: "5vh", lg: "8vh", xl: "3vh" },
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "16px",
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
                "& fieldset": { border: "none" },
                "&:hover fieldset": { border: "none" },
                "&.Mui-focused fieldset": { border: "none" },
              },
              input: {
                color: "white",
                fontSize: { md: "24px" },
              },
            }}
          />
          <Typography
            sx={{
              width: "30px",
              height: "30px",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              fontSize: "36px",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "300",
              color: "rgba(255, 255, 255, 0.4)",
              "&:hover": {
                cursor: "pointer",
                color: "rgba(255, 255, 255, 0.6)",
              },
              marginRight: "16px",
            }}
            onClick={clearSearch}
            className="ClearSearchButton"
          >
            &times;
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            flexGrow: 1,
            gap: "10px",
            overflowY: "scroll",
            scrollbarWidth: 0,
            "&::-webkit-scrollbar": { display: "none" },
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderRadius: "16px",
            padding: "20px",
            boxSizing: "border-box",
          }}
          className="SearchItems"
        >
          {searchResults &&
            searchResults.map((product) => {
              return (
                <Box
                  key={product.id}
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    height: { sm: "12%", md: "15%", lg: "25%" },
                    gap: "30px",
                    padding: "3px",
                    boxSizing: "border-box",
                    "&:hover": {
                      cursor: "pointer",
                      backgroundColor: "rgba(255, 255, 255, 0.05)",
                    },
                  }}
                  className="SearchItem"
                  onClick={() => {
                    // Find the corresponding mannequin
                    const mannequin = mannequinData.find(
                      (item) => item.id === product.id
                    );
                    if (mannequin) {
                      console.log(
                        `Position for product ID ${product.id}:`,
                        mannequin.position
                      );
                    } else {
                      console.log(
                        `No position found for product ID ${product.id}`
                      );
                    }
                  }}
                >
                  <Box
                    component="img"
                    src={product.images[0].src}
                    sx={{
                      height: "40px",
                      width: "40px",
                      backgroundColor: "rgb(255, 255, 255)",
                      objectFit: "contain",
                    }}
                    className="SearchItemImage"
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", sm: "20px" },
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: "normal",
                      color: "rgba(255, 255, 255, 0.83)",
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
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
