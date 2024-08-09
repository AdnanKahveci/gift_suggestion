import React from "react";
import Carousel from "../../components/Carousel";
import MenuWrapper from "../../components/product/MenuWrapper";
import Suggestion from "@/components/GiftSearchForm";

const Index = ({ categoryList, productList }) => {
  return (
    <div>
      <Carousel />
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export default Index;