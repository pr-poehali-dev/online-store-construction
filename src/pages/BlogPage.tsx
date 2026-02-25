import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/products';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  return (
    <div className="industrial-bg min-h-screen">
      <div className="bg-steel-800 border-b border-steel-700 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-ibm text-steel-400">
          <button onClick={() => onNavigate('home')} className="hover-amber transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Блог</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-amber-DEFAULT" />
            <span className="text-amber-DEFAULT text-xs uppercase tracking-widest font-oswald">Знания</span>
          </div>
          <h1 className="font-oswald text-4xl font-bold uppercase">Блог СтройМаркет</h1>
          <p className="text-steel-300 font-ibm mt-2">Советы профессионалов, обзоры материалов, строительные технологии</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article key={post.id} className={`steel-texture border border-steel-600 hover:border-amber-DEFAULT/50 card-hover cursor-pointer group transition-all animate-fade-in delay-${i * 100}`}>
              <div className="bg-steel-700 h-44 flex items-center justify-center">
                <Icon name="FileText" size={48} className="text-steel-500 group-hover:text-steel-400 transition-colors" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-amber-DEFAULT/10 border border-amber-DEFAULT/30 text-amber-DEFAULT px-2 py-0.5 font-oswald uppercase">{post.category}</span>
                  <span className="text-xs text-steel-500 font-ibm flex items-center gap-1">
                    <Icon name="Clock" size={11} /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-oswald text-lg font-semibold uppercase leading-tight group-hover:text-amber-DEFAULT transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-steel-400 text-sm font-ibm leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-steel-500 font-ibm">
                  <span className="flex items-center gap-1.5">
                    <Icon name="User" size={12} className="text-amber-DEFAULT" />
                    {post.author}
                  </span>
                  <span>{new Date(post.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
