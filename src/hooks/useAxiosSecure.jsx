import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {

    const { signOutUser } = useAuth();
    const navigate = useNavigate();

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    },
        function (error) {
            const status = error.response?.status;
            if (status === 401 || status === 403) {
                signOutUser()
                    .then(() => {
                        navigate('/auth/login');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            return Promise.reject(error);
        });

    return axiosSecure;
};

export default useAxiosSecure;