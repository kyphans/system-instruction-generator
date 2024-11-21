export interface HistoryEntry {
  id: string;
  timestamp: number;
  systemInstruction: string;
  userPrompt: string;
  response: string;
}

export interface ApiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}