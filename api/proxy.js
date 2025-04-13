export default async function handler(req, res) {
  const routes = {
    "/api/proxy/auth": "https://script.google.com/macros/s/AKfycbx5xnIZsjrPBpZndg6yIIF6PWuQsOI21bQCnMaGHZ0b4_Th2Y132AKEIs3rL25dipzS_w/exec",
    "/api/proxy/submit": "https://script.google.com/macros/s/AKfycbyL53wrw3XdnlZj6wghBuBzJ5IBExiKLy2m01g1_Q-PFJ7ntsKa7G_b-CalYSgyT1IyEg/exec"
  };

  const targetURL = routes[req.url];

  if (!targetURL) {
    return res.status(404).send("Unknown route.");
  }

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
    console.error("Ошибка:", err);
    return res.status(500).send("Ошибка прокси.");
  }
}
