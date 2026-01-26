const players = [
 "Μελίνα Δημητριάδη",
 "Μαργαρίτα Κουτσομπολή",
 "Γιάννης Καπουλίτσας",
 "Νικόλας Γονιδάκης",
 "Νίκος Καλογήρου",
 "Δημήτρης Μπανάγης",
 "Φίλιππος Μίχας",
 "Γιώργος Ρούσσης"
 "Παναγιωτης 4ης"
];

// αρχικά 0
let data = JSON.parse(localStorage.getItem("sporades"));

if (!data) {
  data = {};
  players.forEach(p => data[p] = 0);
}

localStorage.setItem("sporades", JSON.stringify(data));

const select = document.getElementById("player");
players.forEach(p => {
  const o = document.createElement("option");
  o.textContent = p;
  select.appendChild(o);
});

let chart;

function add() {
  const name = select.value;
  const value = Number(document.getElementById("amount").value);

  if (!value) return;

  data[name] += value;

  localStorage.setItem("sporades", JSON.stringify(data));
  draw();
}

function draw() {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const total = values.reduce((a,b)=>a+b,0);
  document.getElementById("total").innerText = total;

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Σποράκια",
        data: values
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}

draw();
