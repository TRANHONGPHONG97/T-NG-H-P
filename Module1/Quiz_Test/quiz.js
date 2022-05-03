// Tạo mảng câu hỏi, câu trả lời và đáp án
var quizArray = [
	{
		question:
			"Câu 1. Hãy xác định câu lệnh dùng để khởi tạo một Repository mới?",
		answers: [
			{
				choice: "A. git create",
				id: "A",
			},
			{
				choice: "B. git commit",
				id: "B",
			},
			{
				choice: "C. git init",
				id: "C",
			},
			{
				choice: "D. git add",
				id: "D",
			},
		],
		hit: "C",
	},

	{
		question: "Câu 2. Thao tác đồng bộ từ Local Repository tới một Remote Repository?",
		answers: [
			{ choice: "A. git update", id: "A" },
			{ choice: "B. git push", id: "B" },
			{ choice: "C. git pull", id: "C" },
			{ choice: "D. không có thao tác này", id: "D" },
		],
		hit: "B",
	},

	{
		question:
			"Câu 3. Câu lệnh nào sau đây chỉ định git theo dấu tất cả các thay đổi hiện có?",
		answers: [
			{ choice: "A. git push -am Messages", id: "A" },
			{ choice: "B. git add", id: "B" },
			{ choice: "C. git commit -m", id: "C" },
			{ choice: "D. git pull", id: "D" },
		],
		hit: "B",
	},

	{
		question:
			"Câu 4. Câu lệnh nào sau đây giúp nhân bản một Repository về máy tính của mình?",
		answers: [
			{ choice: "A. git fetch", id: "A" },
			{ choice: "B. git commit -m", id: "B" },
			{ choice: "C. git push", id: "C" },
			{ choice: "D. git clone", id: "D" },
		],
		hit: "D",
	},

	{
		question: "Câu 5. Đâu là công cụ quản lý mã nguồn?",
		answers: [
			{ choice: "A.  HTML", id: "A" },
			{ choice: "B.  Git", id: "B" },
			{ choice: "C.  Javascript", id: "C" },
			{ choice: "D.  CSS", id: "D" },
		],
		hit: "B",
	},
];

var indexArray = 0;
var score = 0;
var timer = 0;
var userHighScores = [];
if (localStorage.getItem("userHighScores") !== null) {
	userHighScores = JSON.parse(localStorage.getItem("userHighScores"));
}

// Kiểm tra xem ở giữa câu đố khi thời gian gần về 0, người dùng có chọn không
var inProgress = false;
//Truy cập nút *start quiz*
var startEl = document.querySelector("#start");
// Truy cập câu hỏi
var sectionWelcome = document.querySelector("#welcome-modal");
var sectionQuiz = document.querySelector("#modal-section");
// Hiển thị câu hỏi
var questionEl = document.querySelector(".question-modal");
// Hiển thị đáp án
var optionsEl = document.querySelector(".options-modal");
var hitShow = document.querySelector(".hit");
//Tạo nút lựa chọn đáp án
var btnEl = document.createElement("BUTTON");
//Trang thực hiện đáp án
var modalDoneEl = document.querySelector("#modal-done");
//Tạo phần tử điểm
var scoreEl = document.querySelector("#finalscore");
//Nơi nhận phần tử điểm
var submitEl = document.querySelector("#submit");
//Tạo phần tử hẹn giờ
var timerEl = document.querySelector("#count");
//Tạo nơi lưu điểm cao
var highscoresPageEl = document.querySelector("#highscoresPage");
//Cài đặt chế độ ban đầu
var initialEl = document.querySelector("#initials");
//Hiển thị điểm số
var showInitialScores = document.querySelector("#scores-list");
//Quay lại
var submitGobackEl = document.querySelector("#submitGoback");
//Xóa điểm cao
var clearHighScoresEl = document.querySelector("#submitClear");
//Hiển thị điểm cao
var showHighScoresCorner = document.querySelector("#view-scores-id");

// Tạo hàm bắt đầu làm bài kiểm tra
function startQuiz() {
	//Đặt lại câu hỏi
	indexArray = 0;
	score = 0;
	inProgress = true;
	timer = 60;
	showHighScoresCorner.setAttribute("disabled", "true");

	quizTimer();
	//Ẩn phần nút được nhấn
	sectionWelcome.classList.remove("d-flex");
	sectionWelcome.classList.add("d-none");
	// Hiển thị câu hỏi
	sectionQuiz.classList.add("d-flex");
	//Chuyển câu hỏi
	sectionQuiz.classList.remove("d-none");
	showPage();
}
// Làm trống trang khi nhấn nút bắt đầu
function cleanPage() {

	questionEl.textContent = "";
	optionsEl.textContent = "";
	hitShow.textContent = "";

	if (showCornerScores) {
		sectionWelcome.classList.remove("d-flex");
		sectionWelcome.classList.add("d-none");
		modalDoneEl.classList.remove("d-flex");
		modalDoneEl.classList.add("d-none");
	} else {
		return;
	}
}

function showPage() {
	if (!inProgress || indexArray === quizArray.length) return;
	//Thêm lề cuối cho các câu hỏi
	questionEl.classList.add("mb-3");
	//Hiển thị câu hỏi
	questionEl.textContent = quizArray[indexArray].question;

	for (let a = 0; a < quizArray[indexArray].answers.length; a++) {
		var btnEl = document.createElement("BUTTON");
		btnEl.classList.add("btn", "btn-info", "px-5", "mb-3", "mt-2", "text-left");
		btnEl.textContent = quizArray[indexArray].answers[a].choice;
		optionsEl.classList.add("d-flex", "flex-column");
		optionsEl.appendChild(btnEl);
		if (quizArray[indexArray].answers[a].id === quizArray[indexArray].hit) {
			btnEl.addEventListener("click", timeDelayCorrect);
		} else {
			btnEl.addEventListener("click", timeDelayWrong);
		}
	}
}
// Phương thức hiển thị nếu câu trả lời đúng
function timeDelayCorrect() {
	score++;
	indexArray++;
	cleanPage();
	hitShow.classList.add("mt-4");
	hitShow.textContent = "Rigth Answer!";
	showPage();
}
// Phương thức hiển thị nếu câu trả lời sai
function timeDelayWrong() {
	timer = timer - 1;
	indexArray++;
	cleanPage();
	hitShow.classList.add("mt-4");
	hitShow.textContent = "Wrong Answer! Keep trying";
	showPage();
}
// Đếm thời gian cho mỗi câu hỏi
function quizTimer() {
	var timeId = setInterval(() => {
		timer = timer - 1;

		if (timer < 0) timer = 0;

		timerEl.textContent = timer;

		if (timer <= 0 || indexArray === quizArray.length) {
			clearInterval(timeId);
			completeQuiz();
		}
	}, 1000);
}
// Hoàn thành bài kiểm tra
function completeQuiz() {
	timer = 0;
	inProgress = false;
	cleanPage();
	showHighScoresCorner.removeAttribute("disabled");
	modalDoneEl.classList.remove("d-none");
	modalDoneEl.classList.add("d-flex");
	scoreEl.textContent = score;

	if (initialEl.value !== "") {
		initialEl.value = "";
	}
}
// Lưu kết quả điểm cao
function saveInitialScore() {
	//Loại bỏ khoảng trống
	var initialValue = initialEl.value.trim();

	//Người kiểm tra nhập tên
	if (
		initialValue !== "" &&
		typeof initialEl.value === "string" &&
		initialValue.toLowerCase().match(/^[a-z]+$/)
	) {
		userHighScores.push({ initials: initialValue, score: score });
		localStorage.setItem("userHighScores", JSON.stringify(userHighScores));

		//Làm trống trang trước khi hiển thị điểm cao
		modalDoneEl.classList.add("d-none");
		modalDoneEl.classList.remove("d-flex");

		//Hiển thị trang mới cho điểm cao
		showHighscores();
	} else {
		alert("Please enter your name!");
	}
}
// Thứ tự điểm cao
function showHighscores() {
	highscoresPageEl.classList.remove("d-none");
	highscoresPageEl.classList.add("d-flex");

	showInitialScores.textContent = "";

	for (let i = 0; i < userHighScores.length; i++) {
		var divEl = document.createElement("div");
		divEl.classList.add("card", "initial-score", "pl-2", "shadow-sm", "mb-2");
		divEl.textContent =
			i +
			1 +
			". " +
			userHighScores[i].initials +
			" - " +
			userHighScores[i].score;
		showInitialScores.appendChild(divEl);
	}
}
// Trở về và tiếp tục làm bài kiểm tra
function goBack() {
	timer = 0;
	timerEl.textContent = timer;
	highscoresPageEl.classList.add("d-none");
	highscoresPageEl.classList.remove("d-flex");
	sectionWelcome.classList.add("d-flex");
}
// Xóa bảng điểm
function clearScores() {
	userHighScores.splice(0, userHighScores.length);
	localStorage.removeItem("userHighScores");
	showInitialScores.textContent = "";
}

function showCornerScores() {
	cleanPage();
	showHighscores();
}
// Gọi lại tất cả sự kiện khi nhấn nút
startEl.addEventListener("click", startQuiz);
submitEl.addEventListener("click", saveInitialScore);
submitGobackEl.addEventListener("click", goBack);
clearHighScoresEl.addEventListener("click", clearScores);
showHighScoresCorner.addEventListener("click", showCornerScores);