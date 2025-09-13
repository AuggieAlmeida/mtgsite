# MTG Site

Site estático de fã de Magic: The Gathering.

## Estrutura
- `index.html`: página principal com Tailwind via CDN e dark mode
- `pages/battle.html`: página de batalha
- `assets/img`: imagens
- `assets/css/main.css`: estilos adicionais
- `assets/js`: scripts (carousel, theme toggle, battle)

## Desenvolvimento
1. Abra `index.html` diretamente no navegador ou use um servidor estático (Live Server do VS Code).
2. Tailwind é carregado via CDN; não há build necessário.

## Padrões
- Preferir classes utilitárias do Tailwind; estilos customizados em `assets/css/main.css`.
- Imagens em `assets/img`.

## Futuro
- Integrar páginas "Cartas", "História" e "Monte seu deck".
- Melhorar acessibilidade do carrossel (aria-labels) e indicadores.

## Scripts úteis
- `assets/js/carousel.js`: controles do carrossel do hero
- `assets/js/theme.js`: alternância de tema (localStorage `mtg_theme`)

## Licença
Uso pessoal/educacional.