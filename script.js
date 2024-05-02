function popup() {
  const popupContainer = document.createElement("div");
  popupContainer.innerHTML = `
    <div id= "popupContainer">
        <h1> New Note </h1> 
        <textarea id = "note-text" placeholder = "Enter your note ..."></textarea>
        <div id= "btn-container">
            <button id = "submitBtn" onclick = "createNote()"> Create Note </button>
            <button id = "closeBtn" onclick = "closePopup()"> Close </button>
        </div>
    </div> `;
  document.body.appendChild(popupContainer);
}
function closePopup() {
  const popContainer = document.getElementById("popupContainer");
  if (popContainer) {
    popContainer.remove();
  }
}

function createNote() {
  const popupContainer = document.getElementById("popupContainer");
  const noteText = document.getElementById("note-text").value;
  if (noteText.trim() !== "") {
    const note = {
      id: new Date().getTime(),
      text: noteText,
    };
    const existingNotes = JSON.parse(localStorage.getItem("notes")) || [];
    existingNotes.push(note);

    localStorage.setItem("notes", JSON.stringify(existingNotes));
    document.getElementById("note-text").value = "";

    popupContainer.remove();
    displayNote();
  }
}

function displayNote() {
  const noteList = document.getElementById("notes-list");
  noteList.innerHTML = "";
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  notes.forEach((note) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    <span> ${note.text}</span>
    <div id = "noteBtns-container">
    <button id = "editBtn"  onclick = "editNote(${note.id})"><i class = "fa-solid fa-pen"></i></button>
    <button id = "deleteBtn"  onclick = "deleteNote(${note.id})"><i class = "fa-solid fa-trash"></i></button>
    </div>
    `;
    noteList.appendChild(listItem);
  });
}
function editNote(noteId) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const noteToEdit = notes.find((note) => note.id == noteId);
  const noteText = noteToEdit ? noteToEdit.text : "";
  const editingPopup = document.createElement("div");

  editingPopup.innerHTML = `
  <div id = "editing-container" data-note-id = "${noteId}">
    <h1>Edit Note </h1>
    <textarea id = "note-text">${noteText}</textarea>
    <div id = "btn-container"> 
        <button id = "submitBtn" onclick = "updateNote()"> Done </button>
        <button id = "closeBtn" onclick = "closeEditPopup()"> Cancel </button>
    </div>
  </div>`;
}
function closeEditPopup() {
  const editingPopup = document.getElementById("editing-container");
  if (editingPopup) {
    editingPopup.remove();
  }
}
function updateNote() {
  const noteText = document.getElementById("note-text").value.trim();
  const editingPopup = document.getElementById("editing-container");

  if (noteText !== "") {
    const noteId = editingPopup.getAttribute("data-note-id");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    const updateNote = notes.map((note) => {
      if ((note.id = noteId)) {
        return { id: noteId, text: noteText };
      }
      return note;
    });

    localStorage.setItem("notes", JSON.stringify(updateNote));

    editingPopup.remove();
    displayNote();
  }
}

function deleteNote(noteId) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.filter((note) => note.id !== noteId);

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNote();
}

displayNote();
