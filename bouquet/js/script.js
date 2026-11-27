const FLOWERS = [
    { id: "rose", name: "バラ", english: "Rose", color: "ピンク", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "愛・感謝・うれしい出来事", scenes: ["恋人・パートナー", "記念日・特別な日"], role: "メイン" },
    { id: "red-rose", name: "バラ（赤）", english: "Red Rose", color: "レッド", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "情熱・愛情・I love you", scenes: ["恋人・パートナー", "記念日・特別な日"], role: "メイン" },
    { id: "sunflower", name: "ひまわり", english: "Sunflower", color: "イエロー・オレンジ", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "あなただけを見つめる・憧れ", scenes: ["励まし・応援", "お祝い・門出"], role: "メイン" },
    { id: "ranunculus", name: "ラナンキュラス", english: "Ranunculus", color: "ピンク", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "魅力的・あなたを幸せにする", scenes: ["友人・同僚", "誕生日"], role: "メイン" },
    { id: "tulip", name: "チューリップ", english: "Tulip", color: "ピンク", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "思いやり・愛の宣言", scenes: ["家族・両親", "誕生日"], role: "サブ" },
    { id: "white-tulip", name: "チューリップ（白）", english: "White Tulip", color: "ホワイト", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "新しい始まり・失われた愛", scenes: ["お祝い・門出", "お世話になった目上の方"], role: "サブ" },
    { id: "carnation", name: "カーネーション", english: "Carnation", color: "ピンク", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "無垢な愛・感謝・母への愛", scenes: ["家族・両親", "感謝・お礼"], role: "サブ" },
    { id: "gerbera", name: "ガーベラ", english: "Gerbera", color: "レッド", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "希望・勇気・前進", scenes: ["励まし・応援", "お祝い・門出"], role: "メイン" },
    { id: "cosmos", name: "コスモス", english: "Cosmos", color: "ピンク", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "乙女の純真・調和・少女の愛", scenes: ["友人・同僚", "家族・両親"], role: "サブ" },
    { id: "hydrangea", name: "紫陽花", english: "Hydrangea", color: "ブルー・パープル", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "変わらぬ愛・団結・寛容", scenes: ["感謝・お礼", "家族・両親"], role: "サブ" },
    { id: "lavender", name: "ラベンダー", english: "Lavender", color: "ブルー・パープル", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "待っている・穏やかな心", scenes: ["励まし・応援", "自分へのご褒美"], role: "サブ" },
    { id: "eucalyptus", name: "ユーカリ", english: "Eucalyptus", color: "グリーン", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "たくましい・若い性質", scenes: ["自分へのご褒美", "お世話になった目上の方"], role: "グリーン" },
    { id: "olive", name: "オリーブ", english: "Olive", color: "グリーン", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "平和・優雅・豊穣", scenes: ["お祝い・門出", "お世話になった目上の方"], role: "グリーン" },
    { id: "baby-breath", name: "かすみ草", english: "Baby's Breath", color: "ホワイト", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "清らかな心・感謝・包み込む愛", scenes: ["感謝・お礼", "友人・同僚"], role: "サブ" },
    { id: "calla", name: "カラー", english: "Calla Lily", color: "ホワイト", image: "https://placehold.jp/600x400.png?text=Flower+Item", language: "清純な美・信頼・壮麗", scenes: ["お世話になった目上の方", "記念日・特別な日"], role: "メイン" }
];

const FILTERS = ["すべて", "ピンク", "レッド", "イエロー・オレンジ", "ホワイト", "ブルー・パープル", "グリーン"];
const FAVORITES_KEY = "floraWordsFavorites";
let activeFilter = "すべて";
let currentProposal = null;
let favorites = loadFavorites();
let reshuffleIndex = 0;

function loadFavorites() {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; }
    catch (error) { return []; }
}
function saveFavorites() { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); }
function colorClass(color) {
    if (color.includes("ピンク")) return "pink";
    if (color.includes("レッド")) return "red";
    if (color.includes("イエロー") || color.includes("オレンジ")) return "yellow";
    if (color.includes("ホワイト")) return "white";
    if (color.includes("ブルー")) return "blue";
    if (color.includes("パープル")) return "purple";
    if (color.includes("グリーン")) return "green";
    return "pink";
}
function mapPreferenceColor(preference) {
    const map = {
        "ピンク系": "ピンク",
        "レッド系": "レッド",
        "イエロー・オレンジ系": "イエロー・オレンジ",
        "ホワイト・グリーン系": "ホワイト",
        "ブルー・パープル系": "ブルー・パープル"
    };
    return map[preference] || null;
}
function getTheme(recipient) {
    if (recipient === "恋人・パートナー") return ["心ほどけるロマンスブーケ", "伝えきれない想いを、やわらかな色合いと香り立つ花々に託したブーケです。"];
    if (recipient === "友人・同僚") return ["明るく寄り添うフレンドブーケ", "親しみやすく、贈る人の温かな気持ちが伝わる軽やかなブーケです。"];
    if (recipient === "家族・両親") return ["いつもありがとうのファミリーブーケ", "日ごろの感謝を、やさしく包み込む素朴で上品な花束に表現しました。"];
    if (recipient === "お世話になった目上の方") return ["品格を添えるエレガントブーケ", "格式と感謝を両立させた、落ち着いた佇まいの上品な花束です。"];
    if (recipient === "自分へのご褒美") return ["自分を花で祝うセルフブーケ", "頑張った自分へ、心を整えて前向きな気持ちをくれる花束です。"];
    return ["想いが届くアトリエブーケ", "贈るシーンに寄り添う、洗練された花材のハーモニーです。"];
}
function createProposal() {
    const recipient = document.getElementById("recipient").value;
    const occasion = document.getElementById("occasion").value;
    const preference = document.getElementById("color").value;
    const preferredColor = mapPreferenceColor(preference);
    let candidates = FLOWERS.filter((flower) => flower.scenes.includes(recipient) || flower.scenes.includes(occasion));
    if (preferredColor) {
        const matching = candidates.filter((flower) => flower.color === preferredColor);
        candidates = matching.length >= 2 ? matching : FLOWERS.filter((flower) => flower.color === preferredColor).concat(candidates);
    }
    const uniqueCandidates = [...new Map(candidates.map((flower) => [flower.id, flower])).values()];
    FLOWERS.forEach((flower) => {
        if (!uniqueCandidates.some((item) => item.id === flower.id)) uniqueCandidates.push(flower);
    });
    const mains = uniqueCandidates.filter((flower) => flower.role === "メイン");
    const subs = uniqueCandidates.filter((flower) => flower.role === "サブ");
    const greens = uniqueCandidates.filter((flower) => flower.role === "グリーン");
    const pick = (array, offset = 0) => array.length ? array[(reshuffleIndex + offset) % array.length] : null;
    const selected = [
        pick(mains, 0),
        pick(subs, 1),
        pick(subs, 2),
        pick(greens, 0)
    ].filter((flower, index, array) => flower && array.findIndex((item) => item && item.id === flower.id) === index).slice(0, 4);
    uniqueCandidates.forEach((flower) => {
        if (selected.length < 3 && !selected.some((item) => item.id === flower.id)) selected.push(flower);
    });
    const theme = getTheme(recipient);
    currentProposal = { recipient, occasion, preference, title: theme[0], concept: theme[1], flowers: selected };
    reshuffleIndex += 1;
    renderProposal();
}
function renderProposal() {
    if (!currentProposal) createProposal();
    const proposal = document.getElementById("proposal");
    const flowerItems = currentProposal.flowers.map((flower) => `
        <div class="flower-item">
            <span class="flower-dot" style="background: var(--tag-${colorClass(flower.color)})"></span>
            <div>
                <strong>${flower.name} ／${flower.role}</strong>
                <small>${flower.language}<br>${flower.color}</small>
            </div>
        </div>
    `).join("");
    proposal.innerHTML = `
        <div class="proposal-top">
            <img class="proposal-image" src="https://placehold.jp/600x400.png?text=Flower+Bouquet" alt="${currentProposal.title}">
            <div>
                <p class="eyebrow">${currentProposal.recipient} × ${currentProposal.occasion}</p>
                <h2 id="proposal-heading">${currentProposal.title}</h2>
                <p class="proposal-concept">${currentProposal.concept}</p>
            </div>
        </div>
        <div class="flower-list">${flowerItems}</div>
        <div class="advice-box">
            <strong>ラッピング＆メッセージアドバイス</strong>
            <p>${getAdvice(currentProposal)}</p>
        </div>
    `;
    proposal.classList.remove("proposal");
    void proposal.offsetWidth;
    proposal.classList.add("proposal");
    updateFavoriteButton();
}
function getAdvice(proposal) {
    let wrapping = "やわらかなローズピンクのペーパーと細めのサテンリボン";
    if (proposal.preference === "ホワイト・グリーン系") wrapping = "ナチュラルなクラフトペーパーと細いグリーンリボン";
    if (proposal.preference === "ブルー・パープル系") wrapping = "淡いラベンダー色のペーパーとシルバーグレーのリボン";
    return `${wrapping}でまとめると花言葉が引き立ちます。カードには「${proposal.occasion}のおめでとうを花束に込めて」を添えてみてください。`;
}
function renderFilters() {
    document.getElementById("filter-tabs").innerHTML = FILTERS.map((filter) =>
        `<button class="filter-tab ${filter === activeFilter ? "active" : ""}" type="button" data-filter="${filter}">${filter}</button>`
    ).join("");
}
function renderFlowers() {
    const search = document.getElementById("flower-search").value.trim().toLowerCase();
    const flowers = FLOWERS.filter((flower) => {
        const matchesFilter = activeFilter === "すべて" || flower.color === activeFilter;
        const searchable = `${flower.name} ${flower.english} ${flower.language} ${flower.scenes.join(" ")}`.toLowerCase();
        return matchesFilter && searchable.includes(search);
    });
    const grid = document.getElementById("flower-grid");
    if (!flowers.length) {
        grid.innerHTML = `<p class="no-results">該当する花が見つかりませんでした。</p>`;
        return;
    }
    grid.innerHTML = flowers.map((flower) => `
        <article class="flower-card">
            <img class="flower-card-image" src="${flower.image}" alt="${flower.name}">
            <div class="flower-card-body">
                <div class="flower-card-header">
                    <h3>${flower.name}<span>${flower.english}</span></h3>
                    <span class="color-tag color-${colorClass(flower.color)}">${flower.color}</span>
                </div>
                <p class="flower-language">${flower.language}</p>
                <p class="flower-scene">おすすめ：${flower.scenes.join("・")}</p>
            </div>
        </article>
    `).join("");
}
function createFavoriteSignature(proposal) {
    return `${proposal.title}|${proposal.flowers.map((flower) => flower.id).join(",")}`;
}
function updateFavoriteButton() {
    if (!currentProposal) return;
    const signature = createFavoriteSignature(currentProposal);
    const button = document.getElementById("favorite-button");
    const saved = favorites.some((favorite) => favorite.signature === signature);
    button.textContent = saved ? "♥ 保存済み" : "♡ お気に入りに保存";
    button.classList.toggle("saved", saved);
}
function toggleFavorite() {
    if (!currentProposal) return;
    const signature = createFavoriteSignature(currentProposal);
    const existingIndex = favorites.findIndex((favorite) => favorite.signature === signature);
    if (existingIndex >= 0) favorites.splice(existingIndex, 1);
    else favorites.push({ signature, title: currentProposal.title, recipient: currentProposal.recipient, occasion: currentProposal.occasion });
    saveFavorites();
    renderFavorites();
    updateFavoriteButton();
}
function renderFavorites() {
    const list = document.getElementById("favorites-list");
    if (!favorites.length) {
        list.innerHTML = `<p class="empty-favorites">まだお気に入りはありません。</p>`;
        return;
    }
    list.innerHTML = favorites.map((favorite, index) => `
        <div class="favorite-item">
            <span><strong>${favorite.title}</strong><br>${favorite.recipient} × ${favorite.occasion}</span>
            <button class="remove-favorite" type="button" data-index="${index}" aria-label="${favorite.title}を削除">×</button>
        </div>
    `).join("");
}
document.getElementById("diagnosis-form").addEventListener("submit", (event) => {
    event.preventDefault();
    reshuffleIndex = 0;
    createProposal();
    document.getElementById("bouquet-board").scrollIntoView({ behavior: "smooth", block: "start" });
});
document.getElementById("reshuffle-button").addEventListener("click", createProposal);
document.getElementById("favorite-button").addEventListener("click", toggleFavorite);
document.getElementById("flower-search").addEventListener("input", renderFlowers);
document.getElementById("filter-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    renderFilters();
    renderFlowers();
});
document.getElementById("favorites-list").addEventListener("click", (event) => {
    const button = event.target.closest(".remove-favorite");
    if (!button) return;
    favorites.splice(Number(button.dataset.index), 1);
    saveFavorites();
    renderFavorites();
    updateFavoriteButton();
});
renderFilters();
renderFlowers();
renderFavorites();
createProposal();