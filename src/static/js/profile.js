// Assuming you have an input element with id "imageInput" for selecting the image file
const imageInput = document.getElementById('imageInput');

// Event listener to handle form submission
document.querySelector('.register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const imageBase64 = event.target.result;
        const formData = new FormData();
        formData.append('image', imageBase64);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    alert('Image uploaded successfully!');
                } else {
                    alert('Error uploading image.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Error uploading image.');
            });
    };

    reader.readAsDataURL(file);
});
