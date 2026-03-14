require('dotenv').config();
const mongoose = require('mongoose');
const Model = require('../models/Model');

const modelsData = [
  // OpenAI Models
  { name: 'GPT-4o', provider: 'OpenAI', input_price: 5.0, output_price: 15.0, context_length: 128000, latency: 450 },
  { name: 'GPT-4 Turbo', provider: 'OpenAI', input_price: 10.0, output_price: 30.0, context_length: 128000, latency: 600 },
  { name: 'GPT-3.5 Turbo', provider: 'OpenAI', input_price: 0.5, output_price: 1.5, context_length: 16385, latency: 300 },
  { name: 'GPT-4', provider: 'OpenAI', input_price: 30.0, output_price: 60.0, context_length: 8192, latency: 800 },
  { name: 'GPT-4-32k', provider: 'OpenAI', input_price: 60.0, output_price: 120.0, context_length: 32768, latency: 1200 },
  
  // Anthropic Models
  { name: 'Claude 3 Opus', provider: 'Anthropic', input_price: 15.0, output_price: 75.0, context_length: 200000, latency: 850 },
  { name: 'Claude 3 Sonnet', provider: 'Anthropic', input_price: 3.0, output_price: 15.0, context_length: 200000, latency: 400 },
  { name: 'Claude 3 Haiku', provider: 'Anthropic', input_price: 0.25, output_price: 1.25, context_length: 200000, latency: 200 },
  { name: 'Claude 2.1', provider: 'Anthropic', input_price: 8.0, output_price: 24.0, context_length: 200000, latency: 800 },
  { name: 'Claude 2.0', provider: 'Anthropic', input_price: 8.0, output_price: 24.0, context_length: 100000, latency: 850 },
  
  // Google Models
  { name: 'Gemini 1.5 Pro', provider: 'Google', input_price: 3.5, output_price: 10.5, context_length: 2000000, latency: 650 },
  { name: 'Gemini 1.5 Flash', provider: 'Google', input_price: 0.35, output_price: 1.05, context_length: 1000000, latency: 150 },
  { name: 'Gemini 1.0 Ultra', provider: 'Google', input_price: 10.0, output_price: 30.0, context_length: 32768, latency: 900 },
  { name: 'Gemini 1.0 Pro', provider: 'Google', input_price: 0.5, output_price: 1.5, context_length: 32768, latency: 450 },
  { name: 'PaLM 2', provider: 'Google', input_price: 1.0, output_price: 2.0, context_length: 8192, latency: 350 },
  
  // Meta Models
  { name: 'Llama 3 8B', provider: 'Meta', input_price: 0.05, output_price: 0.05, context_length: 8192, latency: 250 },
  { name: 'Llama 3 70B', provider: 'Meta', input_price: 0.5, output_price: 0.5, context_length: 8192, latency: 500 },
  { name: 'Llama 2 70B', provider: 'Meta', input_price: 0.7, output_price: 0.9, context_length: 4096, latency: 550 },
  { name: 'Llama 2 13B', provider: 'Meta', input_price: 0.1, output_price: 0.1, context_length: 4096, latency: 300 },
  { name: 'Code Llama 70B', provider: 'Meta', input_price: 0.6, output_price: 0.8, context_length: 100000, latency: 600 },
  
  // Mistral Models
  { name: 'Mistral Large', provider: 'Mistral', input_price: 4.0, output_price: 12.0, context_length: 32768, latency: 500 },
  { name: 'Mistral Medium', provider: 'Mistral', input_price: 2.7, output_price: 8.1, context_length: 32768, latency: 450 },
  { name: 'Mistral Small', provider: 'Mistral', input_price: 1.0, output_price: 3.0, context_length: 32768, latency: 250 },
  { name: 'Mixtral 8x7B', provider: 'Mistral', input_price: 0.6, output_price: 0.6, context_length: 32768, latency: 300 },
  { name: 'Mixtral 8x22B', provider: 'Mistral', input_price: 1.2, output_price: 1.2, context_length: 65536, latency: 500 },
  
  // DeepSeek Models
  { name: 'DeepSeek Chat', provider: 'DeepSeek', input_price: 0.14, output_price: 0.28, context_length: 32768, latency: 400 },
  { name: 'DeepSeek Coder', provider: 'DeepSeek', input_price: 0.14, output_price: 0.28, context_length: 128000, latency: 450 },
  { name: 'DeepSeek LLM', provider: 'DeepSeek', input_price: 0.12, output_price: 0.25, context_length: 32768, latency: 400 },
  { name: 'DeepSeek Math', provider: 'DeepSeek', input_price: 0.14, output_price: 0.28, context_length: 32768, latency: 420 },
  { name: 'DeepSeek V2', provider: 'DeepSeek', input_price: 0.14, output_price: 0.28, context_length: 128000, latency: 500 },
  
  // Cohere Models
  { name: 'Command R+', provider: 'Cohere', input_price: 3.0, output_price: 15.0, context_length: 128000, latency: 700 },
  { name: 'Command R', provider: 'Cohere', input_price: 0.5, output_price: 1.5, context_length: 128000, latency: 400 },
  { name: 'Command Light', provider: 'Cohere', input_price: 0.3, output_price: 0.6, context_length: 4096, latency: 200 },
  { name: 'Cohere Generate', provider: 'Cohere', input_price: 1.0, output_price: 2.0, context_length: 4096, latency: 350 },
  
  // Alibaba / Qwen Models
  { name: 'Qwen 2 72B', provider: 'Alibaba', input_price: 0.4, output_price: 0.4, context_length: 128000, latency: 550 },
  { name: 'Qwen 1.5 110B', provider: 'Alibaba', input_price: 0.8, output_price: 0.8, context_length: 32768, latency: 650 },
  { name: 'Qwen 1.5 72B', provider: 'Alibaba', input_price: 0.4, output_price: 0.4, context_length: 32768, latency: 500 },
  { name: 'Qwen VL', provider: 'Alibaba', input_price: 1.0, output_price: 1.0, context_length: 8192, latency: 600 },
  
  // Others
  { name: 'Yi Large', provider: '01.AI', input_price: 3.0, output_price: 3.0, context_length: 32768, latency: 600 },
  { name: 'Yi 34B', provider: '01.AI', input_price: 0.8, output_price: 0.8, context_length: 200000, latency: 400 },
  { name: 'Falcon 180B', provider: 'TII', input_price: 1.2, output_price: 1.2, context_length: 2048, latency: 800 },
  { name: 'Falcon 40B', provider: 'TII', input_price: 0.5, output_price: 0.5, context_length: 2048, latency: 450 },
  { name: 'StableLM 2', provider: 'Stability AI', input_price: 0.1, output_price: 0.1, context_length: 4096, latency: 200 },
  { name: 'WizardLM 2', provider: 'Microsoft', input_price: 0.5, output_price: 0.5, context_length: 8192, latency: 450 },
  { name: 'Vicuna 13B', provider: 'LMSYS', input_price: 0.15, output_price: 0.15, context_length: 4096, latency: 300 },
  { name: 'OpenChat 3.5', provider: 'OpenChat', input_price: 0.1, output_price: 0.1, context_length: 8192, latency: 250 },
  { name: 'InternLM 2', provider: 'Shanghai AI Lab', input_price: 0.3, output_price: 0.3, context_length: 32768, latency: 400 },
  { name: 'Zephyr 7B', provider: 'Hugging Face', input_price: 0.05, output_price: 0.05, context_length: 8192, latency: 200 },
  { name: 'Phi-3 Mini', provider: 'Microsoft', input_price: 0.05, output_price: 0.05, context_length: 128000, latency: 150 },
  { name: 'Phi-3 Small', provider: 'Microsoft', input_price: 0.15, output_price: 0.15, context_length: 8192, latency: 250 },
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (mongoUri === 'mongodb+srv://your_mongodb_connection_string') {
      console.warn("Please replace 'your_mongodb_connection_string' with a valid MongoDB URI to seed.");
      process.exit(0);
    }
    
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected for seeding.');

    await Model.deleteMany();
    console.log('Cleared existing models.');

    await Model.insertMany(modelsData);
    console.log(`Successfully seeded ${modelsData.length} models.`);

    process.exit(0);
  } catch (error) {
    console.error(`Error with seeding data: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
