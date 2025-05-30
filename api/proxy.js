export default async function handler(req, res) {
  const allowedOrigins = ["https://logis3.com", "https://www.logis3.com"];
  const origin = req.headers.origin || "";

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "null"); // можно убрать
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

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
