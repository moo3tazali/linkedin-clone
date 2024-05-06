import "./App.css";
import Layout from "./layouts/Layout";
import AppRoutes from "./routes/AppRoutes";

function App() {
  if (location.pathname === "/") location.pathname = "/linkedin-clone/";
  return (
    <>
      <Layout />
      <AppRoutes />
    </>
  );
}

export default App;
