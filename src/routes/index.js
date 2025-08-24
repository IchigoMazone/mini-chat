
import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import Follow from '~/pages/Follow';
import Friend from '~/pages/Friend'
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import ForgotPassword from '~/pages/ForgotPassword';
import Register from '~/pages/Register';
import ResetPassword from '~/pages/ResetPassword';
import Dashboard from '~/pages/DashBoard';


const publicRoutes = [
    { path: '/home', component: Home },
    { path: '/follow', component: Follow },
    { path: '/friend', component: Friend },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
    { path: '/search', component: Search, layout: null},
    { path: '/', component: Login, layout: null},
    { path: '/forgot-password', component: ForgotPassword, layout: null },
    { path: '/register', component: Register, layout: null },
    { path: '/reset-password', component: ResetPassword, layout: null },
    { path: '/dashboard', component: Dashboard, layout: null }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes }