import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import Invitees from './invitees';
import Presentation from './presentation';
import QRCodeGenerator from './qrcode';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/invitees' element={<Invitees />} />
                <Route path='/presentation' element={<Presentation />} />
                <Route path='/qrcode' element={<QRCodeGenerator />} />
            </Routes>

        </BrowserRouter>
    );
};

export default App;
