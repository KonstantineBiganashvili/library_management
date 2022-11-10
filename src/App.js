import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import BookList from './components/BookList';
import AuthorList from './components/AuthorList';
import Header from './components/common/Header';
import Landing from './components/Landing';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/books/*" element={<BookList />} />
            <Route exact path="/authors/*" element={<AuthorList />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
