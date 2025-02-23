import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';
import useProducts from '../../../hooks/useProducts';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

// Registering necessary chart components
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const Overview = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const [products] = useProducts();
    console.log(products);

    const myProducts = products.filter((product) => product.ownerEmail === user.email);

    // Fetch reviews from API or database
    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews"],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews');
            return res.data;
        },
    });
    console.log(reviews);

    const chartData = {
        labels: ['Total Products', 'Total Reviews', 'Total Products Added by Me'],  
        datasets: [
            {
                label: 'Site Statistics',
                data: [products.length, reviews.length, myProducts.length],
                backgroundColor: ['#F44336 ', '#4CAF50', '#2196F3'], // Colors for each section
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    boxWidth: 12,
                    padding: 20,
                },
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <div className=" mx-auto px-6">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold text-center text-gray-700 mb-6">Site Overview</h3>
                <div className="flex justify-center">
                    <Pie data={chartData} options={options} className="w-full max-h-64 md:max-h-72 lg:max-h-[400px]" />
                </div>
                <div className="mt-6 text-center">
                    <p className="text-gray-500">Track the total number of products, reviews, and my added products on your site!</p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
