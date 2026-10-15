/**
 * Localizador de IP NAT - CGNAT VOX MCL
 * -------------------------------------
 * Este arquivo só tem uma função: servir a página HTML (Index.html).
 * Toda a análise dos logs acontece no NAVEGADOR do usuário (JavaScript
 * client-side), então os arquivos de log NUNCA são enviados para o
 * Google / Apps Script. Eles são lidos, analisados e descartados da
 * memória do próprio navegador. Nada é armazenado em lugar nenhum.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Localizador de IP NAT - CGNAT VOX MCL')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
