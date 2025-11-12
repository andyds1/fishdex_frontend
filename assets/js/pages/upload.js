import { identifyFish } from '../data/fetcher.js';

let selectedFile = null;

export function goBack() {
    window.location.href = 'index.html';
}

function showPreview(file) {
    const preview = document.getElementById('preview');
    const previewImg = document.getElementById('previewImg');
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        preview.classList.add('show');
        uploadArea.style.display = 'none';
        uploadBtn.disabled = false;
    };
    reader.readAsDataURL(file);
}

export async function handleUpload() {
    if (!selectedFile) return;

    const uploadBtn = document.getElementById('uploadBtn');
    const loading = document.getElementById('loading');
    
    uploadBtn.disabled = true;
    loading.classList.add('show');

    try {
        const result = await identifyFish(selectedFile);
        window.location.href = `details.html?id=${result.id}`;
    } catch (error) {
        alert('Error identifying fish. Please try again.');
        uploadBtn.disabled = false;
    } finally {
        loading.classList.remove('show');
    }
}

export function init() {
    const imageInput = document.getElementById('imageInput');
    const uploadArea = document.getElementById('uploadArea');
    
    // File input change
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            selectedFile = file;
            showPreview(file);
        }
    });
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        imageInput.click();
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            selectedFile = file;
            showPreview(file);
        }
    });
}