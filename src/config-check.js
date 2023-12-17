const isConfigured = () => {
    const requiredVars = ['REACT_APP_AZURE_COMPUTER_VISION_ENDPOINT', 'REACT_APP_AZURE_COMPUTER_VISION_SUBSCRIPTION_KEY', 'REACT_APP_OPENAI_AUTH_KEY'];
    let missingVars = [];

    requiredVars.forEach((varName) =>{
        if (!process.env[varName]) {
            missingVars.push(varName);
        }
    });

    return {
        isConfigured: missingVars.length === 0,
        missingVars: missingVars
    }
}

export default isConfigured;