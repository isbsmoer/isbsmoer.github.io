const INITIAL_RESTAURANTS = [
    {
        id: 1,
        name: "森のパンケーキ店",
        area: "東京",
        genre: "カフェ",
        lat: 35.681236,
        lng: 139.767125,
        status: "wishlist",
        photo: "https://placehold.jp/600x400.png?text=Gourmet+Photo",
        comment: "ふわふわパンケーキが人気。休日の朝に訪れたいお店。"
    },
    {
        id: 2,
        name: "札幌スープカレー山",
        area: "北海道",
        genre: "スープカレー",
        lat: 43.0618,
        lng: 141.3545,
        status: "visited",
        photo: "https://placehold.jp/600x400.png?text=Gourmet+Photo",
        comment: "野菜がたっぷりで濃厚。辛さは中級がおすすめ。"
    },
    {
        id: 3,
        name: "大阪たこ焼き 海",
        area: "大阪",
        genre: "たこ焼き",
        lat: 34.702485,
        lng: 135.495951,
        status: "wishlist",
        photo: "https://placehold.jp/600x400.png?text=Gourmet+Photo",
        comment: "外はカリッ、中はとろっと。オープンキッチンが楽しそう。"
    },
    {
        id: 4,
        name: "博多もつ鍋 とりこ",
        area: "福岡",
        genre: "もつ鍋",
        lat: 33.590355,
        lng: 130.401716,
        status: "visited",
        photo: "https://placehold.jp/600x400.png?text=Gourmet+Photo",
        comment: "締めのちゃんぽんまで完食。友人との夜ご飯にまた行きたい。"
    }
];

const FAQ_ITEMS = [
    {
        question: "お店の登録はどのようにしますか？",
        answer: "「お店を登録」ボタンを押すか、地図上の場所をクリックすると登録フォームを開けます。店名とエリア、ジャンルを入力して保存してください。"
    },
    {
        question: "登録した情報はどこに保存されますか？",
        answer: "このブラウザの localStorage に保存されます。ブラウザのデータを削除すると登録情報も消えるため、必要に応じて写真サイズを小さく保つことをおすすめします。"
    },
    {
        question: "行ってみたいと行った！を切り替えられますか？",
        answer: "カードの「行った！」ボタンで訪問済みに変更できます。編集ボタンからステータスを戻すことも可能です。"
    },
    {
        question: "スマートフォンでも使えますか？",
        answer: "はい。画面幅に合わせて地図とカードが縦並びに切り替わり、スマートフォンでも登録・絞り込み・地図移動ができます。"
    }
];

const STORAGE_KEY = "gourmetMapRestaurants";
const DEFAULT_PHOTO = "https://placehold.jp/600x400.png?text=Gourmet+Photo";

let restaurants = loadRestaurants();
let currentStatus = "all";
let currentArea = "all";
let searchKeyword = "";
let mapMarkers = [];
let previewPhoto = DEFAULT_PHOTO;

const map = L.map("map").setView([36.204824, 138.252924], 5);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

const elements = {
    grid: document.getElementById("restaurantGrid"),
    areaFilter: document.getElementById("areaFilter"),
    searchInput: document.getElementById("searchInput"),
    mapCount: document.getElementById("mapCount"),
    modal: document.getElementById("shopModal"),
    form: document.getElementById("shopForm"),
    preview: document.getElementById("photoPreview")
};

function loadRestaurants() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RESTAURANTS));
        return [...INITIAL_RESTAURANTS];
    }
    try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [...INITIAL_RESTAURANTS];
    } catch (error) {
        return [...INITIAL_RESTAURANTS];
    }
}

function saveRestaurants() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurants));
}

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function getFilteredRestaurants() {
    return restaurants.filter((restaurant) => {
        const matchesStatus = currentStatus === "all" || restaurant.status === currentStatus;
        const matchesArea = currentArea === "all" || restaurant.area === currentArea;
        const keyword = searchKeyword.trim().toLowerCase();
        const matchesSearch = !keyword ||
            restaurant.name.toLowerCase().includes(keyword) ||
            restaurant.genre.toLowerCase().includes(keyword);
        return matchesStatus && matchesArea && matchesSearch;
    });
}

function updateAreaFilter() {
    const selected = currentArea;
    const areas = [...new Set(restaurants.map((restaurant) => restaurant.area).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, "ja"));
    elements.areaFilter.innerHTML = '<option value="all">すべて</option>' +
        areas.map((area) => `<option value="${escapeHtml(area)}">${escapeHtml(area)}</option>`).join("");
    elements.areaFilter.value = areas.includes(selected) ? selected : "all";
    if (!areas.includes(selected) && selected !== "all") {
        currentArea = "all";
    }
}

function renderCards() {
    const filtered = getFilteredRestaurants();
    elements.mapCount.textContent = `${filtered.length}件`;

    if (!filtered.length) {
        elements.grid.innerHTML = '<div class="empty-state"><strong>該当するお店がありません</strong><br><small>条件を変更するか、お店を新しく登録してください。</small></div>';
        return;
    }

    elements.grid.innerHTML = filtered.map((restaurant) => {
        const isVisited = restaurant.status === "visited";
        const statusLabel = isVisited ? "行った！" : "行ってみたい";
        return `
            <article class="restaurant-card">
                <div class="card-image">
                    <img src="${escapeHtml(restaurant.photo || DEFAULT_PHOTO)}" alt="${escapeHtml(restaurant.name)}">
                    <span class="status-badge ${restaurant.status}">${statusLabel}</span>
                </div>
                <div class="card-body">
                    <div class="card-location">${escapeHtml(restaurant.area)} ／ ${escapeHtml(restaurant.genre)}</div>
                    <div class="card-title-row">
                        <h3>${escapeHtml(restaurant.name)}</h3>
                        <span class="genre">${escapeHtml(restaurant.genre)}</span>
                    </div>
                    <p class="card-comment">${escapeHtml(restaurant.comment || "メモはまだありません。")}</p>
                    <div class="card-actions">
                        ${!isVisited ? '<button class="card-button primary" type="button" data-action="visit" data-id="' + restaurant.id + '">行った！にする</button>' : ""}
                        <button class="card-button" type="button" data-action="locate" data-id="${restaurant.id}">地図で見る</button>
                        <div class="card-utility-actions">
                            <button class="card-button" type="button" data-action="edit" data-id="${restaurant.id}">編集</button>
                            <button class="card-button danger" type="button" data-action="delete" data-id="${restaurant.id}">削除</button>
                        </div>
                    </div>
                </div>
            </article>`;
    }).join("");
}

function renderMarkers() {
    mapMarkers.forEach((marker) => map.removeLayer(marker));
    mapMarkers = [];

    getFilteredRestaurants().forEach((restaurant) => {
        if (!Number.isFinite(Number(restaurant.lat)) || !Number.isFinite(Number(restaurant.lng))) {
            return;
        }
        const icon = L.divIcon({
            className: "custom-marker",
            html: `<div class="restaurant-marker ${restaurant.status}"><span>${restaurant.status === "visited" ? "✓" : "!"}</span></div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 34],
            popupAnchor: [0, -30]
        });
        const popup = `
            <div class="popup-card">
                <img src="${escapeHtml(restaurant.photo || DEFAULT_PHOTO)}" alt="${escapeHtml(restaurant.name)}">
                <strong>${escapeHtml(restaurant.name)}</strong>
                <span>${escapeHtml(restaurant.area)} ・ ${escapeHtml(restaurant.status === "visited" ? "行った！" : "行ってみたい")}</span>
            </div>`;
        const marker = L.marker([Number(restaurant.lat), Number(restaurant.lng)], { icon })
            .bindPopup(popup)
            .addTo(map);
        mapMarkers.push(marker);
    });
}

function render() {
    updateAreaFilter();
    renderCards();
    renderMarkers();
}

function openModal(restaurant = null, lat = "", lng = "") {
    document.getElementById("modalTitle").textContent = restaurant ? "お店を編集" : "お店を登録";
    document.getElementById("shopId").value = restaurant ? restaurant.id : "";
    document.getElementById("shopName").value = restaurant ? restaurant.name : "";
    document.getElementById("shopArea").value = restaurant ? restaurant.area : "";
    document.getElementById("shopGenre").value = restaurant ? restaurant.genre : "";
    document.getElementById("shopLat").value = restaurant ? restaurant.lat : lat;
    document.getElementById("shopLng").value = restaurant ? restaurant.lng : lng;
    document.getElementById("shopComment").value = restaurant ? restaurant.comment : "";
    const status = restaurant ? restaurant.status : "wishlist";
    document.querySelector(`input[name="shopStatus"][value="${status}"]`).checked = true;
    previewPhoto = restaurant ? restaurant.photo || DEFAULT_PHOTO : DEFAULT_PHOTO;
    elements.preview.src = previewPhoto;
    elements.modal.classList.add("open");
    elements.modal.setAttribute("aria-hidden", "false");
    document.getElementById("shopName").focus();
}

function closeModal() {
    elements.modal.classList.remove("open");
    elements.modal.setAttribute("aria-hidden", "true");
    elements.form.reset();
}

function findRestaurant(id) {
    return restaurants.find((restaurant) => String(restaurant.id) === String(id));
}

elements.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const idValue = document.getElementById("shopId").value;
    const status = document.querySelector('input[name="shopStatus"]:checked').value;
    const lat = document.getElementById("shopLat").value;
    const lng = document.getElementById("shopLng").value;
    const record = {
        id: idValue ? Number(idValue) : Date.now(),
        name: document.getElementById("shopName").value.trim(),
        area: document.getElementById("shopArea").value.trim(),
        genre: document.getElementById("shopGenre").value.trim(),
        lat: lat === "" ? null : Number(lat),
        lng: lng === "" ? null : Number(lng),
        status,
        photo: previewPhoto,
        comment: document.getElementById("shopComment").value.trim()
    };

    if (idValue) {
        restaurants = restaurants.map((restaurant) => String(restaurant.id) === idValue ? record : restaurant);
    } else {
        restaurants.push(record);
    }
    saveRestaurants();
    closeModal();
    render();
});

document.getElementById("shopPhoto").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        previewPhoto = reader.result;
        elements.preview.src = previewPhoto;
    };
    reader.readAsDataURL(file);
});

document.getElementById("openAddModal").addEventListener("click", () => openModal());
document.getElementById("closeModal").addEventListener("click", closeModal);
document.getElementById("cancelModal").addEventListener("click", closeModal);
elements.modal.addEventListener("click", (event) => {
    if (event.target === elements.modal) closeModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && elements.modal.classList.contains("open")) closeModal();
});

elements.areaFilter.addEventListener("change", (event) => {
    currentArea = event.target.value;
    render();
});

elements.searchInput.addEventListener("input", (event) => {
    searchKeyword = event.target.value;
    renderCards();
    renderMarkers();
});

document.getElementById("statusTabs").addEventListener("click", (event) => {
    const tab = event.target.closest(".status-tab");
    if (!tab) return;
    document.querySelectorAll(".status-tab").forEach((button) => {
        const active = button === tab;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
    });
    currentStatus = tab.dataset.status;
    render();
});

document.getElementById("resetFilters").addEventListener("click", () => {
    currentStatus = "all";
    currentArea = "all";
    searchKeyword = "";
    elements.searchInput.value = "";
    document.querySelectorAll(".status-tab").forEach((button) => {
        const active = button.dataset.status === "all";
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
    });
    render();
});

elements.grid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const restaurant = findRestaurant(button.dataset.id);
    if (!restaurant) return;

    if (button.dataset.action === "visit") {
        restaurant.status = "visited";
        saveRestaurants();
        render();
    } else if (button.dataset.action === "edit") {
        openModal(restaurant);
    } else if (button.dataset.action === "delete") {
        if (window.confirm(`「${restaurant.name}」を削除しますか？`)) {
            restaurants = restaurants.filter((item) => item.id !== restaurant.id);
            saveRestaurants();
            render();
        }
    } else if (button.dataset.action === "locate") {
        if (restaurant.lat !== null && restaurant.lng !== null) {
            map.flyTo([Number(restaurant.lat), Number(restaurant.lng)], 16);
            const marker = mapMarkers.find((item) => {
                const position = item.getLatLng();
                return position.lat === Number(restaurant.lat) && position.lng === Number(restaurant.lng);
            });
            if (marker) marker.openPopup();
        }
    }
});

map.on("click", (event) => {
    openModal(null, event.latlng.lat.toFixed(6), event.latlng.lng.toFixed(6));
});

document.getElementById("locateButton").addEventListener("click", () => {
    if (!navigator.geolocation) {
        window.alert("このブラウザは位置情報取得に対応していません。");
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            map.flyTo([position.coords.latitude, position.coords.longitude], 14);
        },
        () => {
            window.alert("現在地を取得できませんでした。位置情報の利用を許可してください。");
        },
        { enableHighAccuracy: true, timeout: 10000 }
    );
});

function renderFaq() {
    const faqList = document.getElementById("faqList");
    faqList.innerHTML = FAQ_ITEMS.map((item, index) => `
        <div class="faq-item${index === 0 ? " open" : ""}">
            <button class="faq-question" type="button" aria-expanded="${index === 0}">
                <span>${escapeHtml(item.question)}</span>
                <span aria-hidden="true">＋</span>
            </button>
            <div class="faq-answer">${escapeHtml(item.answer)}</div>
        </div>
`).join("");

    faqList.addEventListener("click", (event) => {
        const button = event.target.closest(".faq-question");
        if (!button) return;
        const item = button.closest(".faq-item");
        const open = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
    });
}

renderFaq();
render();