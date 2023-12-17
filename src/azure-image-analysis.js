const analyzeImage = async (imageURL) => {

    const endpoint = process.env.REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT;
    const key = process.env.REACT_APP_AZURE_COMPUTER_VISION_SUBSCRIPTION_KEY;

    const response = await fetch(`${endpoint}computervision/imageanalysis:analyze?api-version=2023-10-01&features=caption,read&model-version=latest&language=en`, {
        method: 'POST',
        body: JSON.stringify({url: imageURL}),
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': key
        }
    });
    return response.json();
};

export default analyzeImage;