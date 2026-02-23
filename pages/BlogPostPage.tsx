import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useCMS } from '../context/CMSContext';
import { ArrowLeft, Clock, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { posts, t } = useCMS();

    const post = posts.find(p => String(p.id) === id);

    if (!post) {
        return <Navigate to="/resources" replace />;
    }

    // Find next post for navigation logic (simplified)
    const currentIndex = posts.findIndex(p => p.id === post.id);
    const nextPost = posts[currentIndex + 1];

    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Navigation Bar */}
            <div className="sticky top-24 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 py-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link to="/resources" className="text-xs font-bold text-gray-500 hover:text-avanti-900 uppercase tracking-widest flex items-center transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> {t('resources.back')}
                    </Link>
                    <div className="flex space-x-4">
                        <button className="text-gray-400 hover:text-avanti-900 transition-colors"><Share2 className="w-4 h-4" /></button>
                    </div>
                </div>
            </div>

            {/* Article Header */}
            <article>
                <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-avanti-light text-avanti-gold text-[10px] font-bold uppercase tracking-widest rounded-sm mb-6">
                        <Tag className="w-3 h-3" />
                        {post.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-medium text-avanti-900 leading-tight mb-8">
                        {post.title}
                    </h1>

                    <div className="flex items-center justify-center gap-8 text-sm text-gray-500 border-t border-b border-gray-100 py-6 max-w-2xl mx-auto">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-avanti-gold" />
                            <span className="font-medium text-avanti-900">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-avanti-gold" />
                            <span>{post.date}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <span className="text-gray-400">{t('resources.readTime')}</span>
                        </div>
                    </div>
                </header>

                {/* Hero Image */}
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                    <div className="aspect-w-16 aspect-h-9 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-lg">
                        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div
                        className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:text-avanti-900 prose-p:font-light prose-p:leading-8 prose-p:text-slate-600 prose-a:text-avanti-gold hover:prose-a:text-avanti-900 prose-li:text-slate-600 prose-strong:text-avanti-900 first-letter:text-5xl first-letter:font-serif first-letter:text-avanti-gold first-letter:mr-3 first-letter:float-left mb-16"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share Footer */}
                    <div className="border-t border-gray-100 py-8 mb-16 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-sm font-bold text-avanti-900 uppercase tracking-widest">{t('resources.share')}</span>
                        <div className="flex space-x-4">
                            <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-avanti-900 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></button>
                            <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-avanti-900 hover:text-white transition-all"><Twitter className="w-4 h-4" /></button>
                            <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-avanti-900 hover:text-white transition-all"><Facebook className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </article>

            {/* Related / Next Post */}
            {nextPost && (
                <div className="bg-avanti-light py-20 border-t border-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 block">{t('resources.readNext')}</span>
                        <h3 className="text-3xl font-serif text-avanti-900 mb-6">{nextPost.title}</h3>
                        <Link to={`/resources/${nextPost.id}`} className="inline-block bg-white text-avanti-900 px-8 py-3 border border-gray-200 hover:border-avanti-gold hover:text-avanti-gold transition-colors font-medium text-xs uppercase tracking-widest rounded-sm">
                            {t('resources.readNow')}
                        </Link>
                    </div>
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-avanti-900 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <h2 className="text-3xl font-serif mb-6">{t('resources.helpTitle')}</h2>
                            <p className="text-gray-300 text-lg font-light mb-8">{t('resources.helpDesc')}</p>
                            <Link to="/contact" className="text-avanti-gold border-b border-avanti-gold pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-xs font-bold">
                                {t('resources.contactExpert')} &rarr;
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostPage;