import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import rootReducer from './reducers';

// redux-persist config
const persistConfig = {
	key: 'root:todoapp',
	storage: AsyncStorage,
	whitelist: ['auth','todos'],
};

// initialize persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Define redux middlewares
const middlewares = [thunk];

// store for Provider component
const store :any = createStore(persistedReducer, applyMiddleware(...middlewares));

// persist store for PersistGate component
const persistor = persistStore(store as any);

export {store, persistor};
