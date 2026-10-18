export function toCsv(data) {
  if (!data || !data.length) return '';
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(',')
  );
  return [headers, ...rows].join('\n');
}

export function downloadCsv(csvContent, fileName = 'download.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}