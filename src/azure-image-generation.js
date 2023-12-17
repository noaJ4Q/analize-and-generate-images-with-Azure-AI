const generateImage = async (prompt) => {
    const key = process.env.REACT_APP_OPENAI_AUTH_KEY;
    const endpoint = 'https://api.openai.com/v1/images/generations';
    const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({
            "model": "dall-e-2",
            "prompt": prompt,
            "n":1
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        }
    });
    return response.json();
}

export default generateImage;