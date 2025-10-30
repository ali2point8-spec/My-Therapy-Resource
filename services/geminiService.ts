
export const generateDocumentation = async (userNotes: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userNotes }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Server error: ${response.status}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error("Error calling backend API:", error);
        throw new Error("Failed to communicate with the server. Please try again.");
    }
};
