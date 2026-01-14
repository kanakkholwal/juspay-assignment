// fake data based on UI
const notifications = [
    { icon: "bug", text: "You have a bug that needs...", timestamp: "Just now" },
    { icon: "user-add", text: "New user registered", timestamp: "59 minutes ago" },
    { icon: "bug", text: "You have a bug that needs...", timestamp: "12 hours ago" },
    { icon: "broadcast", text: "Andi Lane subscribed to you", timestamp: "Today, 11:59 AM" },
];

const activities = [
    { user: "1", text: "You have a bug that needs...", time: "Just now" },
    { user: "2", text: "Released a new version", time: "59 minutes ago" },
    { user: "3", text: "Submitted a bug", time: "12 hours ago" },
    { user: "4", text: "Modified A data in Page X", time: "Today, 11:59 AM" },
    { user: "5", text: "Deleted a page in Project X", time: "Feb 2, 2023" },
];

const contacts = [
    "Natali Craig", "Drew Cano", "Orlando Diggs", "Andi Lane", "Kate Morrison", "Koray Okumus",
];

//  get sidebar data api
export const fetchSidebarData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ notifications, contacts, activities });
        }, 1500);
    });
};