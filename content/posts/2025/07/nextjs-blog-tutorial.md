---
title: "Next.js로 정적 블로그 만들기 - 완벽 가이드"
date: "2025-07-16"
excerpt: "Next.js와 마크다운을 사용하여 아름다운 정적 블로그를 구축하는 방법을 단계별로 알아봅니다."
tags: ["Next.js", "React", "블로그", "정적사이트", "마크다운"]
categories: ["개발", "튜토리얼", "웹개발"]
---

# Next.js로 정적 블로그 만들기 - 완벽 가이드

안녕하세요! 오늘은 Next.js를 사용하여 아름다운 정적 블로그를 만드는 방법을 단계별로 알아보겠습니다.

## 🎯 프로젝트 개요

이 튜토리얼에서는 다음과 같은 기능을 가진 블로그를 만들어봅니다:

- ✅ 마크다운으로 글 작성
- ✅ 태그와 카테고리 분류
- ✅ 반응형 디자인
- ✅ 빠른 로딩 속도
- ✅ SEO 최적화

## 🛠️ 기술 스택

### Frontend
- **Next.js 14**: React 기반 프레임워크
- **TypeScript**: 타입 안정성
- **Tailwind CSS**: 유틸리티 퍼스트 CSS 프레임워크

### Content Management
- **Gray Matter**: 마크다운 frontmatter 파싱
- **Remark**: 마크다운 → HTML 변환
- **Remark GFM**: GitHub Flavored Markdown 지원

## 📁 프로젝트 구조

```
blog/
├── content/posts/          # 마크다운 파일들
│   └── YYYY/MM/
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # 재사용 컴포넌트
│   ├── lib/              # 유틸리티 함수
│   └── types/            # TypeScript 타입
├── public/               # 정적 자산
└── package.json
```

## 🚀 시작하기

### 1. 프로젝트 초기화

```bash
npx create-next-app@latest my-blog --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd my-blog
```

### 2. 필요한 의존성 설치

```bash
npm install gray-matter remark remark-html remark-gfm date-fns
npm install @tailwindcss/typography
```

### 3. Next.js 설정

```javascript
// next.config.js
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

## 📝 마크다운 포스트 작성

각 포스트는 다음과 같은 frontmatter를 가집니다:

```yaml
---
title: "포스트 제목"
date: "2025-07-16"
excerpt: "포스트 요약"
tags: ["태그1", "태그2"]
categories: ["카테고리1", "카테고리2"]
---
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: 파란색 계열 (#0ea5e9)
- **Gray**: 중성색 계열
- **Background**: 밝은 회색 (#f9fafb)

### 타이포그래피
- **제목**: Inter 폰트, 굵은 무게
- **본문**: 가독성 좋은 크기와 행간
- **코드**: 고정폭 폰트, 구문 강조

## 🔧 핵심 기능 구현

### 1. 마크다운 처리

```typescript
// src/lib/posts.ts
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .use(gfm)
    .process(matterResult.content)
  
  return {
    slug,
    title: matterResult.data.title,
    date: matterResult.data.date,
    content: processedContent.toString(),
    // ... 기타 메타데이터
  }
}
```

### 2. 태그 및 카테고리 시스템

```typescript
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  const tags = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag))
  })
  
  return Array.from(tags).sort()
}
```

### 3. 반응형 레이아웃

```tsx
// src/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="hidden md:flex space-x-8">
          {/* 네비게이션 링크들 */}
        </nav>
      </div>
    </header>
  )
}
```

## 📱 반응형 디자인

### 모바일 우선 접근법
- 작은 화면부터 시작하여 점진적으로 확장
- 터치 친화적인 인터페이스
- 빠른 로딩 속도

### 브레이크포인트
- **sm**: 640px 이상
- **md**: 768px 이상
- **lg**: 1024px 이상
- **xl**: 1280px 이상

## 🚀 배포

### GitHub Pages 배포

1. **저장소 생성**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

2. **GitHub Actions 설정**
```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

## 📊 성능 최적화

### 정적 생성의 장점
- **빠른 로딩**: CDN에서 직접 서빙
- **SEO 친화적**: 검색 엔진 최적화
- **비용 효율적**: 서버 비용 없음
- **안정성**: 서버 다운타임 없음

### 이미지 최적화
- WebP 포맷 사용
- 적절한 크기로 리사이징
- 지연 로딩 적용

## 🎯 결론

Next.js를 사용한 정적 블로그는 다음과 같은 장점을 제공합니다:

1. **개발자 경험**: React 생태계 활용
2. **성능**: 정적 사이트의 빠른 로딩
3. **유지보수**: 마크다운으로 쉬운 콘텐츠 관리
4. **확장성**: 필요에 따라 기능 추가 가능

이제 여러분도 Next.js로 아름다운 블로그를 만들어보세요! 🚀

---

*이 포스트는 2025년 7월 16일에 작성되었습니다.* 