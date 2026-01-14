// Mock Data 
const STATUSES = ["In Progress", "Complete", "Pending", "Approved", "Rejected"];
const PROJECTS = ["Landing Page", "CRM Admin pages", "Client Project", "Admin Dashboard", "App Landing Page"];
const ADDRESSES = ["Meadow Lane Oakland", "Larry San Francisco", "Bagwell Avenue Ocala", "Washburn Baton Rouge", "Nest Lane Olivette"];

const generateFakeData = (count = 50) => {
    return Array.from({ length: count }, (_, i) => ({
        id: `#CM${9801 + i}`,
        user: { 
            name: ["Natali Craig", "Kate Morrison", "Drew Cano", "Orlando Diggs", "Andi Lane"][i % 5], 
            avatar: `https://i.pravatar.cc/150?u=${i}` 
        },
        project: PROJECTS[i % PROJECTS.length],
        address: ADDRESSES[i % ADDRESSES.length],
        date: ["Just now", "A minute ago", "1 hour ago", "Yesterday"][i % 4],
        status: STATUSES[i % STATUSES.length],
    }));
};

let MOCK_DB = generateFakeData(35);

export const fetchOrdersApi = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...MOCK_DB]);
        }, 1000);
    });
};

export const addOrderApi = async (newOrder) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const orderWithId = { 
                ...newOrder, 
                id: `#CM${Math.floor(Math.random() * 9000) + 1000}` 
            };
            MOCK_DB = [orderWithId, ...MOCK_DB]; // Update mock DB
            resolve(orderWithId);
        }, 1500); // 1.5s delay for "adding"
    });
};