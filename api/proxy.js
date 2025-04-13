export default async function handler(req, res) {
  // Если это preflight-запрос (CORS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end(); // ничего не делаем, просто подтверждаем
  }

  const targetURL = "https://script.google.com/macros/s/AKfycbx5xnIZsjrPBpZndg6yIIF6PWuQsOI21bQCnMaGHZ0b4_Th2Y132AKEIs3rL25dipzS_w/exec";

  try {
    const googleRes = await fetch(targetURL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const result = await googleRes.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).send(result);
  } catch (err) {
    console.error("Ошибка прокси:", err);
    return res.status(500).send("Ошибка прокси.");
  }
}
