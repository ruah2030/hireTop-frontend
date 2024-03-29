import storageSession from 'redux-persist/lib/storage/session'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer, persistStore } from 'redux-persist';
import userSlice from "./userSlice"
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    storage: storageSession,
}

const rootReducer = combineReducers({
    user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        }
    }),

})


export const persistor = persistStore(store)