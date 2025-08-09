document.addEventListener('DOMContentLoaded', () => {
    // --- THREE.JS 3D BACKGROUND ---
    let scene, camera, renderer, cube;

    function init3D() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('container').appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff, wireframe: true });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        animate();
    }

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    });

    init3D();

    // --- PAGE & TAB NAVIGATION ---
    const loginPage = document.getElementById('login-page');
    const mainAppPage = document.getElementById('main-app-page');
    const loginBtn = document.getElementById('login-btn');

    loginBtn.addEventListener('click', () => {
        loginPage.classList.remove('active');
        mainAppPage.classList.add('active');
    });

    const navButtons = document.querySelectorAll('.nav-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Deactivate all buttons and tabs
            navButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(tab => tab.classList.remove('active'));

            // Activate clicked button and corresponding tab
            button.classList.add('active');
            const pageId = button.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
        });
    });

    // --- SETTINGS PAGE ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const accountCodeEl = document.getElementById('account-code');
    const inviteCodeEl = document.getElementById('invite-code');

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    // Generate random codes
    accountCodeEl.textContent = Math.random().toString(36).substring(2, 10).toUpperCase();
    inviteCodeEl.textContent = Math.random().toString(36).substring(2, 10).toUpperCase();

    // --- COUNTER PAGE ---
    const circularCounter = document.getElementById('circular-counter');
    const activateCounterBtn = document.getElementById('activate-counter-btn');
    const counterStatus = document.getElementById('counter-status');
    let counterActivated = false;
    let userPoints = 0;

    activateCounterBtn.addEventListener('click', () => {
        if (!counterActivated) {
            counterActivated = true;
            userPoints += 5;
            circularCounter.classList.add('activated');
            counterStatus.textContent = `تم التفعيل! رصيدك: ${userPoints} نقاط`;
            activateCounterBtn.disabled = true;
            // You can add a timer to reset the counter if needed
        }
    });

    // --- HOME PAGE (POSTS) ---
    const createPostBtn = document.getElementById('create-post-btn');
    const postText = document.getElementById('post-text');
    const postImageInput = document.getElementById('post-image');
    const postsContainer = document.getElementById('posts-container');

    createPostBtn.addEventListener('click', () => {
        const text = postText.value;
        const imageFile = postImageInput.files[0];

        if (text.trim() === '' && !imageFile) {
            alert('لا يمكنك إنشاء منشور فارغ.');
            return;
        }

        const postElement = document.createElement('div');
        postElement.classList.add('post');

        let postHTML = '';
        if (text.trim() !== '') {
            postHTML += `<p>${text}</p>`;
        }
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                postHTML += `<img src="${e.target.result}" alt="Post Image">`;
                postElement.innerHTML = postHTML;
            }
            reader.readAsDataURL(imageFile);
        } else {
            postElement.innerHTML = postHTML;
        }

        // Prepend new post
        postsContainer.prepend(postElement);

        // Clear inputs
        postText.value = '';
        postImageInput.value = '';
    });
});
