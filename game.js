document.addEventListener('DOMContentLoaded', () => {
    const character = document.getElementById('character');
    const container = document.getElementById('game-container');
    const question = document.getElementById('question');
    const settingsButton = document.getElementById('settings-button');
    const settingModal = document.getElementById('setting-modal');
    const closeModalButton = document.getElementById('close-modal-button');

    // 초기화 함수 호출
    initialize();

    // 초기화 함수 정의
    function initialize() {
        // 질문 위치에 해당하는 좌표
        const questionPositions = [
            { x: 225, y: 190 },
            { x: 195, y: 505 },
            { x: 865, y: 485 },
            { x: 630, y: 410 },
            { x: 475, y: 470 },
            { x: 500, y: 570 }
        ];

        // 각 질문 위치에 대한 이미지 파일명 배열
        const imageFileNames = [
            'picture-a.png',
            'bed-a.png',
            'closet-a.png',
            'desk-a.png',
            'shelf-a.png',
            'ground-a.png'
        ];

        // 각 질문 위치에 대한 질문 문구 배열
        const questionTexts = [
            '액자 위치 조정',
            '침대 정돈',
            '옷장 옷 걸기',
            '책상 정리',
            '선반 정리',
            '바닥 먼지 치우기'
        ];

        let isQuestionActivated = false; // 질문이 활성화된 상태를 나타내는 변수
        let currentQuestionIndex = -1; // 현재 질문 인덱스 초기화

        // 스페이스바가 눌렸을 때 질문을 활성화하는 함수
        function activateQuestion(index) {
            // 질문 문구 업데이트
            question.textContent = `${questionTexts[index]}`;
            question.style.display = 'block'; // 질문 보이기
            isQuestionActivated = true; // 질문 활성화 상태로 변경
            document.addEventListener('keypress', handleKeyPress);
        }

        // 스페이스바 입력을 처리하는 함수
        function handleKeyPress(event) {
            if (isQuestionActivated && event.key === ' ') {
                const answer = window.prompt('어떤 도구를 사용하시겠어요?');
                const index = parseInt(answer) - 1; // 사용자 입력값에 해당하는 이미지 인덱스 계산

                if (!isNaN(index) && index >= 0 && index < imageFileNames.length) {
                    alert('깨끗이 청소합시다!');
                    isQuestionActivated = false; // 질문 비활성화 상태로 변경
                    question.style.display = 'none'; // 질문 숨기기

                    const imgElement = document.querySelector(`.bg img[data-index="${index}"]`);
                    imgElement.src = `./img/${imageFileNames[index]}`; // 이미지 변경
                    currentQuestionIndex = index; // 현재 질문 인덱스 업데이트

                    // 체크박스도 체크되도록 처리
                    const checkbox = document.querySelector(`#todo-content li:nth-child(${index + 1}) .checkbox-input`);
                    checkbox.checked = true;
                    checkbox.parentElement.classList.add('checked'); // 시각적 효과를 위해 label에 checked 클래스 추가

                    // 모든 질문을 맞추었는지 확인 후 final.html로 이동
                    checkAllQuestionsAnswered();
                } else {
                    alert('다른 도구가 더 좋을 것 같아요...'); // 잘못된 입력일 경우 알림
                }

                document.removeEventListener('keypress', handleKeyPress); // 이벤트 리스너 제거
            }
        }

        // 캐릭터를 이동시키는 함수
        function moveCharacter(x, y) {
            character.style.left = x + 'px';
            character.style.top = y + 'px';
            checkCharacterPosition(x, y); // 이동 후에 위치 확인
        }

        // 캐릭터의 위치를 확인하고 질문을 활성화하는 함수
        function checkCharacterPosition(x, y) {
            let isNearQuestion = false;
            questionPositions.forEach((position, index) => {
                const distance = Math.sqrt(Math.pow(x - position.x, 2) + Math.pow(y - position.y, 2));
                if (distance <= 50) { // 현재 위치에서 반경 50px 내에 있으면 질문 활성화
                    isNearQuestion = true;
                    activateQuestion(index); // 질문 인덱스 전달
                }
            });

            if (!isNearQuestion && currentQuestionIndex !== -1) { // 질문이 비활성화 되었을 때
                isQuestionActivated = false; // 질문 비활성화 상태로 변경
                question.style.display = 'none'; // 질문 숨기기
                currentQuestionIndex = -1; // 현재 질문 인덱스 초기화
                document.removeEventListener('keypress', handleKeyPress); // 이벤트 리스너 제거
            }
        }

        // 모든 질문을 맞추었는지 확인 후 final.html로 이동하는 함수
        function checkAllQuestionsAnswered() {
            // 모든 체크박스가 체크되었는지 확인
            const allChecked = Array.from(document.querySelectorAll('.checkbox-input')).every(input => input.checked);
            if (allChecked) {
                // final.html로 이동
                window.location.href = 'final.html';
            }
        }

        // 키보드 입력에 따라 캐릭터를 이동시키는 이벤트 핸들러
        document.addEventListener('keydown', (event) => {
            let newX = parseInt(character.style.left) || 0;
            let newY = parseInt(character.style.top) || 0;

            switch (event.key) {
                case 'ArrowUp':
                    newY -= 5;
                    break;
                case 'ArrowDown':
                    newY += 5;
                    break;
                case 'ArrowLeft':
                    newX -= 5;
                    break;
                case 'ArrowRight':
                    newX += 5;
                    break;
            }

            // 경계를 벗어나지 않도록 조정
            newX = Math.max(newX, 0);
            newX = Math.min(newX, container.clientWidth - character.clientWidth);
            newY = Math.max(newY, 0);
            newY = Math.min(newY, container.clientHeight - character.clientHeight);

            moveCharacter(newX, newY);
        });

        // 모달 열기 버튼 이벤트 리스너
        settingsButton.addEventListener('click', () => {
            settingModal.style.display = 'flex';
        });

        // 모달 닫기 버튼 이벤트 리스너
        closeModalButton.addEventListener('click', () => {
            settingModal.style.display = 'none';
        });

    };
});
