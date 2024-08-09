import Image from "next/image";
import React from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { GiCancel } from "react-icons/gi";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { full } from "@cloudinary/url-gen/qualifiers/fontHinting";

const AddProduct = ({ setIsProductModal }) => {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [category, setCategory] = useState("accessories");
  const [title, setTitle] = useState();
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/categories`
        );
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleOnChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
    console.log(imageSrc);
  };

  const changePrice = (e, index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value;
    setPrices(currentPrices);
  };

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gift-suggestion");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/doblhekaw/image/upload",
        data
      );
      const { url } = uploadRes.data;
      const newProduct = {
        img: url,
        title,
        category: category.toLowerCase(),
        prices,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        newProduct
      );

      if (res.status === 201) {
        setIsProductModal(false);
        toast.success("Product created successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0 after:opacity-60 grid place-content-center">
      <OutsideClickHandler onOutsideClick={() => setIsProductModal(false)}>
        <div className="w-full h-full grid place-content-center relative">
          <div className="relative z-50 md:w-[600px] w-[370px]  bg-white border-2 p-10 rounded-3xl">
            <Title addClass="text-[40px] text-center">Add a New Product</Title>

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
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
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
                placeholder="Write a title..."
                onChange={(e) => setTitle(e.target.value)}

              />
            </div>

            <div className="flex flex-col text-sm mt-4">
              <span className="font-semibold mb-[2px]">Select Category</span>
              <select
                className="border-2 p-1 text-sm px-1 outline-none"
                placeholder="Write a title..."
                onChange={(e) => setCategory(e.target.value)}

              >
                {categories.length > 0 &&
                  categories.map((category) => (
                    <option
                      value={category.title.toLowerCase()}
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
                    onChange={(e) => changePrice(e, 0)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                    placeholder="medium"
                    onChange={(e) => changePrice(e, 1)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                    placeholder="large"
                    onChange={(e) => changePrice(e, 2)}
                  />
                  <input
                    type="number"
                    className="border-b-2 p-1 pl-0 text-sm px-1 outline-none w-24"
                    placeholder="X-large"
                    onChange={(e) => changePrice(e, 3)}
                  />
                </div>
              
            </div>

            <div className="flex justify-end mt-2">
              <button
                className="btn-primary !bg-success"
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
            <button
              className="absolute  top-4 right-4"
              onClick={() => setIsProductModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          </div>
        </div>
      </OutsideClickHandler>
    </div>
  );
};

export default AddProduct;
