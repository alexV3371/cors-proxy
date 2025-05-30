export default async function handler(req, res) {
  const allowedOrigins = ["https://logis3.com", "https://www.logis3.com"];
  const origin = req.headers.origin || "";

  // CORS
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "https://logis3.com"); // ← fallback
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Прокси на Google Script
  const targetURL = "https://script.google.com/macros/s/AKfycb.../exec";

  try {
    const googleRes = await fetch(targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const result = await googleRes.text(); // даже если JSON, вернем как текст
    res.status(200).send(result);
  } catch (err) {
    console.error("Ошибка прокси:", err);
    res.status(500).send("Ошибка прокси.");
  }
}
