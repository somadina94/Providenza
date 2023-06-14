import { Fragment } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/pages/Layout';
import Login from './components/auth/Login';
import AlertModal from './components/UI/AlertModal';
import Accounts from './components/accounts/Accounts';
import AccountsForm from './components/accounts/AccountsForm';
import AllTransactions from './components/transactions/AllTransactions';
import CreateAccount from './components/accounts/CreateAccount';
import CreateTransaction from './components/transactions/CreateTransaction';
import ErrorModal from './components/UI/ErrorModal';

import { loader as accountsLoader } from './components/accounts/Accounts';
import { loader as accountsFormLoader } from './components/accounts/AccountsForm';
import { loader as transactionsLoader } from './components/transactions/AllTransactions';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<ErrorModal />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="accounts" element={<Accounts />} loader={accountsLoader} />
            <Route path="accounts/update/:id" element={<AccountsForm />} loader={accountsFormLoader} />
            <Route path="transactions" element={<AllTransactions />} loader={transactionsLoader} />
            <Route path="createAccount" element={<CreateAccount />} />
            <Route path="createTransaction" element={<CreateTransaction />} />
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
