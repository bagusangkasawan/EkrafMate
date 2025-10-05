import dotenv from 'dotenv';
import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';

dotenv.config();

const client = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

export const generateEmbedding = async (inputText) => {
    const payload = { inputText };
    const command = new InvokeModelCommand({
        modelId: 'amazon.titan-embed-text-v2:0',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payload)
    });

    try {
        const response = await client.send(command);
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        return responseBody.embedding;
    } catch (error) {
        console.error('Error calling Titan Embedding model:', error);
        throw new Error('Failed to generate embedding.');
    }
};

export const generateDescription = async (prompt) => {
    const payload = {
        inputText: prompt,
        textGenerationConfig: {
            maxTokenCount: 1024,
            temperature: 0.7,
            topP: 0.9,
            stopSequences: []
        }
    };
    const command = new InvokeModelCommand({
        modelId: 'amazon.titan-text-express-v1',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payload)
    });
    try {
        const response = await client.send(command);
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        return responseBody.results[0].outputText;
    } catch (error) {
        console.error('Error calling Titan Text model:', error);
        throw new Error('Failed to generate description.');
    }
};

/**
 * Mendapatkan respons dari chatbot berdasarkan prompt dan riwayat percakapan.
 * @param {string} userPrompt - Pertanyaan atau input dari pengguna.
 * @param {Array<{role: string, content: string}>} history - Riwayat percakapan sebelumnya.
 * @returns {Promise<string>} - Jawaban dari chatbot.
 */
export const getChatbotResponse = async (userPrompt, history = []) => {
    const systemPrompt = `Anda adalah "MateBot", asisten virtual yang ramah dan sangat membantu untuk platform EkrafMate. EkrafMate adalah platform marketplace yang menghubungkan pelaku kreatif (seperti desainer, penulis, videografer) dengan klien yang membutuhkan jasa mereka. Tugas Anda adalah menjawab pertanyaan pengguna seputar cara kerja platform, menyelesaikan masalah, dan memberikan panduan. Jawablah selalu dalam Bahasa Indonesia dengan gaya yang profesional namun bersahabat.`;

    const historyText = history
        .map(turn => `${turn.role === 'user' ? 'User' : 'Assistant'}: ${turn.content}`)
        .join('\n');
    
    const fullPrompt = `${systemPrompt}\n\nBerikut adalah riwayat percakapan sejauh ini:\n${historyText}\n\nUser: ${userPrompt}\nAssistant:`;

    const payload = {
        inputText: fullPrompt,
        textGenerationConfig: {
            maxTokenCount: 1024,
            temperature: 0.7,
            topP: 0.9,
            stopSequences: ["User:"]
        }
    };

    const command = new InvokeModelCommand({
        modelId: 'amazon.titan-text-express-v1',
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify(payload)
    });

    try {
        const response = await client.send(command);
        const responseBody = JSON.parse(new TextDecoder().decode(response.body));
        return responseBody.results[0].outputText.trim();
    } catch (error) {
        console.error('Error calling Titan Text model for chatbot:', error);
        throw new Error('Failed to get chatbot response.');
    }
};
