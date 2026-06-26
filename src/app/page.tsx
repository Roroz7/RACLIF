import Link from "next/link";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="w-full py-20 md:py-32 flex flex-col items-center text-center px-4 relative overflow-hidden">
        {/* Animated particles background could go here */}
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10 opacity-20"></div>
        
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8 animate-slide-in">
          <span className="flex h-2 w-2 rounded-full bg-raclif-primary animate-pulse"></span>
          <span className="text-sm font-medium text-gray-300">Undetected & Updated Daily</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-slide-in" style={{ animationDelay: "100ms" }}>
          Dominate the game with <br className="hidden md:block" />
          <span className="text-gradient">Premium Intelligence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl animate-slide-in" style={{ animationDelay: "200ms" }}>
          Raclif provides top-tier, secure, and undetected enhancements for your favorite competitive games. Elevate your gameplay to the next level.
        </p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-slide-in" style={{ animationDelay: "300ms" }}>
          <Link href="/shop" className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-raclif-primary rounded-lg hover:bg-raclif-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-raclif-primary shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]">
            Explore Products
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/features" className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 focus:outline-none">
            View Features
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20 bg-raclif-darker border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why choose Raclif?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">We focus on security, performance, and user experience above all else.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
              <div className="w-16 h-16 bg-raclif-primary/20 rounded-full flex items-center justify-center mb-6 text-raclif-primary">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Undetected Security</h3>
              <p className="text-gray-400">Our unique injection methods and kernel-level drivers ensure you stay undetected from major anti-cheats.</p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
              <div className="w-16 h-16 bg-raclif-primary/20 rounded-full flex items-center justify-center mb-6 text-raclif-primary">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Maximum Performance</h3>
              <p className="text-gray-400">Optimized algorithms that run silently in the background with zero impact on your game's framerate.</p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-300">
              <div className="w-16 h-16 bg-raclif-primary/20 rounded-full flex items-center justify-center mb-6 text-raclif-primary">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant Delivery</h3>
              <p className="text-gray-400">Receive your license key and setup instructions immediately after purchase via email and our secure dashboard.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
