// મહાકાલ CSC સેન્ટર: manual OPEN/CLOSED status
// નોંધ: localStorage માત્ર આ બ્રાઉઝરમાં સ્થિતિ સાચવે છે, બધા મુલાકાતીઓમાં નહીં.
const ADMIN_PIN = "1234";
const STORAGE_KEY = "mahakalCscCenterStatus";

const statusBadge = document.getElementById("statusBadge");
const statusDot = document.getElementById("statusDot");
const statusMessage = document.getElementById("statusMessage");
const adminPin = document.getElementById("adminPin");
const adminFeedback = document.getElementById("adminFeedback");

function getStatus() {
  return localStorage.getItem(STORAGE_KEY) || "open";
}

function renderStatus(status) {
  const isOpen = status === "open";
  statusBadge.textContent = isOpen ? "OPEN — ચાલુ છે" : "CLOSED — બંધ છે";
  statusBadge.className = "status-badge " + (isOpen ? "open" : "closed");
  statusDot.style.background = isOpen ? "#16a34a" : "#dc2626";
  statusMessage.textContent = isOpen
    ? "સેન્ટર હાલમાં ખુલ્લું છે. સેવા માટે સંપર્ક કરી શકો છો."
    : "સેન્ટર હાલમાં બંધ છે. ખુલવાના સમય દરમિયાન સંપર્ક કરો.";
}

function updateStatus(nextStatus) {
  if (adminPin.value !== ADMIN_PIN) {
    adminFeedback.textContent = "ખોટો PIN. કૃપા કરીને ફરી પ્રયાસ કરો.";
    return;
  }
  localStorage.setItem(STORAGE_KEY, nextStatus);
  renderStatus(nextStatus);
  adminFeedback.textContent = nextStatus === "open"
    ? "સ્થિતિ OPEN તરીકે સાચવાઈ."
    : "સ્થિતિ CLOSED તરીકે સાચવાઈ.";
  adminPin.value = "";
}

document.getElementById("setOpen").addEventListener("click", () => updateStatus("open"));
document.getElementById("setClosed").addEventListener("click", () => updateStatus("closed"));
document.getElementById("year").textContent = new Date().getFullYear();

renderStatus(getStatus());
