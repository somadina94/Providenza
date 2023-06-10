import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/es/storage/session';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import authSlice from './auth-slice';
import slideSlice from './slide-slice';
import alertSlice from './alert-slice';
import transferSlice from './transfer-slice';

const rootReducer = combineReducers({
    alert: alertSlice.reducer,
    auth: authSlice.reducer,
    slide: slideSlice.reducer,
    transfer: transferSlice.reducer,
});

const persistConfig = {
    key: 'root',
    storage: sessionStorage,
    stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;
