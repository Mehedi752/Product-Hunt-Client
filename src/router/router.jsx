import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import Home from '../pages/home/Home'
import Register from '../auth/Register'
import Login from '../auth/Login'
import ErrorPage from '../pages/error/ErrorPage'
import Dashboard from '../pages/dashboard/Dashboard'
import Users from '../pages/dashboard/adminPanel/Users'
import PrivateRoute from '../provider/PrivateRoute'
import Admin from '../pages/dashboard/adminPanel/Admin'
import Moderator from '../pages/dashboard/moderatorPanel/Moderator'
import Profile from '../pages/dashboard/userPanel/Profile'
import AddProduct from '../pages/dashboard/userPanel/AddProducts'
import MyProducts from '../pages/dashboard/userPanel/MyProducts'
import UpdateProduct from '../pages/dashboard/userPanel/UpdateProduct'
import Products from '../pages/products/Products'
import ProductReviewQueue from '../pages/dashboard/moderatorPanel/ProductReviewQueue'
import ProductDetails from '../components/ProductDetails'
import ReportedContents from '../pages/dashboard/moderatorPanel/ReportedContents'
import Statistics from '../pages/dashboard/adminPanel/Statistics'
import Coupons from '../pages/dashboard/adminPanel/Coupons'
import CheckoutForm from '../pages/dashboard/userPanel/CheckOutForm'
import User from '../pages/dashboard/userPanel/User'
import About from '../pages/about/About'
import Community from '../pages/community/Community'
import ProfilePage from '../pages/dashboard/adminPanel/ProfilePage'
import Overview from '../pages/dashboard/userPanel/Overview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/auth/register',
        element: <Register></Register>
      },
      {
        path: '/auth/login',
        element: <Login></Login>
      },
      {
        path: '/products',
        element: <Products></Products>
      },
      {
        path: '/about',
        element: <About></About>
      },
      {
        path: '/community',
        element: <Community></Community>
      },
      {
        path: '/productDetails/:id',
        element: (
          <PrivateRoute>
            <ProductDetails></ProductDetails>
          </PrivateRoute>
        )
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
          //Admin Routes.
          {
            path: '/dashboard/admin',
            element: (
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/admin/profilePage',
            element: (
              <PrivateRoute>
                <ProfilePage></ProfilePage>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/admin/users',
            element: (
              <PrivateRoute>
                <Users></Users>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/admin/statistics',
            element: (
              <PrivateRoute>
                <Statistics></Statistics>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/admin/coupons',
            element: (
              <PrivateRoute>
                <Coupons></Coupons>
              </PrivateRoute>
            )
          },
          //Moderator Routes.
          {
            path: '/dashboard/moderator',
            element: (
              <PrivateRoute>
                <Moderator />
              </PrivateRoute>
            ) // Protect Moderator route with PrivateRoute
          },
          {
            path: '/dashboard/moderator/reviewQueue',
            element: (
              <PrivateRoute>
                <ProductReviewQueue></ProductReviewQueue>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/moderator/reportedContents',
            element: (
              <PrivateRoute>
                <ReportedContents></ReportedContents>
              </PrivateRoute>
            )
          },

          //Normal User Routes.
          {
            path: '/dashboard/user',
            element: (
              <PrivateRoute>
                <User></User>
              </PrivateRoute>
            ) // Protect User route with PrivateRoute
          },
          {
            path: '/dashboard/user/profile',
            element: (
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/user/overview',
            element: (
              <PrivateRoute>
                <Overview></Overview>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/user/addProduct',
            element: (
              <PrivateRoute>
                <AddProduct></AddProduct>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/user/myProducts',
            element: (
              <PrivateRoute>
                <MyProducts></MyProducts>
              </PrivateRoute>
            )
          },
          {
            path: '/dashboard/user/updateProduct/:id',
            loader: ({ params }) =>
              fetch(
                `https://b10a12-server-side-mehedi752.vercel.app/products/id/${params.id}`
              ),
            element: (
              <PrivateRoute>
                <UpdateProduct></UpdateProduct>
              </PrivateRoute>
            )
          }
        ]
      }
    ]
  }
])

export default router
