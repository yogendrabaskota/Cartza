import { Link } from "react-router-dom";
import { Product } from "../types/productTypes";

interface CardProps {
  data : Product
}

const Card:React.FC<CardProps> = ({data}) => {

  return (
    <>
    <Link to={`/product/${data.id}`}>
          <div className="ml-5 mr-5 mb-0.5 mt-4 bg-white rounded-lg overflow-hidden shadow-lg ring-0 ring-orange-500 ring-opacity-40 max-w-sm">

        <div className="relative">
          <img
            className="w-full"
            src= {data.productImageUrl}
            alt="Product Image"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium mb-2">{data?.productName}</h3>
          <p className="text-gray-600 text-sm mb-4">{data?.productDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">{data?.productPrice}</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
}

export default Card