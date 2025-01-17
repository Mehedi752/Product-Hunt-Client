import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProducts = () => {
    //Using TanStack Query to manage cart state.
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/products?email=${user?.email}`);
            return res.data;
        }
    })

    return [products, refetch];
};

export default useProducts;