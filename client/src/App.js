import React, { useState, useEffect } from "react";
import Calendar from "features/calendar/Calendar";
import LoginWithDiscord from "features/auth/LoginWithDiscord";
import UserForm from "features/form/UserForm";
import Modal from "features/modal/Modal";
import DataService from "services/dataService";
import { Context } from "./contexts/Context"

function App() {
  const [context, setContext] = useState({user: null, event: null, modalOpen: false})
  const [page, setPage] = useState("landingPage")
  
  useEffect(() => {
    DataService.getCurrentUser().then(response => {
      setContext({ user: response.data })
    });
  }, []);

  return (
    <Context.Provider value={[context, setContext]}>
      {context.user && 
        <h3>Hello, {context.user.displayName}, welcome to Together!</h3>
      }
      <LoginWithDiscord />
      {page === "landingPage" && <>
        <button onClick={() => setPage("calendarPage")}>
          Navigate to Calendar
        </button>
        <h1>Hello, landingPage goes here</h1>
      </>}
      {page === "calendarPage" && <>
        <button onClick={() => setPage("landingPage")}>
          Navigate to LandingPage
        </button>
        <Calendar />
        {context.user && 
          <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
            <Modal/>
            <UserForm />
          </div>
        }
      </>}
    </Context.Provider>
  )
}

export default App;
