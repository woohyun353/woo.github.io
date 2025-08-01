import Link from 'next/link'
import { getPostsByCategory, getAllCategories, getAllPostSlugs } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category,
  }))
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const posts = getPostsByCategory(params.category)
  
  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/categories"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
          >
            ← 모든 카테고리 보기
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            카테고리: <span className="text-primary-600">{params.category}</span>
          </h1>
          
          <p className="text-xl text-gray-600">
            "{params.category}" 카테고리의 포스트 {posts.length}개
          </p>
        </div>

        {/* Posts */}
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
                </span>
                <span className="text-sm text-gray-500">{post.readingTime}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              
              <p className="text-gray-600 mb-4">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span key={category} className="category">
                    {category}
                  </span>
                ))}
                {post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                읽기 →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
} 