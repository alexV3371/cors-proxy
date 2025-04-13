export default async function handler(req, res) {
  const targetURL = "https://script.google.com/macros/s/AKfycbyL53wrw3XdnlZj6wghBuBzJ5IBExiKLy2m01g1_Q-PFJ7ntsKa7G_b-CalYSgyT1IyEg/exec";

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

    res.status(200).send(result);
  } catch (err) {
    console.error("❌ Ошибка в прокси:", err);
    res.status(500).send("Ошибка прокси");
  }
}
