const PARTS_DATA = {
    body: {
        englishLabel: "Body",
        label: "体",
        required: true,
        items: [
            { path: 'img/cloth.PNG', label: '服' }
        ]
    },
    frontHair: {
        englishLabel: "Front Hair",
        label: "前髪",
        required: true,
        items: [
            { path: 'img/front_hair.png', label: '前髪' },
            { path: 'img/front_hair_02.png', label: '前髪' },
            { path: 'img/front_hair_03.png', label: '前髪' },
            { path: 'img/front_hair_04.png', label: '前髪' },
            { path: 'img/front_hair_05.png', label: '前髪' },
            { path: 'img/front_hair_06.png', label: '前髪' },
            { path: 'img/front_hair_07.png', label: '前髪' }
        ]
    },
    backHair: {
        englishLabel: "Back Hair",
        label: "後ろ髪",
        required: true,
        items: [
            { path: 'img/back_hair.png', label: '後ろ髪' },
            { path: 'img/back_hair_02.png', label: '後ろ髪' },
            { path: 'img/back_hair_03.png', label: '後ろ髪' },
            { path: 'img/back_hair_04.png', label: '後ろ髪' },
            { path: 'img/back_hair_05.png', label: '後ろ髪' },
            { path: 'img/back_hair_06.png', label: '後ろ髪' },
            { path: 'img/back_hair_07.png', label: '後ろ髪' },
            { path: 'img/back_hair_08.png', label: '後ろ髪' },
            { path: 'img/back_hair_10.png', label: '後ろ髪' },
            { path: 'img/back_hair_11.png', label: '後ろ髪' },
            { path: 'img/back_hair_13.png', label: '後ろ髪' }
        ]
    },
    nose: {
        englishLabel: "Nose",
        label: "鼻",
        required: true,
        items: [
            { path: 'img/nose.png', label: '鼻' },
            { path: 'img/nose_02.png', label: '鼻' },
            { path: 'img/nose_03.png', label: '鼻' },
            { path: 'img/nose_04.png', label: '鼻' },
            { path: 'img/nose_05.png', label: '鼻' }
        ]
    },
    mouth: {
        englishLabel: "Mouth",
        label: "口",
        required: true,
        items: [
            { path: 'img/mouth.png', label: '口' },
            { path: 'img/mouth_02.png', label: '口' },
            { path: 'img/mouth_03.png', label: '口' },
            { path: 'img/mouth_04.png', label: '口' },
            { path: 'img/mouth_05.png', label: '口' },
            { path: 'img/mouth_06.png', label: '口' }
        ]
    },
    eyebrow: {
        englishLabel: "Eyebrows",
        label: "眉毛",
        required: true,
        items: [
            { path: 'img/eyebrow.png', label: '眉毛' },
            { path: 'img/eyebrow_02.png', label: '眉毛' },
            { path: 'img/eyebrow_03.png', label: '眉毛' },
            { path: 'img/eyebrow_04.png', label: '眉毛' },
            { path: 'img/eyebrow_05.png', label: '眉毛' },
            { path: 'img/eyebrow_06.png', label: '眉毛' }
        ]
    },
    eyes: {
        englishLabel: "Eyes",
        label: "目",
        required: true,
        items: [
            { path: 'img/eyes.png', label: '目' },
            { path: 'img/eyes_02.png', label: '目' },
            { path: 'img/eyes_03.png', label: '目' },
            { path: 'img/eyes_04.png', label: '目' },
            { path: 'img/eyes_05.png', label: '目' },
            { path: 'img/eyes_06.png', label: '目' },
            { path: 'img/eyes_07.png', label: '目' },
            { path: 'img/eyes_08.png', label: '目' },
            { path: 'img/eyes_09.png', label: '目' },
            { path: 'img/eyes_10.png', label: '目' }
        ]
    },
    cheek: {
        englishLabel: "Cheeks",
        label: "チーク",
        required: false,
        items: [
            { path: 'img/cheek.png', label: 'チーク' },
            { path: 'img/cheek_02.png', label: 'そばかす' }
        ]
    },
    face: {
        englishLabel: "Face",
        label: "輪郭",
        required: true,
        items: [
            { path: 'img/face.png', label: '輪郭' },
            { path: 'img/face_02.png', label: '輪郭' },
            { path: 'img/face_03.png', label: '輪郭' },
            { path: 'img/face_04.png', label: '輪郭' }
        ]
    },
    accessory: {
        englishLabel: "Accessories",
        label: "アクセサリー",
        required: false,
        items: [
            { path: 'img/accessory_01.png', label: 'メガネ' },
            { path: 'img/accessory_02.png', label: 'メガネ' },
            { path: 'img/accessory_03.png', label: 'メガネ' },
            { path: 'img/accessory_04.png', label: 'メガネ' }
        ]
    },
    background: {
        englishLabel: "Background",
        label: "背景色",
        required: false,
        items: []
    }
};

const state = {
    activeCategory: "body",
    selected: {},
    backgroundColor: "#f7c873"
};

Object.entries(PARTS_DATA).forEach(([key, category]) => {
    if (category.required && category.items.length > 0) {
        state.selected[key] = category.items[0].path;
    }
});

const layerOrder = ["backHair", "body", "face", "mouth", "nose", "eyes", "eyebrow", "cheek", "frontHair", "accessory"];

const categoryTabs = document.getElementById("categoryTabs");
const partsGrid = document.getElementById("partsGrid");
const categoryTitle = document.getElementById("categoryTitle");
const previewBox = document.getElementById("previewBox");
const previewEmpty = document.getElementById("previewEmpty");
const selectionCount = document.getElementById("selectionCount");
const modal = document.getElementById("warningModal");
const missingParts = document.getElementById("missingParts");
const modalMessage = document.getElementById("modalMessage");
const thumbnailCropCache = new Map();

const backgroundColors = [
    "#f7c873",
    "#f5a7a7",
    "#f3c7dc",
    "#a9d8d1",
    "#9fc5e8",
    "#c9b6e4",
    "#fff1c7",
    "#ffffff"
];

function renderTabs() {
    categoryTabs.innerHTML = "";

    Object.entries(PARTS_DATA).forEach(([key, category]) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `category-tab${state.activeCategory === key ? " active" : ""}`;
        const englishLabel = document.createElement("span");
        englishLabel.className = "category-tab-english";
        englishLabel.textContent = category.englishLabel;
        const japaneseLabel = document.createElement("span");
        japaneseLabel.className = "category-tab-japanese";
        japaneseLabel.textContent = category.label;
        button.append(englishLabel, japaneseLabel);
        button.setAttribute("aria-label", `${category.englishLabel} (${category.label})`);
        button.setAttribute("aria-selected", state.activeCategory === key ? "true" : "false");
        button.addEventListener("click", () => {
            state.activeCategory = key;
            renderTabs();
            renderParts();
        });
        categoryTabs.appendChild(button);
    });
}

function renderParts() {
    const category = PARTS_DATA[state.activeCategory];
    categoryTitle.textContent = category.label;
    partsGrid.innerHTML = "";

    if (state.activeCategory === "background") {
        partsGrid.innerHTML = '<p class="empty-category">下の背景色オプションから色を選択できます。</p>';
        return;
    }

    if (category.items.length === 0) {
        const emptyCard = document.createElement("div");
        emptyCard.className = "empty-category-card";
        emptyCard.textContent = "画像パスを js/script.js に追加してください";
        partsGrid.appendChild(emptyCard);
    }

    if (category.items.length > 0) {
        category.items.forEach((item, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = `part-card${state.selected[state.activeCategory] === item.path ? " active" : ""}`;
            if (state.activeCategory === "nose") {
                button.classList.add("nose-card");
                if (index === 2) {
                    button.classList.add("nose-card-small");
                }
            }
            if (state.activeCategory === "mouth") {
                button.classList.add("mouth-card");
            }
            button.setAttribute("aria-label", item.label || `${category.label} ${index + 1}`);

            const image = document.createElement("img");
            image.src = item.path;
            image.alt = item.label || "";
            image.className = "part-thumbnail";
            image.decoding = "async";
            fitThumbnailToPart(image, item.path);

            const label = document.createElement("span");
            label.textContent = item.label || `${index + 1}`;

            button.append(image, label);
            button.addEventListener("click", () => selectPart(item));
            partsGrid.appendChild(button);
        });
    }

    if (!category.required && category.items.length > 0) {
        const noneButton = document.createElement("button");
        noneButton.className = `part-card none-card${!state.selected[state.activeCategory] ? " active" : ""}`;
        noneButton.innerHTML = '<span class="none-symbol" aria-hidden="true">×</span><span>なし</span>';
        noneButton.type = "button";
        noneButton.addEventListener("click", () => clearPart(state.activeCategory));
        partsGrid.appendChild(noneButton);
    }
}

async function fitThumbnailToPart(imageElement, src) {
    if (!thumbnailCropCache.has(src)) {
        thumbnailCropCache.set(src, cropTransparentImage(src));
    }

    try {
        imageElement.src = await thumbnailCropCache.get(src);
    } catch {
        imageElement.src = src;
    }
}

async function cropTransparentImage(src) {
    const image = await loadImage(src);
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    context.drawImage(image, 0, 0);

    let pixels;
    try {
        pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    } catch {
        return src;
    }

    let left = canvas.width;
    let top = canvas.height;
    let right = 0;
    let bottom = 0;

    for (let y = 0; y < canvas.height; y += 1) {
        for (let x = 0; x < canvas.width; x += 1) {
            if (pixels[(y * canvas.width + x) * 4 + 3] > 8) {
                if (x < left) left = x;
                if (y < top) top = y;
                if (x > right) right = x;
                if (y > bottom) bottom = y;
            }
        }
    }

    if (right < left || bottom < top) {
        return src;
    }

    const width = right - left + 1;
    const height = bottom - top + 1;
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = width;
    croppedCanvas.height = height;
    const croppedContext = croppedCanvas.getContext("2d");
    croppedContext.drawImage(canvas, left, top, width, height, 0, 0, width, height);

    return croppedCanvas.toDataURL("image/png");
}

function selectPart(item) {
    state.selected[state.activeCategory] = item.path;
    renderParts();
    updatePreview();
}

function clearPart(categoryKey) {
    if (PARTS_DATA[categoryKey].required) return;
    delete state.selected[categoryKey];
    renderParts();
    updatePreview();
}

function updatePreview() {
    previewBox.querySelectorAll(".preview-layer").forEach((layer) => layer.remove());
    previewBox.style.backgroundColor = state.backgroundColor;

    let selectedCount = 0;

    layerOrder.forEach((key) => {
        const path = state.selected[key];
        if (!path) return;

        selectedCount += 1;
        const image = document.createElement("img");
        image.src = path;
        image.alt = "";
        image.className = "preview-layer";
        previewBox.appendChild(image);
    });

    previewEmpty.hidden = selectedCount > 0;

    const requiredKeys = Object.entries(PARTS_DATA)
        .filter(([, category]) => category.required)
        .map(([key]) => key);
    const completeCount = requiredKeys.filter((key) => state.selected[key]).length;
    selectionCount.textContent = `${completeCount} / ${requiredKeys.length} 選択中`;
}

function renderBackgroundPalette() {
    const palette = document.getElementById("backgroundPalette");
    palette.innerHTML = "";

    backgroundColors.forEach((color) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "palette-swatch";
        button.style.backgroundColor = color;
        button.setAttribute("aria-label", `背景色 ${color}`);
        if (state.backgroundColor.toLowerCase() === color) {
            button.classList.add("active");
        }
        button.addEventListener("click", () => setBackgroundColor(color));
        palette.appendChild(button);
    });
}

function setBackgroundColor(color) {
    state.backgroundColor = color;
    document.getElementById("backgroundPicker").value = color;
    renderBackgroundPalette();
    updatePreview();
}

function getMissingRequiredParts() {
    return Object.entries(PARTS_DATA)
        .filter(([, category]) => category.required)
        .filter(([key]) => !state.selected[key])
        .map(([, category]) => category.label);
}

function openModal(missing) {
    missingParts.innerHTML = "";
    missing.forEach((label) => {
        const badge = document.createElement("span");
        badge.textContent = label;
        missingParts.appendChild(badge);
    });

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    modalMessage.textContent = missing.length
        ? "必要なパーツを選択してから保存してください。"
        : "保存の準備ができました。";
    document.getElementById("modalClose").focus();
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
}

async function saveAsPng() {
    const missing = getMissingRequiredParts();
    if (missing.length > 0) {
        openModal(missing);
        return;
    }

    const canvas = document.createElement("canvas");
    const size = 1000;
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    context.fillStyle = state.backgroundColor;
    context.fillRect(0, 0, size, size);

    for (const key of layerOrder) {
        const path = state.selected[key];
        if (!path) continue;

        const image = await loadImage(path);
        context.drawImage(image, 0, 0, size, size);
    }

    const link = document.createElement("a");
    link.download = "open-peeps-icon.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = src;
    });
}

function randomGenerate() {
    Object.entries(PARTS_DATA).forEach(([key, category]) => {
        if (key === "background") return;
        if (category.items.length === 0) {
            delete state.selected[key];
            return;
        }

        if (!category.required && Math.random() < 0.25) {
            delete state.selected[key];
            return;
        }

        const randomItem = category.items[Math.floor(Math.random() * category.items.length)];
        state.selected[key] = randomItem.path;
    });

    const randomBackground = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
    setBackgroundColor(randomBackground);
    renderTabs();
    renderParts();
    updatePreview();
}

document.getElementById("randomButton").addEventListener("click", randomGenerate);
document.getElementById("saveButton").addEventListener("click", saveAsPng);
document.getElementById("modalClose").addEventListener("click", closeModal);
document.querySelector("[data-close-modal]").addEventListener("click", closeModal);
document.getElementById("backgroundPicker").addEventListener("input", (event) => {
    setBackgroundColor(event.target.value);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
    }
});

renderTabs();
renderParts();
renderBackgroundPalette();
updatePreview();
