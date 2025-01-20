'use client';

import { MessagesContext } from '@/context/MessagesContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import Lookup from '@/data/Lookup';
import { ArrowRight, Link, Github, Twitter, Linkedin, Youtube, Facebook, Instagram, Sparkles, Send } from 'lucide-react';
import React, { useContext, useState, useEffect, useRef } from 'react';
import SignInDialog from './SignInDialog';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Space_Grotesk as SpaceGrotesk } from 'next/font/google';

const spaceGrotesk = SpaceGrotesk({ subsets: ['latin'] });

function interpolateColors(color1, color2, factor) {
  const c1 = color1.match(/[\d.]+/g)?.map(Number) || [];
  const c2 = color2.match(/[\d.]+/g)?.map(Number) || [];
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * factor);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * factor);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * factor);
  const a = Number((c1[3] + (c2[3] - c1[3]) * factor).toFixed(3));
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function Hero() {
  const [userInput, setUserInput] = useState('');
  const [email, setEmail] = useState('');
  const { messages, setMessages } = useContext(MessagesContext);
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [openDialog, setOpenDialog] = useState(false);
  const CreateWorkspace = useMutation(api.workspace.CreateWorkspace);
  const router = useRouter();
  const [colorPair, setColorPair] = useState({
    primary: "rgba(59, 130, 246, 0.5)", // blue
    secondary: "rgba(236, 72, 153, 0.5)", // pink
  });
  const animationRef = useRef(null);
  const progressRef = useRef(0);
  const currentPairRef = useRef(0);

  const onGenerate = async (input) => {
    if (!userDetail?.name) {
      setOpenDialog(true);
      return;
    }
    if(userDetail?.token < 10) {
      toast("You don't have enough token to generate code");
      return;
    }
    const msg = {
      role: 'user',
      content: input,
    };
    setMessages(msg);

    const workspaceId = await CreateWorkspace({
      user: userDetail._id,
      messages: [msg],
    });
    console.log(workspaceId);
    router.push('/workspace/' + workspaceId);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thanks for subscribing!");
      setEmail('');
    }
  };

  useEffect(() => {
    const colorPairs = [
      {
        primary: "rgba(59, 130, 246, 0.5)", // blue
        secondary: "rgba(236, 72, 153, 0.5)", // pink
      },
      {
        primary: "rgba(16, 185, 129, 0.5)", // green
        secondary: "rgba(245, 158, 11, 0.5)", // yellow
      },
      {
        primary: "rgba(139, 92, 246, 0.5)", // purple
        secondary: "rgba(236, 72, 153, 0.5)", // pink
      },
      {
        primary: "rgba(14, 165, 233, 0.5)", // sky blue
        secondary: "rgba(168, 85, 247, 0.5)", // violet
      },
      {
        primary: "rgba(249, 115, 22, 0.5)", // orange
        secondary: "rgba(236, 72, 153, 0.5)", // pink
      },
      {
        primary: "rgba(20, 184, 166, 0.5)", // teal
        secondary: "rgba(59, 130, 246, 0.5)", // blue
      },
    ];

    const animate = () => {
      progressRef.current += 0.001;

      if (progressRef.current >= 1) {
        progressRef.current = 0;
        currentPairRef.current = (currentPairRef.current + 1) % colorPairs.length;
      }

      const currentPair = colorPairs[currentPairRef.current];
      const nextPair = colorPairs[(currentPairRef.current + 1) % colorPairs.length];

      setColorPair({
        primary: interpolateColors(
          currentPair.primary,
          nextPair.primary,
          progressRef.current
        ),
        secondary: interpolateColors(
          currentPair.secondary,
          nextPair.secondary,
          progressRef.current
        ),
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Add stars animation
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.opacity = `${Math.random()}`;
      document.getElementById('starfield').appendChild(star);
      
      setTimeout(() => {
        star.remove();
      }, 5000);
    };

    const interval = setInterval(() => {
      createStar();
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Instant & intuitive",
      description: "Live rendering, handles image input, has instant undo and lets you collaborate in real-time with your team.",
      icon: "⚡"
    },
    {
      title: "Beautiful design",
      description: "We believe your product should look good. Following best practice UI & UX principles for modern applications.",
      icon: "🎨"
    },
    {
      title: "Support any backend",
      description: "Comprehensive support for databases, API integrations and sophisticated back-end functionality.",
      icon: "🔧"
    },
    {
      title: "AI-Powered Development",
      description: "Leverage cutting-edge AI to accelerate your development process and generate high-quality code.",
      icon: "🤖"
    },
    {
      title: "Enterprise Ready",
      description: "Built with scalability in mind, supporting large teams and complex project requirements.",
      icon: "🏢"
    },
    {
      title: "24/7 Support",
      description: "Access to our dedicated support team and comprehensive documentation whenever you need help.",
      icon: "💬"
    }
  ];

  const testimonials = [
    {
      quote: "Faster than anything I've seen before.",
      author: "Sarah Johnson",
      role: "CTO at TechCorp",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "Revolutionary for our development workflow.",
      author: "Michael Chen",
      role: "Lead Developer",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      quote: "Transformed how we build products.",
      author: "Emma Williams",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=40&width=40"
    }
  ];

  const stats = [
    { number: "140,000+", label: "Developers" },
    { number: "1M+", label: "Projects Generated" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" }
  ];

  return (
    <div className={spaceGrotesk.className}>
      <div 
        className="flex flex-col items-center min-h-screen text-white relative overflow-hidden pt-10"
        style={{
          background: 'linear-gradient(to bottom, #0a0014, #120029, #1a003d, #220052, #2a0066)',
        }}
      >
        {/* Animated starfield */}
        <div id="starfield" className="absolute inset-0 pointer-events-none overflow-hidden" />
        
        {/* Animated gradient background */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(circle at 20% 20%, ${colorPair.primary}, transparent 40%),
              radial-gradient(circle at 80% 20%, ${colorPair.secondary}, transparent 40%),
              radial-gradient(circle at 20% 80%, ${colorPair.secondary}, transparent 40%),
              radial-gradient(circle at 80% 80%, ${colorPair.primary}, transparent 40%),
              radial-gradient(circle at 50% 50%, ${colorPair.primary}, transparent 50%)
            `,
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <div className="relative w-full mt-10">
          {/* Axion Logo Animation */}
          <div className="text-center py-8 relative">
            <div className="relative inline-block">
              <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-600 animate-text-shimmer">
                Axion
              </h1>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent max-w-md mx-auto mt-4 animate-glow" />
          </div>

          <div className="relative flex flex-col items-center xl:mt-2 gap-8 px-4">
            {/* Main heading */}
            <div className="text-center space-y-5 max-w-4xl">
              <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent tracking-tight">
                {Lookup.HERO_HEADING}
              </h2>
              <p className="text-purple-200/80 text-base md:text-lg max-w-2xl mx-auto font-light">
                {Lookup.HERO_DESC}
              </p>
            </div>

            {/* Input section with gradient border */}
            <div className="w-full max-w-2xl relative group">
              <div
                className="absolute -inset-1 rounded-xl opacity-75 blur-lg transition-all duration-2000"
                style={{
                  background: `linear-gradient(45deg, ${colorPair.primary}, ${colorPair.secondary})`,
                }}
              />
              <div
                className="p-1 rounded-xl w-full relative transition-all duration-2000"
                style={{
                  background: `linear-gradient(45deg, ${colorPair.primary}, ${colorPair.secondary})`,
                }}
              >
                <div className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 flex items-start relative">
                  <textarea
                    placeholder={Lookup.INPUT_PLACEHOLDER}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className="outline-none bg-transparent w-full h-48 max-h-96 resize-none text-white placeholder-gray-500 text-lg"
                  />
                  {userInput && (
                    <button
                      onClick={() => onGenerate(userInput)}
                      className="ml-4 p-3 rounded-lg transition-all duration-500 hover:scale-105"
                      style={{
                        background: `linear-gradient(45deg, ${colorPair.primary}, ${colorPair.secondary})`,
                      }}
                    >
                      <Send className="h-6 w-6" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Suggestions */}
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {Lookup.SUGGSTIONS.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onGenerate(suggestion)}
                  className="px-3 py-1.5 rounded-full text-sm border border-purple-800 bg-purple-950/30 text-purple-200 hover:bg-purple-900/40 hover:text-white transition-colors backdrop-blur-sm"
                  style={{
                    textShadow: `0 0 20px ${colorPair.primary}`,
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-16 px-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center space-y-1.5">
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                    {stat.number}
                  </p>
                  <p className="text-purple-200/80 text-sm font-light">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Testimonials Section */}
            <div className="mt-20 space-y-12">
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="space-y-4 text-center">
                    <p className="text-lg font-medium text-purple-100">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                        <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white text-sm">{testimonial.author}</p>
                        <p className="text-xs text-purple-200/80">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl border border-purple-800 bg-purple-950/30 backdrop-blur-sm hover:border-purple-700 transition-colors"
                >
                  <div className="text-xl mb-3 text-purple-300">{feature.icon}</div>
                  <h3 className="text-base font-medium text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-purple-200/80 text-xs leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Footer */}
            <footer className="relative mt-32 border-t border-purple-800 w-full">
              <div className="mx-auto max-w-7xl px-4 pb-12 pt-16">
                {/* Newsletter Section */}
                <div className="mx-auto max-w-xl text-center mb-16">
                  <h2 className="text-2xl font-semibold tracking-tight text-white mb-4">
                    Subscribe to our newsletter
                  </h2>
                  <p className="text-sm text-purple-200/80 mb-6">
                    Get the latest updates, articles, and resources delivered straight to your inbox.
                  </p>
                  <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-purple-950/50 border-purple-800 text-sm"
                    />
                    <Button type="submit" variant="secondary">
                      Subscribe
                    </Button>
                  </form>
                </div>

                <div className="grid grid-cols-2 gap-8 xl:grid-cols-4">
                  <div className="md:grid md:grid-cols-2 md:gap-8 xl:col-span-4">
                    <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
                      {/* Product */}
                      <div>
                        <h3 className="text-sm font-semibold text-white">Product</h3>
                        <ul role="list" className="mt-4 space-y-2">
                          {['Features', 'Pricing', 'Security', 'Changelog', 'Documentation', 'Status'].map((item) => (
                            <li key={item}>
                              <a href="#" className="text-xs text-purple-200/80 hover:text-white transition-colors">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Company */}
                      <div>
                        <h3 className="text-sm font-semibold text-white">Company</h3>
                        <ul role="list" className="mt-4 space-y-2">
                          {['About', 'Blog', 'Careers', 'Press', 'Partners', 'Contact'].map((item) => (
                            <li key={item}>
                              <a href="#" className="text-xs text-purple-200/80 hover:text-white transition-colors">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Resources */}
                      <div>
                        <h3 className="text-sm font-semibold text-white">Resources</h3>
                        <ul role="list" className="mt-4 space-y-2">
                          {['Community', 'Help Center', 'Support', 'API', 'System Status', 'Terms of Service'].map((item) => (
                            <li key={item}>
                              <a href="#" className="text-xs text-purple-200/80 hover:text-white transition-colors">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Developers */}
                      <div>
                        <h3 className="text-sm font-semibold text-white">Developers</h3>
                        <ul role="list" className="mt-4 space-y-2">
                          {['API Reference', 'Integration', 'GitHub', 'Developer Blog', 'Engineering Team', 'Developer Terms'].map((item) => (
                            <li key={item}>
                              <a href="#" className="text-xs text-purple-200/80 hover:text-white transition-colors">
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom section */}
                <div className="mt-16 pt-8 border-t border-purple-800">
                  <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                    <div className="flex justify-center space-x-6 md:order-2">
                      {[
                        { icon: Github, href: '#' },
                        { icon: Twitter, href: '#' },
                        { icon: Linkedin, href: '#' },
                        { icon: Youtube, href: '#' },
                        { icon: Facebook, href: '#' },
                        { icon: Instagram, href: '#' }
                      ].map((item, index) => (
                        <a
                          key={index}
                          href={item.href}
                          className="text-purple-200/80 hover:text-gray-300"
                        >
                          <span className="sr-only">{item.icon.name}</span>
                          <item.icon className="h-5 w-5" />
                        </a>
                      ))}
                    </div>
                    <p className="text-xs text-purple-200/80 md:order-1">
                      &copy; {new Date().getFullYear()} Axion, Inc. All rights reserved.
                    </p>
                  </div>
                </div>
              </div>
            </footer>

            <style jsx global>{`
              @keyframes pulse {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }

              @keyframes glow {
                0%, 100% { opacity: 0.5; }
                50% { opacity: 1; }
              }

              @keyframes text-shimmer {
                0% { background-position: -200% center; }
                100% { background-position: 200% center; }
              }

              .animate-text-shimmer {
                animation: text-shimmer 4s ease-in-out infinite;
                background-size: 200% auto;
              }

              .animate-glow {
                animation: glow 3s ease-in-out infinite;
              }

              .star {
                position: absolute;
                width: 2px;
                height: 2px;
                background: white;
                border-radius: 50%;
                animation: fall linear forwards;
                pointer-events: none;
              }

              @keyframes fall {
                0% {
                  transform: translateY(0) scale(0);
                  opacity: 0;
                }
                50% {
                  transform: translateY(50vh) scale(1);
                  opacity: var(--opacity);
                }
                100% {
                  transform: translateY(100vh) scale(0);
                  opacity: 0;
                }
              }
            `}</style>

            <SignInDialog
              openDialog={openDialog}
              closeDialog={(v) => setOpenDialog(v)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

