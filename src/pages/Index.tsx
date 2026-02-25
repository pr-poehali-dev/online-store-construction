import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import AdminPage from './AdminPage';
import PromoPage from './PromoPage';
import BlogPage from './BlogPage';
import ContactPage from './ContactPage';
import DeliveryPage from './DeliveryPage';
import FaqPage from './FaqPage';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';

type Page = 'home' | 'catalog' | 'product' | 'cart' | 'admin' | 'promo' | 'blog' | 'contact' | 'delivery' | 'faq' | 'about' | 'account';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [pageParams, setPageParams] = useState<Record<string, string>>({});

  const navigate = (page: string, params?: Record<string, string>) => {
    setCurrentPage(page as Page);
    setPageParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = currentPage === 'admin';

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Header currentPage={currentPage} onNavigate={navigate} />}

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'catalog' && <CatalogPage onNavigate={navigate} params={pageParams} />}
        {currentPage === 'product' && <ProductPage onNavigate={navigate} params={pageParams} />}
        {currentPage === 'cart' && <CartPage onNavigate={navigate} />}
        {currentPage === 'admin' && <AdminPage onNavigate={navigate} />}
        {currentPage === 'promo' && <PromoPage onNavigate={navigate} />}
        {currentPage === 'blog' && <BlogPage onNavigate={navigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={navigate} />}
        {currentPage === 'delivery' && <DeliveryPage onNavigate={navigate} />}
        {currentPage === 'faq' && <FaqPage onNavigate={navigate} />}
        {currentPage === 'about' && <AboutPage onNavigate={navigate} />}
        {currentPage === 'account' && <AccountPage onNavigate={navigate} />}
      </main>

      {!isAdmin && <Footer onNavigate={navigate} />}
    </div>
  );
}
