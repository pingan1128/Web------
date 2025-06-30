'use client';

import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Input, Button, Card, Typography, Divider, Avatar, Empty } from '@arco-design/web-react';

// 定义消息源信息的接口
interface Source {
  fileId: string;
  fileName: string;
  content: string;
  score: string;
}

// 定义聊天消息的角色和内容
interface Message {
  role: 'user' | 'assistant';
  content: string;
  thinkContent?: string; // 可选的思考过程内容
  sources?: Source[]; // 可选的消息源信息
}

/**
 * 处理API返回的消息内容，提取<response>标签中的内容
 */
function processApiResponse(text: string): string {
  // 如果包含<response>标签，则只显示<response>标签内的内容
  if (text.includes('<response>')) {
    const responseMatch = text.match(/<response>([\s\S]*?)<\/response>/);
    if (responseMatch && responseMatch[1]) {
      return responseMatch[1].trim();
    }
  }
  
  // 如果包含<think>标签但没有<response>标签，则过滤掉<think>标签内容
  if (text.includes('<think>')) {
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  }
  
  // 如果没有任何标签，则返回原始文本
  return text;
}

/**
 * 加载动画组件
 */
function LoadingIndicator() {
  return (
    <div className="flex justify-center items-center py-2">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
}

/**
 * 消息源信息组件
 */
function SourceInfo({ sources }: { sources: Source[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!sources || sources.length === 0) return null;
  
  return (
    <div className="mt-2 text-xs">
      <button 
        onClick={() => setIsExpanded(!isExpanded)} 
        className="text-cyan-400 hover:text-cyan-200 flex items-center font-semibold"
      >
        <span>{isExpanded ? '收起卷轴' : '探寻天机'}</span>
        <svg 
          className={`w-4 h-4 ml-1 transform ${isExpanded ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      {isExpanded && (
        <div className="mt-2 p-3 bg-gray-800/70 rounded-lg border border-gray-600">
          {sources.map((source, index) => (
            <div key={index} className="mb-2 pb-2 border-b border-gray-700 last:border-b-0">
              <div className="font-bold text-cyan-300">卷宗: {source.fileName}</div>
              <div className="mt-1 text-gray-300 whitespace-pre-wrap bg-black/50 p-2 rounded">{source.content}</div>
              <div className="mt-1 text-gray-500">天机相关: {parseFloat(source.score).toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function QAnythingPage() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // 滚动到底部的函数
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  // 在消息更新后滚动到底部
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: question };
    
    // 构建历史记录 (使用上一次的 messages 状态)
    const historyMessages = messages.reduce((acc: { question: string; response: string }[], msg, index) => {
      if (msg.role === 'user' && messages[index + 1]?.role === 'assistant') {
        acc.push({ question: msg.content, response: messages[index + 1].content });
      }
      return acc;
    }, []);

    // 添加用户消息和助手的空"占位"消息
    const assistantPlaceholder: Message = { role: 'assistant', content: '', thinkContent: '' };
    setMessages([...messages, userMessage, assistantPlaceholder]);
    setQuestion('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/qanything', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question,
          history: historyMessages.slice(-2),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error('API request failed');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullResponseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        
        let newlineIndex;
        while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
          const line = buffer.slice(0, newlineIndex).trim();
          buffer = buffer.slice(newlineIndex + 1);

          if (line.startsWith('data:')) {
            const jsonStr = line.substring(5).trim();
            if (jsonStr) {
              try {
                const parsed = JSON.parse(jsonStr);
                
                if (parsed.result?.response) {
                  fullResponseText += parsed.result.response;
                }
                
                const sources = parsed.result?.source;

                // --- 全新的、更健壮的解析逻辑 ---
                const thinkMatch = fullResponseText.match(/<think>([\s\S]*?)<\/think>/);
                const responseMatch = fullResponseText.match(/<response>([\s\S]*?)<\/response>/);

                const thinkContent = thinkMatch ? thinkMatch[1].trim() : '';
                let content = '';

                if (responseMatch) {
                  content = responseMatch[1].trim();
                } else {
                  content = fullResponseText.replace(/<think>[\s\S]*?<\/think>/, '').trim();
                }

                // --- 持续更新最后一条消息（占位符） ---
                setMessages(prevMessages => {
                  const newMessages = [...prevMessages];
                  const lastMessage = newMessages[newMessages.length - 1];
                  if (lastMessage && lastMessage.role === 'assistant') {
                    lastMessage.content = content;
                    lastMessage.thinkContent = thinkContent;
                    lastMessage.sources = sources;
                  }
                  return newMessages;
                });

              } catch (e) {
                console.error("无法解析收到的JSON:", jsonStr, e);
              }
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Fetch error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = `抱歉，请求出错了：\n${error.message}`;
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] max-w-4xl mx-auto p-4 bg-black/70 rounded-2xl shadow-2xl border border-amber-500/20 backdrop-blur-md relative">
      {/* 角落装饰 */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/20 rounded-tl-xl -translate-x-1 -translate-y-1"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/20 rounded-tr-xl translate-x-1 -translate-y-1"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/20 rounded-bl-xl -translate-x-1 translate-y-1"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/20 rounded-br-xl translate-x-1 translate-y-1"></div>
      
      {/* 聊天消息区域 */}
      <div 
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto space-y-6 p-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        {messages.length === 0 ? (
          <Empty
            className="h-full flex flex-col justify-center"
            description={
              <Typography.Paragraph style={{ color: '#9ca3af' }}>
                大道三千，吾为尊<br />
                有何疑惑，不妨说来听听。天机可测，道法自然。
              </Typography.Paragraph>
            }
            icon={
              <div className="text-6xl">🌌</div>
            }
          />
        ) : (
          <>
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <Avatar shape="circle" style={{ backgroundColor: '#92400e', color: 'white', fontSize: '1.25rem' }}>
                    道
                  </Avatar>
                )}
                <Card
                  className={`max-w-xl shadow-md rounded-xl ${msg.role === 'user' ? 'bg-amber-800/80' : 'bg-gray-800/90'}`}
                  bodyStyle={{ padding: '12px 16px' }}
                >
                  <Typography.Paragraph className="text-white whitespace-pre-wrap m-0">
                    {msg.role === 'assistant' && msg.thinkContent && (
                      <details className="mb-2 text-xs text-gray-400">
                        <summary className="cursor-pointer hover:text-gray-200">思索...</summary>
                        <p className="mt-1 p-2 bg-black/30 rounded whitespace-pre-wrap font-mono">{msg.thinkContent}</p>
                      </details>
                    )}
                    {msg.content || <LoadingIndicator />}
                  </Typography.Paragraph>
                  {msg.role === 'assistant' && msg.sources && <SourceInfo sources={msg.sources} />}
                </Card>
                {msg.role === 'user' && (
                  <Avatar shape="circle" style={{ backgroundColor: '#1e3a8a', color: 'white' }}>
                    你
                  </Avatar>
                )}
              </div>
            ))}
          </>
        )}
      </div>

      <Divider className="my-2 border-amber-500/20" />

      {/* 输入区域 */}
      <div className="p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            value={question}
            onChange={setQuestion}
            placeholder="与道论禅..."
            className="flex-1"
            disabled={isLoading}
            style={{ 
              backgroundColor: 'rgba(17, 24, 39, 0.8)', 
              borderColor: 'rgba(87, 83, 78, 0.8)',
              color: 'white' 
            }}
          />
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={isLoading}
            style={{ backgroundColor: '#b45309', borderColor: '#b45309' }}
          >
            问道
          </Button>
        </form>
      </div>
    </div>
  );
} 