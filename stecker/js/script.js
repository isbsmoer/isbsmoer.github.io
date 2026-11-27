const stickers = [
    { id: "s001", name: "はなねこ", rarity: "normal", series: "お花園", emoji: "🐱", description: "花びらをかぶったねこ", image: "./assets/stickers/s001.png" },
    { id: "s002", name: "ひよこパン", rarity: "normal", series: "パンまつり", emoji: "🐥", description: "焼きたてのパンがすき", image: "./assets/stickers/s002.png" },
    { id: "s003", name: "まめくん", rarity: "normal", series: "お花園", emoji: "🫘", description: "お庭の元気な豆", image: "./assets/stickers/s003.png" },
    { id: "s004", name: "ラムネうさぎ", rarity: "rare", series: "おかしの森", emoji: "🐰", description: "ラムネみたいなうさぎ", image: "./assets/stickers/s004.png" },
    { id: "s005", name: "いちごパフェ", rarity: "rare", series: "おかしの森", emoji: "🍓", description: "甘くてふわふわ", image: "./assets/stickers/s005.png" },
    { id: "s006", name: "くじら雲", rarity: "rare", series: "空いろ", emoji: "🐋", description: "雲の上を泳ぐくじら", image: "./assets/stickers/s006.png" },
    { id: "s007", name: "星あつめ", rarity: "super", series: "夜空", emoji: "⭐", description: "夜空から落ちてきた星", image: "./assets/stickers/s007.png" },
    { id: "s008", name: "月ねこ", rarity: "super", series: "夜空", emoji: "🌙", description: "月光をまとったねこ", image: "./assets/stickers/s008.png" },
    { id: "s009", name: "虹シャボン", rarity: "super", series: "空いろ", emoji: "🌈", description: "虹色に光るシャボン玉", image: "./assets/stickers/s009.png" },
    { id: "s010", name: "ゆめの王冠", rarity: "legenda", series: "ゆめみる国", emoji: "👑", description: "夢だけの特別な王冠", image: "./assets/stickers/s010.png" },
    { id: "s011", name: "ペガサス", rarity: "legenda", series: "ゆめみる国", emoji: "🦄", description: "白い雲をはかける", image: "./assets/stickers/s011.png" },
    { id: "s012", name: "きらきら妖精", rarity: "legenda", series: "ゆめみる国", emoji: "🧚", description: "ひとに夢を運ぶ妖精", image: "./assets/stickers/s012.png" }
];

const rarityLabels = { normal: "ノーマル", rare: "レア", super: "スーパーレア", legenda: "伝説" };
const rarityClass = { normal: "rarity-normal", rare: "rarity-rare", super: "rarity-super", legenda: "rarity-legenda" };
const defaultState = { coins: 500, inventory: {}, pages: [[]] };
let state = loadState();
let currentPage = 0;
let selectedPlacedId = null;
let gameTimer = null;
let gameRunning = false;
let gameScore = 0;
let timeLeft = 30;
let dragInfo = null;

function loadState() {
    try {
        const saved = JSON.parse(localStorage.getItem("stickerGameState"));
        if (!saved) return structuredClone(defaultState);
        return {
            coins: Number.isFinite(saved.coins) ? saved.coins : 500,
            inventory: saved.inventory && typeof saved.inventory === "object" ? saved.inventory : {},
            pages: Array.isArray(saved.pages) && saved.pages.length ? saved.pages : [[]]
        };
    } catch {
        return structuredClone(defaultState);
    }
}

function saveState() {
    localStorage.setItem("stickerGameState", JSON.stringify(state));
    updateCoinAndCollection();
}

function updateCoinAndCollection() {
    document.getElementById("coinCount").textContent = state.coins;
    const acquired = stickers.filter(sticker => (state.inventory[sticker.id] || 0) > 0).length;
    const percent = Math.round(acquired / stickers.length * 100);
    document.getElementById("homeCollectionRate").textContent = `コンプリート ${percent}%`;
}

function stickerImage(sticker) {
    const wrapper = document.createElement("span");
    wrapper.className = `sticker-fallback ${rarityClass[sticker.rarity]}`;
    wrapper.textContent = sticker.emoji;
    const image = document.createElement("img");
    image.src = sticker.image;
    image.alt = sticker.name;
    image.loading = "lazy";
    image.onerror = () => {
        image.replaceWith(wrapper);
    };
    return image;
}

function setView(viewName) {
    document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
    const target = document.getElementById(`${viewName}View`);
    if (target) target.classList.add("active");
    document.querySelectorAll(".bottom-nav button").forEach(button => {
        button.classList.toggle("nav-active", button.dataset.view === viewName);
    });
    if (viewName === "album") renderAlbum();
    if (viewName === "collection") renderCollection();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => setView(button.dataset.view));
});

const colors = [
    { name: "pink", emoji: "🌸" },
    { name: "blue", emoji: "🐟" },
    { name: "yellow", emoji: "☀️" }
];

function startGame() {
    clearInterval(gameTimer);
    gameRunning = true;
    gameScore = 0;
    timeLeft = 30;
    document.getElementById("gameScore").textContent = "0";
    document.getElementById("timeLeft").textContent = "30";
    document.getElementById("gameMessage").textContent = "正しい色のかごをタップしてね";
    showSortingItem();
    gameTimer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById("timeLeft").textContent = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);
}

function showSortingItem() {
    const item = colors[Math.floor(Math.random() * colors.length)];
    const target = document.getElementById("sortingTarget");
    target.innerHTML = "";
    const element = document.createElement("div");
    element.className = "sort-item";
    element.dataset.color = item.name;
    element.textContent = item.emoji;
    target.appendChild(element);
}

function endGame() {
    clearInterval(gameTimer);
    gameRunning = false;
    const reward = Math.floor(gameScore * 3);
    state.coins += reward;
    saveState();
    document.getElementById("sortingTarget").innerHTML = `<button class="game-start" id="gameStart" type="button">もう一度！</button>`;
    document.getElementById("gameStart").addEventListener("click", startGame);
    document.getElementById("gameMessage").textContent = `おつかれさま！ ${reward}コインゲット！`;
}

document.getElementById("gameStart").addEventListener("click", startGame);

document.getElementById("sortBins").addEventListener("click", event => {
    const bin = event.target.closest(".sort-bin");
    if (!bin || !gameRunning) return;
    const item = document.querySelector(".sort-item");
    if (!item) return;
    if (item.dataset.color === bin.dataset.color) {
        gameScore += 1;
        document.getElementById("gameScore").textContent = gameScore;
        document.getElementById("gameMessage").textContent = "せいかい！";
    } else {
        gameScore = Math.max(0, gameScore - 1);
        document.getElementById("gameScore").textContent = gameScore;
        document.getElementById("gameMessage").textContent = "おしい！";
    }
    showSortingItem();
});

function pickSticker() {
    const roll = Math.random();
    let rarity = "normal";
    if (roll > 0.96) rarity = "legenda";
    else if (roll > 0.82) rarity = "super";
    else if (roll > 0.58) rarity = "rare";
    const pool = stickers.filter(sticker => sticker.rarity === rarity);
    return pool[Math.floor(Math.random() * pool.length)] || stickers[Math.floor(Math.random() * stickers.length)];
}

document.getElementById("openPack").addEventListener("click", () => {
    if (state.coins < 100) {
        document.getElementById("shopMessage").textContent = "コインが足りません";
        return;
    }

    state.coins -= 100;
    saveState();
    const pack = document.querySelector(".pack-pack");
    const revealGrid = document.getElementById("revealGrid");
    const openButton = document.getElementById("openPack");
    openButton.disabled = true;
    document.getElementById("shopMessage").textContent = "";
    pack.classList.add("opening");
    revealGrid.classList.remove("active");

    setTimeout(() => {
        const opened = [pickSticker(), pickSticker(), pickSticker()];
        opened.forEach(sticker => {
            state.inventory[sticker.id] = (state.inventory[sticker.id] || 0) + 1;
        });
        saveState();
        revealGrid.innerHTML = "";
        opened.forEach(sticker => {
            const card = document.createElement("div");
            card.className = `reveal-card ${rarityClass[sticker.rarity]}`;
            card.appendChild(stickerImage(sticker));
            const name = document.createElement("strong");
            name.textContent = sticker.name;
            const badge = document.createElement("small");
            badge.textContent = rarityLabels[sticker.rarity];
            card.append(name, badge);
            revealGrid.appendChild(card);
        });
        pack.classList.remove("opening");
        revealGrid.classList.add("active");
        openButton.disabled = false;
    }, 900);

    revealGrid.onclick = () => {
        revealGrid.classList.remove("active");
    };
});

function renderAlbum() {
    renderAlbumInventory();
    renderPage();
    document.getElementById("pageIndicator").textContent = `ページ ${currentPage + 1} / ${state.pages.length}`;
}

function renderAlbumInventory() {
    const inventory = document.getElementById("albumInventory");
    inventory.innerHTML = "";
    const owned = stickers.filter(sticker => (state.inventory[sticker.id] || 0) > 0);
    if (!owned.length) {
        inventory.innerHTML = `<p>ショップでシールを集めよう！</p>`;
        return;
    }
    owned.forEach(sticker => {
        const count = state.inventory[sticker.id];
        const item = document.createElement("button");
        item.type = "button";
        item.className = "inventory-item";
        item.title = `シール帳に貼る：${sticker.name}`;
        item.appendChild(stickerImage(sticker));
        const badge = document.createElement("span");
        badge.className = "inventory-count";
        badge.textContent = count;
        item.appendChild(badge);
        item.addEventListener("click", () => addPlacedSticker(sticker.id));
        inventory.appendChild(item);
    });
}

function addPlacedSticker(stickerId) {
    const page = state.pages[currentPage];
    const pageElement = document.getElementById("stickerPage");
    const placed = {
        instanceId: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        stickerId,
        x: 35 + (page.length * 22) % Math.max(40, pageElement.clientWidth - 130),
        y: 35 + (page.length * 27) % Math.max(40, pageElement.clientHeight - 130),
        rotation: 0,
        z: page.length + 1
    };
    page.push(placed);
    saveState();
    renderPage();
}

function renderPage() {
    const pageElement = document.getElementById("stickerPage");
    pageElement.innerHTML = "";
    const page = state.pages[currentPage];
    page.forEach(placed => {
        const sticker = stickers.find(item => item.id === placed.stickerId);
        if (!sticker) return;
        const element = document.createElement("div");
        element.className = "placed-sticker";
        element.dataset.instanceId = placed.instanceId;
        element.style.left = `${placed.x}px`;
        element.style.top = `${placed.y}px`;
        element.style.transform = `rotate(${placed.rotation || 0}deg)`;
        element.style.zIndex = placed.z || 1;
        element.appendChild(stickerImage(sticker));
        element.addEventListener("pointerdown", beginStickerDrag);
        element.addEventListener("click", event => {
            event.stopPropagation();
            selectPlacedSticker(placed.instanceId);
        });
        pageElement.appendChild(element);
    });
    if (selectedPlacedId && !page.some(item => item.instanceId === selectedPlacedId)) selectedPlacedId = null;
    updateEditControls();
}

function selectPlacedSticker(instanceId) {
    selectedPlacedId = instanceId;
    document.querySelectorAll(".placed-sticker").forEach(element => {
        element.classList.toggle("selected", element.dataset.instanceId === instanceId);
    });
    updateEditControls();
}

function updateEditControls() {
    const enabled = Boolean(selectedPlacedId);
    document.getElementById("rotateSticker").disabled = !enabled;
    document.getElementById("bringSticker").disabled = !enabled;
    document.getElementById("deleteSticker").disabled = !enabled;
}

function beginStickerDrag(event) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const element = event.currentTarget;
    const instanceId = element.dataset.instanceId;
    selectPlacedSticker(instanceId);
    const rect = element.getBoundingClientRect();
    dragInfo = {
        element,
        instanceId,
        offsetX: event.clientX - rect.left,
        offsetY: event.clientY - rect.top
    };
    element.setPointerCapture(event.pointerId);
    element.addEventListener("pointermove", moveSticker);
    element.addEventListener("pointerup", endStickerDrag, { once: true });
}

function moveSticker(event) {
    if (!dragInfo) return;
    const pageElement = document.getElementById("stickerPage");
    const pageRect = pageElement.getBoundingClientRect();
    const size = dragInfo.element.offsetWidth;
    let x = event.clientX - pageRect.left - dragInfo.offsetX;
    let y = event.clientY - pageRect.top - dragInfo.offsetY;
    x = Math.max(0, Math.min(pageRect.width - size, x));
    y = Math.max(0, Math.min(pageRect.height - size, y));
    dragInfo.element.style.left = `${x}px`;
    dragInfo.element.style.top = `${y}px`;
    const placed = state.pages[currentPage].find(item => item.instanceId === dragInfo.instanceId);
    if (placed) {
        placed.x = x;
        placed.y = y;
    }
}

function endStickerDrag(event) {
    if (!dragInfo) return;
    dragInfo.element.removeEventListener("pointermove", moveSticker);
    dragInfo = null;
    saveState();
}

document.getElementById("stickerPage").addEventListener("click", () => {
    selectedPlacedId = null;
    document.querySelectorAll(".placed-sticker").forEach(element => element.classList.remove("selected"));
    updateEditControls();
});

document.getElementById("rotateSticker").addEventListener("click", () => {
    const placed = state.pages[currentPage].find(item => item.instanceId === selectedPlacedId);
    if (!placed) return;
    placed.rotation = ((placed.rotation || 0) + 45) % 360;
    saveState();
    renderPage();
    selectPlacedSticker(selectedPlacedId);
});

document.getElementById("bringSticker").addEventListener("click", () => {
    const page = state.pages[currentPage];
    const placed = page.find(item => item.instanceId === selectedPlacedId);
    if (!placed) return;
    placed.z = Math.max(1, ...page.map(item => item.z || 1)) + 1;
    saveState();
    renderPage();
    selectPlacedSticker(selectedPlacedId);
});

document.getElementById("deleteSticker").addEventListener("click", () => {
    state.pages[currentPage] = state.pages[currentPage].filter(item => item.instanceId !== selectedPlacedId);
    selectedPlacedId = null;
    saveState();
    renderPage();
});

document.getElementById("addPage").addEventListener("click", () => {
    state.pages.push([]);
    currentPage = state.pages.length - 1;
    selectedPlacedId = null;
    saveState();
    renderAlbum();
});

document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage <= 0) return;
    currentPage -= 1;
    selectedPlacedId = null;
    renderAlbum();
});

document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage >= state.pages.length - 1) return;
    currentPage += 1;
    selectedPlacedId = null;
    renderAlbum();
});

function renderCollection() {
    const grid = document.getElementById("collectionGrid");
    grid.innerHTML = "";
    let acquired = 0;
    stickers.forEach(sticker => {
        const count = state.inventory[sticker.id] || 0;
        if (count > 0) acquired += 1;
        const card = document.createElement("div");
        card.className = `sticker-card ${rarityClass[sticker.rarity]} ${count ? "" : "locked"}`;
        card.appendChild(stickerImage(sticker));
        const name = document.createElement("strong");
        name.textContent = count ? sticker.name : "？？？";
        const badge = document.createElement("span");
        badge.className = "rarity-badge";
        badge.textContent = rarityLabels[sticker.rarity];
        const countText = document.createElement("small");
        countText.textContent = count ? `所持 ${count}枚` : "未入手";
        card.append(name, badge, countText);
        grid.appendChild(card);
    });
    const percent = Math.round(acquired / stickers.length * 100);
    document.getElementById("completionPercent").textContent = `${percent}%`;
    document.getElementById("completionRing").style.setProperty("--completion", `${percent}%`);
    document.getElementById("collectionCount").textContent = `${acquired} / ${stickers.length}`;
}

updateCoinAndCollection();
renderCollection();