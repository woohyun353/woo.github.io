import Link from 'next/link'
import { getAllTags, getAllPosts } from '@/lib/posts'

export default function TagsPage() {
  const tags = getAllTags()
  const posts = getAllPosts()

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tags</h1>
          <p className="text-xl text-gray-600">
            모든 태그를 확인해보세요.
          </p>
        </div>

        {tags.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">태그가 없습니다</h3>
            <p className="text-gray-600">
              아직 태그가 지정된 포스트가 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tags.map((tag) => {
              const tagPosts = posts.filter(post => post.tags.includes(tag))
              return (
                <div key={tag} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      href={`/tags/${tag}`}
                      className="tag text-lg hover:bg-primary-200 transition-colors"
                    >
                      {tag}
                    </Link>
                    <span className="text-sm text-gray-500">
                      {tagPosts.length}개 포스트
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {tagPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block text-gray-600 hover:text-primary-600 transition-colors text-sm"
                      >
                        {post.title}
                      </Link>
                    ))}
                    {tagPosts.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{tagPosts.length - 3}개 더...
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 