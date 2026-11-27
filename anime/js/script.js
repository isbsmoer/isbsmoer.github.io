const quizList = [
    {
        quote: "あきらめたらそこで試合終了ですよ。",
        choices: ["安西先生", "桜木花道", "流川楓", "赤木剛憲"],
        answer: "安西先生",
        explanation: "陵南戦後半、三井寿にかけた伝説の言葉。",
        scene: "陵南戦"
    },
    {
        quote: "左手はそえるだけ…",
        choices: ["宮城リョータ", "桜木花道", "三井寿", "木暮公延"],
        answer: "桜木花道",
        explanation: "ジャンプシュートのフォームを教わった際の合言葉。",
        scene: "練習シーン"
    },
    {
        quote: "バスケが…したいです…",
        choices: ["三井寿", "水戸洋平", "仙道彰", "魚住純"],
        answer: "三井寿",
        explanation: "体育館での乱闘後、安西先生の前で本音を吐露した名シーン。",
        scene: "体育館"
    },
    {
        quote: "お前はもう死んでいる。",
        choices: ["ケンシロウ", "ラオウ", "レイ", "トキ"],
        answer: "ケンシロウ",
        explanation: "北斗神拳を操るケンシロウの代表的な決めゼリフ。",
        scene: "北斗の拳"
    },
    {
        quote: "俺は海賊王になる男だ！",
        choices: ["ロロノア・ゾロ", "ポートガス・D・エース", "モンキー・D・ルフィ", "シャンクス"],
        answer: "モンキー・D・ルフィ",
        explanation: "麦わらの一味の船長ルフィの夢を語る名シーン。",
        scene: "ONE PIECE"
    },
    {
        quote: "月火水木金土日。",
        choices: ["キラキラ星の斎藤", "キャンピングカーの三田", "どんぐりのアイゴー", "タマの鳥羽さん"],
        answer: "キャンピングカーの三田",
        explanation: "シュールな無駄話で知られる、ギャグアニメの日常の名ゼリフ。",
        scene: "日常"
    },
    {
        quote: "一人じゃない。",
        choices: ["ナルト", "サスケ", "カカシ", "サクラ"],
        answer: "ナルト",
        explanation: "仲間との絆を強く示した忍たちの名シーン。",
        scene: "NARUTO"
    },
    {
        quote: "人間とは弱くて醜いものだ。",
        choices: ["エレン・イェーガー", "リヴァイ", "アルミン", "エルヴィン"],
        answer: "エルヴィン",
        explanation: "生と死を覚悟した調査兵団長エルヴィンの名セリフ。",
        scene: "進撃の巨人"
    },
    {
        quote: "諦めたらそこで試合終了だよ。",
        choices: ["安西先生", "赤木剛憲", "桜木花道", "三井寿"],
        answer: "安西先生",
        explanation: "三井寿にかけた言葉を、別表現でも覚えているか確認する問題。",
        scene: "SLAM DUNK"
    },
    {
        quote: "心を燃やせ。",
        choices: ["煉獄杏寿郎", "竈門炭治郎", "冨岡義勇", "宇髄天元"],
        answer: "煉獄杏寿郎",
        explanation: "鬼滅の刃で炎柱・煉獄杏寿郎が示した熱い覚悟の言葉。",
        scene: "鬼滅の刃"
    }
];

let quizState = loadState("animeQuizState", {
    currentIndex: 0,
    score: 0,
    combo: 0,
    answered: false,
    correctIndexes: [],
    finished: false
});

const elements = {
    appShell: document.getElementById("appShell"),
    playView: document.getElementById("playView"),
    listView: document.getElementById("listView"),
    playModeButton: document.getElementById("playModeButton"),
    listModeButton: document.getElementById("listModeButton"),
    questionNumber: document.getElementById("questionNumber"),
    progressBar: document.getElementById("progressBar"),
    scoreText: document.getElementById("scoreText"),
    quizCard: document.getElementById("quizCard"),
    quoteText: document.getElementById("quoteText"),
    answerGrid: document.getElementById("answerGrid"),
    feedback: document.getElementById("feedback"),
    feedbackTitle: document.getElementById("feedbackTitle"),
    comboText: document.getElementById("comboText"),
    explanationText: document.getElementById("explanationText"),
    nextButton: document.getElementById("nextButton"),
    questionList: document.getElementById("questionList"),
    resultScore: document.getElementById("resultScore"),
    resultCard: document.getElementById("resultCard"),
    finalScore: document.getElementById("finalScore"),
    resultDetail: document.getElementById("resultDetail"),
    restartButton: document.getElementById("restartButton")
};

function loadState(key, fallback) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
    } catch {
        return fallback;
    }
}

function saveState() {
    localStorage.setItem("animeQuizState", JSON.stringify(quizState));
}

function renderQuestion() {
    if (quizState.finished) {
        showResult();
        return;
    }

    const question = quizList[quizState.currentIndex];
    elements.resultCard.hidden = true;
    elements.quizCard.hidden = false;
    elements.questionNumber.textContent = `第${quizState.currentIndex + 1}問`;
    elements.progressBar.style.width = `${((quizState.currentIndex + 1) / quizList.length) * 100}%`;
    elements.scoreText.textContent = `${quizState.score} pts`;
    elements.quoteText.textContent = question.quote;
    elements.answerGrid.innerHTML = "";
    elements.feedback.hidden = true;

    if (quizState.answered) {
        showFeedback(null);
    } else {
        question.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer-button";
            button.textContent = choice;
            button.addEventListener("click", () => answerQuestion(choice, button));
            elements.answerGrid.appendChild(button);
        });
    }
}

function answerQuestion(choice, selectedButton) {
    if (quizState.answered) return;

    const question = quizList[quizState.currentIndex];
    const isCorrect = choice === question.answer;
    quizState.answered = true;

    const buttons = elements.answerGrid.querySelectorAll(".answer-button");
    buttons.forEach((button) => {
        button.disabled = true;
        if (button.textContent === question.answer) button.classList.add("correct");
        if (button === selectedButton && !isCorrect) button.classList.add("wrong");
    });

    if (isCorrect) {
        quizState.combo += 1;
        if (!quizState.correctIndexes.includes(quizState.currentIndex)) {
            quizState.correctIndexes.push(quizState.currentIndex);
        }
    } else {
        quizState.combo = 0;
    }

    quizState.score = quizState.correctIndexes.length * 100;
    elements.scoreText.textContent = `${quizState.score} pts`;
    saveState();
    showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
    const question = quizList[quizState.currentIndex];
    elements.feedback.hidden = false;
    elements.feedbackTitle.textContent = isCorrect === null
        ? "回答済み"
        : isCorrect ? "正解！ナイスプレー！" : "残念、不正解…";
    elements.comboText.textContent = quizState.combo > 0 ? `${quizState.combo} COMBO` : "";
    elements.explanationText.textContent = `正解：${question.answer} ／ ${question.explanation}`;
    elements.nextButton.textContent =
        quizState.currentIndex === quizList.length - 1 ? "結果を見る" : "次の問題へ";

    const buttons = elements.answerGrid.querySelectorAll(".answer-button");
    if (buttons.length === 0) {
        question.choices.forEach((choice) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "answer-button";
            button.textContent = choice;
            button.disabled = true;
            if (choice === question.answer) button.classList.add("correct");
            elements.answerGrid.appendChild(button);
        });
    }
}

function nextQuestion() {
    if (quizState.currentIndex < quizList.length - 1) {
        quizState.currentIndex += 1;
        quizState.answered = false;
        saveState();
        renderQuestion();
        document.getElementById("appMain").scrollTop = 0;
    } else {
        quizState.finished = true;
        quizState.score = quizState.correctIndexes.length * 100;
        saveState();
        showResult();
    }
}

function showResult() {
    elements.quizCard.hidden = true;
    elements.resultCard.hidden = false;
    elements.questionNumber.textContent = "終了";
    elements.progressBar.style.width = "100%";
    elements.scoreText.textContent = `${quizState.score} pts`;
    elements.finalScore.textContent = quizState.score;
    elements.resultDetail.textContent =
        `正解数：${quizState.correctIndexes.length} / ${quizList.length}問`;
    document.getElementById("appMain").scrollTop = 0;
}

function restartQuiz() {
    quizState = {
        currentIndex: 0,
        score: 0,
        combo: 0,
        answered: false,
        correctIndexes: [],
        finished: false
    };
    saveState();
    setMode("play");
    renderQuestion();
}

function setMode(mode) {
    const isPlay = mode === "play";
    elements.playView.hidden = !isPlay;
    elements.listView.hidden = isPlay;
    elements.playModeButton.classList.toggle("active", isPlay);
    elements.listModeButton.classList.toggle("active", !isPlay);
    elements.playModeButton.setAttribute("aria-pressed", String(isPlay));
    elements.listModeButton.setAttribute("aria-pressed", String(!isPlay));

    if (!isPlay) renderList();
}

function renderList() {
    elements.resultScore.textContent = `${quizState.correctIndexes.length} / ${quizList.length} 正解`;
    elements.questionList.innerHTML = "";

    quizList.forEach((question, index) => {
        const card = document.createElement("article");
        card.className = "list-card";
        card.innerHTML = `
            <span class="list-number">QUESTION ${String(index + 1).padStart(2, "0")}／${question.scene}</span>
            <h3>「${question.quote}」</h3>
            <p><strong>セリフ：</strong>${question.answer}</p>
            <p>${question.explanation}</p>
        `;
        elements.questionList.appendChild(card);
    });
}

elements.playModeButton.addEventListener("click", () => setMode("play"));
elements.listModeButton.addEventListener("click", () => setMode("list"));
elements.nextButton.addEventListener("click", nextQuestion);
elements.restartButton.addEventListener("click", restartQuiz);

renderQuestion();
renderList();