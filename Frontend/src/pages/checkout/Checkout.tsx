import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Navbar from "../../globals/components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  ItemDetails,
  OrderData,
  PaymentMethod,
} from "../../globals/types/checkoutTypes";

import { Status } from "../../globals/types/types";
import { useNavigate } from "react-router-dom";
import { orderItem } from "../../store/checkoutSlice";

const Checkout = () => {
  const { items } = useAppSelector((state) => state.cart);
  const { khaltiUrl, status } = useAppSelector((state) => state.orders);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    PaymentMethod.COD
  );
  const [data, setData] = useState<OrderData>({
    phoneNumber: "",
    shippingAddress: "",
    totalAmount: 0,
    paymentDetails: {
      paymentMethod: PaymentMethod.COD,
    },
    items: [],
  });
  const handlePaymentMethod = (e: ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value as PaymentMethod);
    setData({
      ...data,
      paymentDetails: {
        paymentMethod: e.target.value as PaymentMethod,
      },
    });
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const subtotal = items.reduce(
    (total, item) => item.Product.productPrice * item.quantity + total,
    0
  );
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const itemDetails: ItemDetails[] = items.map((item) => {
      return {
        productId: item.Product.id,
        quantity: item.quantity,
      };
    });

    const orderData = {
      ...data,
      items: itemDetails,
      totalAmount: subtotal,
    };
    await dispatch(orderItem(orderData));
  };
  useEffect(() => {
    if (khaltiUrl) {
      window.location.href = khaltiUrl;
      return;
    }
    if (status === Status.SUCCESS) {
      alert("Order Placed successfully");
      navigate("/");
    }
  }, [status, khaltiUrl]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center border-b bg-white mt-[-100px] py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <div className="mt-4 py-7 text-xs sm:mt-0 sm:ml-auto sm:text-base"></div>
      </div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {items.length > 0 &&
              items.map((item) => {
                return (
                  <div
                    key={item?.Product?.id}
                    className="flex flex-col rounded-lg bg-white sm:flex-row"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                      alt=""
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {item?.Product?.productName}
                      </span>
                      <span className="float-right text-gray-400">
                        Qty :{item?.quantity}{" "}
                      </span>
                      <p className="text-lg font-bold">
                        Rs. {item?.Product?.productPrice}{" "}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          <p className="mt-8 text-lg font-medium">Payment Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_1"
                type="radio"
                name="radio"
                value={PaymentMethod.COD}
                onChange={handlePaymentMethod}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_1"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">
                    COD(Cash On Delivery)
                  </span>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                value={PaymentMethod.Khalti}
                onChange={handlePaymentMethod}
                name="radio"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Online(Khalti)</span>
                </div>
              </label>
            </div>
          </form>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
              Complete your order by providing your payment details.
            </p>
            <div className="">
              <label
                htmlFor="phoneNumber"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                />
              </div>

              <label
                htmlFor="billing-address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Shipping Address
              </label>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                  <input
                    type="text"
                    id="billing-address"
                    name="shippingAddress"
                    className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Street Address"
                    onChange={handleChange}
                  />
                  <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img
                      className="h-4 w-4 object-contain"
                      src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">Rs {subtotal}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">Rs 0</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  Rs {subtotal}
                </p>
              </div>
            </div>

            {paymentMethod === PaymentMethod.Khalti ? (
              <button
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
                style={{ backgroundColor: "purple" }}
              >
                Pay With Khalti
              </button>
            ) : (
              <button
                type="submit"
                className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Checkout;
