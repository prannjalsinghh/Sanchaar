import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import VideoRecorder from './components/VideoRecorder';
import Home from './Pages/Home';
import Profile from './Pages/Profile.js'
import ContactsPage from './Pages/ContactsPage';
import Notifications from './Pages/Notifications';
import SearchPage from './components/SearchPage';
import GiveRespectSearchPage from './components/GiveRespectSearchPage';
import SuggestName from './components/SuggestName';
import ForNewUser from './components/ForNewUser';
import GiveRespectContacts from './components/GiveRespectContacts';
import EachRespect from './components/EachRespect';
import ContinueByName from './components/ContinueByName';
import EditProfile from './Pages/EditProfile';
import SearchSuggestName from './components/SearchSuggestName';
import DisplayVideo from './components/DisplayVideo';
import NewCreatedUserProfile from './components/NewCreatedUserProfile';
import ShowProfile from './Pages/ShowProfile';
import RegisterCase from './Pages/RegisterCase';
import RegionalPosts from './Pages/RegionalPosts.js';
import Tasks from './Pages/Tasks.js';
import DNASearch from './Pages/Tasks/DNASearch.js';
import AadharSearch from './Pages/Tasks/AadharSearch.js';
import MissingCars from './Pages/Tasks/MissingCars.js';
import MissingPerson from './Pages/Tasks/MissingPersons.js';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route path='/registerCase' element={<RegisterCase/>}></Route>
      <Route path='/regionalPosts' element={<RegionalPosts />}></Route>
      <Route path='/home' element={<Home />}></Route>
      <Route path='/tasks' element={<Tasks />}></Route>
      <Route path='/tasks/dnaSearch' element={<DNASearch />}></Route>
      <Route path='/tasks/aadharSearch' element={<AadharSearch />}></Route>
      <Route path='/tasks/missingCars' element={<MissingCars />}></Route>
      <Route path='/tasks/missingPersons' element={<MissingPerson />}></Route>
      <Route path='/:id' element={<Profile />}></Route>
      <Route path='/notifications' element={<Notifications />}></Route>
      <Route path='/search' element={<SearchPage />}></Route>
      <Route path='/giveResectSearch' element={<GiveRespectSearchPage />}></Route>
      <Route path='/suggestName' element={<SuggestName />}></Route>
      <Route path='/giveRespectContacts' element={<GiveRespectContacts />}></Route>
      <Route path='/edit-profile' element={<EditProfile />}></Route>
      <Route path='/watch-video' element={<DisplayVideo></DisplayVideo>}></Route>
      <Route path='/searchSuggestName' element={<SearchSuggestName></SearchSuggestName>}></Route>
      <Route path='/newCreatedUserProfile' element={<NewCreatedUserProfile/>}></Route>
      <Route path='/showProfile' element={<ShowProfile></ShowProfile>}></Route>
    </Routes>
  );
}

export default App;
