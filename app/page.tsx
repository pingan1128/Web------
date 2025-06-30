'use client';

import Link from 'next/link';
import { Button, Card, Space, Typography, Divider } from '@arco-design/web-react';

export default function Home() {
  return (
    <div className="flex justify-center items-center">
      <div className="max-w-3xl w-full relative">
        {/* 外层装饰框 */}
        <div className="absolute inset-0 -m-2 border border-amber-300/20 rounded-lg"></div>
        <div className="absolute inset-0 -m-4 border border-amber-300/10 rounded-xl"></div>
        
        {/* 主内容 */}
        <div className="text-center bg-black/60 p-10 rounded-lg backdrop-blur-xl border border-gray-800 shadow-2xl shadow-amber-900/10">
          {/* 上部装饰 */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold mb-8 text-white" style={{ fontFamily: "'Noto Serif SC', serif" }}>
            我心有猛虎，细嗅蔷薇
          </h1>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-semibold leading-relaxed">
            天道崩塌，我陈平安，唯有一剑，可挡百万师！
          </p>
          
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            于此间，可见我过往之修行，亦可与我坐而论道。
          </p>
          
          <Divider className="my-8 border-amber-500/20" />
          
          <Space size="large" direction="vertical" className="w-full">
            <Card
              className="relative overflow-hidden h-48 flex flex-col justify-end group border-gray-700"
              bordered={false}
              style={{
                backgroundImage: `url('/background/v2-5de4fa3a9b60302d4cc34fdf1fd057de_r.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:from-black/90"></div>
              <div className="relative p-6 text-left text-white">
                <Typography.Title heading={5} className="!text-white">
                  剑气长城
                </Typography.Title>
                <Typography.Paragraph className="!text-gray-300">
                  剑气长城，乃陈平安一剑所化，横亘天地，气势磅礴。
                </Typography.Paragraph>
                <div className="flex justify-end mt-2">
                  <Link href="/portfolio">
                    <Button type="primary" style={{ backgroundColor: 'rgba(217, 119, 6, 0.8)', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
                      前往观览
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
            
            <Card
              className="relative overflow-hidden h-48 flex flex-col justify-end group border-gray-700"
              bordered={false}
              style={{
                backgroundImage: `url('/background/v2-84be5b0f25293417fcd496dc8f3e6394_r.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-500 group-hover:from-black/90"></div>
              <div className="relative p-6 text-left text-white">
                <Typography.Title heading={5} className="!text-white">
                  剑道论坛
                </Typography.Title>
                <Typography.Paragraph className="!text-gray-300">
                  论剑之所，道法自然，与道友切磋，共同精进。
                </Typography.Paragraph>
                <div className="flex justify-end mt-2">
                  <Link href="/qanything">
                    <Button type="primary" style={{ backgroundColor: 'rgba(217, 119, 6, 0.8)', borderColor: 'rgba(217, 119, 6, 0.2)' }}>
                      入座论道
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </Space>
          
          {/* 下部装饰 */}
          <div className="flex justify-center mt-8">
            <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>
          </div>
          
          {/* 角落装饰 */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400/20 -translate-x-1 -translate-y-1"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400/20 translate-x-1 -translate-y-1"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400/20 -translate-x-1 translate-y-1"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400/20 translate-x-1 translate-y-1"></div>
        </div>
      </div>
    </div>
  );
}
