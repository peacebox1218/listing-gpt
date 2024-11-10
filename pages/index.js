import React, { useState } from 'react';
import Head from 'next/head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Sparkles, Zap, Search, Image, Users } from 'lucide-react';

// ListingOptimizer Component Definition
const ListingOptimizer = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader>
        <CardTitle>ListingGPT - 商品掲載最適化</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="商品URLを入力してください"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={analyzeUrl}
              disabled={loading || !url}
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              {loading ? '分析中...' : '分析開始'}
            </Button>
          </div>

          {results && (
            <Tabs defaultValue="title" className="mt-6">
              <TabsList className="bg-gray-100 w-full justify-start">
                <TabsTrigger value="title" className="data-[state=active]:bg-white">商品名</TabsTrigger>
                <TabsTrigger value="description" className="data-[state=active]:bg-white">商品説明</TabsTrigger>
                <TabsTrigger value="image" className="data-[state=active]:bg-white">画像</TabsTrigger>
              </TabsList>

              <TabsContent value="title">
                <Alert className="bg-white border-blue-100">
                  <AlertTitle>現在の商品名</AlertTitle>
                  <AlertDescription>{results.title.current}</AlertDescription>
                </Alert>
                <div className="mt-4">
                  <h3 className="font-medium mb-2">改善案</h3>
                  {results.title.suggestions.map((suggestion, i) => (
                    <div key={i} className="p-4 border rounded-lg mb-2 bg-white">
                      <p>{suggestion.improved}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span>SEOスコア: {suggestion.seoScore}</span>
                        <span>アピール度: {suggestion.appealScore}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="description">
                <div className="space-y-4">
                  <Alert className="bg-white border-blue-100">
                    <AlertTitle>SEO改善ポイント</AlertTitle>
                    <AlertDescription>{results.description.seoTips}</AlertDescription>
                  </Alert>
                  <Alert className="bg-white border-blue-100">
                    <AlertTitle>アピール度向上ポイント</AlertTitle>
                    <AlertDescription>{results.description.appealTips}</AlertDescription>
                  </Alert>
                  <div className="whitespace-pre-line p-4 bg-white rounded-lg border">
                    {results.description.suggestions}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="image">
                <div className="whitespace-pre-line p-4 bg-white rounded-lg border">
                  {results.image.tips}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Layout Component
const Layout = ({ children }) => (
  <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">ListingGPT</span>
        </div>
        <div className="flex space-x-6">
          <a href="#features" className="text-gray-600 hover:text-gray-900">機能</a>
          <a href="#tool" className="text-gray-600 hover:text-gray-900">ツール</a>
          <a href="#about" className="text-gray-600 hover:text-gray-900">開発者</a>
        </div>
      </div>
    </nav>
    {children}
    <footer className="bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">ListingGPT</h3>
            <p className="text-gray-600">EC出品を最適化する次世代AIツール</p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">リンク</h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#features">機能紹介</a></li>
              <li><a href="#about">開発者情報</a></li>
              <li><a href="#privacy">プライバシーポリシー</a></li>
            </ul>
          </div>
          <div className="text-gray-600">
            <h3 className="font-semibold mb-4">お問い合わせ</h3>
            <p>support@listinggpt.example.com</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          © 2024 ListingGPT. All rights reserved.
        </div>
      </div>
    </footer>
  </div>
);

// Main HomePage Component
const HomePage = () => {
  return (
    <Layout>
      <Head>
        <title>ListingGPT - EC出品最適化AI</title>
        <meta name="description" content="AIがEC出品を最適化。商品名、説明文、画像を分析し改善提案を提供" />
        <style>{`
          :root {
            --background: 0 0% 100%;
            --foreground: 222.2 84% 4.9%;
            --card: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
            --primary: 221.2 83.2% 53.3%;
            --primary-foreground: 210 40% 98%;
          }
        `}</style>
      </Head>

      {/* Hero Section */}
      <div className="bg-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AIでEC出品を最適化
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            URLを入力するだけで、商品名・説明文・画像を自動で最適化
          </p>
          <Button 
            size="lg"
            variant="default"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            onClick={() => document.getElementById('tool').scrollIntoView({ behavior: 'smooth' })}
          >
            無料で始める
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Features */}
      <div id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">主な機能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <Search className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">SEO最適化</h3>
                <p className="text-gray-600">検索上位表示のための最適なキーワード配置を提案</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">商品説明文生成</h3>
                <p className="text-gray-600">購買意欲を高める魅力的な商品説明文を自動生成</p>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="pt-6">
                <Image className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">画像分析</h3>
                <p className="text-gray-600">より魅力的な商品画像のためのアドバイスを提供</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Tool */}
      <div id="tool" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <ListingOptimizer />
          {/* Sponsored Content */}
          <div className="mt-8 p-4 border rounded-lg bg-gray-50">
            <h3 className="text-sm font-medium text-gray-500 mb-2">おすすめツール</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="#" className="block p-4 bg-white rounded border hover:shadow-md transition-shadow">
                <h4 className="font-medium">SEMrush</h4>
                <p className="text-sm text-gray-600">より詳細なSEO分析に</p>
              </a>
              <a href="#" className="block p-4 bg-white rounded border hover:shadow-md transition-shadow">
                <h4 className="font-medium">Adobe Lightroom</h4>
                <p className="text-sm text-gray-600">プロ品質の商品写真編集に</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* About Developer */}
      <div id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">開発者について</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">開発チーム</h3>
                    <p className="text-gray-600">EC×AI specialists</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  EC販売に特化したAIソリューションを開発するチームです。
                  豊富なEC運営経験とAI開発の知見を組み合わせ、
                  より効率的な商品販売を支援するツールを提供しています。
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium">得意分野</p>
                    <ul className="list-disc list-inside">
                      <li>ECプラットフォーム最適化</li>
                      <li>自然言語処理</li>
                      <li>画像認識AI</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">実績</p>
                    <ul className="list-disc list-inside">
                      <li>累計10,000件以上の最適化</li>
                      <li>平均売上30%向上</li>
                      <li>リピート率95%以上</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
