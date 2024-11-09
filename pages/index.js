import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <Head>
        <title>ListingGPT - EC出品最適化AI</title>
        <meta name="description" content="AIがEC出品を最適化" />
      </Head>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8">
          AIでEC出品を最適化
        </h1>
        
        <p className="text-xl text-center text-gray-600 mb-12">
          商品URLを入力するだけで、最適な商品名・説明文を提案
        </p>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="商品URLを入力してください"
            className="flex-1 p-3 rounded-lg border shadow-sm"
          />
          <button
            onClick={analyzeUrl}
            disabled={loading}
            className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '分析中...' : '分析開始'}
          </button>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">分析結果</h2>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}
