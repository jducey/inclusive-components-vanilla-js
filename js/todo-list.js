const heading = document.querySelector("h1");
const todoForm = document.querySelector("form");
const liveRegion = document.querySelector("[role='status']");
const toDoUl = document.querySelector("ul");
const deleteBtns = document.querySelectorAll("li button");

// * For each toDo add an li with a checkbox, label and delete button. Also, update the liveRegion to announce the addition of the toDo item.
function addToDo(event) {
  const listLength = toDoUl.children.length;
  const textInput = document.querySelector("[type='text']");
  const textInputValue = textInput.value;
  const toDoItem = document.createElement("li");
  const toDoCheckbox = document.createElement("input");
  const toDoLabel = document.createElement("label");
  const toDoDeleteBtn = document.createElement("button");
  const toDoTrashIcon = document.createElement("i");
  const toDoTrashIconVH = document.createElement("span");
  toDoCheckbox.setAttribute("type", "checkbox");
  toDoCheckbox.setAttribute("id", `todo-${listLength}`);
  toDoLabel.setAttribute("for", `todo-${listLength}`);
  toDoLabel.textContent = textInputValue;
  toDoTrashIcon.setAttribute("class", "bi bi-trash3-fill");
  toDoTrashIcon.setAttribute("aria-label", "delete to do item");
  toDoTrashIconVH.setAttribute("class", "visually-hidden");
  toDoTrashIconVH.textContent = `delete ${textInputValue}`;
  event.preventDefault();
  liveRegion.textContent = `${textInputValue} added`;
  toDoUl.appendChild(toDoItem);
  toDoItem.appendChild(toDoCheckbox);
  toDoItem.appendChild(toDoLabel);
  toDoItem.appendChild(toDoDeleteBtn);
  toDoDeleteBtn.appendChild(toDoTrashIcon);
  toDoDeleteBtn.appendChild(toDoTrashIconVH);
  toDoDeleteBtn.addEventListener("click", deleteToDo);
  textInput.value = "";
}

// * For each toDo item delete the item, change focus to the heading, add tabindex="-1" to the heading
function deleteToDo() {
  let textValue = this.previousSibling.textContent;
  deleteFeedback(textValue);
  this.closest("li").remove();
  heading.setAttribute("tabindex", "-1");
  heading.focus();
}

// * update the live region to announce the toDo deletion
function deleteFeedback(toDoName) {
  liveRegion.textContent = `${toDoName} deleted.`;
}

todoForm.addEventListener("submit", addToDo);
