interface MessageRequest {
  content: string;
  source: "text" | "speech";
}

interface MessageResponse {
  id: string;
  content: string;
  timestamp: string;
  type: "ai";
}

export const sendMessage = async (
  message: MessageRequest
): Promise<MessageResponse> => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock response
  return {
    id: Date.now().toString(),
    content: `I understand your message: "${message.content}". How else can I help you?`,
    timestamp: new Date().toISOString(),
    type: "ai",
  };
};
