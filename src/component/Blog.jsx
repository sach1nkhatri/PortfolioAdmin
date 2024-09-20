import React, { useState } from 'react';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as databaseRef, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid'; // To generate unique IDs for each blog post
import { storage, database } from '../FirebaseConfig'; // Firebase setup
import '../css/Blog.css';

const AddBlog = () => {
    const [blogData, setBlogData] = useState({
        title: '',
        date: '',
        category: '',
        description: '',
        link: '',
    });
    const [imageFile, setImageFile] = useState(null); // To store the selected image
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]); // Set the selected image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Generate a unique ID for the blog post
            const blogId = uuidv4();
            let imageUrl = '';

            if (imageFile) {
                // Upload the image to Firebase Storage
                const imageRef = storageRef(storage, `blogImages/${blogId}-${imageFile.name}`);
                const snapshot = await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(snapshot.ref); // Get the uploaded image URL
            }

            // Save blog data to Firebase Realtime Database
            await set(databaseRef(database, `blogs/${blogId}`), {
                ...blogData,
                img: imageUrl, // Store the image URL in the database
            });

            alert('Blog data added successfully!');
        } catch (error) {
            console.error('Error adding blog:', error);
            alert('Failed to add blog data.');
        } finally {
            setIsSubmitting(false);
            setBlogData({
                title: '',
                date: '',
                category: '',
                description: '',
                link: '',
            });
            setImageFile(null); // Reset the image input
        }
    };

    return (
        <div className="blog-form-container">
            <h2>Add New Blog Post</h2>
            <form className="blog-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={blogData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={blogData.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={blogData.category}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={blogData.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <input
                    type="text"
                    name="link"
                    placeholder="Blog Link"
                    value={blogData.link}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
