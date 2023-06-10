import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from 'react-router-dom';

import Layout from './components/pages/Layout';
import HomePage from './components/body/HomePage';
import Banking from './components/body/Banking';
import Borrowing from './components/body/Borrowing';
import Insurance from './components/body/Insurance';
import Help from './components/body/Help';
import Login from './components/authentication/Login';
import AlertModal from './components/UI/AlertModal';
import Body from './components/dashboard/Body';
import Account from './components/dashboard/Account';
import Local from './components/transaction/Local';
import ConfirmLocal from './components/transaction/ConfirmLocal';
import PrintPrompt from './components/UI/PrintPrompt';
import International from './components/transaction/International';
import ConfirmInternational from './components/transaction/ConfirmInternational';
import Transactions from './components/transaction/Transactions';
import Password from './components/authentication/Password';
import UploadPhoto from './components/dashboard/UploadPhoto';
import ForgotPassword from './components/authentication/ForgotPassword';
import ResetPassword from './components/authentication/ResetPassword';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="banking" element={<Banking />} />
            <Route path="borrowing" element={<Borrowing />} />
            <Route path="insurance" element={<Insurance />} />
            <Route path="help" element={<Help />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route path="resetPassword/:token" element={<ResetPassword />} />
            <Route path="account" element={<Body />}>
                <Route index element={<Account />} />
                <Route path="detail" element={<Account />} />
                <Route path="localTransfer" element={<Local />} />
                <Route path="confirmLocal" element={<ConfirmLocal />} />
                <Route path="print-local-receipt" element={<PrintPrompt />} />
                <Route path="internationalTransfer" element={<International />} />
                <Route path="confirmInternational" element={<ConfirmInternational />} />
                <Route path="history" element={<Transactions />} />
                <Route path="password" element={<Password />} />
                <Route path="changePhoto" element={<UploadPhoto />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
    )
);

function App() {
    const showModal = useSelector((state) => state.alert.showModal);
    return (
        <Fragment>
            {showModal && <AlertModal />}
            <RouterProvider router={router} />
        </Fragment>
    );
}

export default App;
