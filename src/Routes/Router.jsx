import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import Profile from "../Components/Profile/Profile";
import PrivateRoutes from "./PrivateRoutes";
import CreateClub from "../Components/Clubs/CreateClubs/CreateClub";
import AllClubs from "../Components/Clubs/AllClubs/AllClubs";
import DashboardLayout from "../Layouts/DashboardLayout";
import ClubDetails from "../Components/Clubs/ClubDetails/ClubDetails";
import Admin from "../Pages/Dashboard/Admin/Admin";
import Manager from "../Pages/Dashboard/Manager/Manager";
import Member from "../Pages/Dashboard/Member/Member";
import UsersManagement from "../Pages/Dashboard/UsersManagement/UsersManagement";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/Payment/PaymentCancelled/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import ClubsManagement from "../Pages/Dashboard/ClubManagement/ClubManagement";
import CreateEvents from "../Components/Clubs/CreateEvents/CreateEvents";
import Events from "../Components/Clubs/Events/Events";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import AdminRoutes from "./AdminRoutes";
import EventsManagement from "../Pages/Dashboard/EventsManagement/EventsManagement";
import Membership from "../Pages/Dashboard/Membership/Membership";


export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "create-club",
                element: <CreateClub />,
            },
            {
                path: "all-clubs",
                element: <AllClubs />,
            },
            {
                path: "create-events",
                element: <CreateEvents></CreateEvents>
            },
            {
                path: "events",
                element: <Events></Events>
            },
            {
                path: "profile",
                element: (
                    <PrivateRoutes>
                        <Profile />
                    </PrivateRoutes>
                )
            },
            {
                path: "clubs/:id",
                element: <ClubDetails />,
            }
        ]
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            }
        ]
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoutes>
                <DashboardLayout />
            </PrivateRoutes>
        ),
        children: [
            {
                path: "admin",
                element: <Admin />
            },
            {
                path: "manager",
                element: <Manager />
            },
            {
                path: "member",
                element: <Member />
            },
            {
                path: "users-management",
                element: <AdminRoutes>
                    <UsersManagement></UsersManagement>
                </AdminRoutes>
            },
            {
                path: "payment-success",
                element: <PaymentSuccess></PaymentSuccess>
            },
            {
                path: "payment-cancelled",
                element: <PaymentCancelled></PaymentCancelled>
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'clubs-management',
                element: <ClubsManagement></ClubsManagement>
            },
            {
                path: 'events-management',
                element: <EventsManagement></EventsManagement>
            },
            {
                path: 'memberships-management',
                element: <Membership></Membership>
            },
           
        ]
    }
]);
