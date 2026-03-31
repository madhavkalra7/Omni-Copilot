import { ChatWorkspace } from "@/components/chat/chat-workspace";

interface ChatPageProps {
  params: {
    id: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  return <ChatWorkspace chatId={decodeURIComponent(params.id)} />;
}
