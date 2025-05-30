export default async function handler(req, res) {
  // Устанавливаем CORS-заголовки для всех запросов
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");


  // Обработка preflight-запроса (OPTIONS)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }


  const targetURL = "https://script.google.com/macros/s/AKfycbxrmTCSRiRVpZLgtzYerWO0wFR-dACSLDEXVNkwCYzmfRO24jjLwEMD_Mn3Un3s4Uyn/exec";
  


  try {
    const googleRes = await fetch(targetURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });


    const result = await googleRes.text();


    return res.status(200).send(result);
  } catch (err) {
    console.error("Ошибка прокси:", err);
    return res.status(500).send("Ошибка прокси.");
  }
}
