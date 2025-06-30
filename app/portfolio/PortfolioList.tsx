'use client';

import Link from 'next/link';
import { List, Card, Typography, Space, Tag, Divider } from '@arco-design/web-react';

type Assignment = {
  filename: string;
  name: string;
};

type PortfolioListProps = {
  assignments: Assignment[];
  error?: boolean;
};

export default function PortfolioList({ assignments, error }: PortfolioListProps) {
  if (error) {
    return (
        <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="w-full max-w-md p-6 sm:p-8 bg-black/70 rounded-2xl backdrop-blur-xl border-2 border-stone-700/80 shadow-2xl shadow-black">
                <div className="bg-black/60 p-8 rounded-lg">
                    <Typography.Title heading={3} style={{ color: '#f3f4f6' }}>过往修行</Typography.Title>
                    <Typography.Paragraph style={{ color: '#f87171' }}>加载作品列表时出错，似乎是走火入魔了。</Typography.Paragraph>
                </div>
            </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-md p-6 sm:p-8 bg-black/70 rounded-2xl backdrop-blur-xl border-2 border-stone-700/80 shadow-2xl shadow-black">
        <Typography.Title heading={2} style={{ color: '#fcd34d', textAlign: 'center', marginBottom: '1.5rem' }}>
          剑气长城
        </Typography.Title>
        
        <Divider className="my-4 border-amber-500/20" />
        
        {assignments.length > 0 ? (
          <List
            className="custom-scrollbar"
            style={{ maxHeight: 'calc(100vh - 22rem)', overflow: 'auto' }}
            dataSource={assignments}
            render={(assignment, index) => (
              <List.Item key={assignment.filename} style={{ padding: 0, marginBottom: '0.75rem' }}>
                <Link href={`/portfolio/${assignment.filename}`} style={{ display: 'block', width: '100%' }}>
                  <Card
                    className="group transition-all duration-300 transform hover:scale-[1.02]"
                    style={{ 
                      background: 'linear-gradient(to right, rgba(31, 41, 55, 0.7), rgba(17, 24, 39, 0.9))',
                      border: '2px solid rgba(87, 83, 78, 0.8)',
                      borderRadius: '0.5rem'
                    }}
                    hoverable
                  >
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Typography.Title heading={5} style={{ color: '#fcd34d', margin: 0 }}>
                        {assignment.name}
                      </Typography.Title>
                      <Typography.Paragraph style={{ color: '#9ca3af', margin: '0.25rem 0 0.5rem' }}>
                        此乃一式剑法，可观其形，悟其意。
                      </Typography.Paragraph>
                      <div>
                        <Tag color="#78350f" bordered={false}>剑谱</Tag>
                      </div>
                    </Space>
                  </Card>
                </Link>
              </List.Item>
            )}
          />
        ) : (
          <Card style={{ background: 'rgba(31, 41, 55, 0.8)', border: '2px dashed rgba(87, 83, 78, 0.6)' }}>
            <Typography.Title heading={4} style={{ color: '#fcd34d', textAlign: 'center' }}>空城计</Typography.Title>
            <Typography.Paragraph style={{ color: '#9ca3af', textAlign: 'center' }}>
              此处尚无剑谱，待我日后刻下。
            </Typography.Paragraph>
          </Card>
        )}
      </div>
    </div>
  );
} 