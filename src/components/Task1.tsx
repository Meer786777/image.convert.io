// Text1.tsx
import React from 'react';
// import './css/Text1.cs'; // Import the CSS file

const Text1: React.FC = () => {
    return (
        <div className="text-container">
            <h1 className="text-title">Welcome to the Image Converter</h1>
            <p className="text-description">
                This tool allows you to convert images to various formats easily. Upload your image and choose a format to get started!
            </p>

            <h2 className="how-to-use-title">How to Use</h2>
            <ol className="how-to-use-list">
                <li>Click on the "Drag and drop an image or click to upload +" button.</li>
                <li>Select an image file from your device.</li>
                <li>Choose the desired format from the dropdown menu.</li>
                <li>Click on the "Convert" button to initiate the conversion.</li>
                <li>Your converted image will be automatically downloaded.</li>
            </ol>
        </div>
    );
};

export default Text1;
