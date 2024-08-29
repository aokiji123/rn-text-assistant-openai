import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

export type ApiResponse = {
    success: boolean;
    data: string | { content: string };
    type: 'image' | 'text';
    error?: string;
};

export const apiCall = async (prompt: string): Promise<ApiResponse> => {
    try {
        const checkImageGeneration = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt}. Simply answer with a yes or no.`
                }
            ],
        });

        const isImageRequest = checkImageGeneration.choices[0].message.content.toLowerCase() === 'yes';

        if (isImageRequest) {
            const image = await openai.images.generate({ prompt: prompt });
            console.log('Generated image URL:', image.data[0].url);
            return { success: true, data: image.data[0].url, type: 'image' };
        } else {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: prompt },
                ],
            });
            console.log('Chat completion:', completion.choices[0].message);
            return { success: true, data: completion.choices[0].message, type: 'text' };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, data: '', type: 'text', error: error instanceof Error ? error.message : 'An unknown error occurred' };
    }
};
