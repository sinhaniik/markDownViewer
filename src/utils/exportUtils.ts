export const exportToHTML = () => {
  const content = document.getElementById('markdown-content');
  if (!content) return;

  const htmlString = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Exported Markdown</title>
      <style>
        body { font-family: 'JetBrains Mono', monospace; line-height: 1.6; padding: 2rem; max-width: 800px; margin: 0 auto; color: #333; background: #fff; }
        pre { background: #f4f4f4; padding: 1rem; border-radius: 8px; overflow-x: auto; font-family: 'JetBrains Mono', monospace; }
        code { font-family: 'JetBrains Mono', monospace; background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 4px; }
        pre code { background: none; padding: 0; }
        blockquote { border-left: 4px solid #C9A0AB; padding-left: 1rem; color: #555; font-style: italic; margin-left: 0; }
        table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        th, td { border: 1px solid #e5e7eb; padding: 0.75rem; text-align: left; }
        th { background-color: #f9fafb; font-weight: 600; }
        a { color: #C9A0AB; text-decoration: none; }
        a:hover { text-decoration: underline; }
        h1, h2, h3, h4, h5, h6 { color: #111; margin-top: 2rem; margin-bottom: 1rem; }
        hr { border: 0; border-top: 1px solid #e5e7eb; margin: 2rem 0; }
      </style>
    </head>
    <body>
      ${content.innerHTML}
    </body>
    </html>
  `;

  const blob = new Blob([htmlString], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'markdown.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToPDF = () => {
  const content = document.getElementById('markdown-content');
  if (!content) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Print PDF</title>
      <style>
        body { font-family: 'JetBrains Mono', monospace, sans-serif; line-height: 1.6; padding: 2rem; color: #000; background: #fff; max-width: 800px; margin: 0 auto; }
        pre { background: #f9f9f9; padding: 1rem; border-radius: 8px; white-space: pre-wrap; word-wrap: break-word; font-family: 'JetBrains Mono', monospace; border: 1px solid #eee; }
        code { font-family: 'JetBrains Mono', monospace; background: #f9f9f9; padding: 0.2rem 0.4rem; border-radius: 4px; border: 1px solid #eee; }
        pre code { background: none; padding: 0; border: none; }
        blockquote { border-left: 4px solid #C9A0AB; padding-left: 1rem; color: #444; font-style: italic; margin-left: 0; }
        table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
        th, td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
        th { background-color: #f2f2f2; font-weight: 600; }
        a { color: #000; text-decoration: underline; }
        h1, h2, h3, h4, h5, h6 { color: #000; margin-top: 1.5rem; margin-bottom: 0.75rem; }
        img { max-width: 100%; height: auto; }
        @media print {
          body { padding: 0; max-width: none; }
          button { display: none; }
          pre { white-space: pre-wrap; break-inside: avoid; }
          img, table, blockquote { break-inside: avoid; }
          h1, h2, h3 { break-after: avoid; }
        }
      </style>
    </head>
    <body>
      ${content.innerHTML}
      <script>
        window.onload = () => {
          setTimeout(() => {
            window.print();
            window.close();
          }, 300);
        };
      </script>
    </body>
    </html>
  `);
  printWindow.document.close();
};
