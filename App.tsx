
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import BlogPostPage from './pages/BlogPostPage';
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import ServicePage from './pages/ServicePage';
import ScrollToTop from './components/ScrollToTop';
import { CMSProvider } from './context/CMSContext';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/admin/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import BlogManager from './pages/admin/BlogManager';
import AIGenerator from './pages/admin/AIGenerator';
import PageEditor from './pages/admin/PageEditor';
import MediaLibrary from './pages/admin/MediaLibrary';
import Inbox from './pages/admin/Inbox';

function App() {
  return (
    <CMSProvider>
      <AuthProvider>
        <HashRouter>
          <ScrollToTop />
          <Routes>
            {/* Admin Login */}
            <Route path="/admin/login" element={<Login />} />

            {/* Application Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/blog" element={<BlogManager />} />
              <Route path="/admin/ai" element={<AIGenerator />} />
              <Route path="/admin/pages" element={<PageEditor />} />
              <Route path="/admin/media" element={<MediaLibrary />} />
              <Route path="/admin/inbox" element={<Inbox />} />
            </Route>

            {/* Public Routes (With Main Layout) */}
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/:id" element={<BlogPostPage />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/payment" element={<Payment />} />

                  {/* Dynamic Service Routes */}
                  <Route path="/services/:id" element={<ServicePage />} />

                  {/* Redirect generic /services to home or specific page */}
                  <Route path="/services" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </HashRouter>
      </AuthProvider>
    </CMSProvider>
  );
}

export default App;
