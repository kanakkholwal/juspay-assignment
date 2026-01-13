import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ThemeProvider attribute="class" themes={["light", "dark"]}>
			<App />
		</ThemeProvider>
	</StrictMode>,
);
