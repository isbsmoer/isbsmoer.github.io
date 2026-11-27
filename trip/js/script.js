const STORAGE_KEY = "trip-maker-state-v1";

const defaultState = {
    tripInfo: {
        title: "春の横浜・八景島シーパラダイス満喫",
        destination: "横浜・八景島",
        startDate: "2026-04-18",
        endDate: "2026-04-19",
        members: "なお・ゆう・さくら"
    },
    schedules: [
        { id: "1", date: "2026-04-18", time: "09:30", title: "横浜駅 集合", memo: "みどりの窓口そばで集合！", icon: "🚃", image: "" },
        { id: "2", date: "2026-04-18", time: "11:00", title: "八景島シーパラダイス", memo: "イルカショーのチケットを事前に確認。", icon: "🐬", image: "" },
        { id: "3", date: "2026-04-18", time: "18:00", title: "海沿いの夕食", memo: "予約済みのお店でゆっくりディナー。", icon: "🍽", image: "" },
        { id: "4", date: "2026-04-19", time: "10:00", title: "みなとみらい散歩", memo: "赤レンガ倉庫へ寄り道。", icon: "⛵", image: "" }
    ],
    design: { font: "zen", background: "#FFF8E9", accent: "#FF7A9E", frame: "simple" },
    coverImage: ""
};

let state = loadState();
let viewMode = false;

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!saved) return structuredClone(defaultState);
        return {
            ...structuredClone(defaultState),
            ...saved,
            tripInfo: { ...defaultState.tripInfo, ...(saved.tripInfo || {}) },
            schedules: Array.isArray(saved.schedules) ? saved.schedules : structuredClone(defaultState.schedules),
            design: { ...defaultState.design, ...(saved.design || {}) }
        };
    } catch (error) {
        return structuredClone(defaultState);
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatDate(date) {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${year}.${month}.${day}`;
}

function formatRange(start, end) {
    if (!start) return "";
    const startText = formatDate(start).replace(`${start.slice(0, 5)}`, "").replace("-", "");
    if (!end) return formatDate(start);
    return `${formatDate(start)} — ${formatDate(end).slice(5)}`;
}

function renderBasicInfo() {
    document.getElementById("coverTitle").textContent = state.tripInfo.title;
    document.getElementById("coverDestination").textContent = state.tripInfo.destination;
    document.getElementById("coverDates").textContent = formatRange(state.tripInfo.startDate, state.tripInfo.endDate);
    document.getElementById("coverMembers").textContent = state.tripInfo.members;

    document.getElementById("tripTitle").value = state.tripInfo.title;
    document.getElementById("tripDestination").value = state.tripInfo.destination;
    document.getElementById("startDate").value = state.tripInfo.startDate;
    document.getElementById("endDate").value = state.tripInfo.endDate;
    document.getElementById("members").value = state.tripInfo.members;

    const coverPreview = document.getElementById("coverPreview");
    const placeholder = document.getElementById("coverPlaceholder");
    if (state.coverImage) {
        coverPreview.src = state.coverImage;
        coverPreview.classList.add("visible");
        placeholder.classList.add("hidden");
    } else {
        coverPreview.removeAttribute("src");
        coverPreview.classList.remove("visible");
        placeholder.classList.remove("hidden");
    }
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[character]));
}

function renderSchedules() {
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = state.schedules.map((item, index) => `
        <article class="schedule-card" data-id="${item.id}" data-icon="${escapeHtml(item.icon || "📍")}">
            <div class="schedule-display">
                <div class="schedule-top">
                    <time class="schedule-time">${escapeHtml(item.time)}</time>
                    <span class="schedule-date">${escapeHtml(formatDate(item.date))}</span>
                </div>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.memo)}</p>
                ${item.image ? `<img class="schedule-image" src="${item.image}" alt="">` : ""}
                <div class="schedule-actions edit-only">
                    <button type="button" data-action="up" ${index === 0 ? "disabled" : ""}>↑</button>
                    <button type="button" data-action="down" ${index === state.schedules.length - 1 ? "disabled" : ""}>↓</button>
                    <button type="button" data-action="edit">編集</button>
                    <button type="button" data-action="delete">削除</button>
                </div>
            </div>
        </article>
    `).join("");
}

function renderDesign() {
    document.body.className = `app-font-${state.design.font} theme-${state.design.theme || "custom"} frame-${state.design.frame}`;
    if (viewMode) document.body.classList.add("view-mode");
    document.documentElement.style.setProperty("--bg", state.design.background);
    document.documentElement.style.setProperty("--accent", state.design.accent);

    document.querySelectorAll(".font-choice").forEach(button => {
        button.classList.toggle("active", button.dataset.font === state.design.font);
    });
    document.querySelectorAll(".frame-choice").forEach(button => {
        button.classList.toggle("active", button.dataset.frame === state.design.frame);
    });
    document.getElementById("backgroundPicker").value = state.design.background;
    document.getElementById("accentPicker").value = state.design.accent;
}

function render() {
    renderBasicInfo();
    renderSchedules();
    renderDesign();
}

function addSchedule() {
    state.schedules.push({
        id: String(Date.now()),
        date: state.tripInfo.startDate,
        time: "12:00",
        title: "新しい予定",
        memo: "メモを入力",
        icon: "📍",
        image: ""
    });
    saveState();
    renderSchedules();
    const card = document.querySelector(`.schedule-card[data-id="${state.schedules[state.schedules.length - 1].id}"]`);
    if (card) openScheduleEditor(card);
}

function openScheduleEditor(card) {
    const item = state.schedules.find(schedule => schedule.id === card.dataset.id);
    if (!item) return;
    const display = card.querySelector(".schedule-display");
    display.innerHTML = `
        <div class="schedule-edit">
            <input type="date" name="date" value="${escapeHtml(item.date)}" aria-label="日付">
            <input type="time" name="time" value="${escapeHtml(item.time)}" aria-label="時間">
            <input type="text" name="icon" value="${escapeHtml(item.icon)}" maxlength="4" aria-label="アイコン">
            <input type="text" name="title" value="${escapeHtml(item.title)}" aria-label="予定タイトル">
            <textarea name="memo" aria-label="メモ">${escapeHtml(item.memo)}</textarea>
            <label class="edit-image-label">スポット画像 <input type="file" name="image" accept="image/*"></label>
        </div>
        <div class="schedule-actions">
            <button type="button" data-action="save">保存</button>
            <button type="button" data-action="cancel">キャンセル</button>
        </div>
    `;
}

function readImage(file) {
    return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.readAsDataURL(file);
    });
}

document.getElementById("tripTitle").addEventListener("input", event => {
    state.tripInfo.title = event.target.value;
    renderBasicInfo();
    saveState();
});
["tripDestination", "startDate", "endDate", "members"].forEach(id => {
    document.getElementById(id).addEventListener("input", event => {
        const map = { tripDestination: "destination", startDate: "startDate", endDate: "endDate", members: "members" };
        state.tripInfo[map[id]] = event.target.value;
        renderBasicInfo();
        saveState();
    });
});

document.getElementById("coverImage").addEventListener("change", async event => {
    if (!event.target.files[0]) return;
    state.coverImage = await readImage(event.target.files[0]);
    renderBasicInfo();
    saveState();
});

document.getElementById("addSchedule").addEventListener("click", addSchedule);

document.getElementById("timeline").addEventListener("click", async event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const card = button.closest(".schedule-card");
    const id = card.dataset.id;
    const index = state.schedules.findIndex(item => item.id === id);
    const action = button.dataset.action;

    if (action === "delete") {
        state.schedules.splice(index, 1);
    } else if (action === "up" && index > 0) {
        [state.schedules[index - 1], state.schedules[index]] = [state.schedules[index], state.schedules[index - 1]];
    } else if (action === "down" && index < state.schedules.length - 1) {
        [state.schedules[index], state.schedules[index + 1]] = [state.schedules[index + 1], state.schedules[index]];
    } else if (action === "edit") {
        openScheduleEditor(card);
        return;
    } else if (action === "save") {
        const item = state.schedules[index];
        const editor = card.querySelector(".schedule-edit");
        item.date = editor.querySelector('[name="date"]').value;
        item.time = editor.querySelector('[name="time"]').value;
        item.icon = editor.querySelector('[name="icon"]').value;
        item.title = editor.querySelector('[name="title"]').value;
        item.memo = editor.querySelector('[name="memo"]').value;
        const file = editor.querySelector('[name="image"]').files[0];
        if (file) item.image = await readImage(file);
    } else if (action === "cancel") {
        renderSchedules();
        return;
    }
    saveState();
    renderSchedules();
});

document.querySelectorAll(".custom-tab").forEach(tab => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".custom-tab").forEach(button => button.classList.remove("active"));
        document.querySelectorAll(".custom-panel").forEach(panel => panel.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(`${tab.dataset.tab}Panel`).classList.add("active");
    });
});

document.getElementById("fontOptions").addEventListener("click", event => {
    const button = event.target.closest("[data-font]");
    if (!button) return;
    state.design.font = button.dataset.font;
    saveState();
    renderDesign();
});

document.getElementById("frameOptions").addEventListener("click", event => {
    const button = event.target.closest("[data-frame]");
    if (!button) return;
    state.design.frame = button.dataset.frame;
    saveState();
    renderDesign();
});

const themeColors = { pink: "#FF7A9E", blue: "#2A75E6", yellow: "#FFC72C", green: "#6BCB77" };
document.getElementById("backgroundSwatches").addEventListener("click", event => {
    const button = event.target.closest("[data-color]");
    if (!button || event.target.matches("input")) return;
    state.design.background = button.dataset.color;
    if (themeColors[button.dataset.preset]) state.design.accent = themeColors[button.dataset.preset];
    saveState();
    renderDesign();
});
document.getElementById("backgroundPicker").addEventListener("input", event => {
    state.design.background = event.target.value;
    saveState();
    renderDesign();
});
document.getElementById("accentPicker").addEventListener("input", event => {
    state.design.accent = event.target.value;
    saveState();
    renderDesign();
});

document.getElementById("modeToggle").addEventListener("click", () => {
    viewMode = !viewMode;
    document.body.classList.toggle("view-mode", viewMode);
    document.getElementById("modeLabel").textContent = viewMode ? "編集" : "閲覧";
    document.getElementById("modeIcon").textContent = viewMode ? "✎" : "👁";
});
document.getElementById("printButton").addEventListener("click", () => window.print());
document.getElementById("scrollTop").addEventListener("click", () => {
    document.getElementById("appContent").scrollTo({ top: 0, behavior: "smooth" });
});
document.getElementById("editBasic").addEventListener("click", () => {
    document.getElementById("editorPanel").scrollIntoView({ behavior: "smooth", block: "center" });
});
document.getElementById("editorClose").addEventListener("click", () => {
    document.getElementById("editorPanel").style.display = "none";
});

render();