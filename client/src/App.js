import './App.css';
import { Routes, Route } from 'react-router-dom'

import { LoginPageComponent } from './pages/loginPage';
import { MainPage } from './pages/mainPage';
function App() {
  /*const fetchUser = async () => {
  try {
    const userData = await getUser();
    console.log("User data:", userData);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
  useEffect(() => {
  fetchUser();
  }, []);*/

  return (
    <div>
      <Routes>
        <Route path="/main" element={<MainPage />}/>
        <Route path="*" element={<LoginPageComponent />}/>
      </Routes>
    </div>
  );
}

export default App;