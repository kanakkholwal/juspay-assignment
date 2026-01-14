import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import OrderList from "./pages/OrderList";
import { store } from './store/store';

export default function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AppShell />}>
						<Route index element={<Dashboard />} />
						<Route path="orders" element={<OrderList />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	);
}

