export default async function handler(req, res) {
  const targetURL = "https://script.google.com/macros/s/AKfycbwGV0Lo1oTahWSKOvKPdMKAQS0czQJdre1dxiq_ucUFshu1IMa82sPUre_Nqy8TCRQy9w/exec; // ← вставь свой ID

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
    console.error(err);
    res.status(500).send("Ошибка прокси");
  }
}
