// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
  { 
    question: "Câu 1. Hãy xác định câu lệnh dùng để khởi tạo một Repository mới?",
    answers: {
      a: "git create",
      b: "git init",
      c: "git commit",
      d: "git add"
    },
    correctAnswer: "b"
  },

  {
    question: "Câu 2. Thao tác đồng bộ từ Local Repository tới một Remote Repository.",
    answers: {
      a: "git update",
      b: "git pull",
      c: "git push",
      d: "không có thao tác này"
    },
    correctAnswer: "c"
  },
  
  {
    question: "3. Câu lệnh nào sau đây chỉ định git theo dấu tất cả các thay đổi hiện có?",
    answers: {
      a: "git push -am Messages",
      b: "git pull",
      c: "git add",
      d: "git commit -m"
    },
    correctAnswer: "c"
  },
  
  {
    question: "4. Câu lệnh nào sau đây giúp nhân bản một Repository về máy tính của mình?",
    answers: {
      a: "git fork",
      b: "git clone",
      c: "git push",
      d: "git commit"
    },
    correctAnswer: "b"
  },

  {
    question: "5. Đâu là công cụ quản lý mã nguồn?",
    answers: {
      a: "Git",
      b: "HTML",
      c: "Javascript",
      d: "Css"
    },
    correctAnswer: "a"
  }
];
    
    // Functions
    function buildQuiz(){
      // biến để lưu trữ đầu ra HTML
      const output = [];
      // Tạo mỗi câu hỏi
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
          // biến để lưu trữ danh sách các câu trả lời có thể có
          const answers = [];
          // và cho mỗi câu trả lời có sẵn 
          for(letter in currentQuestion.answers){
            // thêm một nút radio HTML
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // thêm câu hỏi và câu trả lời của nó vào đầu ra
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // kết hợp danh sách đầu ra thành một chuỗi HTML và đặt nó trên trang
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
      // thu thập các thùng chứa câu trả lời từ bài kiểm tra
      const answerContainers = quizContainer.querySelectorAll('.answers');
      // theo dõi câu trả lời của người dùng
      let numCorrect = 0;
      // cho mỗi câu hỏi 
      myQuestions.forEach( (currentQuestion, questionNumber) => {
        // tìm câu trả lời đã chọn
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // nếu câu trả lời là đúng
        if(userAnswer === currentQuestion.correctAnswer){
          // thêm vào số câu trả lời đúng
          numCorrect++;
          // tô màu cho câu trả lời màu xanh lá cây
          answerContainers[questionNumber].style.color = 'green';
        }
        // nếu câu trả lời sai hoặc trống
        else{
          // tô màu đỏ cho câu trả lời
          answerContainers[questionNumber].style.color = 'red';
        }
      });
      // hiển thị số câu trả lời đúng trong tổng số câu
      resultsContainer.innerHTML = `Complete ${numCorrect} out of ${myQuestions.length} sentences!`;
    }
  // Chuyển trang cho mỗi câu hỏi
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  // Chuyển tới trang tiếp theo
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  // Chuyển về trang trước
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    buildQuiz();
    // Phân trang
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    // Hiển thị trang trình bày đầu tiên
    showSlide(currentSlide);
    // Gọi lại các sự kiện
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);


  