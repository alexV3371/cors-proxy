export default async function handler(req, res) {
  // Определяем разрешённый сайт
  const allowedOrigin = "https://logis3.com"; // твой домен

  // Обрабатываем preflight-запрос
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  // Устанавливаем CORS-заголовки для остальных запросов
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const targetURL = "https://script.google.com/macros/s/AKfycbwSlusc3BXpcng8Sg_EBPoYmiATvP3mT32PiTB2ubiv3yuHp9ft_gqb6UstZd9h2wk5/exec";

  try {
    const googleRes = await fetch(targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const result = await googleRes.text();
    res.status(200).send(result);
  } catch (err) {
    console.error("Ошибка прокси:", err);
    res.status(500).send("Ошибка прокси.");
  }
}
