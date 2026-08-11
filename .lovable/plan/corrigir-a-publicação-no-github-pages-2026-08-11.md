# Corrigir a publicação no GitHub Pages

## Problema confirmado

O endereço `https://franciscofmsamagaio.github.io/personal-grocer-web/` está a servir uma página Jekyll gerada a partir do `README.md`, com o título “Seu Super Amigo | personal-grocer-web”. Não está a servir o site estático criado em `dist/client`.

O workflow `Deploy to GitHub Pages` já está presente no repositório, mas a origem efetiva do Pages continua a ser a branch, em vez do artefacto publicado pelo GitHub Actions.

## Correção

1. Atualizar o workflow para o formato atual recomendado pelo GitHub Pages:
   - adicionar `actions/configure-pages@v5`;
   - atualizar `actions/upload-pages-artifact` de `v3` para `v4`;
   - manter `actions/deploy-pages@v4` e a pasta `dist/client`.
2. Validar localmente que o modo GitHub Pages gera `dist/client/index.html` e que os caminhos dos assets incluem `/personal-grocer-web/`.
3. No GitHub, confirmar em **Settings → Pages → Build and deployment → Source** a opção **GitHub Actions**. Esta alteração de configuração é indispensável; não pode ser feita apenas pelo código do repositório.
4. Executar novamente o workflow e confirmar que o URL passa a devolver a aplicação, e não o HTML do README.

## Nota técnica

O alojamento no Lovable continuará com o servidor MCP. O GitHub Pages continuará apenas com a versão estática da página, porque não suporta endpoints de servidor como `/mcp`.

## Se continuar a mostrar o README

Abrir **Actions → Deploy to GitHub Pages → Run workflow**, aguardar o job `deploy` terminar e atualizar o URL sem cache. Se só aparecer o workflow automático “pages build and deployment”, a origem ainda está configurada como branch.

<presentation-actions>
  <presentation-open-history>View History</presentation-open-history>
</presentation-actions>

<presentation-actions>
<presentation-link url="https://docs.lovable.dev/tips-tricks/troubleshooting">Troubleshooting docs</presentation-link>
</presentation-actions>