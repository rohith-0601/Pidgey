import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Homepage from "./pages/HomePage"
import HistoryPage from "./pages/History"
import VideocallPage from "./pages/VideocallPage"
import ProfilePage from "./pages/Profile"
import SchedulePage from "./pages/SchedulePage"

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< LoginPage/>} />
      <Route path="/home" element={< Homepage/>} />
      <Route path="/history" element={< HistoryPage/>} />
      <Route path="/meeting" element={< VideocallPage/>} />
      <Route path="/profile" element={< ProfilePage/>} />
      <Route path="/schedule" element={< SchedulePage/>} />
    </Routes>
    
    </BrowserRouter>
    
  )
}

export default App
