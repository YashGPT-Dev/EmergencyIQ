console.log("SCRIPT CONNECTED");
const form = document.getElementById("incident-form");

// Null-Safety: Ensuring the form target container exists on page initialization
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const type = document.getElementById("inc-type").value;
    const channel = document.getElementById("channel").value;
    const location = document.getElementById("location").value;
    const affected = document.getElementById("affected").value || "Unknown";
    const description = document.getElementById("description").value;

    // Location Empty String Field Validation Check
    if (location.trim() === "") {
      alert("Please enter location");
      return;
    }

    // Description Empty Text Field Validation Check
    if (description.trim() === "") {
      alert("Please enter incident description");
      return;
    }

    let severity = "Medium";
    let priorityScore = "6.2/10";
    let responders = "Local Response Unit";
    let eta = "6 minutes";
    let assetHTML = "";

    // Dynamic asset & metadata calculation mapping engine
    if (type.includes("Fire") || description.toLowerCase().includes("fire")) {
      severity = "Critical";
      priorityScore = (9.5 + Math.random() * 0.4).toFixed(1) + "/10";
      eta = "3 minutes";
      responders = "Fire Brigade x3 Depot";
      assetHTML = `
        <p class="text-red-400 font-medium"><i class="fa-solid fa-fire-extinguisher mr-1"></i> Engine Squad 4 & Hazmat 1</p>
        <p class="text-cyan-400 font-medium"><i class="fa-solid fa-truck-medical mr-1"></i> Nearest Ambulance (1.8 km)</p>
      `;
    } else if (
      type.includes("Road") ||
      description.toLowerCase().includes("accident")
    ) {
      severity = "High";
      priorityScore = (8.4 + Math.random() * 0.5).toFixed(1) + "/10";
      eta = "7 minutes";
      responders = "Ambulance x2, Highway Patrol";
      assetHTML = `
        <p class="text-cyan-400 font-medium"><i class="fa-solid fa-truck-medical mr-1"></i> Nearest Ambulance (2.3 km)</p>
        <p class="text-blue-400 font-medium"><i class="fa-solid fa-shield-halved mr-1"></i> Police Unit Bravo</p>
      `;
    } else if (type.includes("Medical")) {
      severity = "High";
      priorityScore = (7.5 + Math.random() * 0.4).toFixed(1) + "/10";
      eta = "5 minutes";
      responders = "Ambulance x1 Rapid";
      assetHTML = `
        <p class="text-cyan-400 font-medium"><i class="fa-solid fa-truck-medical mr-1"></i> Medic Dispatch Unit Charlie</p>
      `;
    } else {
      priorityScore = (5.5 + Math.random() * 0.9).toFixed(1) + "/10";
      eta = "9 minutes";
      responders = "Local Security Patrol";
      assetHTML = `
        <p class="text-slate-400 font-medium"><i class="fa-solid fa-user-shield mr-1"></i> Sector Community Patrol</p>
      `;
    }

    // High confidence dynamic generation engine (85% to 99%)
    const confidence = Math.floor(Math.random() * 15) + 85;

    // Feature Component Injection: Risk Index Calculator Metric (80.0% to 100.0%)
    const riskIndex = (Math.random() * 20 + 80).toFixed(1);

    // Feature Component Injection: Dynamic AI Recommendation Engine Direct String Array Selector
    const recommendation = [
      "Dispatch nearest medical unit",
      "Notify regional control center",
      "Activate crowd diversion protocol",
      "Escalate to emergency command",
    ];
    const randomRec =
      recommendation[Math.floor(Math.random() * recommendation.length)];

    // Reveal AI Output Container Node smoothly
    const aiResultContainer = document.getElementById("ai-result");
    if (aiResultContainer) {
      aiResultContainer.classList.remove("hidden");
    }

    // Injection of dynamic values tracking into the output layout
    const aiPriorityLabel = document.getElementById("ai-priority");
    if (aiPriorityLabel) {
      aiPriorityLabel.innerText = `Priority: ${priorityScore}`;
    }

    const resultContentContainer = document.getElementById("result-content");
    if (resultContentContainer) {
      resultContentContainer.innerHTML = `
        <div class="flex justify-between border-b border-slate-800/80 pb-1">
          <span class="text-slate-400">AI Confidence:</span>
          <span class="font-bold text-emerald-400">${confidence}%</span>
        </div>
        <div class="flex justify-between border-b border-slate-800/80 pb-1">
          <span class="text-slate-400">Risk Assessment Index:</span>
          <span class="font-bold text-rose-400">${riskIndex}%</span>
        </div>
        <div class="flex justify-between border-b border-slate-800/80 pb-1">
          <span class="text-slate-400">Est. Response Time:</span>
          <span class="font-semibold text-amber-400">${eta}</span>
        </div>
        <div class="border-b border-slate-800/80 pb-1 text-slate-300 space-y-0.5 text-[11px]">
          <p><strong>Channel Intake:</strong> <span class="text-emerald-400 font-medium">${channel}</span></p>
          <p class="truncate"><strong>Target Vector:</strong> ${location} (${affected} Affected)</p>
          <p class="text-indigo-400"><i class="fa-solid fa-microchip mr-1"></i><strong>Action Item:</strong> ${randomRec}</p>
        </div>
        <div class="space-y-1 pt-0.5">
          <span class="text-slate-400 block text-[11px]">Optimized Deployment Assets:</span>
          <div class="bg-slate-900/80 p-2 rounded border border-slate-700/50 text-[11px] space-y-0.5">
            ${assetHTML}
          </div>
        </div>
      `;
    }

    // Translocate resource map asset node indicator visually within layout map boundaries
    const ambMarker = document.getElementById("map-ambulance");
    if (ambMarker) {
      ambMarker.style.transform = `translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px)`;
    }

    // Push straight down into our live interactive UI list queue
    addIncidentToQueue(type, location, severity, responders);

    // Update real-time counter metrics
    updateStats(severity);

    // Reset fields cleanly
    form.reset();
  });
}

function addIncidentToQueue(type, location, severity, responders) {
  const queue = document.getElementById("incident-queue");
  if (!queue) return;

  const colorClass =
    severity === "Critical" ? "red" : severity === "High" ? "amber" : "emerald";

  const incident = document.createElement("div");
  incident.className =
    "p-4 flex items-center justify-between hover:bg-slate-750 transition border-b border-slate-700/40 animate-fadeIn";

  incident.innerHTML = `
    <div class="flex items-center gap-4">
      <span class="bg-${colorClass}-500/10 text-${colorClass}-400 px-2.5 py-1 rounded text-xs font-bold border border-${colorClass}-500/20">
        ${severity}
      </span>
      <div>
        <h4 class="text-sm font-semibold text-slate-200">${type}</h4>
        <p class="text-xs text-slate-400 mt-0.5">
          <i class="fa-solid fa-location-dot mr-1 text-slate-500"></i> ${location}
        </p>
      </div>
    </div>
    <div class="text-right">
      <span class="text-xs bg-slate-700/60 px-3 py-1 rounded-full text-slate-300 border border-slate-600/30">
        ${responders}
      </span>
      <p class="text-[10px] text-slate-500 mt-1">Just now</p>
    </div>
  `;

  queue.prepend(incident);
}

function updateStats(severity) {
  // Update Active Incident Counter
  const activeCounter = document.getElementById("stat-active");

  if (activeCounter) {
    activeCounter.textContent = (parseInt(activeCounter.textContent) || 0) + 1;
  }

  // Update Severity Metrics
  let counterId = "";

  switch (severity) {
    case "Critical":
      counterId = "critical-count";
      break;

    case "High":
      counterId = "high-count";
      break;

    default:
      counterId = "medium-count";
      break;
  }

  const severityCounter = document.getElementById(counterId);

  if (severityCounter) {
    severityCounter.textContent =
      (parseInt(severityCounter.textContent) || 0) + 1;
  }
}
