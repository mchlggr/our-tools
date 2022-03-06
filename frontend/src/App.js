import './App.css';
import RootRoutes from "./RootRoutes";
import {BrowserRouter} from "react-router-dom";
import StoreProvider from "./providers/StoreProvider";


function App() {
    return (
        <div className="penumbra__main-wrapper">
            <StoreProvider>
                <BrowserRouter>
                    <RootRoutes/>
                </BrowserRouter>
            </StoreProvider>
        </div>
    );
}

export default App;