import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Favourite from "./pages/Favourite";
import Error from "./pages/Error";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      const contactsFormServer = await fetchContacts();
      setContacts(contactsFormServer);
    };

    getContacts();
  }, []);
  

  const formSub =async(data) => {
    // console.log("data from app.js");
    // console.log(data);
    // setContacts([...contacts, data]);

    const res = await fetch("http://localhost:3000/contacts", {
    method: "POST",
    headers: {
    "Content-type": "application/json",
    },
    body: JSON.stringify(data),
    });
    const newdata = await res.json();
    if (res.ok) {
      setContacts([...contacts, newdata]);
    }
  };

  // fetch contacts
  const fetchContacts= async()=>{
    const res=await fetch("http://localhost:3000/contacts")
    const data=await res.json()
    return data
  }
    // delete contact
    const deleteContact = async (id) => {
      const res = await fetch(`http://localhost:3000/contacts/${id}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        let newContact = contacts.filter((singleContact) => {
          return singleContact.id !== id;
        });
  
        setContacts(newContact);
      }
    };
  

  // get single contact
  const getCon = async (id) => {
    const res = await fetch(`http://localhost:3000/contacts/${id}`);
    const data = await res.json();

    return data;
  };
 // favourite button
 const favToggle = async (id) => {
  const singleCon = await getCon(id);

  const updTask = { ...singleCon, fav: !singleCon.fav };

  const res = await fetch(`http://localhost:3000/contacts/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updTask),
  });
  if (res.status === 200) {
    let updatedContact = contacts.map((singleContact) => {
      return singleContact.id === id
        ? { ...singleContact, fav: !singleContact.fav }
        : singleContact;
    });
    setContacts(updatedContact);
  }
};
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                formSub={formSub}
                contacts={contacts}
                deleteContact={deleteContact}
                favToggle={favToggle}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route
            path="/favourite"
            element={
              <Favourite
                contacts={contacts}
                deleteContact={deleteContact}
                favToggle={favToggle}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
