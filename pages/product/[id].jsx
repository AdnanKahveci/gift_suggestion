import Image from "next/image";
import { useState } from "react";
import Title from "../../components/ui/Title";
import { addProduct } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Index = ({ gift }) => {
  const [prices, setPrices] = useState(gift.prices);
  const [price, setPrice] = useState(prices[0]);
  const [size, setSize] = useState(0);
  const cart = useSelector((state) => state.cart);
  const findCart = cart.products.find((item) => item._id === gift._id);

  const dispatch = useDispatch();

  const handleSize = (sizeIndex) => {
    const difference = prices[sizeIndex] - prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...gift, price, quantity: 1 }));
  };

  return (
    <div className="flex items-center md:h-[calc(100vh_-_88px)] gap-5 py-20 flex-wrap ">
      <div className="relative md:flex-1 md:w-[80%] md:h-[80%] w-36 h-36 mx-auto">
      <Image
          src={gift?.img}
          alt=""
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
      <div className="md:flex-1 md:text-start text-center">
        <Title addClass="text-6xl">{gift?.title}</Title>
        <span className="text-primary text-2xl font-bold underline underline-offset-1 my-4 inline-block">
          ${price}
        </span>
        <p className="text-sm my-4 md:pr-24">{gift?.desc}</p>
        <div>
        <h4 className="text-xl font-bold my-4 md:pr-24">Choose the size</h4>
          
            <div className="flex items-center gap-x-20 md:justify-start justify-center">
              <div
                className="relative w-8 h-8 cursor-pointer"
                onClick={() => handleSize(0)}
              >
                <Image src="/images/size.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Small
                </span>
              </div>
              <div
                className="relative w-12 h-12 cursor-pointer"
                onClick={() => handleSize(1)}
              >
                <Image src="/images/size.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Medium
                </span>
              </div>
              <div
                className="relative w-16 h-16 cursor-pointer"
                onClick={() => handleSize(2)}
              >
                <Image src="/images/size.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  Large
                </span>
              </div>
              <div
                className="relative w-16 h-16 cursor-pointer"
                onClick={() => handleSize(2)}
              >
                <Image src="/images/size.png" alt="" layout="fill" />
                <span className="absolute top-0 -right-6 text-xs bg-primary rounded-full px-[5px] font-medium">
                  X-Large
                </span>
              </div>
            </div>
          
        </div>

        <button
          className="btn-primary"
          onClick={handleClick}
          disabled={findCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`
  );

  return {
    props: {
      gift: res.data ? res.data : null,
    },
  };
};

export default Index;
