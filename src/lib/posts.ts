import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import { Post, PostMeta } from '@/types/post';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): PostMeta[] {
  const fileNames = getAllPostFileNames();
  const allPostsData = fileNames.map((fileName) => {
    // 파일명에서 확장자를 제거하고 마지막 부분만 slug로 사용
    const slug = path.basename(fileName, '.md');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const readingTime = calculateReadingTime(matterResult.content);
    
    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      excerpt: matterResult.data.excerpt || '',
      tags: matterResult.data.tags || [],
      categories: matterResult.data.categories || [],
      readingTime,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post> {
  // slug로 파일을 찾기 위해 파일명의 마지막 부분과 비교
  const fileNames = getAllPostFileNames();
  const targetFile = fileNames.find(fileName => path.basename(fileName, '.md') === slug);
  
  if (!targetFile) {
    throw new Error(`Post not found: ${slug}`);
  }
  
  const fullPath = path.join(postsDirectory, targetFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  
  const processedContent = await remark()
    .use(html)
    .use(gfm)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  const readingTime = calculateReadingTime(matterResult.content);
  
  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: contentHtml,
    excerpt: matterResult.data.excerpt || '',
    tags: matterResult.data.tags || [],
    categories: matterResult.data.categories || [],
    readingTime,
  };
}

export function getAllPostFileNames(): string[] {
  const fileNames: string[] = [];
  
  function traverseDirectory(dir: string) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverseDirectory(fullPath);
      } else if (item.endsWith('.md')) {
        const relativePath = path.relative(postsDirectory, fullPath);
        fileNames.push(relativePath);
      }
    }
  }
  
  if (fs.existsSync(postsDirectory)) {
    traverseDirectory(postsDirectory);
  }
  
  return fileNames;
}

export function getAllPostSlugs(): string[] {
  const fileNames = getAllPostFileNames();
  return fileNames.map(fileName => path.basename(fileName, '.md'));
}

export function getPostsByTag(tag: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): PostMeta[] {
  const allPosts = getAllPosts();
  return allPosts.filter(post => post.categories.includes(category));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts();
  const categories = new Set<string>();
  
  allPosts.forEach(post => {
    post.categories.forEach(category => categories.add(category));
  });
  
  return Array.from(categories).sort();
}

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
} 