import Image from "next/image";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateProduct = ({ setIsUpdateModal, product, categories, getProducts }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState(product.img);
  const [category, setCategory] = useState(product.category);
  const [title, setTitle] = useState(product.title);
  const [prices, setPrices] = useState(product.prices);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const changePrice = (e, index) => {
    const currentPrices = [...prices];
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleUpdate = async () => {
    try {
      let imgUrl = product.img;
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "gift-suggestion");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/doblhekaw/image/upload",
          data
        );
        imgUrl = uploadRes.data.url;
      }

      const updatedProduct = {
        img: imgUrl,
        title,
        category: category.toLowerCase(),
        prices,
      };

      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`,
        updatedProduct
      );

      if (res.status === 200) {
        setIsUpdateModal(false);
        toast.success("Product updated successfully!");
        getProducts();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsUpdateModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Update Product</Title>

            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={handleOnChange}
                  className="hidden"
                />
                <button className="btn-primary !rounded-none !bg-blue-600 pointer-events-none">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Title</span>
              <input
                type="text"
                className="border-2 p-1 text-sm px-1 outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Select Category</span>
              <select
                className="border-2 p-1 text-sm px-1 outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      value={category.title ? category.title.toLowerCase() : ""}
                      key={category._id}
                    >
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex flex-col text-sm mt-4 w-full">
              <span className="font-semibold mb-[2px]">Prices</span>
              <div className="flex justify-between gap-1 w-full md:flex-nowrap flex-wrap">
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                  placeholder="small"
                  value={prices[0]}
                  onChange={(e) => changePrice(e, 0)}
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                  placeholder="medium"
                  value={prices[1]}
                  onChange={(e) => changePrice(e, 1)}
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                  placeholder="large"
                  value={prices[2]}
                  onChange={(e) => changePrice(e, 2)}
                />
                <input
                  type="number"
                  className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                  placeholder="X-large"
                  value={prices[3]}
                  onChange={(e) => changePrice(e, 3)}
                />
              </div>
            </div>

            <div className="flex justify-end mt-2">
              <button
                className="btn-primary !bg-success"
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsUpdateModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default UpdateProduct;
