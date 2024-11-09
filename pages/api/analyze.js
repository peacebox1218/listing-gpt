// pages/api/analyze.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "user",
            content: `あなたはEC出品の最適化AIアシスタントです。以下の商品URLの商品を分析し、最適な商品タイトルと説明文の改善案を提案してください：${url}

以下の3つの観点で分析し、JSONフォーマットで返答してください：
1. より検索されやすく、魅力的な商品タイトルの提案
2. 購買意欲を高める商品説明文のポイント
3. SEO観点でのアドバイス

以下の形式で返答してください：
{
  "title_suggestions": [
    "提案タイトル1",
    "提案タイトル2",
    "提案タイトル3"
  ],
  "description_suggestions": [
    "説明文改善ポイント1",
    "説明文改善ポイント2",
    "説明文改善ポイント3"
  ],
  "seo_tips": [
    "SEOアドバイス1",
    "SEOアドバイス2"
  ]
}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    return res.status(200).json(data.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: '分析中にエラーが発生しました。しばらく待ってから再度お試しください。' 
    });
  }
}
