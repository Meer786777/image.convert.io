// Text1.tsx
import React from 'react';
// import './css/Text1.css'; // Import the CSS file

const Text3: React.FC = () => {
    return (
        <div className="text-container">
        <h1 className="text-title">Privacy Policy</h1>
        <p className="text-description">
            We at Image Converter are committed to protecting your privacy. This tool does not collect, store, or share any user data. All conversions occur locally on your device.
        </p>

        <h2 className="how-to-use-title">Usage Disclaimer</h2>
        <ol className="how-to-use-list">
            <li>This tool is provided for personal and educational use only.</li>
            <li>We are not responsible for the use of converted images beyond this application.</li>
            <li>Please use the tool responsibly and for its intended purposes.</li>
        </ol>

        {/* <p className="text-description">
            For questions or concerns about this Privacy Policy, contact us at <strong>support@imageconverter.com</strong>.
        </p> */}
    </div>
    );
};

export default Text3;
