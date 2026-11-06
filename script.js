
const questions = [
    {
        icon: "🇺🇿",
        question: "O‘zbekistonning poytaxti qaysi?",
        options: ["Samarqand", "Toshkent", "Buxoro", "Andijon"],
        correct: "Toshkent"
    },
    {
        icon: "🇫🇷",
        question: "Fransiyaning poytaxti qaysi?",
        options: ["London", "Berlin", "Parij", "Madrid"],
        correct: "Parij"
    },
    {
        icon: "🌊",
        question: "Dunyodagi eng katta okean qaysi?",
        options: ["Atlantika", "Hind", "Tinch", "Shimoliy Muz"],
        correct: "Tinch"
    },
    {
        icon: "🏔️",
        question: "Dunyodagi eng baland tog‘ cho‘qqisi qaysi?",
        options: ["Everest", "Elbrus", "Kilimanjaro", "Montblan"],
        correct: "Everest"
    },
    {
        icon: "🇯🇵",
        question: "Yaponiyaning poytaxti qaysi?",
        options: ["Seul", "Tokio", "Pekin", "Osaka"],
        correct: "Tokio"
    },
    {
        icon: "🌍",
        question: "Dunyoda nechta materik bor?",
        options: ["4 ta", "5 ta", "6 ta", "7 ta"],
        correct: "6 ta"
    },
    {
        icon: "🇮🇹",
        question: "Italiyaning poytaxti qaysi?",
        options: ["Rim", "Milan", "Venetsiya", "Neapol"],
        correct: "Rim"
    },
    {
        icon: "🏜️",
        question: "Sahroi Kabir qaysi materikda joylashgan?",
        options: ["Osiyo", "Afrika", "Yevropa", "Avstraliya"],
        correct: "Afrika"
    },
    {
        icon: "🇬🇧",
        question: "Buyuk Britaniyaning poytaxti qaysi?",
        options: ["Manchester", "London", "Liverpul", "Bristol"],
        correct: "London"
    },
    {
        icon: "🌊",
        question: "Dunyodagi eng katta materik qaysi?",
        options: ["Afrika", "Shimoliy Amerika", "Yevrosiyo", "Avstraliya"],
        correct: "Yevrosiyo"
    }
];

let playerName = "";
let currentQuestion = 0;
let score = 0;
let mistakes = 0;

function startGame() {
    const input = document.getElementById("player-name");

    playerName = input.value.trim();

    if (!playerName) {
        alert("Ismingizni kiriting!");
        input.focus();
        return;
    }

    document.getElementById("start-screen").hidden = true;
    document.getElementById("game-screen").hidden = false;

    document.getElementById("display-name").textContent = playerName;

    showQuestion();
}

function showQuestion() {
    const q = questions[currentQuestion];

    document.getElementById("question-icon").textContent = q.icon;
    document.getElementById("question").textContent = q.question;

    document.getElementById("question-number").textContent =
        `${currentQuestion + 1}-savol / ${questions.length}`;

    document.getElementById("progress-bar").style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    document.getElementById("message").textContent = "";
    document.getElementById("next-btn").disabled = true;

    const answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.options.forEach(option => {
        const btn = document.createElement("button");

        btn.className = "answer-btn";
        btn.textContent = option;

        btn.onclick = () => checkAnswer(option, btn);

        answers.appendChild(btn);
    });
}

function checkAnswer(selected, button) {
    const correct = questions[currentQuestion].correct;

    const buttons = document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === correct) {
            btn.classList.add("correct");
        }
    });

    const message = document.getElementById("message");

    if (selected === correct) {
        score++;
        message.textContent = "🎉 To‘g‘ri javob!";
        message.style.color = "green";
    } else {
        mistakes++;
        button.classList.add("wrong");

        message.textContent = `❌ To‘g‘ri javob: ${correct}`;
        message.style.color = "red";
    }

    document.getElementById("score").textContent = score;
    document.getElementById("mistakes").textContent = mistakes;

    document.getElementById("next-btn").disabled = false;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("game-screen").hidden = true;
    document.getElementById("result-screen").hidden = false;

    document.getElementById("progress-bar").style.width = "100%";

    document.getElementById("result-name").textContent =
        "O‘yinchi: " + playerName;

    document.getElementById("final-score").textContent =
        `${score} / ${questions.length}`;

    document.getElementById("final-message").textContent =
        score >= 8
        ? "🏆 Ajoyib! Siz haqiqiy geografiya bilimdonisiz!"
        : "💪 Yaxshi harakat! Yana bilimlaringizni sinab ko‘ring!";
}

function restartGame() {
    currentQuestion = 0;
    score = 0;
    mistakes = 0;
    playerName = "";

    document.getElementById("result-screen").hidden = true;
    document.getElementById("start-screen").hidden = false;
    document.getElementById("player-name").value = "";
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
