// Deps
import RootRoutes from "./RootRoutes";
import {BrowserRouter} from "react-router-dom";

// Providers
import StoreProvider from "./providers/StoreProvider";

// Styles
import './App.css';
import s from './styles/app.module.css'

function App() {
    return (
        <div className={s["main-wrapper"]}>
            <StoreProvider>
                <BrowserRouter>
                    <RootRoutes/>
                </BrowserRouter>
            </StoreProvider>
        </div>
    );
}

export default App;