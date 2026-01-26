const players = [
  "Μελίνα Δημητριάδη",
  "Μαργαρίτα Κουτσομπολή",
  "Γιάννης Καπουλίτσας",
  "Νικόλας Γονιδάκης",
  "Νίκος Καλογήρου",
  "Δημήτρης Μπανάγης",
  "Φίλιππος Μίχας",
  "Γιώργος Ρούσσης",
  "Παναγιώτης 4ης"
];

// στόχοι
const targets = [10, 100, 1000, 2500];

// δεδομένα
let data = JSON.parse(localStorage.getItem("sporades")) || {};
players.forEach(p => { if(!data[p]) data[p] = 0; });

// εμφάνιση ημερομηνίας
document.getElementById("date").innerText = new Date().toLocaleDateString("el-GR");

// επιλογή παίκτη
const select = document.getElementById("player");
players.forEach(p => {
  const o = document.createElement("option");
  o.textContent = p;
  select.appendChild(o);
});

let chart;

// προσθήκη σπορακίων
function addSporakia() {
  const name = select.value;
  const val = Number(document.getElementById("amount").value);
  if(!val) return;

  data[name] += val;

  localStorage.setItem("sporades", JSON.stringify(data));
  draw();
}

// reset όλα
function resetAll() {
  players.forEach(p => data[p] = 0);
  localStorage.setItem("sporades", JSON.stringify(data));
  draw();
}

// υπολογισμός τρέχοντος στόχου
function getTarget(total) {
  for(let i=targets.length-1;i>=0;i--){
    if(total >= targets[i]) return targets[i];
  }
  return targets[0];
}

// εμφάνιση chart
function draw() {
  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((a,b)=>a+b,0);

  document.getElementById("total").innerText = total;
  document.getElementById("target").innerText = getTarget(total);

  const colors = ["#ff6384","#36a2eb","#ffce56","#4bc0c0","#9966ff","#ff9f40","#c9cbcf","#8dd17e","#ff5c7a"];

  if(chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"),{
    type:"bar",
    data:{
      labels,
      datasets:[{
        label:"Σποράκια",
        data: values,
        backgroundColor: colors
      }]
    },
    options:{
      responsive:true,
      scales:{y:{beginAtZero:true}},
      plugins:{
        legend:{display:false}
      },
      animation:{duration:800}
    }
  });
}

// αρχικό draw
draw();
