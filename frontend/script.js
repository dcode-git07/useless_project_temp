const API_URL = "http://127.0.0.1:8000";

// =====================================================
// BASIC ELEMENTS
// =====================================================

const cameraButton = document.getElementById("cameraButton");
const galleryButton = document.getElementById("galleryButton");

const cameraInput = document.getElementById("cameraInput");
const galleryInput = document.getElementById("galleryInput");

const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const changePhoto = document.getElementById("changePhoto");

const judgeButton = document.getElementById("judgeButton");
const resetButton = document.getElementById("resetButton");

const verdictTitle = document.getElementById("verdictTitle");
const score = document.getElementById("score");

const visualScore = document.getElementById("visualScore");
const tasteScoreDisplay = document.getElementById("tasteScore");
const overallScore = document.getElementById("overallScore");

const explanation = document.getElementById("explanation");
const malayalamCaption = document.getElementById("malayalamCaption");

const englishRoast = document.getElementById("englishRoast");
const malayalamRoast = document.getElementById("malayalamRoast");

let selectedFile = null;

// =====================================================
// PHOTO PREVIEW
// =====================================================

function showPhoto(file) {
if (!file) return;


selectedFile = file;

const imageURL = URL.createObjectURL(file);

previewImage.src = imageURL;
previewContainer.classList.remove("hidden");
previewContainer.style.display = "block";

}

// =====================================================
// CAMERA
// =====================================================

if (cameraButton && cameraInput) {
cameraButton.addEventListener("click", function () {
cameraInput.click();
});


cameraInput.addEventListener("change", function () {
    if (cameraInput.files && cameraInput.files.length > 0) {
        showPhoto(cameraInput.files[0]);
    }
});


}

// =====================================================
// GALLERY
// =====================================================

if (galleryButton && galleryInput) {
galleryButton.addEventListener("click", function () {
galleryInput.click();
});

galleryInput.addEventListener("change", function () {
    if (galleryInput.files && galleryInput.files.length > 0) {
        showPhoto(galleryInput.files[0]);
    }
});

}

// =====================================================
// CHANGE PHOTO
// =====================================================

if (changePhoto) {
changePhoto.addEventListener("click", function () {
selectedFile = null;
previewImage.src = "";
previewContainer.classList.add("hidden");
previewContainer.style.display = "none";


    if (galleryInput) galleryInput.value = "";
    if (cameraInput) cameraInput.value = "";
});


}

// =====================================================
// GET RADIO BUTTON VALUE
// =====================================================

function getValue(name) {
const selected = document.querySelector(
'input[name="' + name + '"]:checked'
);


if (selected) {
    return selected.value;
}

return null;


}

// =====================================================
// TASTE SCORE
// =====================================================

function calculateTasteScore() {


let total = 50;

const sweetness = getValue("sweetness");
const milk = getValue("milk");
const strength = getValue("strength");
const flavour = getValue("flavour");
const enjoyment = getValue("enjoyment");


if (sweetness === "just_right") {
    total += 12;
} else if (sweetness === "too_little") {
    total -= 4;
} else if (sweetness === "too_sweet") {
    total -= 7;
}


if (milk === "balanced") {
    total += 12;
} else if (milk === "tea_forward") {
    total += 5;
} else if (milk === "very_milky") {
    total -= 5;
}


if (strength === "medium") {
    total += 7;
} else if (strength === "strong") {
    total += 10;
} else if (strength === "full_kadak") {
    total += 8;
} else if (strength === "weak") {
    total -= 8;
}


if (flavour === "nicely_spiced") {
    total += 10;
} else if (flavour === "plain") {
    total += 3;
} else if (flavour === "spice_attack") {
    total -= 7;
}


if (enjoyment === "never_again") {
    total -= 20;
} else if (enjoyment === "pretty_good") {
    total += 8;
} else if (enjoyment === "really_good") {
    total += 15;
} else if (enjoyment === "another_cup") {
    total += 20;
}


return Math.max(0, Math.min(100, total));


}

// =====================================================
// CHECK ALL QUESTIONS
// =====================================================

function allQuestionsAnswered() {


const questions = [
    "sweetness",
    "milk",
    "strength",
    "flavour",
    "enjoyment"
];

for (let i = 0; i < questions.length; i++) {
    if (!getValue(questions[i])) {
        return false;
    }
}

return true;


}

// =====================================================
// BACKEND IMAGE ANALYSIS
// =====================================================

async function analyzeImage(file) {


const formData = new FormData();

formData.append("file", file);


const response = await fetch(API_URL + "/analyze", {
    method: "POST",
    body: formData
});


if (!response.ok) {
    throw new Error(
        "Backend returned HTTP " + response.status
    );
}


const data = await response.json();

console.log("BACKEND RESPONSE:", data);


let backendScore = Number(data.visual_score);


if (isNaN(backendScore)) {
    backendScore = 60;
}


backendScore = Math.round(
    Math.max(0, Math.min(100, backendScore))
);


return {
    score: backendScore,
    explanation:
        data.message ||
        "Image successfully analyzed by OpenCV."
};

}

// =====================================================
// VERDICT
// =====================================================

function getVerdict(finalScore) {


if (finalScore >= 90) {
    return {
        title: "👑 CHAI ROYALTY",
        malayalam: "ഇത് ചായയല്ല... ഒരു രാജകീയ അനുഭവമാണ്!",
        english: "The Supreme Court has officially declared this chai LEGENDARY.",
        malayalamRoast: "ഈ ചായയ്ക്ക് മുന്നിൽ ബാക്കി ചായകൾ ഹാജരാകണം."
    };
}


if (finalScore >= 75) {
    return {
        title: "🔥 CERTIFIED KADAK",
        malayalam: "അടിപൊളി കടക് ചായ!",
        english: "Strong, confident and absolutely ready for another cup.",
        malayalamRoast: "ഇത് കുടിച്ചിട്ട് ഒരു കപ്പ് കൂടി ചോദിക്കാതിരിക്കാൻ പറ്റില്ല."
    };
}


if (finalScore >= 60) {
    return {
        title: "☕ RESPECTABLE CHAI",
        malayalam: "മോശമല്ല... നല്ല ചായ തന്നെ!",
        english: "A respectable cup. Nothing criminal detected.",
        malayalamRoast: "വീട്ടിലെ ചായ കോടതി ഇതിനെ വെറുതെ വിടുന്നു."
    };
}


if (finalScore >= 45) {
    return {
        title: "😐 CHAI ON PROBATION",
        malayalam: "ചായയ്ക്ക് കുറച്ച് കൂടി പരിശ്രമിക്കാമായിരുന്നു.",
        english: "The chai is currently on probation.",
        malayalamRoast: "ചായയ്ക്ക് ഇനിയും തെളിയിക്കാനുള്ളത് ബാക്കിയുണ്ട്."
    };
}


return {
    title: "🚨 CHAI CRIME SCENE",
    malayalam: "ഇത് ചായയാണെന്ന് തെളിയിക്കേണ്ടി വരും!",
    english: "The Supreme Court of Chai has serious questions.",
    malayalamRoast: "ചായ ഉണ്ടാക്കിയ ആളെ കോടതി വിളിച്ചിട്ടുണ്ട്."
};


}

// =====================================================
// SHOW FINAL RESULT
// =====================================================

function showResult(finalScore, visual, taste, backendExplanation) {


console.log("SHOWING FINAL RESULT:", {
    finalScore,
    visual,
    taste
});


const verdict = getVerdict(finalScore);


if (verdictTitle) {
    verdictTitle.textContent = verdict.title;
}


if (score) {
    score.textContent = finalScore + "/100";
}


if (visualScore) {
    visualScore.textContent = visual + "/100";
}


if (tasteScoreDisplay) {
    tasteScoreDisplay.textContent = taste + "/100";
}


if (overallScore) {
    overallScore.textContent = finalScore + "/100";
}


if (explanation) {
    explanation.textContent =
        backendExplanation +
        " Your taste responses gave the chai a taste score of " +
        taste +
        "/100, while the photo received a visual score of " +
        visual +
        "/100.";
}


if (malayalamCaption) {
    malayalamCaption.textContent = verdict.malayalam;
}


if (englishRoast) {
    englishRoast.textContent = verdict.english;
}


if (malayalamRoast) {
    malayalamRoast.textContent = verdict.malayalamRoast;
}


const resultSection =
    document.getElementById("resultSection");


if (!resultSection) {
    console.error(
        "ERROR: resultSection was not found in index2.html"
    );

    alert(
        "The result section could not be found in the webpage."
    );

    return;
}


resultSection.classList.remove("hidden");
resultSection.style.display = "block";


setTimeout(function () {
    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}, 100);


}

// =====================================================
// JUDGE MY CHAI
// =====================================================

if (judgeButton) {


judgeButton.addEventListener("click", async function () {

    console.log("JUDGE BUTTON CLICKED");


    if (!selectedFile) {
        alert("Please upload a chai photo first.");
        return;
    }


    if (!allQuestionsAnswered()) {
        alert(
            "Please answer all 5 questions before judging the chai."
        );
        return;
    }


    judgeButton.disabled = true;
    judgeButton.textContent = "⚖️ JUDGING...";


    try {

        const taste = calculateTasteScore();

        console.log("TASTE SCORE:", taste);


        const result =
            await analyzeImage(selectedFile);


        const visual = result.score;


        const finalScore = Math.round(
            visual * 0.4 +
            taste * 0.6
        );


        console.log("FINAL SCORE:", finalScore);


        showResult(
            finalScore,
            visual,
            taste,
            result.explanation
        );


    } catch (error) {

        console.error(
            "CHAI VERDICT ERROR:",
            error
        );


        alert(
            "Something went wrong while judging the chai:\n\n" +
            error.message
        );


    } finally {

        judgeButton.disabled = false;
        judgeButton.textContent = "⚖️ JUDGE MY CHAI";

    }

});


}

// =====================================================
// RESET
// =====================================================

if (resetButton) {


resetButton.addEventListener("click", function () {
    location.reload();
});


}

// =====================================================
// CHAI BATTLE
// =====================================================

const battleButtonA =
document.getElementById("battleButtonA");

const battleButtonB =
document.getElementById("battleButtonB");

const battleInputA =
document.getElementById("battleInputA");

const battleInputB =
document.getElementById("battleInputB");

const battlePreviewA =
document.getElementById("battlePreviewA");

const battlePreviewB =
document.getElementById("battlePreviewB");

const battleButton =
document.getElementById("battleButton");

const battleResult =
document.getElementById("battleResult");

const battleWinner =
document.getElementById("battleWinner");

const battleExplanation =
document.getElementById("battleExplanation");

let battleFileA = null;
let battleFileB = null;

// ---------------- A PHOTO ----------------

if (battleButtonA && battleInputA) {


battleButtonA.addEventListener(
    "click",
    function () {
        battleInputA.click();
    }
);


battleInputA.addEventListener(
    "change",
    function () {

        if (
            battleInputA.files &&
            battleInputA.files.length > 0
        ) {

            battleFileA =
                battleInputA.files[0];

            const url =
                URL.createObjectURL(battleFileA);

            if (battlePreviewA) {
                battlePreviewA.src = url;
                battlePreviewA.style.display = "block";
            }

        }

    }
);


}

// ---------------- B PHOTO ----------------

if (battleButtonB && battleInputB) {


battleButtonB.addEventListener(
    "click",
    function () {
        battleInputB.click();
    }
);


battleInputB.addEventListener(
    "change",
    function () {

        if (
            battleInputB.files &&
            battleInputB.files.length > 0
        ) {

            battleFileB =
                battleInputB.files[0];

            const url =
                URL.createObjectURL(battleFileB);

            if (battlePreviewB) {
                battlePreviewB.src = url;
                battlePreviewB.style.display = "block";
            }

        }

    }
);


}

// ---------------- BATTLE ----------------

if (battleButton) {


battleButton.addEventListener(
    "click",
    async function () {

        if (!battleFileA || !battleFileB) {

            alert(
                "Upload both chai photos before starting the battle!"
            );

            return;
        }


        battleButton.disabled = true;
        battleButton.textContent =
            "⚔️ CHAI BATTLE IN PROGRESS...";


        try {

            const resultA =
                await analyzeImage(battleFileA);

            const resultB =
                await analyzeImage(battleFileB);


            const scoreA =
                resultA.score;

            const scoreB =
                resultB.score;


            console.log(
                "BATTLE SCORES:",
                scoreA,
                scoreB
            );


            let winnerText;
            let explanationText;


            if (scoreA > scoreB) {

                winnerText =
                    "🏆 CHAI A WINS!";

                explanationText =
                    "Chai A scored " +
                    scoreA +
                    "/100, while Chai B scored " +
                    scoreB +
                    "/100. Chai A takes the Supreme Court trophy!";

            } else if (scoreB > scoreA) {

                winnerText =
                    "🏆 CHAI B WINS!";

                explanationText =
                    "Chai B scored " +
                    scoreB +
                    "/100, while Chai A scored " +
                    scoreA +
                    "/100. Chai B wins the chai battle!";

            } else {

                winnerText =
                    "🤝 IT'S A CHAI TIE!";

                explanationText =
                    "Both chais scored " +
                    scoreA +
                    "/100. The Supreme Court cannot separate them!";

            }


            if (battleWinner) {
                battleWinner.textContent =
                    winnerText;
            }


            if (battleExplanation) {
                battleExplanation.textContent =
                    explanationText;
            }


            if (battleResult) {

                battleResult.classList.remove(
                    "hidden"
                );

                battleResult.style.display =
                    "block";


                setTimeout(function () {

                    battleResult.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 100);

            }


        } catch (error) {

            console.error(
                "CHAI BATTLE ERROR:",
                error
            );


            alert(
                "Chai Battle failed:\n\n" +
                error.message
            );


        } finally {

            battleButton.disabled = false;

            battleButton.textContent =
                "⚔️ START CHAI BATTLE";

        }

    }
);


}
