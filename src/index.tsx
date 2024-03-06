import { createRoot } from "react-dom/client";

const App = () => {
    return <div>Hello react</div>;
};

const container = document.getElementById("App")
const root = createRoot(container);

root.render(<App />)