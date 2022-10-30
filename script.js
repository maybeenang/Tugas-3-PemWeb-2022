if (!localStorage.getItem("todo")) {
  const todo = [
    {
      id: 1,
      title: "Makan",
      status: "active",
    },
    {
      id: 2,
      title: "Sholat",
      status: "active",
    },
    {
      id: 3,
      title: "Belajar",
      status: "done",
    },
  ];

  localStorage.setItem("todo", JSON.stringify(todo));
}

const todo = JSON.parse(localStorage.getItem("todo"));
const content = document.querySelector(".content");

const render = () => {
  content.innerHTML = "";

  if (todo.length == 0) {
    content.innerHTML = `<div class="empty">Todo is empty</div>`;
  }

  todo.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("item");

    const text = document.createElement("div");
    text.classList.add("text");
    const p = document.createElement("p");
    p.innerText = item.title;

    const action = document.createElement("div");
    action.classList.add("action");

    const btn = document.createElement("button");
    btn.setAttribute("data-id", item.id);
    btn.setAttribute("id", "btn");

    const btnIcon = document.createElement("i");
    btnIcon.classList.add("fa-solid", "fa-check");
    btnIcon.setAttribute("id", "btn");
    btnIcon.setAttribute("data-id", item.id);

    const edit = document.createElement("button");
    edit.setAttribute("data-id", item.id);
    edit.setAttribute("id", "edit");

    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square");
    editIcon.setAttribute("id", "edit");
    editIcon.setAttribute("data-id", item.id);

    const del = document.createElement("button");
    del.setAttribute("data-id", item.id);
    del.setAttribute("id", "delete");

    const delIcon = document.createElement("i");
    delIcon.classList.add("fa-solid", "fa-trash");
    delIcon.setAttribute("id", "delete");
    delIcon.setAttribute("data-id", item.id);

    if (item.status != "active") {
      div.classList.add("done");
    }

    btn.appendChild(btnIcon);
    edit.appendChild(editIcon);
    del.appendChild(delIcon);

    action.appendChild(btn);
    action.appendChild(edit);
    action.appendChild(del);

    text.appendChild(p);

    div.appendChild(text);
    div.appendChild(action);

    content.appendChild(div);
  });
};

const addItem = (title) => {
  let id = todo.length + 1;
  const status = "active";
  const item = {
    id,
    title,
    status,
  };

  todo.forEach((item) => {
    if (item.id == id) {
      id++;
      return;
    }
  });

  todo.push(item);
  localStorage.setItem("todo", JSON.stringify(todo));
};

const deleteItem = (id) => {
  const index = todo.findIndex((item) => item.id == id);
  todo.splice(index, 1);

  localStorage.setItem("todo", JSON.stringify(todo));
};

const editItem = (id, title) => {
  const index = todo.findIndex((item) => item.id == id);
  todo[index].title = title;

  localStorage.setItem("todo", JSON.stringify(todo));
};

const doneItem = (id) => {
  const index = todo.findIndex((item) => item.id == id);
  todo[index].status = "done";

  localStorage.setItem("todo", JSON.stringify(todo));
};

const input = document.querySelector("#input");
const btn = document.querySelector("#input-btn");

btn.addEventListener("click", () => {
  if (input.value != "") {
    addItem(input.value);
  }

  input.value = "";
  render();
});

content.addEventListener("click", (e) => {
  if (e.target.id == "delete") {
    deleteItem(e.target.dataset.id);
    console.log(e.target.dataset.id, "delete");
  } else if (e.target.id == "edit") {
    const title = prompt("Edit Todo");
    editItem(e.target.dataset.id, title);
    console.log(e.target.dataset.id, "edit");
  } else if (e.target.id == "btn") {
    doneItem(e.target.dataset.id);
    console.log(e.target.dataset.id, "btn");
  }

  render();
});

const search = document.querySelector("#search");

search.addEventListener("keyup", (e) => {
  const searchValue = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".item");

  items.forEach((item) => {
    const title = item.querySelector(".text p").innerText.toLowerCase();
    if (title.indexOf(searchValue) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

render();
