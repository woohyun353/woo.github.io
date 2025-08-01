import Link from 'next/link'
import { getAllCategories, getAllPosts } from '@/lib/posts'

export default function CategoriesPage() {
  const categories = getAllCategories()
  const posts = getAllPosts()

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-xl text-gray-600">
            모든 카테고리를 확인해보세요.
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">카테고리가 없습니다</h3>
            <p className="text-gray-600">
              아직 카테고리가 지정된 포스트가 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const categoryPosts = posts.filter(post => post.categories.includes(category))
              return (
                <div key={category} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Link
                      href={`/categories/${category}`}
                      className="category text-lg hover:bg-gray-200 transition-colors"
                    >
                      {category}
                    </Link>
                    <span className="text-sm text-gray-500">
                      {categoryPosts.length}개 포스트
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {categoryPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className="block text-gray-600 hover:text-primary-600 transition-colors text-sm"
                      >
                        {post.title}
                      </Link>
                    ))}
                    {categoryPosts.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{categoryPosts.length - 3}개 더...
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