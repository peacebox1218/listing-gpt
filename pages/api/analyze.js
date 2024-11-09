export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    // デモ用のモックレスポンス
    const mockResult = {
      title: {
        current: "現在の商品名",
        suggestions: [
          {
            improved: "改善案：ブランド名 + 商品特徴 + サイズ",
            seoScore: 85,
            appealScore: 90
          }
        ],
        feedback: "キーワード配置の最適化とブランド名の前置により検索性向上"
      },
      description: {
        current: "現在の商品説明",
        suggestions: "箇条書きで商品特徴を明確に\n素材感の詳細追加\nサイズ感の具体的な記載",
        seoTips: "長さは最適です。キーワード密度の改善が推奨されます。",
        appealTips: "購入のメリットをより明確に。"
      },
      image: {
        tips: "- 自然光での撮影を推奨\n- 45度アングルでの全体像\n- 商品のディテール部分のアップショット追加"
      }
    };

    // 実際のAPIを使用する場合は以下のようなコードを使用
    // const response = await fetch('https://api.openai.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4-turbo-preview",
    //     messages: [{ role: "user", content: `Analyze this product URL: ${url}` }]
    //   })
    // });
    // const data = await response.json();

    return res.status(200).json(mockResult);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: '分析中にエラーが発生しました。' });
  }
}
