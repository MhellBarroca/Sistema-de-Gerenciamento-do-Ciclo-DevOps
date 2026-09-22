import React from "react";

/**
 * Landing page — Ecossistema DevOps
 * Explica o ciclo DevOps em 8 etapas, com o ecossistema de ferramentas de cada fase.
 *
 * Renderizado estaticamente pelo build.ts (sem hooks de estado / client JS).
 */

const etapas = [
  {
    numero: "01",
    fase: "Planejar",
    texto: "Backlog, requisitos e arquitetura definidos junto com o time antes da primeira linha de código.",
    ferramentas: "Jira · Linear · Notion",
    snippet: "$ git checkout -b feature/pagamento-pix",
  },
  {
    numero: "02",
    fase: "Codificar",
    texto: "Desenvolvimento em branches curtas, com revisão de código obrigatória antes do merge.",
    ferramentas: "GitHub · GitLab · VS Code",
    snippet: "$ git commit -m \"feat: valida cpf no checkout\"",
  },
  {
    numero: "03",
    fase: "Compilar",
    texto: "Cada push dispara uma build automatizada, empacotando a aplicação em um artefato versionado.",
    ferramentas: "GitHub Actions · Jenkins · Docker",
    snippet: "$ docker build -t api:1.4.2 .",
  },
  {
    numero: "04",
    fase: "Testar",
    texto: "Testes unitários, de integração e de segurança rodam antes de qualquer artefato avançar no pipeline.",
    ferramentas: "Jest · Cypress · SonarQube",
    snippet: "$ npm test -- --coverage",
  },
  {
    numero: "05",
    fase: "Lançar",
    texto: "O artefato aprovado é versionado e liberado para deploy, com changelog gerado automaticamente.",
    ferramentas: "Semantic Release · Changesets",
    snippet: "$ git tag v1.4.2 && git push --tags",
  },
  {
    numero: "06",
    fase: "Implantar",
    texto: "Deploy progressivo — canário ou blue-green — reduz o risco de cada nova versão em produção.",
    ferramentas: "Kubernetes · ArgoCD · Terraform",
    snippet: "$ kubectl rollout status deploy/api",
  },
  {
    numero: "07",
    fase: "Operar",
    texto: "Infraestrutura como código mantém ambientes reproduzíveis e auditáveis, de dev a produção.",
    ferramentas: "Terraform · Ansible · Pulumi",
    snippet: "$ terraform apply -auto-approve",
  },
  {
    numero: "08",
    fase: "Monitorar",
    texto: "Métricas, logs e alertas fecham o ciclo — e alimentam o próximo planejamento com dados reais.",
    ferramentas: "Prometheus · Grafana · Datadog",
    snippet: "$ kubectl logs -f deploy/api --since=10m",
  },
];

const categorias = [
  { nome: "Controle de versão", exemplos: "Git, GitHub, GitLab, Bitbucket" },
  { nome: "Integração contínua", exemplos: "GitHub Actions, Jenkins, CircleCI" },
  { nome: "Contêineres", exemplos: "Docker, Podman, Buildpacks" },
  { nome: "Orquestração", exemplos: "Kubernetes, Nomad, ECS" },
  { nome: "Infraestrutura como código", exemplos: "Terraform, Pulumi, Ansible" },
  { nome: "Observabilidade", exemplos: "Prometheus, Grafana, Datadog" },
];

const css = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        * { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; }
        .devops {
          --bg: #14171C;
          --panel: #1B1F27;
          --ink: #ECEDEE;
          --ink-dim: #8B92A0;
          --green: #8FD14F;
          --blue: #5B8DEF;
          --line: rgba(236, 237, 238, 0.1);
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        .devops h1, .devops h2, .devops h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 600;
          margin: 0;
        }
        .devops code, .devops .mono { font-family: 'IBM Plex Mono', monospace; }
        .devops a { color: inherit; text-decoration: none; }
        .devops .wrap { max-width: 1120px; margin: 0 auto; padding: 0 28px; }

        /* Header */
        .d-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 26px 28px; max-width: 1120px; margin: 0 auto;
        }
        .d-logo { font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; }
        .d-logo .dot { color: var(--green); }
        .d-nav { display: flex; gap: 32px; font-size: 0.92rem; color: var(--ink-dim); }
        .d-nav a:hover { color: var(--ink); }
        @media (max-width: 720px) { .d-nav { display: none; } }

        /* Hero */
        .d-hero { padding: 56px 28px 96px; }
        .d-hero-grid {
          max-width: 1120px; margin: 0 auto; display: grid;
          grid-template-columns: 1.05fr 0.95fr; gap: 60px; align-items: center;
        }
        @media (max-width: 880px) { .d-hero-grid { grid-template-columns: 1fr; gap: 44px; } }
        .d-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem; color: var(--green); margin-bottom: 18px; }
        .d-hero h1 { font-size: clamp(2.3rem, 4.6vw, 3.4rem); line-height: 1.1; max-width: 15ch; }
        .d-hero p.lede { margin-top: 20px; font-size: 1.05rem; color: var(--ink-dim); max-width: 46ch; }
        .d-cta-row { margin-top: 34px; display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .d-btn-primary {
          background: var(--green); color: #0F1115; padding: 13px 24px; border-radius: 4px;
          font-size: 0.95rem; font-weight: 600; display: inline-block; transition: background 0.2s ease;
        }
        .d-btn-primary:hover { background: #A3E066; }
        .d-cta-note { font-size: 0.85rem; color: var(--ink-dim); font-family: 'IBM Plex Mono', monospace; }

        /* Terminal mockup */
        .d-terminal {
          background: var(--panel); border: 1px solid var(--line); border-radius: 8px;
          overflow: hidden; font-family: 'IBM Plex Mono', monospace; font-size: 0.85rem;
        }
        .d-terminal-bar { display: flex; gap: 7px; padding: 12px 14px; border-bottom: 1px solid var(--line); }
        .d-terminal-dot { width: 10px; height: 10px; border-radius: 50%; background: #3A3F49; }
        .d-terminal-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 10px; }
        .d-terminal-line { color: var(--ink-dim); }
        .d-terminal-line .prompt { color: var(--green); }
        .d-terminal-line.out { color: var(--ink); padding-left: 18px; }
        .d-terminal-line.ok { color: var(--green); padding-left: 18px; }

        /* Ciclo / etapas */
        .d-cycle { border-top: 1px solid var(--line); padding: 76px 0 40px; }
        .d-cycle-head { max-width: 50ch; margin-bottom: 52px; }
        .d-cycle-head h2 { font-size: 1.9rem; }
        .d-cycle-head p { margin-top: 14px; color: var(--ink-dim); }
        .d-step {
          display: grid; grid-template-columns: 90px 1fr 320px; gap: 28px;
          padding: 30px 0; border-top: 1px solid var(--line); align-items: start;
        }
        .d-step:last-child { border-bottom: 1px solid var(--line); margin-bottom: 76px; }
        @media (max-width: 860px) {
          .d-step { grid-template-columns: 50px 1fr; }
          .d-step-snippet { grid-column: 1 / -1; }
        }
        .d-step-num { font-family: 'IBM Plex Mono', monospace; color: var(--blue); font-size: 0.95rem; }
        .d-step-body h3 { font-size: 1.25rem; }
        .d-step-body p { margin-top: 8px; color: var(--ink-dim); font-size: 0.94rem; max-width: 52ch; }
        .d-step-tools { margin-top: 10px; font-size: 0.8rem; color: var(--ink-dim); font-family: 'IBM Plex Mono', monospace; }
        .d-step-snippet {
          background: var(--panel); border: 1px solid var(--line); border-radius: 6px;
          padding: 12px 14px; font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; color: var(--green);
          white-space: nowrap; overflow-x: auto; align-self: center;
        }

        /* Ecossistema */
        .d-eco { padding: 20px 0 84px; }
        .d-eco-head { margin-bottom: 40px; max-width: 50ch; }
        .d-eco-head h2 { font-size: 1.9rem; }
        .d-eco-head p { margin-top: 14px; color: var(--ink-dim); }
        .d-eco-grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
        @media (max-width: 760px) { .d-eco-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 480px) { .d-eco-grid { grid-template-columns: 1fr; } }
        .d-eco-cell { border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); padding: 26px 22px; }
        .d-eco-cell h3 { font-size: 1.02rem; font-weight: 600; }
        .d-eco-cell p { margin-top: 10px; color: var(--ink-dim); font-size: 0.86rem; font-family: 'IBM Plex Mono', monospace; }

        /* Log quote */
        .d-log { padding: 70px 0; border-top: 1px solid var(--line); }
        .d-log-line { font-family: 'IBM Plex Mono', monospace; font-size: 0.95rem; color: var(--ink-dim); }
        .d-log-line .tag { color: var(--green); }
        .d-log blockquote {
          font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.3rem, 2.6vw, 1.9rem);
          max-width: 30ch; line-height: 1.4; margin: 18px 0 0;
        }
        .d-log cite { display: block; margin-top: 20px; font-style: normal; font-size: 0.85rem; color: var(--ink-dim); }

        /* Final */
        .d-final { padding: 84px 0 64px; border-top: 1px solid var(--line); text-align: center; }
        .d-final h2 { font-size: clamp(1.7rem, 3.6vw, 2.4rem); max-width: 20ch; margin: 0 auto; }
        .d-final .d-btn-primary { margin-top: 28px; }
        .d-footer {
          padding: 28px 0 40px; font-size: 0.8rem; color: var(--ink-dim); font-family: 'IBM Plex Mono', monospace;
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px;
        }
      `;

export default function DevOpsLandingPage(): React.ReactElement {
  return (
    <div className="devops">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="d-header">
        <div className="d-logo">
          pipeline<span className="dot">.</span>ops
        </div>
        <nav className="d-nav">
          <a href="#ciclo">O ciclo</a>
          <a href="#ecossistema">Ecossistema</a>
          <a href="#contato">Falar com o time</a>
        </nav>
      </header>

      <section className="d-hero wrap">
        <div className="d-hero-grid">
          <div>
            <div className="d-eyebrow">// ecossistema devops</div>
            <h1>Do commit ao monitoramento, em um fluxo só.</h1>
            <p className="lede">
              Um guia prático das oito etapas que formam o ciclo DevOps — e as ferramentas
              que times usam em cada uma delas, do primeiro commit ao alerta em produção.
            </p>
            <div className="d-cta-row">
              <a href="#ciclo" className="d-btn-primary">Ver o ciclo completo</a>
              <span className="d-cta-note">8 etapas · leitura de 6 min</span>
            </div>
          </div>
          <div className="d-terminal" aria-hidden="true">
            <div className="d-terminal-bar">
              <div className="d-terminal-dot" />
              <div className="d-terminal-dot" />
              <div className="d-terminal-dot" />
            </div>
            <div className="d-terminal-body">
              <div className="d-terminal-line"><span className="prompt">$</span> git push origin main</div>
              <div className="d-terminal-line out">Compilando build #482...</div>
              <div className="d-terminal-line out">Rodando 214 testes...</div>
              <div className="d-terminal-line ok">✓ Deploy concluído em 47s</div>
              <div className="d-terminal-line"><span className="prompt">$</span> _</div>
            </div>
          </div>
        </div>
      </section>

      <section className="d-cycle wrap" id="ciclo">
        <div className="d-cycle-head">
          <h2>O ciclo DevOps, etapa por etapa</h2>
          <p>Cada fase entrega um artefato para a próxima — e a última alimenta a primeira com dados reais de produção.</p>
        </div>
        {etapas.map((etapa) => (
          <div className="d-step" key={etapa.numero}>
            <div className="d-step-num">{etapa.numero}</div>
            <div className="d-step-body">
              <h3>{etapa.fase}</h3>
              <p>{etapa.texto}</p>
              <div className="d-step-tools">{etapa.ferramentas}</div>
            </div>
            <div className="d-step-snippet">{etapa.snippet}</div>
          </div>
        ))}
      </section>

      <section className="d-eco wrap" id="ecossistema">
        <div className="d-eco-head">
          <h2>O ecossistema por trás de cada etapa</h2>
          <p>Nenhuma ferramenta cobre o ciclo inteiro — o ecossistema é o que faz o pipeline funcionar de ponta a ponta.</p>
        </div>
        <div className="d-eco-grid">
          {categorias.map((c) => (
            <div className="d-eco-cell" key={c.nome}>
              <h3>{c.nome}</h3>
              <p>{c.exemplos}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="d-log wrap">
        <div className="d-log-line"><span className="tag">[info]</span> depoimento — time de plataforma</div>
        <blockquote>
          Reduzimos o tempo entre commit e produção de dois dias para menos de uma hora.
        </blockquote>
        <cite>— líder de plataforma, empresa de médio porte</cite>
      </section>

      <section className="d-final wrap" id="contato">
        <h2>Pronto para automatizar seu próprio pipeline?</h2>
        <a href="#" className="d-btn-primary">Falar com o time</a>
      </section>

      <footer className="d-footer wrap">
        <span>© {new Date().getFullYear()} pipeline.ops</span>
        <span>Guia educativo sobre o ciclo DevOps</span>
      </footer>
    </div>
  );
}
