import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import PersonalitysListPage from "pages/PersonalitysListPage/PersonalitysListPage.tsx";
import PersonalityPage from "pages/PersonalityPage/PersonalityPage.tsx";
import CompanysPage from "pages/CompanysPage/CompanysPage.tsx";
import CompanyPage from "pages/CompanyPage/CompanyPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import PersonalitysTablePage from "pages/PersonalitysTablePage/PersonalitysTablePage.tsx";
import PersonalityEditPage from "pages/PersonalityEditPage/PersonalityEditPage.tsx";
import PersonalityAddPage from "pages/PersonalityAddPage/PersonalityAddPage.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/personalitys/" element={<PersonalitysListPage />} />
                        <Route path="/personalitys-table/" element={<PersonalitysTablePage />} />
                        <Route path="/personalitys/:id/" element={<PersonalityPage />} />
                        <Route path="/personalitys/:id/edit" element={<PersonalityEditPage />} />
                        <Route path="/personalitys/add" element={<PersonalityAddPage />} />
                        <Route path="/companys/" element={<CompanysPage />} />
                        <Route path="/companys/:id/" element={<CompanyPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
