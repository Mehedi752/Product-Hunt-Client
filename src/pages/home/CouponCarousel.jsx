import React from "react";
import Slider from "react-slick";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const CouponCarousel = () => {
  const axiosPublic = useAxiosPublic();

  // Fetch coupons from the database
  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const res = await axiosPublic.get("/coupons");
      return res.data;
    },
  });

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="py-12 bg-gray-100 container mx-auto px-6 lg:px-0 mt-12 mb-[96px]">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Trending Coupons
      </h2>
      <div className="max-w-4xl mx-auto px-6 lg:px-[100px]">
        {coupons.length > 0 ? (
          <Slider {...settings}>
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="px-10 py-[60px] bg-white rounded-lg shadow-lg flex flex-col items-center text-center"
              >
                <div className="bg-red-600 text-white lg:w-[300px] mx-auto px-4 py-2 rounded-full text-lg font-semibold mb-6">
                  {coupon.code}
                </div>
                <p className="text-gray-700 text-lg font-medium mb-4">
                  {coupon.description}
                </p>
                <p className="text-lg text-green-600 font-semibold">
                  Discount: {coupon.discountAmount}%
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  Expiry Date:{" "}
                  <span className="text-red-500">
                    {new Date(coupon.expiryDate).toLocaleDateString()}
                  </span>
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500">No coupons available.</p>
        )}
      </div>
    </div>
  );
};

export default CouponCarousel;
