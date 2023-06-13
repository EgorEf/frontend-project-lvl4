import ReactDOM from 'react-dom/client';

import init from './init';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const app = async () => {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(await init());
};

app();
