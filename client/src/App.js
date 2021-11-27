import SignUpPage from './components/sign_up';
import LogInPage from './components/log_in';
import HomePage from './components/home_page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<HomePage />}></Route>
        <Route exact path='/sign_up' element={<SignUpPage />}></Route>
        <Route exact path='/log_in' element={<LogInPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
