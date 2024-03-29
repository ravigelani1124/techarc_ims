import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { CButton, CCard, CCardBody, CContainer, CSpinner } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLink } from '@coreui/icons';

const NewsComponent = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;   // number of articles to load per page
  const location = useLocation();

  useEffect(() => {
    document.title = 'News';
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: 'Canadian immigration',
            apiKey: '15becd8edfbf4809b8e1825c6b557d5c',
            page: pageNumber,
            pageSize: pageSize
          }
        });
        const filteredNews = response.data.articles.filter(article => article.title !== '[Removed]');
        setNews(prevNews => [...prevNews, ...filteredNews]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [pageNumber]);

  const handleLoadMore = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-between">
      {/* Header */}
      <header className="bg-dark text-white text-center py-3" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <div className="header-content d-flex justify-content-end">
          <Link to="/" className={`nav-link me-3`}>
            Home
          </Link>
          <Link to="/news" className={`nav-link me-3 ${location.pathname === '/news' ? 'active' : ''}`} style={{ color: 'black', fontWeight: ' bold' }}>
            News
          </Link>
          <Link to="/faqs" className={`nav-link me-3 ${location.pathname === '/faqs' ? 'active' : ''}`}>
            FAQs
          </Link>
          <Link to="/contact" className={`nav-link me-3 ${location.pathname === '/contact' ? 'active' : ''}`}>
            Contact
          </Link>
        </div>
      </header>

      {/* Main content */}
      <div className="container">
        <h1 className="text-center mt-3 mb-4"></h1>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
            <CSpinner />
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {news.map((article, index) => (
              <div key={index} className="col">
                <CCard className="h-100 shadow-sm">
                  {article.urlToImage && (
                    <img src={article.urlToImage} className="card-img-top" alt={article.title} />
                  )}
                  <CCardBody>
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text">{article.description}</p>
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                      Read more <CIcon icon={cilLink} className="ms-1" />
                    </a>
                  </CCardBody>
                </CCard>
              </div>
            ))}
          </div>
        )}
        {/* "Load More" Button */}
        {!loading && (
          <div className="d-flex justify-content-center mt-4">
            <CButton onClick={handleLoadMore} color="primary">
              Load More
            </CButton>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-2" style={{ position: 'sticky', bottom: 0, zIndex: 1000 }}>
        <span className="me-2">Powered by: TechArc</span>
      </footer>
    </div>
  );
}

export default NewsComponent;
