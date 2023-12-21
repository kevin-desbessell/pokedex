import { BrowserRouter, Route, Routes } from "react-router-dom";
import { List } from "./pokemon-list";
import { Details } from "./pokemon-details";

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<List />} />
            <Route exact path='/pokemon/:id' element={<Details />} />
        </Routes>
    </BrowserRouter>
)

export { AppRoutes }