document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const nextButton = document.getElementById('next-button');
    const introGif = document.getElementById('intro-gif');

    if (video) {
        video.addEventListener('ended', () => {
            console.log('비디오가 종료되었습니다.');
            nextButton.style.display = 'block';
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            video.style.display = 'none';
            nextButton.style.display = 'none';
            introGif.style.display = 'block';
            document.getElementById('modal1').style.display = 'flex';
        });
    }

    document.querySelectorAll('.next').forEach(button => {
        button.addEventListener('click', (e) => {
            const currentModal = button.closest('.modal');
            const targetModalId = button.getAttribute('data-target');
            currentModal.style.display = 'none';
            document.getElementById(targetModalId).style.display = 'flex';
        });
    });

    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', () => {
            window.location.href = 'game.html';
        });
    });
});
