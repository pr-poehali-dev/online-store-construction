import Icon from '@/components/ui/icon';
import { blogPosts } from '@/data/products';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-sm font-golos text-slate-400">
          <button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">Блог</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="h-px w-8 bg-blue-400" />
            <span className="text-blue-500 font-montserrat font-semibold text-xs uppercase tracking-widest">Знания</span>
          </div>
          <h1 className="font-montserrat text-4xl font-bold uppercase">Блог СтройМаркет</h1>
          <p className="text-slate-600 font-golos mt-2">Советы профессионалов, обзоры материалов, строительные технологии</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, i) => (
            <article key={post.id} className={`bg-white border border-slate-200 hover:border-blue-300 rounded-xl card-hover cursor-pointer group transition-all animate-fade-in delay-${i * 100}`}>
              <div className="bg-blue-50 h-44 flex items-center justify-center rounded-t-xl">
                <Icon name="FileText" size={48} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs bg-blue-100 text-blue-600 rounded px-2 py-0.5 font-montserrat uppercase">{post.category}</span>
                  <span className="text-xs text-slate-400 font-golos flex items-center gap-1">
                    <Icon name="Clock" size={11} /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-montserrat text-lg font-semibold uppercase leading-tight group-hover:text-blue-500 transition-colors mb-2">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-sm font-golos leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-slate-400 font-golos">
                  <span className="flex items-center gap-1.5">
                    <Icon name="User" size={12} className="text-blue-500" />
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
