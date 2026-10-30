const plans = [
    {
        title: "七五三の記念写真",
        description: "晴れ着姿が似合う季節に。ご家族みんなで残せる記念撮影プランです。",
        image: "img/boy.webp",
        duration: "約60分",
        price: "12,800円〜"
    },
    {
        title: "誕生日の記念写真",
        description: "1歳のお誕生日やハーフバースデーも。ケーキや飾り付けと一緒に楽しく撮影します。",
        image: "img/birthday.webp",
        duration: "約45分",
        price: "9,800円〜"
    },
    {
        title: "ニューボーンフォト",
        description: "生まれたばかりの小さな手足をそっと残す、ご家族だけの特別な撮影です。",
        image: "img/newborn.webp",
        duration: "約90分",
        price: "14,800円〜"
    }
];

const testimonials = [
    {
        name: "田中さんファミリー",
        detail: "3歳・1歳のお子さま",
        image: "https://placehold.jp/150x150.png?text=User",
        comment: "はじめてなのに、スタッフさんが遊びながら撮ってくださって、自然な笑顔がたくさん。家族全員で楽しい思い出になりました。"
    },
    {
        name: "鈴木さんファミリー",
        detail: "7歳のお子さま",
        image: "https://placehold.jp/150x150.png?text=User",
        comment: "着せたい衣装をいくつも試せて、子ども自身が撮影を楽しんでいました。仕上がったアルバムもおしゃれで大満足です。"
    },
    {
        name: "佐藤さんファミリー",
        detail: "生後1か月のお子さま",
        image: "https://placehold.jp/150x150.png?text=User",
        comment: "赤ちゃんのペースに合わせて丁寧に進めていただきました。持ち込んだぬいぐるみとも一緒に撮れて、とても温かい写真ができました。"
    }
];

const faqs = [
    {
        question: "撮影の予約はいつまでに必要ですか？",
        answer: "撮影日の1か月前までのご予約をおすすめしています。七五三や年末年始など繁忙期は、早めのご相談をいただけるとお選びいただきやすくなります。"
    },
    {
        question: "衣装や小物はレンタルできますか？",
        answer: "カジュアル衣装や小物、撮影用のアクセサリーをご用意しています。撮影予約時に希望をご連絡ください。"
    },
    {
        question: "おもちゃや服などを持ち込んでも大丈夫ですか？",
        answer: "もちろんです。お気に入りのぬいぐるみ、おもちゃ、手作り衣装など、お子さまらしさを引き出すアイテムを持ち込んでいただけます。"
    },
    {
        question: "写真を撮るのが苦手なお子さまでも撮影できますか？",
        answer: "大丈夫です。スタッフが遊びや会話でリラックスできる雰囲気を作り、お子さまのペースを尊重して撮影します。無理に笑顔を作ることはありません。"
    }
];

const planList = document.getElementById("plan-list");
planList.innerHTML = plans.map(plan => `
    <article class="plan-card">
        <img src="${plan.image}" alt="${plan.title}の撮影イメージ">
        <div class="plan-body">
            <h3>${plan.title}</h3>
            <p>${plan.description}</p>
            <div class="plan-meta">
                <span>${plan.duration}</span>
                <strong>${plan.price}</strong>
            </div>
        </div>
    </article>
`).join("");

const voiceList = document.getElementById("voice-list");
voiceList.innerHTML = testimonials.map(voice => `
    <article class="voice-card">
        <div class="voice-head">
            <img src="${voice.image}" alt="${voice.name}のアイコン">
            <div>
                <strong>${voice.name}</strong>
                <span>${voice.detail}</span>
            </div>
        </div>
        <blockquote>“${voice.comment}”</blockquote>
    </article>
`).join("");

const faqList = document.getElementById("faq-list");
faqList.innerHTML = faqs.map((faq, index) => `
    <div class="faq-item${index === 0 ? " open" : ""}">
        <button class="faq-question" type="button" aria-expanded="${index === 0}" aria-controls="faq-answer-${index}">
            ${faq.question}
        </button>
        <div class="faq-answer" id="faq-answer-${index}">
            <p>${faq.answer}</p>
        </div>
    </div>
`).join("");

document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const item = button.closest(".faq-item");
        const isOpen = item.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });
});

const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");

function closeMobileMenu() {
    menuToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    mobileMenu.setAttribute("aria-hidden", "true");
}

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.classList.toggle("open");
    mobileMenu.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
});

mobileMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileMenu));
