// pages/index.js

import Head from 'next/head';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowRight, Sparkles, Zap, Search, Image, Users } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const analyzeUrl = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      
      if (!response.ok) {
        throw new Error('分析中にエラーが発生しました');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>ListingGPT - EC出品最適化AI</title>
        <meta name="description" content="AIがEC出品を最適化。商品名、説明文を自動で改善提案" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <span className="text-xl font-bold">ListingGPT</span>
          <div className="space-x-4 text-sm">
            <a href="/privacy" className="text-gray-600 hover:text-gray-900">プライバシー</a>
            <a href="/terms" className="text-gray-600 hover:text-gray-900">利用規約</a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* ヒーローセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            AIでEC出品を最適化
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            商品URLを入力するだけで、最適な商品名・説明文を提案
          </p>
          
          {/* 入力フォーム */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="商品URLを入力してください"
                className="flex-1 p-2 border rounded shadow-sm"
              />
              <button
                onClick={analyzeUrl}
                disabled={loading || !url}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    分析中...
                  </span>
                ) : '分析開始'}
              </button>
            </div>
          </div>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}

        {/* 分析結果 */}
        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">分析結果</h2>
            
            <div className="space-y-6">
              {/* タイトルの提案 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">おすすめタイトル</h3>
                <ul className="space-y-2">
                  {JSON.parse(result).title_suggestions.map((title, i) => (
                    <li key={i} className="p-3 bg-blue-50 rounded">
                      {title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 説明文の改善点 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">説明文の改善ポイント</h3>
                <ul className="space-y-2">
                  {JSON.parse(result).description_suggestions.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-blue-600">•</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SEOアドバイス */}
              <div>
                <h3 className="text-lg font-semibold mb-3">SEOアドバイス</h3>
                <ul className="space-y-2">
                  {JSON.parse(result).seo_tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-green-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 広告スペース */}
        <div className="mt-12 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-sm text-gray-500 mb-2">広告</p>
          {/* ここにGoogle AdSenseのコードを配置 */}
        </div>
      </main>

      <footer className="bg-gray-50 mt-20">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2024 ListingGPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
