import './App.css';
import { Client } from "./Client"
import { useState, useEffect } from 'react';
import Recipe from "./components/Recipe";
import { Routes, Route } from 'react-router';
import Landingpage from "./components/Landingpage";
import Category from "./components/Category";
import Navigation from "./components/Navigation";
import Errorpage from "./components/Errorpage";
import Allrecipes from './components/Allrecipes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';



function App() {
  const [recipes, setRecipes] = useState([]);
  const [theme, setTheme] = useState(false)


  const toggleTheme = createTheme({
    palette: {
      mode: `${theme ? 'dark':'light'}`,
    },
    });

    function handleClick () {
      if (!theme) {
        setTheme (true)
      } else {
        setTheme (false)
      }
      
  }

  useEffect(() => {
    Client.getEntries().then((data) => {
      console.log(data.items)
      setRecipes(data.items)
      }).catch((error) => console.log(error));
  }, [])

  return (
    <ThemeProvider theme={toggleTheme}>
    <CssBaseline />
    <div className="App">
      <Navigation theme={handleClick} toggletheme={theme}/>
{/* SETUP URL PATH     */}
      <Routes>
        <Route path="/" element={<Landingpage recipes = {recipes} theme={theme}/>} />
        <Route path="/allrecipes" element={<Allrecipes recipes = {recipes} theme={theme}/>} />
        <Route path="/:type" element={<Category recipes = {recipes} />} />
        <Route path="/:type/:id" element={<Recipe recipes = {recipes} theme={theme}/>} />
        <Route path="/oops" element={<Errorpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div> 
    </ThemeProvider>
    
  );
}

export default App;
