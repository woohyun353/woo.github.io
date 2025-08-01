export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About</h1>
          <p className="text-xl text-gray-600">
            이 블로그에 대해 알아보세요.
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">블로그 소개</h2>
            <p className="text-gray-600 mb-4">
              이 블로그는 Next.js와 마크다운을 사용하여 구축된 정적 블로그입니다. 
              깔끔하고 빠른 웹사이트를 목표로 하며, 사용자 친화적인 인터페이스를 제공합니다.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">주요 특징</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
              <li>마크다운으로 글 작성</li>
              <li>태그와 카테고리 분류</li>
              <li>반응형 디자인</li>
              <li>빠른 로딩 속도</li>
              <li>SEO 최적화</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">기술 스택</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-gray-600">Frontend</div>
                <div className="text-lg font-semibold text-gray-900">Next.js</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-gray-600">Styling</div>
                <div className="text-lg font-semibold text-gray-900">Tailwind CSS</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-gray-600">Language</div>
                <div className="text-lg font-semibold text-gray-900">TypeScript</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <div className="text-sm font-medium text-gray-600">Content</div>
                <div className="text-lg font-semibold text-gray-900">Markdown</div>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">문의</h3>
            <p className="text-gray-600">
              블로그에 대한 문의사항이나 제안사항이 있으시면 언제든지 연락해주세요.
            </p>
          </div>

          <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">시작하기</h3>
            <p className="text-gray-600 mb-6">
              블로그를 둘러보고 마크다운으로 글을 작성해보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/blog" className="btn-primary">
                블로그 보기
              </a>
              <a href="/content/posts/2024/01/hello-world.md" className="btn-secondary">
                샘플 포스트
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 