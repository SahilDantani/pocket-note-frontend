
import { useState ,useEffect} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://127.0.0.1:8070"
  const noteInitial = [
    
  ]

  const [notes, setNotes] = useState(noteInitial)

  // getNotes

  const getNotes = async () => {
    try {
      const token = localStorage.getItem('token');
  
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token,
        },
      });
  
      const data = await response.json();
      console.log('Fetched Notes Data:', data);
  
      if (response.status === 200) {
        setNotes(data);
      } else {
        console.log('Error fetching notes:', data.error);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    getNotes(); 
  }, []);



  // add Note
  const addNote = async (title,description,tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
         },
     body: JSON.stringify({title,description,tag}), 
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  // delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
         }
    });
    const json = await response.json();
    const newNotes = notes.filter((note)=>{
      return note._id !== id
    })
    setNotes(newNotes);
  }

  // edit Note
  const editNote = async (id,title,description,tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
         },
     body: JSON.stringify({title,description,tag}), 
    });
    const json = await response.json(); 
  
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag =tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes,addNote,deleteNote,editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;