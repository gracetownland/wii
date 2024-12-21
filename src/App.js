
import './App.css';
import LandingPage from './LandingPage';
import AboutMe from './AboutMe'
import ContactPage from './ContactPage';
import QuotePage  from './QuotePage';
function App() {
  return (
    <div className="App">
      <LandingPage></LandingPage>
      <AboutMe></AboutMe>
    <QuotePage></QuotePage>
      <ContactPage></ContactPage>
    </div>
  );
}

export default App;
