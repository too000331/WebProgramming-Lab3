const form = document.querySelector(".nottodo_form");
const input = document.querySelector(".nottodo_input");
const nottodo_container = document.querySelector(".nottodo_container");

const startConf = () => {

   const nottodos = JSON.parse(localStorage.getItem("nottodos"));
   if (!nottodos) {
      localStorage.setItem("nottodos", JSON.stringify([]));
   } else {
      nottodos.forEach(nottodo => {
         addHTML(nottodo);
      });
   } 
}

const addNotTodo = (e) => {
   e.preventDefault();
   
   const inputVal = input.value;

   if (inputVal == '')  { 
      input.style.border = '1px solid tomato';
      setTimeout(() => {
         input.style.borderColor = 'transparent';
      }, 2500);
      return false;
   }

   const nottodo = {
      text: inputVal,
      isCompleted: false,
   };

   const nottodos = JSON.parse(localStorage.getItem("nottodos"));
   nottodos.push(nottodo);
   localStorage.setItem("nottodos", JSON.stringify(nottodos));

   addHTML(nottodo);

   form.reset();
}

const deleteNotTodo = (e) => {
   const nottodo = e.target.parentElement.parentElement;
   const text = nottodo.firstChild.children[1].textContent;

   let nottodos = JSON.parse(localStorage.getItem("nottodos"));
   nottodos = nottodos.filter(td => td.text != text);
   localStorage.setItem("nottodos", JSON.stringify(nottodos));

   nottodo.remove();
}

const completeNotTodo = (e) => {
   const nottodo = e.target.parentElement.parentElement;
   const text = nottodo.firstChild.children[1].textContent;

   let nottodos = JSON.parse(localStorage.getItem("nottodos"));
   
   nottodos.forEach(td => {
      if (td.text === text) td.isCompleted = !td.isCompleted 
   });

   localStorage.setItem("nottodos", JSON.stringify(nottodos));
}

const saveNotTodo = (e) => {
   const nottodo = e.target.parentElement.parentElement;
   const prevText = nottodo.firstChild.children[1].textContent; 
   const newText = nottodo.firstChild.children[2].value; 

   let nottodos = JSON.parse(localStorage.getItem("nottodos"));
   
   nottodos.forEach(td => {
      if (td.text === prevText) td.text = newText;
   });

   localStorage.setItem("nottodos", JSON.stringify(nottodos));

   nottodo.firstChild.children[1].textContent = newText;  

   nottodo.classList.remove("-edited");
}

const editNotTodo = (e) => {
   const nottodo = e.target.parentElement.parentElement;
   nottodo.classList.add("-edited");
}

const addHTML = (nottodo) => {
   const nottodoDiv = document.createElement("div");
   nottodoDiv.classList.add("nottodo");

   const nottodoLeft = document.createElement("div");
   nottodoLeft.classList.add("nottodo_left");
   
   const editInput = document.createElement("input");
   editInput.classList.add("nottodo_editInput")
   editInput.defaultValue = nottodo.text;

   const nottodoCb = document.createElement("input");
   nottodoCb.type = "checkbox";
   nottodoCb.checked = nottodo.isCompleted; 
   nottodoCb.classList.add("nottodo_cb");
   nottodoCb.addEventListener("click", completeNotTodo);

   const nottodoText = document.createElement("span");
   nottodoText.classList.add("nottodo_text");
   nottodoText.textContent = nottodo.text;

   nottodoLeft.appendChild(nottodoCb);
   nottodoLeft.appendChild(nottodoText);
   nottodoLeft.appendChild(editInput);

   const nottodoRight = document.createElement("div");
   nottodoRight.classList.add("nottodo_right");

   const deleteBtn = document.createElement("button");
   deleteBtn.classList.add("nottodo_delete");
   deleteBtn.textContent = "Delete";
   deleteBtn.addEventListener("click", deleteNotTodo); 
   
   const editBtn = document.createElement("button");
   editBtn.classList.add("nottodo_edit");
   editBtn.textContent = "Edit";
   editBtn.addEventListener("click", editNotTodo); 
   
   const saveBtn = document.createElement("button");
   saveBtn.classList.add("nottodo_save");
   saveBtn.textContent = "Save";
   saveBtn.addEventListener("click", saveNotTodo);

   nottodoRight.appendChild(deleteBtn);
   nottodoRight.appendChild(editBtn);
   nottodoRight.appendChild(saveBtn);

   nottodoDiv.appendChild(nottodoLeft);
   nottodoDiv.appendChild(nottodoRight);

   nottodo_container.appendChild(nottodoDiv);
}

startConf();

form.addEventListener("submit", addNotTodo);