// game.js

document.addEventListener('DOMContentLoaded', () => {
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeModal = document.querySelector('.close');

    // Settings 버튼 클릭 시 설정 모달 열기
    settingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'block';
    });

    // 설정 모달 닫기 버튼 클릭 시 모달 닫기
    closeModal.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    // 모달 바깥 영역 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
});
