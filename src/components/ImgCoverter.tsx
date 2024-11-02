import React, { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'; // Import jsPDF

const ImageConverter: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [format, setFormat] = useState<string>('image/jpeg'); // Default to JPEG
    const [isConverting, setIsConverting] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedImage = e.target.files[0];
            setImage(uploadedImage);

            const reader = new FileReader();
            reader.onload = (event) => {
                setImagePreview(event.target!.result as string);
            };
            reader.readAsDataURL(uploadedImage);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload({ target: { files } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormat(e.target.value);
    };

    const handleImageConvert = () => {
        if (image && canvasRef.current) {
            setIsConverting(true);
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();

            const reader = new FileReader();
            reader.onload = (event) => {
                img.src = event.target!.result as string;
                img.onload = () => {
                    // Set canvas dimensions based on the uploaded image
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);

                    // Convert the image and create a blob
                    canvas.toBlob((blob) => {
                        if (blob) {
                            saveAs(blob, `${image.name.split('.')[0]}.${format.split('/')[1]}`);
                        }
                        setIsConverting(false);
                    }, format);
                };
            };
            reader.readAsDataURL(image);
        }
    };

    const handlePdfConvert = () => {
        if (image) {
            const pdf = new jsPDF('l', 'pt', 'a4'); // Use landscape orientation and A4 size
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (event) => {
                img.src = event.target!.result as string;
                img.onload = () => {
                    const imgWidth = img.width;
                    const imgHeight = img.height;

                    // Set the dimensions for the PDF
                    const pageWidth = pdf.internal.pageSize.getWidth();
                    const pageHeight = pdf.internal.pageSize.getHeight();

                    // Calculate the scaling factor to maintain aspect ratio
                    const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
                    const scaledWidth = imgWidth * scaleFactor;
                    const scaledHeight = imgHeight * scaleFactor;

                    // Center the image on the page
                    const x = (pageWidth - scaledWidth) / 2;
                    const y = (pageHeight - scaledHeight) / 2;

                    pdf.addImage(img, 'JPEG', x, y, scaledWidth, scaledHeight);
                    pdf.save(`${image.name.split('.')[0]}.pdf`);
                };
            };
            reader.readAsDataURL(image);
        }
    };

    return (
        <div className="image-converter-container">
            <h1 className='h1'>Image Converter</h1>

            {imagePreview && (
                <div className="image-preview">
                    <img
                        src={imagePreview}
                        alt="Uploaded preview"
                        className="preview-image"
                    />
                </div>
            )}

            <div
                className="drop-zone"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={{
                    border: '2px dashed #ccc',
                    borderRadius: '5px',
                    padding: '20px',
                    textAlign: 'center',
                    margin: '20px 0',
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                    style={{ display: 'none' }} // Hide the default file input
                />
                <button onClick={() => (document.querySelector('.file-input') as HTMLInputElement)?.click()} className="upload-button">
                    Drag and drop an image or click to upload +
                </button>

                <div style={{ margin: '15px 0' }}>
                    <select value={format} onChange={handleFormatChange} className="format-select">
                        <option value="image/png">PNG</option>
                        <option value="image/jpeg">JPEG</option>
                        <option value="image/bmp">BMP</option>
                        <option value="image/gif">GIF</option>
                        <option value="image/tiff">TIFF</option>
                        <option value="image/webp">WEBP</option>
                        <option value="image/svg+xml">SVG</option>
                        <option value="image/heic">HEIC</option>
                        <option value="application/pdf">PDF</option> {/* Added PDF option */}
                    </select>
                </div>
            </div>

            <button onClick={format === 'application/pdf' ? handlePdfConvert : handleImageConvert} className="convert-button" disabled={isConverting}>
                {isConverting ? 'Converting...' : `Convert to ${format.split('/')[1].toUpperCase()}`}
            </button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default ImageConverter;
