//  Fake Data based on design 
const STATUSES = ["In Progress", "Complete", "Pending", "Approved", "Rejected"];
const PROJECTS = ["Landing Page", "CRM Admin pages", "Client Project", "Admin Dashboard", "App Landing Page", "Marketing Site", "SaaS Platform"];
const ADDRESSES = ["Meadow Lane Oakland", "Larry San Francisco", "Bagwell Avenue Ocala", "Washburn Baton Rouge", "Nest Lane Olivette", "Fifth Avenue NY", "Sunset Blvd LA"];

const generateFakeData = (count = 50) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `#CM${9801 + i}`,
        user: {
            name: ["Natali Craig", "Kate Morrison", "Drew Cano", "Orlando Diggs", "Andi Lane", "Koray Okumus", "Phoenix Baker"][i % 7],
            avatar: `https://i.pravatar.cc/150?u=${i}`
        },
        project: PROJECTS[i % PROJECTS.length],
        address: ADDRESSES[i % ADDRESSES.length],
        date: ["Just now", "A minute ago", "1 hour ago", "Yesterday", "Feb 2, 2023", "Mar 10, 2023"][i % 6],
        status: STATUSES[i % STATUSES.length],
    }));
};

// get orders api
export const fetchOrders = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(generateFakeData(35));
        }, 1500);
    });
};
