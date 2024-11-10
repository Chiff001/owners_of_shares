
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersonalityCatalog from "./pages/PersonalityCatalog";
import { PersonalityPage } from "./pages/PersonalityPage";
import { ROUTES } from "./Routes";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path={ROUTES.HOME} index element={<HomePage />} />
        <Route path={ROUTES.PERSONALITIES} element={<PersonalityCatalog />} />
        <Route path={`${ROUTES.PERSONALITIES}/:id`} element={<PersonalityPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
