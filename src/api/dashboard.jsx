// Mock Data  from design
const revenueData = [
    { name: "Jan", current: 12, previous: 8 },
    { name: "Feb", current: 16, previous: 14 },
    { name: "Mar", current: 17, previous: 12 },
    { name: "Apr", current: 13, previous: 9 },
    { name: "May", current: 18, previous: 11 },
    { name: "Jun", current: 24, previous: 19 },
];

const projectionData = [
    { name: "Jan", val: 18 },
    { name: "Feb", val: 24 },
    { name: "Mar", val: 21 },
    { name: "Apr", val: 28 },
    { name: "May", val: 16 },
    { name: "Jun", val: 24 },
];

const salesDistribution = [
    { name: "Direct", value: 300.56, fill: "#1C1C1C" },
    { name: "Affiliate", value: 135.18, fill: "#BAEDBD" },
    { name: "Sponsored", value: 154.02, fill: "#95A4FC" },
    { name: "E-mail", value: 48.96, fill: "#B1E3FF" },
];

const locationData = [
    { city: "New York", value: 72, label: "72K" },
    { city: "San Francisco", value: 39, label: "39K" },
    { city: "Sydney", value: 25, label: "25K" },
    { city: "Singapore", value: 61, label: "61K" },
];

const stats = [
    { title: "Customers", value: "3,781", change: "+11.01%", isPositive: true, type: "customers" },
    { title: "Orders", value: "1,219", change: "-0.03%", isPositive: false, type: "orders" },
    { title: "Revenue", value: "$695", change: "+15.03%", isPositive: true, type: "revenue" },
    { title: "Growth", value: "30.1%", change: "+6.08%", isPositive: true, type: "growth" },
];

const topSelling = [
    { name: "ASOS Ridley High Waist", price: "$79.49", quantity: 82, amount: "$6,518.18" },
    { name: "Marco Lightweight Shirt", price: "$128.50", quantity: 37, amount: "$4,754.50" },
    { name: "Half Sleeve Shirt", price: "$39.99", quantity: 64, amount: "$2,559.36" },
    { name: "Lightweight Jacket", price: "$20.00", quantity: 184, amount: "$3,680.00" },
    { name: "Marco Shoes", price: "$79.49", quantity: 64, amount: "$1,965.81" },
];

//  get dashboard data api
export const fetchDashboardData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                revenueData,
                projectionData,
                salesDistribution,
                locationData,
                stats,
                topSelling
            });
        }, 2000); // fake delay for api simulation
    });
};