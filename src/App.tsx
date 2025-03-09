import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { AdminLayoutProvider } from './contexts/AdminLayoutContext';
import './i18n/i18n';

// Pages
import HomePage from './pages/HomePage';
import SportPage from './pages/SportPage';
import AdminPage from './pages/admin/AdminPage';
import ScoringPage from './pages/admin/ScoringPage';
import AdminHelpPage from './pages/admin/AdminHelpPage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <AuthProvider>
        <AdminLayoutProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/sport/:sportId" element={<Layout><SportPage /></Layout>} />
              <Route path="/login" element={<Layout><LoginPage /></Layout>} />
              
              {/* 管理者用ルート - 認証必須かつヘッダー非表示 */}
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute>
                    <Layout hideHeader={true}>
                      <Routes>
                        <Route path="/" element={<AdminPage />} />
                        <Route path="/scoring/:sportId" element={<ScoringPage />} />
                        <Route path="/help" element={<AdminHelpPage />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<Layout><NotFoundPage /></Layout>} />
            </Routes>
          </Router>
        </AdminLayoutProvider>
      </AuthProvider>
    </CustomThemeProvider>
  );
}

export default App;
