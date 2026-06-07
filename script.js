console.log("SCRIPT CONNECTED");
const form = document.getElementById("incident-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const type = document.getElementById("inc-type").value;
  const location = document.getElementById("location").value;
  const affected = document.getElementById("affected").value || "Unknown";
  const description = document.getElementById("description").value;

  let severity = "Medium";
  let priority = 5;
  let responders = "Local Response Team";

  if (type.includes("Fire") || description.toLowerCase().includes("fire")) {
    severity = "Critical";
    priority = 10;
    responders = "Fire Brigade + Ambulance";
  } else if (
    type.includes("Road") ||
    description.toLowerCase().includes("accident")
  ) {
    severity = "High";
    priority = 8;
    responders = "Ambulance + Police";
  } else if (type.includes("Medical")) {
    severity = "High";
    priority = 7;
    responders = "Ambulance";
  }

  document.getElementById("ai-result").classList.remove("hidden");

  document.getElementById("result-content").innerHTML = `
      <p><strong>Emergency Type:</strong> ${type}</p>
      <p><strong>Severity:</strong> ${severity}</p>
      <p><strong>Priority Score:</strong> ${priority}/10</p>
      <p><strong>Affected People:</strong> ${affected}</p>
      <p><strong>Recommended Responders:</strong> ${responders}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Description:</strong> ${description}</p>
  `;

  if (severity === "Critical") {
    alert("🚨 CRITICAL EMERGENCY DETECTED!");
  }

  addIncidentToQueue(type, location, severity, responders);

  updateStats();

  form.reset();
});

function addIncidentToQueue(type, location, severity, responders) {
  const queue = document.getElementById("incident-queue");

  const colorClass =
    severity === "Critical" ? "red" : severity === "High" ? "amber" : "emerald";

  const incident = document.createElement("div");

  incident.className = "p-4 flex items-center justify-between animate-fadeIn";

  incident.innerHTML = `
    <div class="flex items-center gap-4">
      <span
      class="bg-${colorClass}-500/10
      text-${colorClass}-400
      px-2.5 py-1
      rounded
      text-xs
      font-bold">
      ${severity}
      </span>

      <div>
        <h4 class="text-sm font-semibold">
          ${type}
        </h4>

        <p class="text-xs text-slate-400">
          📍 ${location}
        </p>
      </div>
    </div>

    <div class="text-right">
      <span
      class="text-xs bg-slate-700 px-3 py-1 rounded-full">
      ${responders}
      </span>

      <p class="text-[10px] text-slate-500 mt-1">
      Just now
      </p>
    </div>
  `;

  queue.prepend(incident);
}

function updateStats() {
  const active = document.getElementById("stat-active");

  let count = parseInt(active.textContent);

  active.textContent = count + 1;
}
