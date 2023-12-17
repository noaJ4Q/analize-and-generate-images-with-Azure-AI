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

    const handleAnalyzeClick = async () => {
        const analysis = await analyzeImage(imageOrPrompt);
        console.log(analysis);
        setAnalysisResult(
            `Image URL: ${imageOrPrompt}\nAnalysis Result:\n${JSON.stringify(
                analysis,
                null,
                2
            )}`
        );
        setDisplayedImage(imageOrPrompt);
        setShowImage(true);
    };

    const handleGenerateImage = async () => {
        const generation = await generateImage(imageOrPrompt);
        const url = generation.data[0].url;
        setDisplayedImage(url);
        setAnalysisResult(`Image URL: ${url}`);
        setShowImage(true);
    };

    return (
        <div>
            <h1>{title}</h1>
            {configMessage && <p>{configMessage}</p>}
            {!configMessage && (
                <div>
                    <label htmlFor="url">Insert URL or type prompt: </label>
                    <input
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
