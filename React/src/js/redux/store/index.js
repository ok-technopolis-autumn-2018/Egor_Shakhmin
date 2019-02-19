import initializeStoreProd from './initializeStore.prod';
import initializeStoreDev from './initializeStore.dev';

const initializeStore = process.env.BUILD_ENV === 'production' ? initializeStoreProd : initializeStoreDev;
export default initializeStore;
