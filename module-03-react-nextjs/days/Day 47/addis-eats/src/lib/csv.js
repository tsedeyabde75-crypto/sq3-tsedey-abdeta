export function toCsv(rows) {
  if (!rows || rows.length === 0) return "";
  
  const cell = (v) => {
    const s = String(v ?? "");
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const headers = Object.keys(rows[0]);
  const body = rows.map((r) => Object.values(r).map(cell).join(","));

  return [headers.join(","), ...body].join("\n");
}

export function downloadCsv(text, filename = "export.csv") {
  const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}