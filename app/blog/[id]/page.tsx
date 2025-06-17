'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye, Heart, MessageCircle, Share2, Bookmark, Calendar, Clock, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MobileNav } from '@/components/layout/mobile-nav';
import { AdBox } from '@/components/home/ad-box';
import { toast } from 'sonner';

// Mock blog data
const mockBlog = {
  id: 1,
  title: "The Future of Web3 and Decentralized Applications",
  content: `
    <h2>Introduction to Web3</h2>
    <p>Web3 represents the next evolution of the internet, built on blockchain technology and decentralized protocols. Unlike Web2, which is dominated by centralized platforms, Web3 promises to give users control over their data and digital assets.</p>
    
    <h3>Key Principles of Web3</h3>
    <p>The fundamental principles that drive Web3 development include:</p>
    <ul>
      <li><strong>Decentralization:</strong> No single point of control or failure</li>
      <li><strong>Transparency:</strong> Open-source protocols and verifiable transactions</li>
      <li><strong>User Ownership:</strong> Users own their data and digital assets</li>
      <li><strong>Interoperability:</strong> Seamless interaction between different platforms</li>
    </ul>
    
    <h3>The Technology Stack</h3>
    <p>Web3 applications are built on a robust technology stack that includes:</p>
    <blockquote>
      "The Web3 stack represents a paradigm shift from centralized to decentralized computing, enabling new forms of digital interaction and value creation."
    </blockquote>
    
    <h4>Blockchain Layer</h4>
    <p>At the foundation lies the blockchain, providing immutable data storage and consensus mechanisms. Popular blockchains include Ethereum, Polygon, and Solana.</p>
    
    <h4>Smart Contracts</h4>
    <p>Smart contracts are self-executing contracts with terms directly written into code. They enable trustless interactions and automated processes.</p>
    
    <h4>Frontend Applications</h4>
    <p>Modern Web3 applications use familiar web technologies like React, Vue, or Angular, but integrate with blockchain networks through libraries like Web3.js or Ethers.js.</p>
    
    <h3>Real-World Applications</h3>
    <p>Web3 technology is already being used in various industries:</p>
    
    <h4>Decentralized Finance (DeFi)</h4>
    <p>DeFi protocols enable financial services without traditional intermediaries, including lending, borrowing, and trading.</p>
    
    <h4>Non-Fungible Tokens (NFTs)</h4>
    <p>NFTs represent unique digital assets and have found applications in art, gaming, and digital collectibles.</p>
    
    <h4>Decentralized Autonomous Organizations (DAOs)</h4>
    <p>DAOs enable collective decision-making and governance without centralized management.</p>
    
    <h3>Challenges and Future Outlook</h3>
    <p>While Web3 shows tremendous promise, several challenges remain:</p>
    <ul>
      <li>Scalability limitations of current blockchain networks</li>
      <li>User experience complexity for mainstream adoption</li>
      <li>Regulatory uncertainty in many jurisdictions</li>
      <li>Environmental concerns with energy-intensive consensus mechanisms</li>
    </ul>
    
    <p>Despite these challenges, the Web3 ecosystem continues to evolve rapidly, with new solutions and improvements being developed constantly.</p>
    
    <h3>Conclusion</h3>
    <p>Web3 represents a fundamental shift in how we think about the internet and digital interactions. As the technology matures and becomes more accessible, we can expect to see widespread adoption across various industries and use cases.</p>
    
    <p>The future of Web3 is bright, with innovations in scalability, user experience, and interoperability paving the way for a more decentralized and user-centric internet.</p>
  `,
  author: {
    id: 1,
    name: "Sarah Chen",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    role: "Blockchain Developer",
    bio: "Passionate about Web3 technologies and decentralized systems. 5+ years of experience in blockchain development.",
    followers: 1250,
    following: 340,
    totalBlogs: 28,
    joinDate: "2022-03-15"
  },
  thumbnail: "https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2",
  category: "Web3",
  tags: ["Web3", "Blockchain", "DeFi", "Smart Contracts", "Decentralization"],
  publishedAt: "2024-01-15T10:00:00Z",
  readTime: "8 min read",
  stats: {
    views: 2840,
    likes: 142,
    comments: 28,
    shares: 45,
    bookmarks: 67
  },
  isLiked: false,
  isBookmarked: false
};

const mockComments = [
  {
    id: 1,
    author: {
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    content: "Great article! The explanation of Web3 principles is very clear and comprehensive.",
    timestamp: "2024-01-15T12:30:00Z",
    likes: 12,
    replies: [
      {
        id: 2,
        author: {
          name: "Sarah Chen",
          avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
        },
        content: "Thank you! I'm glad you found it helpful.",
        timestamp: "2024-01-15T13:00:00Z",
        likes: 5
      }
    ]
  },
  {
    id: 3,
    author: {
      name: "Mike Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
    },
    content: "The section on DeFi applications was particularly insightful. Looking forward to more content on this topic!",
    timestamp: "2024-01-15T14:15:00Z",
    likes: 8,
    replies: []
  }
];

const relatedBlogs = [
  {
    id: 2,
    title: "Building Your First Smart Contract",
    thumbnail: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    readTime: "12 min read",
    stats: { views: 1920 }
  },
  {
    id: 3,
    title: "DeFi Protocols Explained",
    thumbnail: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    readTime: "10 min read",
    stats: { views: 1650 }
  },
  {
    id: 4,
    title: "NFT Marketplace Development",
    thumbnail: "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2",
    readTime: "15 min read",
    stats: { views: 2100 }
  }
];

export default function BlogViewPage() {
  const params = useParams();
  const [blog, setBlog] = useState(mockBlog);
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleLike = () => {
    setBlog(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      stats: {
        ...prev.stats,
        likes: prev.isLiked ? prev.stats.likes - 1 : prev.stats.likes + 1
      }
    }));
    toast.success(blog.isLiked ? 'Removed from likes' : 'Added to likes');
  };

  const handleBookmark = () => {
    setBlog(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
      stats: {
        ...prev.stats,
        bookmarks: prev.isBookmarked ? prev.stats.bookmarks - 1 : prev.stats.bookmarks + 1
      }
    }));
    toast.success(blog.isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleCommentSubmit = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2"
      },
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };
    
    setComments(prev => [comment, ...prev]);
    setNewComment('');
    toast.success('Comment posted successfully');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div 
            className="w-full h-64 md:h-96 rounded-xl bg-gradient-primary relative overflow-hidden"
            style={{
              backgroundImage: `url(${blog.thumbnail})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge variant="secondary" className="mb-4">
                {blog.category}
              </Badge>
              <h1 className="text-white font-bold text-2xl md:text-4xl mb-4">
                {blog.title}
              </h1>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass mb-6">
                <CardContent className="p-6">
                  {/* Author Info */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                        <AvatarFallback>{blog.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{blog.author.name}</h3>
                        <p className="text-sm text-muted-foreground">{blog.author.role}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(blog.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Blog Content */}
                  <div 
                    className="prose prose-lg max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />

                  {/* Engagement Stats */}
                  <Separator className="my-6" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{blog.stats.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{blog.stats.comments}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={blog.isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={handleLike}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${blog.isLiked ? 'fill-current' : ''}`} />
                        {blog.stats.likes}
                      </Button>
                      <Button
                        variant={blog.isBookmarked ? "default" : "outline"}
                        size="sm"
                        onClick={handleBookmark}
                      >
                        <Bookmark className={`w-4 h-4 mr-1 ${blog.isBookmarked ? 'fill-current' : ''}`} />
                        {blog.stats.bookmarks}
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleShare}>
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Dialog open={isCommentsOpen} onOpenChange={setIsCommentsOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            Comments
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Comments ({comments.length})</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {/* Add Comment */}
                            <div className="space-y-2">
                              <Textarea
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                              />
                              <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                                Post Comment
                              </Button>
                            </div>
                            
                            <Separator />
                            
                            {/* Comments List */}
                            <div className="space-y-4">
                              {comments.map((comment) => (
                                <div key={comment.id} className="space-y-2">
                                  <div className="flex items-start space-x-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="font-medium text-sm">{comment.author.name}</span>
                                        <span className="text-xs text-muted-foreground">
                                          {formatTimeAgo(comment.timestamp)}
                                        </span>
                                      </div>
                                      <p className="text-sm">{comment.content}</p>
                                      <div className="flex items-center space-x-2 mt-2">
                                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                          <Heart className="w-3 h-3 mr-1" />
                                          {comment.likes}
                                        </Button>
                                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                          Reply
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  {/* Replies */}
                                  {comment.replies && comment.replies.length > 0 && (
                                    <div className="ml-11 space-y-2">
                                      {comment.replies.map((reply) => (
                                        <div key={reply.id} className="flex items-start space-x-3">
                                          <Avatar className="h-6 w-6">
                                            <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                            <AvatarFallback className="text-xs">{reply.author.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <div className="flex-1">
                                            <div className="flex items-center space-x-2 mb-1">
                                              <span className="font-medium text-xs">{reply.author.name}</span>
                                              <span className="text-xs text-muted-foreground">
                                                {formatTimeAgo(reply.timestamp)}
                                              </span>
                                            </div>
                                            <p className="text-xs">{reply.content}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Author Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <div className="text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                      <AvatarFallback className="text-2xl">{blog.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-1">{blog.author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{blog.author.role}</p>
                    <p className="text-sm mb-4">{blog.author.bio}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                      <div>
                        <div className="font-bold">{blog.author.totalBlogs}</div>
                        <div className="text-xs text-muted-foreground">Blogs</div>
                      </div>
                      <div>
                        <div className="font-bold">{blog.author.followers}</div>
                        <div className="text-xs text-muted-foreground">Followers</div>
                      </div>
                      <div>
                        <div className="font-bold">{blog.author.following}</div>
                        <div className="text-xs text-muted-foreground">Following</div>
                      </div>
                    </div>
                    
                    <Link href={`/profile/${blog.author.id}`}>
                      <Button className="w-full">
                        <User className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Ad Space */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AdBox size="small" />
            </motion.div>

            {/* Related Blogs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="glass">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedBlogs.map((relatedBlog) => (
                      <Link key={relatedBlog.id} href={`/blog/${relatedBlog.id}`}>
                        <div className="flex space-x-3 group cursor-pointer">
                          <div 
                            className="w-16 h-16 rounded-lg bg-gradient-primary flex-shrink-0"
                            style={{
                              backgroundImage: `url(${relatedBlog.thumbnail})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {relatedBlog.title}
                            </h4>
                            <div className="flex items-center space-x-2 mt-1 text-xs text-muted-foreground">
                              <span>{relatedBlog.readTime}</span>
                              <span>•</span>
                              <span>{relatedBlog.stats.views} views</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}