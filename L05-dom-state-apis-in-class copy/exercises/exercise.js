console.log("JS connected ✅");

/* 1) DOM EASY — Live Character Counter */
const msgInput = document.getElementById("msgInput");
const msgStats = document.getElementById("msgStats");

msgInput.addEventListener("input", function () {
  const len = msgInput.value.length;
  const remaining = 50 - len;
  
  // FIX: Update msgStats, not msgInput
  msgStats.innerText = `Length: ${len} | Remaining: ${remaining}`;

  if (remaining < 10) {
    msgStats.style.color = "red";
    msgStats.style.fontWeight = "bold";
  } else {
    msgStats.style.color = "";
    msgStats.style.fontWeight = "";
  }
});

/* 2) DOM MEDIUM — Toggle List (Event Delegation) */
const itemInput = document.getElementById("itemInput");
const btnAddItem = document.getElementById("btnAddItem");
const btnClearItems = document.getElementById("btnClearItems");
const itemList = document.getElementById("itemList");
const listStats = document.getElementById("listStats");
let nextId = 1;

function updateListStats() {
  const total = itemList.querySelectorAll("li").length;
  const done = itemList.querySelectorAll("li.done").length;
  listStats.innerText = `Items: ${total} | Done: ${done}`;
}

btnAddItem.onclick = function () {
  const text = itemInput.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.dataset.id = String(nextId);

  const span = document.createElement("span");
  span.textContent = text;

  const btnX = document.createElement("button");
  btnX.textContent = "x";
  btnX.dataset.action = "remove";

  li.appendChild(span);
  li.appendChild(btnX);
  itemList.appendChild(li);

  itemInput.value = "";
  nextId++;
  updateListStats();
};

btnClearItems.onclick = function () {
  itemList.innerHTML = "";
  updateListStats();
};

// Event Delegation Pattern

itemList.onclick = function (e) {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.dataset.action === "remove") {
    li.remove();
  } else {
    li.classList.toggle("done");
  }
  updateListStats();
};
updateListStats(); // Initial call

/* 3) STATE EASY — Counter (State → Render) */
const countOut = document.getElementById("countOut");
const parityOut = document.getElementById("parityOut");
const counterState = { count: 0 };

function renderCounter() {
  countOut.innerText = `Count: ${counterState.count}`;
  parityOut.innerText = `Parity: ${counterState.count % 2 === 0 ? "EVEN" : "ODD"}`;
}

document.getElementById("btnPlus").onclick = () => { counterState.count++; renderCounter(); };
document.getElementById("btnMinus").onclick = () => { counterState.count--; renderCounter(); };
document.getElementById("btnZero").onclick = () => { counterState.count = 0; renderCounter(); };
renderCounter();

/* 4) STATE MEDIUM — Mini Cart */
const cartOut = document.getElementById("cartOut");
const cartTotals = document.getElementById("cartTotals");
const cartState = { items: [] };

function dispatch(action) {
  if (action.type === "ADD") { cartState.items.push(action.item); }
  else if (action.type === "REMOVE_LAST") { cartState.items.pop(); }
  else if (action.type === "CLEAR") { cartState.items = []; }
  renderCart();
}

function renderCart() {
  const listText = cartState.items.length === 0 ? "(empty)" : cartState.items.map(it => it.name).join(", ");
  const total = cartState.items.reduce((sum, it) => sum + it.price, 0);
  cartOut.innerText = `Cart: ${listText}`;
  cartTotals.innerText = `Items: ${cartState.items.length} | Total: €${total}`;
}

document.getElementById("btnAddApple").onclick = () => dispatch({ type: "ADD", item: { name: "Apple", price: 2 } });
document.getElementById("btnAddBanana").onclick = () => dispatch({ type: "ADD", item: { name: "Banana", price: 1 } });
document.getElementById("btnRemoveLast").onclick = () => dispatch({ type: "REMOVE_LAST" });
document.getElementById("btnCartClear").onclick = () => dispatch({ type: "CLEAR" });
renderCart();

/* 5) Browser API EASY — localStorage */
const NOTE_KEY = "L05_NOTE";
function renderNote(saved) {
  document.getElementById("noteOut").innerText = saved ? `Saved note: ${saved}` : "Saved note: (none)";
}
document.getElementById("btnSaveNote").onclick = () => {
  const text = document.getElementById("noteInput").value;
  localStorage.setItem(NOTE_KEY, text);
  renderNote(text);
};
document.getElementById("btnLoadNote").onclick = () => renderNote(localStorage.getItem(NOTE_KEY));
document.getElementById("btnClearNote").onclick = () => { localStorage.removeItem(NOTE_KEY); renderNote(null); };

/* 6) Browser API MEDIUM — Geolocation */
const geoStatus = document.getElementById("geoStatus");
const geoOut = document.getElementById("geoOut");

function clearGeoUI() { geoStatus.innerText = "Status: ..."; geoOut.innerText = "..."; }

document.getElementById("btnGetLocation").onclick = function () {
  if (!navigator.geolocation) {
    geoStatus.innerText = "Error: Not supported";
    return;
  }
  geoStatus.innerText = "Requesting permission...";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      geoStatus.innerText = "Status: OK";
      geoOut.innerText = `Lat: ${pos.coords.latitude}\nLon: ${pos.coords.longitude}\nAcc: ${pos.coords.accuracy}m`;
    },
    (err) => { geoStatus.innerText = `Status: Error (${err.message})`; },
    { enableHighAccuracy: true, timeout: 5000 }
  );
};
document.getElementById("btnClearLocation").onclick = clearGeoUI;