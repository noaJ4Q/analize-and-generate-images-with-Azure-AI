import React, { useState, useEffect } from "react";
import analyzeImage from "./azure-image-analysis";
import generateImage from "./azure-image-generation";
import isConfigured from "./config-check";

function App() {
    const title = "Computer vision";
    const [imageOrPrompt, setimageOrPrompt] = useState("");
    const [analysisResult, setAnalysisResult] = useState("");
    const [displayedImage, setDisplayedImage] = useState("");
    const [showImage, setShowImage] = useState(false);
    const [configMessage, setConfigMessage] = useState("");

    useEffect(() => {
        const configCheck = isConfigured();
        if (!configCheck.isConfigured) {
            setConfigMessage(
                `Warning: The following environment variables are missing: ${configCheck.missingVars.join(
                    ", "
                )}`
            );
        }
    }, []);

    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyzeClick = async () => {
        setIsLoading(true);
        const analysis = await analyzeImage(imageOrPrompt);
        setAnalysisResult(
            `Image URL: ${imageOrPrompt}\nAnalysis Result:\n${JSON.stringify(
                analysis.captionResult,
                null,
                2
            )}`
        );
        setDisplayedImage(imageOrPrompt);
        setShowImage(true);
        setIsLoading(false);
    };

    const handleGenerateImage = async () => {
        setIsLoading(true);
        const generation = await generateImage(imageOrPrompt);
        const url = generation.data[0].url;
        setDisplayedImage(url);
        setAnalysisResult(`Image URL: ${url}`);
        setShowImage(true);
        setIsLoading(false);
    };

    return (
        <div>
            <h1>{title}</h1>
            {configMessage && <p>{configMessage}</p>}
            {!configMessage && (
                <div>
                    <label htmlFor="url">Insert URL or type prompt: </label>
                    <input
                        size={imageOrPrompt.length + 1}
                        id="url"
                        type="text"
                        value={imageOrPrompt}
                        onChange={(e) => setimageOrPrompt(e.target.value)}
                    />
                    <br />
                    <button type="button" onClick={handleAnalyzeClick}>
                        Analyze URL
                    </button>
                    <button type="button" onClick={handleGenerateImage}>
                        Submit
                    </button>
                    {isLoading && <p>Loading...</p>}
                    <br />
                </div>
            )}
            {showImage && (
                <img
                    src={displayedImage}
                    alt="To be analyzed"
                    style={{ maxWidth: "500px" }}
                />
            )}
            <pre>{analysisResult}</pre>
        </div>
    );
}

export default App;
