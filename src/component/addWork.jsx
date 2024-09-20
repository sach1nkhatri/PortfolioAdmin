import React, { useState } from 'react';
import { storage, database } from '../FirebaseConfig'; // Make sure to configure Firebase
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, set } from 'firebase/database';
import '../css/addWork.css';

const AddWork = () => {
    const [workData, setWorkData] = useState({
        title: '',
        year: '',
        category: '',
        description: '',
        link: '',
    });

    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleChange = (e) => {
        setWorkData({
            ...workData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert('Please upload an image.');
            return;
        }

        const imageRef = storageRef(storage, `workImages/${image.name}`);
        const uploadTask = uploadBytesResumable(imageRef, image);

        setIsUploading(true);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error('Image upload error: ', error);
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                // Save work data in Realtime Database
                const newWorkRef = databaseRef(database, `works/${workData.title}`); // Use work title as the key
                try {
                    await set(newWorkRef, {
                        ...workData,
                        img: downloadURL, // Store image URL in Realtime Database
                    });
                    alert('Work project added successfully!');
                } catch (error) {
                    console.error('Error adding work project: ', error);
                } finally {
                    setIsUploading(false);
                }
            }
        );
    };

    return (
        <div className="work-form-container">
            <h2>Add New Work Project</h2>
            <form className="work-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={workData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={workData.year}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={workData.category}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={workData.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="text"
                    name="link"
                    placeholder="Project Link"
                    value={workData.link}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={isUploading}>
                    {isUploading ? `Uploading: ${Math.round(uploadProgress)}%` : 'Add Work'}
                </button>
            </form>
        </div>
    );
};

export default AddWork;
