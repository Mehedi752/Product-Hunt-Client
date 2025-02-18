import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
    {
        question: "🚀 What is Product Hunt?",
        answer: "Product Hunt is a platform where users can discover and share new tech products, apps, tools, and software. Whether you’re a creator or a user, Product Hunt helps you explore innovative products daily.",
    },
    {
        question: "🔍 How can I discover new products?",
        answer: "You can explore products by browsing categories, checking out featured and trending products, or using our search bar to find specific products based on your interests.",
    },
    {
        question: "💬 Can I upvote products I like?",
        answer: "Yes! You can upvote any product that you find interesting. Just log in and click the 'Upvote' button on the product’s page. Your vote helps products gain visibility on the platform.",
    },
    {
        question: "📝 Can I submit a product?",
        answer: "Yes, if you're a registered user, you can submit your own product for others to discover. Simply go to your dashboard and click on 'Add Product'. We encourage sharing innovative tech tools and apps.",
    },
    {
        question: "🔒 How is my account data protected?",
        answer: "Your data is safe! We use encryption and other secure methods to protect your personal information. Product Hunt also offers a secure login with JWT tokens and cookie-based authentication.",
    },
    {
        question: "💎 What is the subscription feature?",
        answer: "A subscription allows you to unlock premium features like unlimited product submissions, advanced analytics for your products, and the ability to add more than one product at a time.",
    },
];

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="mb-12 py-16 bg-gray-100 container mx-auto">
            <div className="max-w-4xl mx-auto px-4">
                <motion.h2 
                    className="text-4xl text-center font-extrabold text-transparent bg-clip-text bg-red-500"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                   <span className="text-black">Frequently Asked</span> Questions?
                </motion.h2>
                <p className="mt-4 text-black text-lg text-center">
                    Got questions about Product Hunt? Here are some answers to common questions from our users.
                </p>

                <div className="mt-10 space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div 
                            key={index} 
                            className="bg-white rounded-xl p-5 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{faq.question}</h3>
                                {openIndex === index ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                            </div>

                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.p
                                        className="mt-3 text-sm"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {faq.answer}
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
