import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const ContentContext = createContext();

// Default content - used as fallback and initial structure
const defaultContent = {
    landing: {
        title: "SIYA",
        subtitle: "DWIVEDI",
        welcomeText: "Welcome to my corner of the internet :)",
        videoUrl: ""
    },
    about: {
        heading: "About Me",
        bio: "",
        imageUrl: ""
    }
};

export function ContentProvider({ children }) {
    const [content, setContent] = useState(defaultContent);
    const [loading, setLoading] = useState(true);

    // Fetch content from Firestore on mount
    useEffect(() => {
        async function fetchContent() {
            try {
                const docRef = doc(db, 'siteContent', 'main');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setContent({ ...defaultContent, ...docSnap.data() });
                } else {
                    // Initialize with defaults if no data exists
                    await setDoc(docRef, defaultContent);
                    setContent(defaultContent);
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                // Use defaults on error
                setContent(defaultContent);
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    // Function to update content (used by Admin)
    const updateContent = async (section, newData) => {
        try {
            const updatedContent = {
                ...content,
                [section]: { ...content[section], ...newData }
            };

            const docRef = doc(db, 'siteContent', 'main');
            await setDoc(docRef, updatedContent);
            setContent(updatedContent);
            return { success: true };
        } catch (error) {
            console.error('Error updating content:', error);
            return { success: false, error: error.message };
        }
    };

    return (
        <ContentContext.Provider value={{ content, loading, updateContent }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
}
