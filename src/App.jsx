import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { loginUser, logout } from "./redux/authSlice";
import { Container, Footer, Header } from "./components/index";
import "./App.css";
import { Outlet } from "react-router-dom";
import CardsSkeleton from "./Skeleton/CardsSkeleton";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(loginUser(userData));
        else dispatch(logout());
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Header />
      {loading ? (
        <Container>
          <CardsSkeleton />
        </Container>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
}

export default App;
