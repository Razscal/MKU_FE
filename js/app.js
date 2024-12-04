// Drag & Drop functionality
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');

dropZone.addEventListener('click', () => fileInput.click());

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const files = e.dataTransfer.files;
  handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
  handleFiles(e.target.files);
});

function handleFiles(files) {
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewContainer.style.display = 'block';
      };
      reader.readAsDataURL(file);
    }
  }
}

// Form submission
document.getElementById('restoration-form').addEventListener('submit', (e) => {
  e.preventDefault();
  // Add your form submission logic here
});


// Connect to WebSocket on localhost
const socket = new WebSocket('ws://localhost:8000/ws');

const statusElement = document.getElementById('status');

// WebSocket events
socket.onopen = () => {
  console.log("Connected!")
};

socket.onerror = (error) => {
console.error('WebSocket error:', error);
};

socket.onclose = () => {
  console.log("Closed!")
};

// Call api

document.getElementById("runProcess").addEventListener("click", async() => {
  console.log("click!")
  const fileInput = document.getElementById("fileInput");
  const status = document.getElementById("status");

  // Create FormData and append the file
  const formData = new FormData();
  formData.append("upload_file", fileInput.files[0]);

  // Call the FastAPI endpoint
  const response = await fetch("http://127.0.0.1:8000/file/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  const id = data.id
  // Render

  stepsContainer = document.getElementById("processing-steps");

  const steps = [
    { title: "Bước 1: Phân tích ảnh", step: 1 },
    { title: "Bước 2: Loại bỏ nhiễu", step: 2 },
    { title: "Bước 3: Tăng cường chi tiết", step: 3 },
    { title: "Bước 4: Tô màu", step: 4 },
    { title: "Bước 5: Tối ưu hóa", step: 5 },
    { title: "Bước 6: Hoàn thiện", step: 6 },
  ];

  steps.forEach((step) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "step-result";

      stepDiv.innerHTML = `
                <h5>${step.title}</h5>
                <img src="http://127.0.0.1:8000/files/${id}_${step.step}.png" alt="Step ${step.step} result" class="img-fluid">
            `;
    try{
      stepsContainer.appendChild(stepDiv);
    }
    catch (error) {

    }
  });

});


