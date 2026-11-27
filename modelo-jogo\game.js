// ============================================================================
// LONDRINA X1 — Jogo Educacional de Educação Física (Regras e Disciplina)
// ============================================================================

const canvas = document.getElementById("canvas-campo");
const ctx = canvas.getContext("2d");

// Elementos da interface
const elFaseAtual = document.getElementById("fase-atual");
const elGolsJogador = document.getElementById("gols-jogador");
const elGolsAdversario = document.getElementById("gols-adversario");
const elRelogio = document.getElementById("relogio-partida");
const elBarraDisciplina = document.getElementById("barra-disciplina");
const elBannerFeedback = document.getElementById("banner-feedback");
const elTituloFeedback = document.getElementById("titulo-feedback");
const elTextoFeedback = document.getElementById("texto-feedback");

const elModalDesafio = document.getElementById("modal-desafio");
const elCategoriaDesafio = document.getElementById("categoria-desafio");
const elTituloDesafio = document.getElementById("titulo-desafio");
const elPerguntaDesafio = document.getElementById("pergunta-desafio");
const elOpcoesDesafio = document.getElementById("opcoes-desafio");

const elTelaInicio = document.getElementById("tela-inicio");
const elTelaFim = document.getElementById("tela-fim");
const elEtiquetaResultado = document.getElementById("etiqueta-resultado");
const elTituloResultado = document.getElementById("titulo-resultado");
const elResumoResultado = document.getElementById("resumo-resultado");
const elPlacarFinal = document.getElementById("placar-final");
const elDisciplinaFinal = document.getElementById("disciplina-final");
const elPontosFinais = document.getElementById("pontos-finais");

const elBarraForca = document.getElementById("barra-forca");
const elAvisoAltura = document.getElementById("aviso-altura");

// Preferência de acessibilidade (menos animação)
const menosAnimacao = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Banco de situações de Regra e Disciplina (dificuldade crescente)
const desafiosEducativos = [
  {
    categoria: "Rodada 1 • Respeito e Fair Play",
    titulo: "Adversário caiu após dividida limpa!",
    pergunta: "A bola sobrou para você com o gol aberto, mas o colega sentiu o tornozelo no chão. O que é mais disciplinado fazer?",
    opcoes: [
      {
        texto: "Colocar a bola para fora para ele receber atendimento.",
        correta: true,
        explicacao: "Boa! O jogo limpo (fair play) coloca a saúde e o respeito acima do gol."
      },
      {
        texto: "Fazer o gol rápido enquanto ele está caído e rir dele.",
        correta: false,
        explicacao: "Falta de espírito esportivo! Respeitar o adversário faz parte da disciplina."
      },
      {
        texto: "Reclamar gritando com o juiz dizendo que é fingimento.",
        correta: false,
        explicacao: "Desrespeitar e gritar gera advertência por indisciplina."
      }
    ]
  },
  {
    categoria: "Rodada 2 • Regra do Tiro de Meta",
    titulo: "Você chutou alto por cima do travessão!",
    pergunta: "Quando a bola sai pela linha de fundo após toque do atacante, como o jogo recomeça?",
    opcoes: [
      {
        texto: "Com tiro de meta cobrado pelo time que estava defendendo.",
        correta: true,
        explicacao: "Correto! Bola tocada por último pelo ataque sai em tiro de meta para a defesa."
      },
      {
        texto: "Com escanteio a favor de quem chutou para fora.",
        correta: false,
        explicacao: "Escanteio só acontece quando o último toque foi de quem defendia."
      },
      {
        texto: "Com arremesso lateral perto da bandeirinha.",
        correta: false,
        explicacao: "Lateral é apenas quando a bola sai pelas linhas laterais do campo."
      }
    ]
  },
  {
    categoria: "Rodada 3 • Uso das Mãos",
    titulo: "Bola alta na disputa 1 contra 1!",
    pergunta: "Na linha do campo (fora da área como goleiro), o que acontece se um jogador usar a mão de propósito para dominar a bola?",
    opcoes: [
      {
        texto: "É marcada falta (tiro livre direto) e pode gerar cartão.",
        correta: true,
        explicacao: "Isso mesmo! Tocar a bola intencionalmente com a mão é infração às regras."
      },
      {
        texto: "O lance segue normal se ninguém reclamar.",
        correta: false,
        explicacao: "As regras valem o tempo todo, mesmo sem reclamação."
      },
      {
        texto: "Vale dois pontos para quem pegou a bola.",
        correta: false,
        explicacao: "No futebol, apenas o goleiro dentro da própria área pode usar as mãos."
      }
    ]
  },
  {
    categoria: "Rodada 4 • Disciplina com a Arbitragem",
    titulo: "O árbitro marcou uma falta contra você!",
    pergunta: "Você achou que não foi falta. Qual atitude demonstra autocontrole e disciplina em quadra?",
    opcoes: [
      {
        texto: "Aceitar a marcação, recuar para a barreira e focar no próximo lance.",
        correta: true,
        explicacao: "Excelente! Manter a calma evita cartões desnecessários e ajuda seu time."
      },
      {
        texto: "Chutar a bola para longe com raiva para atrasar o jogo.",
        correta: false,
        explicacao: "Chutar a bola após o apito rende cartão amarelo por retardar o reinício."
      },
      {
        texto: "Empurrar o adversário para mostrar quem manda.",
        correta: false,
        explicacao: "Conduta violenta resulta em cartão vermelho e derrota imediata!"
      }
    ]
  },
  {
    categoria: "Rodada 5 • Regra do Gol e Travessão",
    titulo: "Chute forte no travessão!",
    pergunta: "Para um gol ser considerado válido pela regra oficial do futebol, o que precisa acontecer?",
    opcoes: [
      {
        texto: "A bola precisa ultrapassar totalmente a linha de gol entre as traves e sob o travessão.",
        correta: true,
        explicacao: "Perfeito! Se parte da bola ainda estiver sobre a linha, não é gol."
      },
      {
        texto: "Basta a bola bater na trave ou no travessão.",
        correta: false,
        explicacao: "Bater na trave não conta gol; a bola tem que cruzar toda a linha."
      },
      {
        texto: "Basta metade da bola encostar na linha do gol.",
        correta: false,
        explicacao: "A regra exige que a circunferência inteira da bola passe da linha."
      }
    ]
  },
  {
    categoria: "Rodada 6 • Cobrança de Pênalti",
    titulo: "Decisão na marca da cal!",
    pergunta: "Durante uma cobrança de pênalti, o que é obrigatório pela regra?",
    opcoes: [
      {
        texto: "O goleiro deve manter pelo menos um pé na linha de gol até o chute.",
        correta: true,
        explicacao: "Muito bem! O goleiro não pode se adiantar totalmente antes da bola ser chutada."
      },
      {
        texto: "O batedor pode parar completamente no final da corrida para enganar o goleiro.",
        correta: false,
        explicacao: "Parar totalmente no último passo (finta ilegal) invalida a cobrança e gera cartão."
      },
      {
        texto: "Os outros jogadores podem ficar dentro da área durante o chute.",
        correta: false,
        explicacao: "Todos devem ficar fora da área e da meia-lua até o toque na bola."
      }
    ]
  }
];

// Estado principal do jogo
const estado = {
  tela: "inicio", // inicio, jogando, desafio, penaltis, fim
  modoPenaltis: false,
  golsJogador: 0,
  golsAdversario: 0,
  penaltisJogador: 0,
  penaltisAdversario: 0,
  cobrancasFeitas: 0,
  turnoPenalti: "jogador", // jogador ou adversario
  rodadaAtual: 1,
  maxRodadas: 6,
  tempoRestante: 300, // 5 minutos em segundos
  tempoInicioMs: 0,
  disciplina: 100,
  cartoesAmarelos: 0,
  pontos: 0,
  indiceDesafio: 0,
  carregandoChute: false,
  forcaChute: 25,
  direcaoForca: 1,
  temporizadorFeedback: null
};

// Constantes do campo e física
const CHAO_Y = 305;
const GRAVIDADE = 0.55;
const TRAVE_ALTURA = 115;
const TRAVE_LARGURA = 14;

const jogador = {
  x: 190,
  y: CHAO_Y,
  largura: 34,
  altura: 54,
  vx: 0,
  vy: 0,
  noChao: true,
  corCamisa: "#1d4ed8"
};

const adversario = {
  x: 575,
  y: CHAO_Y,
  largura: 34,
  altura: 54,
  vx: 0,
  vy: 0,
  noChao: true,
  corCamisa: "#dc2626"
};

const bola = {
  x: 400,
  y: 220,
  raio: 13,
  vx: 0,
  vy: 0
};

// Controles ativos
const teclas = {
  esquerda: false,
  direita: false
};

// Torcida decorativa no fundo da arquibancada
const torcida = Array.from({ length: 34 }, (_, i) => ({
  x: 30 + i * 22,
  cor: ["#facc15", "#38bdf8", "#f87171", "#a3e635", "#ffffff"][i % 5],
  fase: i * 0.7
}));

// ============================================================================
// CONTRATO COM O PORTAL (vrgame)
// ============================================================================
function enviarMensagemPortal(dados) {
  if (window.parent && window.parent !== window) {
    window.parent.postMessage(dados, "*");
  }
}

function notificarAltura() {
  const altura = document.documentElement.scrollHeight;
  enviarMensagemPortal({ type: "vrgame:resize", height: altura });
}

window.addEventListener("message", (evento) => {
  const dados = evento.data;
  if (!dados || typeof dados !== "object") return;

  if (dados.type === "vrgame:theme" && (dados.theme === "light" || dados.theme === "dark")) {
    document.documentElement.setAttribute("data-theme", dados.theme);
  }

  if (dados.type === "vrgame:fullscreen") {
    if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }
});

window.addEventListener("resize", notificarAltura);

// ============================================================================
// FUNÇÕES DE INTERFACE E FEEDBACK
// ============================================================================
function mostrarFeedback(titulo, texto, ehErro = false) {
  elTituloFeedback.textContent = titulo;
  elTextoFeedback.textContent = texto;
  elBannerFeedback.classList.remove("oculto", "erro");
  if (ehErro) {
    elBannerFeedback.classList.add("erro");
  }

  clearTimeout(estado.temporizadorFeedback);
  estado.temporizadorFeedback = setTimeout(() => {
    elBannerFeedback.classList.add("oculto");
  }, 3600);
}

function atualizarPainel() {
  elGolsJogador.textContent = estado.modoPenaltis
    ? `${estado.golsJogador} (${estado.penaltisJogador})`
    : estado.golsJogador;
  elGolsAdversario.textContent = estado.modoPenaltis
    ? `${estado.golsAdversario} (${estado.penaltisAdversario})`
    : estado.golsAdversario;

  if (estado.modoPenaltis) {
    elFaseAtual.textContent = `Pênaltis (${Math.min(estado.cobrancasFeitas + 1, 3)}/3)`;
  } else {
    elFaseAtual.textContent = `Rodada ${estado.rodadaAtual}/${estado.maxRodadas}`;
  }

  const minutos = String(Math.floor(estado.tempoRestante / 60)).padStart(2, "0");
  const segundos = String(estado.tempoRestante % 60).padStart(2, "0");
  elRelogio.textContent = `${minutos}:${segundos}`;

  elBarraDisciplina.style.width = `${Math.max(0, estado.disciplina)}%`;
  if (estado.disciplina > 60) {
    elBarraDisciplina.style.backgroundColor = "#16a34a";
  } else if (estado.disciplina > 30) {
    elBarraDisciplina.style.backgroundColor = "#eab308";
  } else {
    elBarraDisciplina.style.backgroundColor = "#dc2626";
  }
}

function posicionarParaLance() {
  jogador.x = 200;
  jogador.y = CHAO_Y;
  jogador.vx = 0;
  jogador.vy = 0;
  jogador.noChao = true;

  adversario.x = 565;
  adversario.y = CHAO_Y;
  adversario.vx = 0;
  adversario.vy = 0;
  adversario.noChao = true;

  bola.x = 400;
  bola.y = 210;
  bola.vx = (Math.random() > 0.5 ? 1 : -1) * 2.2;
  bola.vy = -1.5;
}

function prepararCobrancaPenalti() {
  if (estado.turnoPenalti === "jogador") {
    jogador.x = 470;
    jogador.y = CHAO_Y;
    adversario.x = 735;
    adversario.y = CHAO_Y;
    bola.x = 530;
    bola.y = CHAO_Y - bola.raio;
    bola.vx = 0;
    bola.vy = 0;
    mostrarFeedback("Sua vez no Pênalti!", "Mire e chute sem isolar a bola por cima do gol!");
  } else {
    jogador.x = 35;
    jogador.y = CHAO_Y;
    adversario.x = 300;
    adversario.y = CHAO_Y;
    bola.x = 260;
    bola.y = CHAO_Y - bola.raio;
    bola.vx = 0;
    bola.vy = 0;
    mostrarFeedback("Defenda o Pênalti!", "Use Trás/Frente e Pular para defender o chute do rival!");
    setTimeout(() => {
      if (estado.tela === "penaltis" && estado.turnoPenalti === "adversario") {
        bola.vx = -12.5;
        bola.vy = -(3.5 + Math.random() * 5.2);
      }
    }, 1200);
  }
}

// ============================================================================
// DESAFIOS EDUCATIVOS DE REGRAS E DISCIPLINA
// ============================================================================
function abrirDesafioEducativo() {
  estado.tela = "desafio";
  estado.carregandoChute = false;

  const desafio = desafiosEducativos[estado.indiceDesafio % desafiosEducativos.length];
  estado.indiceDesafio += 1;

  elCategoriaDesafio.textContent = desafio.categoria;
  elTituloDesafio.textContent = desafio.titulo;
  elPerguntaDesafio.textContent = desafio.pergunta;
  elOpcoesDesafio.innerHTML = "";

  desafio.opcoes.forEach((opcao) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-opcao";
    botao.textContent = opcao.texto;
    botao.addEventListener("click", () => responderDesafio(opcao));
    elOpcoesDesafio.appendChild(botao);
  });

  elModalDesafio.classList.remove("oculto");
  notificarAltura();
}

function responderDesafio(opcao) {
  elModalDesafio.classList.add("oculto");

  if (opcao.correta) {
    estado.disciplina = Math.min(100, estado.disciplina + 10);
    estado.pontos += 50;
    mostrarFeedback("Decisão Disciplinada! (+50 pts)", opcao.explicacao, false);
    // Vantagem: bola vem a favor do jogador
    posicionarParaLance();
    bola.x = 330;
    bola.vx = 1.5;
  } else {
    estado.disciplina = Math.max(0, estado.disciplina - 35);
    estado.cartoesAmarelos += 1;
    mostrarFeedback("Cartão por Indisciplina!", opcao.explicacao, true);

    if (estado.disciplina <= 0 || estado.cartoesAmarelos >= 3) {
      encerrarJogo(false, "Você recebeu cartão vermelho por acumular indisciplinas!");
      return;
    }
    posicionarParaLance();
    bola.x = 470;
    bola.vx = -2.5;
  }

  atualizarPainel();
  estado.tela = "jogando";
}

// ============================================================================
// MECÂNICA DE PULO, CHUTE E REGRAS DO CAMPO
// ============================================================================
function pularJogador() {
  if (estado.tela !== "jogando" && estado.tela !== "penaltis") return;
  if (jogador.noChao) {
    jogador.vy = -12.2;
    jogador.noChao = false;
  }
}

function iniciarForcaChute() {
  if (estado.tela !== "jogando" && estado.tela !== "penaltis") return;
  if (estado.tela === "penaltis" && estado.turnoPenalti !== "jogador") return;
  estado.carregandoChute = true;
}

function executarChute() {
  if (!estado.carregandoChute) return;
  estado.carregandoChute = false;

  const distancia = Math.hypot(
    bola.x - (jogador.x + jogador.largura / 2),
    bola.y - (jogador.y - jogador.altura / 2)
  );

  // Nos pênaltis, o jogador já está posicionado na bola
  const alcance = estado.tela === "penaltis" ? 95 : 68;
  if (distancia > alcance) return;

  const forca = estado.forcaChute;
  // Se segurar demais (força > 76), o jogador erra chutando alto por cima do gol
  if (forca > 76) {
    bola.vx = 11.5;
    bola.vy = -13.5;
    mostrarFeedback("Chutou alto demais!", "Segure menos o botão de chute para a bola não passar por cima do travessão.", true);
  } else {
    const impulsoVertical = -3.2 - (forca / 76) * 5.2;
    bola.vx = 10.5 + (forca / 100) * 4;
    bola.vy = impulsoVertical;
  }

  estado.forcaChute = 25;
  atualizarBarraForca();
}