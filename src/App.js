import { BrowserRouter, Route,  Routes } from 'react-router-dom';

import Presentation from './presentation';
import QRCodeGenerator from './qrcode';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
            <Route path='/presentation' element={<Presentation />} />
                <Route path='/qrcode' element={<QRCodeGenerator />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;