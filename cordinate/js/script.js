const WARDROBE_DATA = {
    tops: [
        { id: 'top_01', name: '白ブラウス', image: '', seasons: ['spring', 'summer', 'autumn'] },
        { id: 'top_02', name: 'サクラニット', image: '', seasons: ['autumn', 'winter'] },
        { id: 'top_03', name: 'ミントシャツ', image: '', seasons: ['spring', 'summer'] }
    ],
    outers: [
        { id: 'outer_01', name: 'ベージュジャケット', image: '', seasons: ['spring', 'autumn'] },
        { id: 'outer_02', name: 'セーラーカーデ', image: '', seasons: ['spring', 'summer', 'autumn'] }
    ],
    inners: [
        { id: 'inner_01', name: 'ホワイト', image: '', seasons: ['spring', 'summer', 'autumn', 'winter'] },
        { id: 'inner_02', name: 'ストライプ', image: '', seasons: ['spring', 'summer', 'autumn'] }
    ],
    pants: [
        { id: 'pants_01', name: 'デニム', image: '', seasons: ['spring', 'summer', 'autumn'] },
        { id: 'pants_02', name: 'ベージュパンツ', image: '', seasons: ['spring', 'autumn', 'winter'] }
    ],
    skirts: [
        { id: 'skirt_01', name: 'プリーツスカート', image: '', seasons: ['spring', 'summer', 'autumn'] },
        { id: 'skirt_02', name: 'フレアスカート', image: '', seasons: ['spring', 'summer'] }
    ],
    dresses: [
        { id: 'dress_01', name: '花柄ワンピース', image: '', seasons: ['spring', 'summer'] },
        { id: 'dress_02', name: 'サロペット', image: '', seasons: ['spring', 'summer', 'autumn'] }
    ],
    socks: [
        { id: 'socks_01', name: '白ソックス', image: '', seasons: ['spring', 'summer', 'autumn'] },
        { id: 'socks_02', name: 'リボンソックス', image: '', seasons: ['spring', 'summer', 'autumn', 'winter'] }
    ],
    shoes: [
        { id: 'shoes_01', name: 'ブラウンシューズ', image: '', seasons: ['autumn', 'winter'] },
        { id: 'shoes_02', name: 'ピンクパンプス', image: '', seasons: ['spring', 'summer'] }
    ],
    accessories: [
        { id: 'accessory_01', name: 'リボン', image: '', seasons: ['spring', 'summer', 'autumn'] },
        { id: 'accessory_02', name: 'ヘアクリップ', image: '', seasons: ['spring', 'summer', 'autumn', 'winter'] }
    ],
    bags: [
        { id: 'bag_01', name: 'ベージュバッグ', image: '', seasons: ['spring', 'summer', 'autumn'] },
        { id: 'bag_02', name: 'ピンクバッグ', image: '', seasons: ['spring', 'summer'] },
        { id: 'bag_03', name: '冬のバッグ', image: '', seasons: ['autumn', 'winter'] }
    ],
    hats: [
        { id: 'hat_01', name: '麦わら帽子', image: '', seasons: ['spring', 'summer'] },
        { id: 'hat_02', name: 'ニット帽', image: '', seasons: ['autumn', 'winter'] },
        { id: 'hat_03', name: 'ベレー帽', image: '', seasons: ['spring', 'autumn', 'winter'] }
    ]
};

const CATEGORIES = [
    { key: 'tops', label: 'トップス' },
    { key: 'outers', label: 'アウター' },
    { key: 'inners', label: 'インナー' },
    { key: 'pants', label: 'パンツ' },
    { key: 'skirts', label: 'スカート' },
    { key: 'dresses', label: 'ワンピース' },
    { key: 'socks', label: '靴下' },
    { key: 'shoes', label: '靴' },
    { key: 'accessories', label: 'アクセサリー' },
    { key: 'bags', label: 'バッグ' },
    { key: 'hats', label: '帽子' }
];

let layerOrder = ['socks', 'shoes', 'pants', 'skirts', 'dresses', 'inners', 'tops', 'outers', 'accessories', 'bags', 'hats'];
const ALLOW_NONE = new Set(['outers', 'pants', 'skirts', 'dresses', 'socks', 'shoes', 'accessories', 'bags', 'hats']);
const SEASONS = [
    { key: 'all', label: 'すべて' },
    { key: 'spring', label: '春' },
    { key: 'summer', label: '夏' },
    { key: 'autumn', label: '秋' },
    { key: 'winter', label: '冬' }
];

const CHALLENGES = [
    { title: '放課後カフェコーデ', description: 'カフェに似合うふんわりガーリーなおしゃれを作ろう！', taste: 'カフェ' },
    { title: 'きらきらステージ衣装', description: '星とピンクで輝くステージコーデに挑戦！', taste: 'ステージ' },
    { title: '休日ピクニック', description: '春風を感じるパステルピクニックコーデを選んでね。', taste: 'ピクニック' },
    { title: 'ポップパーティー', description: 'ビビッドなアクセサリーで楽しいパーティーコーデ！', taste: 'ポップ' }
];

let challengeIndex = 0;

let activeCategory = 'tops';
let activeSeason = 'all';
let selectedItems = {};
let backgroundColor = 'peach';
let backgroundPattern = 'none';
const STORAGE_KEY = 'atelier-cordinate-saves';

const seasonTabs = document.getElementById('seasonTabs');
const categoryTabs = document.getElementById('categoryTabs');
const partsGrid = document.getElementById('partsGrid');
const clothingLayers = document.getElementById('clothingLayers');
const selectedList = document.getElementById('selectedList');
const selectedCount = document.getElementById('selectedCount');
const previewStatus = document.getElementById('previewStatus');
const resetButton = document.getElementById('resetButton');
const downloadButton = document.getElementById('downloadButton');
const randomButton = document.getElementById('randomButton');
const saveButton = document.getElementById('saveButton');
const saveName = document.getElementById('saveName');
const savedList = document.getElementById('savedList');
const previewFrame = document.querySelector('.preview-frame');
const backgroundOptions = document.getElementById('backgroundOptions');
const patternOptions = document.getElementById('patternOptions');
const exportRatio = document.getElementById('exportRatio');
const exportPadding = document.getElementById('exportPadding');
const saveMemo = document.getElementById('saveMemo');
const saveTaste = document.getElementById('saveTaste');
const challengeTitle = document.getElementById('challengeTitle');
const challengeDescription = document.getElementById('challengeDescription');
const nextChallengeButton = document.getElementById('nextChallengeButton');
const judgeChallengeButton = document.getElementById('judgeChallengeButton');
const challengeResult = document.getElementById('challengeResult');
const challengeStamp = document.getElementById('challengeStamp');
const storyShareButton = document.getElementById('storyShareButton');
const shareModal = document.getElementById('shareModal');
const shareModalClose = document.getElementById('shareModalClose');
const shareModalDownload = document.getElementById('shareModalDownload');

function getCategoryLabel(categoryKey) {
    return CATEGORIES.find((category) => category.key === categoryKey)?.label ?? categoryKey;
}

function renderSeasons() {
    seasonTabs.replaceChildren();

    SEASONS.forEach((season) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `season-tab${activeSeason === season.key ? ' active' : ''}`;
        button.textContent = season.label;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', activeSeason === season.key ? 'true' : 'false');
        button.addEventListener('click', () => {
            activeSeason = season.key;
            renderSeasons();
            renderParts();
        });
        seasonTabs.appendChild(button);
    });
}

function renderTabs() {
    categoryTabs.replaceChildren();

    CATEGORIES.forEach((category) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `category-tab${activeCategory === category.key ? ' active' : ''}`;
        button.textContent = category.label;
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', activeCategory === category.key ? 'true' : 'false');
        button.addEventListener('click', () => {
            activeCategory = category.key;
            renderTabs();
            renderParts();
        });
        categoryTabs.appendChild(button);
    });
}

function renderParts() {
    partsGrid.replaceChildren();

    if (ALLOW_NONE.has(activeCategory)) {
        const noneCard = createPartCard(null, 'なし・外す');
        noneCard.classList.add('none-card');
        partsGrid.appendChild(noneCard);
    }

    const filteredParts = (WARDROBE_DATA[activeCategory] ?? []).filter((part) => {
        if (activeSeason === 'all') return true;
        return !part.seasons || part.seasons.includes(activeSeason);
    });

    filteredParts.forEach((part) => {
        partsGrid.appendChild(createPartCard(part));
    });
}

function createPartCard(part, noneLabel) {
    const isNone = !part;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'part-card';
    button.setAttribute('aria-label', isNone ? noneLabel : part.name);

    const art = document.createElement('div');
    art.className = 'part-art';

    if (isNone) {
        art.classList.add('no-image');
        art.textContent = '×';
        if (selectedItems[activeCategory] === undefined) {
            button.classList.add('active');
        }
    } else {
        if (selectedItems[activeCategory]?.part.id === part.id) {
            button.classList.add('active');
        }

        if (part.image) {
            const image = document.createElement('img');
            image.src = part.image;
            image.alt = '';
            art.appendChild(image);
        } else {
            art.classList.add('no-image');
            art.textContent = '＋';
        }
    }

    const name = document.createElement('span');
    name.className = 'part-name';
    name.textContent = isNone ? noneLabel : part.name;

    button.appendChild(art);
    button.appendChild(name);
    button.addEventListener('click', () => selectPart(part));
    return button;
}

function selectPart(part) {
    if (part) {
        selectedItems[activeCategory] = { part, visible: true };
    } else {
        delete selectedItems[activeCategory];
    }

    renderParts();
    renderPreview();
}

function renderPreview() {
    clothingLayers.replaceChildren();

    layerOrder.forEach((categoryKey) => {
        const entry = selectedItems[categoryKey];
        if (!entry?.part?.image || !entry.visible) return;

        const image = document.createElement('img');
        image.className = 'clothing-layer visible';
        image.src = entry.part.image;
        image.alt = '';
        image.dataset.category = categoryKey;
        clothingLayers.appendChild(image);
    });

    renderSelectedList();
}

function renderSelectedList() {
    selectedList.replaceChildren();
    const selectedEntries = CATEGORIES
        .map((category) => ({ category, entry: selectedItems[category.key] }))
        .filter(({ entry }) => Boolean(entry));

    selectedCount.textContent = `${selectedEntries.length} アイテム`;

    if (selectedEntries.length === 0) {
        const empty = document.createElement('span');
        empty.className = 'selected-empty';
        empty.textContent = 'アイテムが選択されていません';
        selectedList.appendChild(empty);
        previewStatus.textContent = 'コーデ未選択';
        return;
    }

    selectedEntries.forEach(({ category, entry }) => {
        const part = entry.part;
        const chip = document.createElement('div');
        chip.className = 'selected-chip';
        if (!entry.visible) chip.classList.add('hidden-item');

        const label = document.createElement('span');
        label.textContent = `${getCategoryLabel(category.key)}：${part.name}`;

        const actions = document.createElement('div');
        actions.className = 'chip-actions';

        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.textContent = entry.visible ? 'ON' : 'OFF';
        toggle.setAttribute('aria-label', `${part.name}の表示を切り替え`);
        toggle.addEventListener('click', () => {
            entry.visible = !entry.visible;
            renderPreview();
            renderParts();
        });

        const up = document.createElement('button');
        up.type = 'button';
        up.textContent = '↑';
        up.setAttribute('aria-label', `${part.name}を前面へ`);
        up.addEventListener('click', () => moveLayer(category.key, 1));

        const down = document.createElement('button');
        down.type = 'button';
        down.textContent = '↓';
        down.setAttribute('aria-label', `${part.name}を背面へ`);
        down.addEventListener('click', () => moveLayer(category.key, -1));

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.textContent = '×';
        remove.setAttribute('aria-label', `${part.name}を外す`);
        remove.addEventListener('click', () => {
            delete selectedItems[category.key];
            renderPreview();
            renderParts();
        });

        actions.append(toggle, up, down, remove);
        chip.appendChild(label);
        chip.appendChild(actions);
        selectedList.appendChild(chip);
    });

    previewStatus.textContent = selectedEntries
        .map(({ entry }) => entry.part.name)
        .slice(0, 2)
        .join('・');
}

function moveLayer(categoryKey, direction) {
    const index = layerOrder.indexOf(categoryKey);
    const nextIndex = index + direction;
    if (index < 0 || nextIndex < 0 || nextIndex >= layerOrder.length) return;

    [layerOrder[index], layerOrder[nextIndex]] = [layerOrder[nextIndex], layerOrder[index]];
    renderPreview();
}

function loadImage(src) {
    return new Promise((resolve) => {
        if (!src) {
            resolve(null);
            return;
        }

        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
    });
}

function cssColor(name) {
    const styles = getComputedStyle(document.documentElement);
    return styles.getPropertyValue(name).trim();
}

function drawExportBackground(context, width, height) {
    const colorNames = {
        peach: '--background-peach',
        mint: '--background-mint',
        blue: '--background-blue',
        lilac: '--background-lilac',
        sand: '--background-sand',
        berry: '--background-berry',
        sky: '--background-sky',
        lemon: '--background-lemon'
    };

    context.fillStyle = cssColor(colorNames[backgroundColor] || '--background-peach');
    context.fillRect(0, 0, width, height);

    if (backgroundPattern === 'dots') {
        context.fillStyle = cssColor('--pattern-dot');
        const spacing = Math.round(Math.min(width, height) * 0.018);
        for (let y = spacing; y < height; y += spacing * 2) {
            for (let x = spacing; x < width; x += spacing * 2) {
                context.beginPath();
                context.arc(x, y, Math.max(2, spacing * 0.12), 0, Math.PI * 2);
                context.fill();
            }
        }
    } else if (backgroundPattern === 'check') {
        context.fillStyle = cssColor('--pattern-check');
        const size = Math.round(Math.min(width, height) * 0.05);
        for (let y = 0; y < height; y += size * 2) {
            for (let x = 0; x < width; x += size * 2) {
                context.fillRect(x, y, size, size);
                context.fillRect(x + size, y + size, size, size);
            }
        }
    } else if (backgroundPattern === 'stripes') {
        context.fillStyle = cssColor('--pattern-stripe');
        const size = Math.round(Math.min(width, height) * 0.04);
        context.save();
        context.translate(width / 2, height / 2);
        context.rotate(Math.PI / 4);
        context.translate(-width / 2, -height / 2);
        for (let x = -height; x < width + height; x += size * 2) {
            context.fillRect(x, -height, size, height * 3);
        }
        context.restore();
    } else if (backgroundPattern === 'hearts') {
        context.fillStyle = cssColor('--heart-pattern');
        const size = Math.round(Math.min(width, height) * 0.025);
        for (let y = size; y < height; y += size * 5) {
            for (let x = size; x < width; x += size * 5) {
                context.save();
                context.translate(x, y);
                context.beginPath();
                context.moveTo(0, size * 0.6);
                context.bezierCurveTo(-size, size * 0.1, -size, -size, 0, -size * 0.3);
                context.bezierCurveTo(size, -size, size, size * 0.1, 0, size * 0.6);
                context.fill();
                context.restore();
            }
        }
    } else if (backgroundPattern === 'stars') {
        context.fillStyle = cssColor('--star-pattern');
        const size = Math.round(Math.min(width, height) * 0.012);
        for (let y = size * 4; y < height; y += size * 12) {
            for (let x = size * 4; x < width; x += size * 12) {
                context.beginPath();
                for (let point = 0; point < 10; point++) {
                    const radius = point % 2 === 0 ? size * 4 : size * 1.8;
                    const angle = -Math.PI / 2 + point * Math.PI / 5;
                    const px = x + Math.cos(angle) * radius;
                    const py = y + Math.sin(angle) * radius;
                    if (point === 0) context.moveTo(px, py);
                    else context.lineTo(px, py);
                }
                context.closePath();
                context.fill();
            }
        }
    }
}

function renderAppearanceOptions() {
    const colors = [
        ['peach', 'ピーチ'],
        ['mint', 'ミント'],
        ['blue', 'ブルー'],
        ['lilac', 'ライラック'],
        ['sand', 'サンド'],
        ['berry', 'ベリー'],
        ['sky', 'スカイ'],
        ['lemon', 'レモン']
    ];

    backgroundOptions.replaceChildren();
    colors.forEach(([key, label]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `option-button color-swatch background-${key}${backgroundColor === key ? ' active' : ''}`;
        button.title = label;
        button.setAttribute('aria-label', `${label}背景`);
        button.addEventListener('click', () => {
            backgroundColor = key;
            previewFrame.className = `preview-frame${backgroundPattern === 'none' ? '' : ` pattern-${backgroundPattern}`}`;
            previewFrame.classList.add(`background-${key}`);
            previewFrame.style.backgroundColor = cssColor({
                peach: '--background-peach',
                mint: '--background-mint',
                blue: '--background-blue',
                lilac: '--background-lilac',
                sand: '--background-sand',
                berry: '--background-berry',
                sky: '--background-sky',
                lemon: '--background-lemon'
            }[key]);
            renderAppearanceOptions();
        });
        backgroundOptions.appendChild(button);
    });

    const patterns = [
        ['none', '無地'],
        ['dots', 'ドット'],
        ['check', 'チェック'],
        ['stripes', 'ストライプ'],
        ['hearts', 'ハート'],
        ['stars', 'スター']
    ];

    patternOptions.replaceChildren();
    patterns.forEach(([key, label]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = `option-button${backgroundPattern === key ? ' active' : ''}`;
        button.textContent = label;
        button.addEventListener('click', () => {
            backgroundPattern = key;
            previewFrame.classList.remove('pattern-dots', 'pattern-check', 'pattern-stripes', 'pattern-hearts', 'pattern-stars');
            if (key === 'dots') previewFrame.classList.add('pattern-dots');
            if (key === 'check') previewFrame.classList.add('pattern-check');
            if (key === 'stripes') previewFrame.classList.add('pattern-stripes');
            if (key === 'hearts') previewFrame.classList.add('pattern-hearts');
            if (key === 'stars') previewFrame.classList.add('pattern-stars');
            previewFrame.style.backgroundColor = cssColor({
                peach: '--background-peach',
                mint: '--background-mint',
                blue: '--background-blue',
                lilac: '--background-lilac',
                sand: '--background-sand',
                berry: '--background-berry',
                sky: '--background-sky',
                lemon: '--background-lemon'
            }[backgroundColor]);
            renderAppearanceOptions();
        });
        patternOptions.appendChild(button);
    });
}

function randomCoordinate() {
    randomButton.classList.remove('is-spinning');
    void randomButton.offsetWidth;
    randomButton.classList.add('is-spinning');
    setTimeout(() => randomButton.classList.remove('is-spinning'), 500);
    selectedItems = {};
    CATEGORIES.forEach((category) => {
        if (activeSeason === 'all') {
            const parts = WARDROBE_DATA[category.key] ?? [];
            if (parts.length > 0) {
                const part = parts[Math.floor(Math.random() * parts.length)];
                selectedItems[category.key] = { part, visible: true };
            }
        } else {
            const parts = (WARDROBE_DATA[category.key] ?? []).filter((part) =>
                !part.seasons || part.seasons.includes(activeSeason)
            );
            if (parts.length > 0) {
                const part = parts[Math.floor(Math.random() * parts.length)];
                selectedItems[category.key] = { part, visible: true };
            }
        }
    });
    renderParts();
    renderPreview();
}

function renderChallenge() {
    const challenge = CHALLENGES[challengeIndex];
    challengeTitle.textContent = challenge.title;
    challengeDescription.textContent = challenge.description;
    challengeResult.textContent = '';
    challengeStamp.textContent = '';
    challengeStamp.classList.remove('achieved');
}

function judgeChallenge() {
    const challenge = CHALLENGES[challengeIndex];
    const itemCount = Object.keys(selectedItems).length;
    const hasTasteMatch = saveTaste.value === challenge.taste;
    const achieved = itemCount >= 4 || hasTasteMatch;
    challengeStamp.classList.remove('achieved');
    void challengeStamp.offsetWidth;
    challengeStamp.classList.add('achieved');

    if (achieved) {
        challengeStamp.textContent = '達成!';
        challengeResult.textContent = `${challenge.title}クリア！ とってもステキなコーデです ♡`;
    } else {
        challengeStamp.textContent = '挑戦';
        challengeResult.textContent = 'あと少し！アクセサリーやバッグも合わせてみよう ✦';
    }
}

function getSavedCoordinates() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
        return [];
    }
}

function saveCoordinate() {
    const now = new Date();
    const saved = getSavedCoordinates();
    const dateName = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(saved.length + 1).padStart(2, '0')}`;
    const item = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: saveName.value.trim() || dateName,
        memo: saveMemo.value.trim(),
        taste: saveTaste.value,
        createdAt: now.toISOString(),
        backgroundColor,
        backgroundPattern,
        layerOrder: [...layerOrder],
        items: Object.fromEntries(
            Object.entries(selectedItems).map(([categoryKey, entry]) => [
                categoryKey,
                { partId: entry.part.id, visible: entry.visible }
            ])
        )
    };

    saved.unshift(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    saveName.value = '';
    saveMemo.value = '';
    renderSavedCoordinates();
}

function findPart(categoryKey, partId) {
    return (WARDROBE_DATA[categoryKey] ?? []).find((part) => part.id === partId);
}

function loadCoordinate(saved) {
    selectedItems = {};
    Object.entries(saved.items || {}).forEach(([categoryKey, entry]) => {
        const part = findPart(categoryKey, entry.partId);
        if (part) selectedItems[categoryKey] = { part, visible: entry.visible !== false };
    });
    layerOrder = Array.isArray(saved.layerOrder)
        ? [...saved.layerOrder, ...layerOrder.filter((key) => !saved.layerOrder.includes(key))]
        : [...layerOrder];
    backgroundColor = saved.backgroundColor || 'peach';
    backgroundPattern = saved.backgroundPattern || 'none';
    previewFrame.className = 'preview-frame';
    if (backgroundPattern === 'dots') previewFrame.classList.add('pattern-dots');
    if (backgroundPattern === 'check') previewFrame.classList.add('pattern-check');
    if (backgroundPattern === 'stripes') previewFrame.classList.add('pattern-stripes');
    if (backgroundPattern === 'hearts') previewFrame.classList.add('pattern-hearts');
    if (backgroundPattern === 'stars') previewFrame.classList.add('pattern-stars');
    previewFrame.classList.add(`background-${backgroundColor}`);
    previewFrame.style.backgroundColor = cssColor({
        peach: '--background-peach',
        mint: '--background-mint',
        blue: '--background-blue',
        lilac: '--background-lilac',
        sand: '--background-sand',
        berry: '--background-berry',
        sky: '--background-sky',
        lemon: '--background-lemon'
    }[backgroundColor]);
    renderAppearanceOptions();
    renderParts();
    renderPreview();
}

function renderSavedCoordinates() {
    savedList.replaceChildren();
    const saved = getSavedCoordinates();

    if (saved.length === 0) {
        const empty = document.createElement('span');
        empty.className = 'selected-empty';
        empty.textContent = '保存済みコーデはありません';
        savedList.appendChild(empty);
        return;
    }

    saved.forEach((item) => {
        const card = document.createElement('div');
        card.className = 'saved-card fashion-card';
        card.setAttribute('role', 'button');
        card.tabIndex = 0;
        card.addEventListener('click', (event) => {
            if (!event.target.closest('.saved-delete')) loadCoordinate(item);
        });
        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') loadCoordinate(item);
        });

        const itemCount = Object.keys(item.items || {}).length;
        const body = document.createElement('div');
        body.className = 'saved-card-body';

        const name = document.createElement('strong');
        name.className = 'saved-load';
        name.textContent = item.name;

        const meta = document.createElement('div');
        meta.className = 'saved-card-meta';
        const taste = document.createElement('span');
        taste.className = 'taste-badge';
        taste.textContent = item.taste || 'ガーリー';
        const parts = document.createElement('span');
        parts.className = 'parts-badge';
        parts.textContent = `収集 ${itemCount}パーツ`;
        meta.append(taste, parts);

        const memo = document.createElement('span');
        memo.className = 'saved-memo';
        memo.textContent = item.memo || 'ひとことメモなし';
        body.append(name, meta, memo);

        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'saved-delete';
        remove.textContent = '×';
        remove.setAttribute('aria-label', `${item.name}を削除`);
        remove.addEventListener('click', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(saved.filter((entry) => entry.id !== item.id)));
            renderSavedCoordinates();
        });

        card.append(body, remove);
        savedList.appendChild(card);
    });
}

async function downloadPng() {
    const canvas = document.getElementById('exportCanvas');
    const context = canvas.getContext('2d');
    const ratio = exportRatio.value;
    const sizes = {
        square: [1080, 1080],
        portrait: [1080, 1350],
        story: [1080, 1920],
        standard: [1280, 720]
    };
    const [width, height] = sizes[ratio] || sizes.square;
    const paddingValues = { none: 0, narrow: 0.04, wide: 0.10 };
    const paddingRatio = paddingValues[exportPadding.value] ?? 0;

    canvas.width = width;
    canvas.height = height;
    context.clearRect(0, 0, width, height);
    drawExportBackground(context, width, height);

    const padding = Math.round(Math.min(width, height) * paddingRatio);
    const drawWidth = width - padding * 2;
    const drawHeight = height - padding * 2;

    for (const categoryKey of layerOrder) {
        const entry = selectedItems[categoryKey];
        if (!entry?.visible || !entry.part?.image) continue;

        const image = await loadImage(entry.part.image);
        if (image) {
            context.drawImage(image, padding, padding, drawWidth, drawHeight);
        }
    }

    const link = document.createElement('a');
    link.download = 'atelier-cordinate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}

async function createStoryBlob() {
    const canvas = document.getElementById('exportCanvas');
    const context = canvas.getContext('2d');
    const width = 1080;
    const height = 1920;
    canvas.width = width;
    canvas.height = height;
    drawExportBackground(context, width, height);

    const paddingValues = { none: 80, narrow: 120, wide: 180 };
    const padding = paddingValues[exportPadding.value] ?? 120;
    const frameInset = padding;
    context.save();
    context.strokeStyle = cssColor('--pop-pink-soft');
    context.lineWidth = 24;
    context.fillStyle = cssColor('--card-cream');
    context.beginPath();
    context.roundRect(frameInset, frameInset + 180, width - frameInset * 2, height - frameInset * 2 - 360, 70);
    context.fill();
    context.stroke();
    context.restore();

    context.fillStyle = cssColor('--text-color');
    context.font = `600 72px ${cssColor('--font_en')}`;
    context.textAlign = 'center';
    context.fillText('MY MAGICAL CODE', width / 2, 170);

    for (const categoryKey of layerOrder) {
        const entry = selectedItems[categoryKey];
        if (!entry?.visible || !entry.part?.image) continue;
        const image = await loadImage(entry.part.image);
        if (image) {
            context.drawImage(image, frameInset + 70, frameInset + 250, width - (frameInset + 70) * 2, height - frameInset * 2 - 560);
        }
    }

    context.fillStyle = cssColor('--pop-pink');
    context.beginPath();
    context.roundRect(230, height - 310, width - 460, 130, 65);
    context.fill();
    context.fillStyle = cssColor('--white');
    context.font = `700 48px ${cssColor('--font_ja')}`;
    context.textAlign = 'center';
    context.fillText(saveName.value.trim() || CHALLENGES[challengeIndex].title, width / 2, height - 225);

    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
}

async function shareToStory() {
    const blob = await createStoryBlob();
    if (!blob) return;

    const file = new File([blob], 'magical-cordinate-story.png', { type: 'image/png' });
    if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        try {
            await navigator.share({
                files: [file],
                title: 'Magical Cordinate',
                text: '今日のコーデをシェア！'
            });
            return;
        } catch (error) {
            if (error?.name === 'AbortError') return;
        }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'magical-cordinate-story.png';
    link.href = url;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    shareModal.hidden = false;
}

resetButton.addEventListener('click', () => {
    selectedItems = {};
    layerOrder = ['socks', 'shoes', 'pants', 'skirts', 'dresses', 'inners', 'tops', 'outers', 'accessories', 'bags', 'hats'];
    backgroundColor = 'peach';
    backgroundPattern = 'none';
    previewFrame.className = 'preview-frame';
    previewFrame.style.backgroundColor = '';
    renderAppearanceOptions();
    renderPreview();
    renderParts();
});

randomButton.addEventListener('click', randomCoordinate);
saveButton.addEventListener('click', saveCoordinate);
downloadButton.addEventListener('click', downloadPng);
nextChallengeButton.addEventListener('click', () => {
    challengeIndex = (challengeIndex + 1) % CHALLENGES.length;
    renderChallenge();
});
judgeChallengeButton.addEventListener('click', judgeChallenge);
storyShareButton.addEventListener('click', shareToStory);
shareModalClose.addEventListener('click', () => {
    shareModal.hidden = true;
});
shareModalDownload.addEventListener('click', shareToStory);

renderSeasons();
renderTabs();
renderParts();
renderPreview();
renderAppearanceOptions();
renderSavedCoordinates();
renderChallenge();