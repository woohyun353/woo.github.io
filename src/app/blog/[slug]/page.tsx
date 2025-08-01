import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const post = await getPostBySlug(params.slug)
    
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
            >
              ← 블로그로 돌아가기
            </Link>
            
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">
                {format(new Date(post.date), 'yyyy년 MM월 dd일', { locale: ko })}
              </span>
              <span className="text-sm text-gray-500">{post.readingTime}</span>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {post.categories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${category}`}
                  className="category hover:bg-gray-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="tag hover:bg-primary-200 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Content */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="bg-white rounded-lg shadow-md p-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex justify-between">
              <Link 
                href="/blog"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                ← 모든 포스트 보기
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
} 