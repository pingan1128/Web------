import fs from 'fs';
import path from 'path';
import PortfolioList from './PortfolioList';

// 定义作品类型
type Assignment = {
  filename: string;
  name: string;
};

// 辅助函数，用于将文件名转换为更易读的标题
function formatAssignmentName(filename: string): string {
  return filename
    .replace('.html', '') // 移除扩展名
    .replace(/[-_]/g, ' ') // 将连字符和下划线替换为空格
    .replace(/\b\w/g, (char) => char.toUpperCase()); // 将每个单词的首字母大写
}

export default function PortfolioPage() {
  // 在服务器端读取 public 目录下的文件
  const assignmentsDirectory = path.join(process.cwd(), 'public', 'assignments');
  let assignments: Assignment[] = [];
  let error = false;

  try {
    const filenames = fs.readdirSync(assignmentsDirectory);
    assignments = filenames
      .filter((file) => file.endsWith('.html'))
      .map((filename) => ({
        filename,
        name: formatAssignmentName(filename),
      }));
  } catch (e) {
    console.error('无法读取作品集目录:', e);
    error = true;
  }

  return <PortfolioList assignments={assignments} error={error} />;
} 