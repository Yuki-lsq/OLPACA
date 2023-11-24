// utils/api.ts
import axios from 'axios';

export const llmCommand = async (parsedPrompt: string) => {
  try {
    const response = await axios.post('/api/llm-command', { prompt: parsedPrompt });
    return response.data;
  } catch (error) {
    console.error('Error invoking Bedrock model:', error);
    return null;
  }
};

