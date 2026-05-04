// Dados visuais das paginas silo — hardcoded por modalidade
// Alimentam as dobras visuais. O texto SEO fica no MDX expandido.

export interface SiloCard {
  icon: string;   // SVG path
  title: string;
  text: string;
}

export interface SiloStep {
  num: string;
  title: string;
  text: string;
}

export interface SiloPerson {
  emoji: string;
  title: string;
  text: string;
}

export interface SiloBairro {
  label: string;
  href: string;
}

export interface SiloData {
  andar: string;
  cor: 'roxo' | 'gold' | 'orange' | 'gray' | 'red';
  overline: string;
  heroIntroShort: string;
  stats: Array<{ num: string; label: string }>;
  whatIsTitle: string;
  whatIsCards: SiloCard[];
  howTitle: string;
  howSteps: SiloStep[];
  forWhomTitle: string;
  forWhom: SiloPerson[];
  bairros: SiloBairro[];
  ctaLabel: string;
}

const BAIRROS_MUSCULACAO: SiloBairro[] = [
  { label: 'Prado', href: '/musculacao-em-prado/' },
  { label: 'Barro Preto', href: '/musculacao-em-barro-preto/' },
  { label: 'Barroca', href: '/musculacao-em-barroca/' },
  { label: 'Alto Barroca', href: '/musculacao-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/musculacao-em-carlos-prates/' },
  { label: 'California', href: '/musculacao-em-california/' },
  { label: 'Calafate', href: '/musculacao-em-calafate/' },
  { label: 'Gutierrez', href: '/musculacao-em-gutierrez/' },
  { label: 'Nova Suica', href: '/musculacao-em-nova-suica/' },
  { label: 'Padre Eustaquio', href: '/musculacao-em-padre-eustaquio/' },
  { label: 'Caicara', href: '/musculacao-em-caicara/' },
  { label: 'Santo Agostinho', href: '/musculacao-em-santo-agostinho/' },
];

const BAIRROS_PILATES: SiloBairro[] = [
  { label: 'Prado', href: '/pilates-em-prado/' },
  { label: 'Barro Preto', href: '/pilates-em-barro-preto/' },
  { label: 'Barroca', href: '/pilates-em-barroca/' },
  { label: 'Alto Barroca', href: '/pilates-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/pilates-em-carlos-prates/' },
  { label: 'California', href: '/pilates-em-california/' },
  { label: 'Calafate', href: '/pilates-em-calafate/' },
  { label: 'Gutierrez', href: '/pilates-em-gutierrez/' },
  { label: 'Nova Suica', href: '/pilates-em-nova-suica/' },
  { label: 'Padre Eustaquio', href: '/pilates-em-padre-eustaquio/' },
  { label: 'Caicara', href: '/pilates-em-caicara/' },
  { label: 'Santo Agostinho', href: '/pilates-em-santo-agostinho/' },
];

const BAIRROS_FUNCIONAL: SiloBairro[] = [
  { label: 'Prado', href: '/treino-funcional-em-prado/' },
  { label: 'Barro Preto', href: '/treino-funcional-em-barro-preto/' },
  { label: 'Barroca', href: '/treino-funcional-em-barroca/' },
  { label: 'Alto Barroca', href: '/treino-funcional-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/treino-funcional-em-carlos-prates/' },
  { label: 'California', href: '/treino-funcional-em-california/' },
  { label: 'Calafate', href: '/treino-funcional-em-calafate/' },
  { label: 'Gutierrez', href: '/treino-funcional-em-gutierrez/' },
  { label: 'Nova Suica', href: '/treino-funcional-em-nova-suica/' },
  { label: 'Padre Eustaquio', href: '/treino-funcional-em-padre-eustaquio/' },
  { label: 'Caicara', href: '/treino-funcional-em-caicara/' },
  { label: 'Santo Agostinho', href: '/treino-funcional-em-santo-agostinho/' },
];

const BAIRROS_YOGA: SiloBairro[] = [
  { label: 'Prado', href: '/yoga-em-prado/' },
  { label: 'Barro Preto', href: '/yoga-em-barro-preto/' },
  { label: 'Barroca', href: '/yoga-em-barroca/' },
  { label: 'Alto Barroca', href: '/yoga-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/yoga-em-carlos-prates/' },
  { label: 'California', href: '/yoga-em-california/' },
  { label: 'Calafate', href: '/yoga-em-calafate/' },
  { label: 'Gutierrez', href: '/yoga-em-gutierrez/' },
  { label: 'Nova Suica', href: '/yoga-em-nova-suica/' },
  { label: 'Padre Eustaquio', href: '/yoga-em-padre-eustaquio/' },
  { label: 'Caicara', href: '/yoga-em-caicara/' },
  { label: 'Santo Agostinho', href: '/yoga-em-santo-agostinho/' },
];

const BAIRROS_KRAV: SiloBairro[] = [
  { label: 'Prado', href: '/krav-maga-em-prado/' },
  { label: 'Barro Preto', href: '/krav-maga-em-barro-preto/' },
  { label: 'Barroca', href: '/krav-maga-em-barroca/' },
  { label: 'Alto Barroca', href: '/krav-maga-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/krav-maga-em-carlos-prates/' },
  { label: 'California', href: '/krav-maga-em-california/' },
  { label: 'Calafate', href: '/krav-maga-em-calafate/' },
  { label: 'Gutierrez', href: '/krav-maga-em-gutierrez/' },
  { label: 'Nova Suica', href: '/krav-maga-em-nova-suica/' },
  { label: 'Padre Eustaquio', href: '/krav-maga-em-padre-eustaquio/' },
  { label: 'Caicara', href: '/krav-maga-em-caicara/' },
  { label: 'Santo Agostinho', href: '/krav-maga-em-santo-agostinho/' },
];

export const siloData: Record<string, SiloData> = {
  musculacao: {
    andar: '1 Andar · Studio Livel',
    cor: 'roxo',
    overline: '1 Andar · Studio · Musculacao',
    heroIntroShort: 'Forca, hipertrofia e composicao corporal com periodizacao cientifica. Sessoes de 45 minutos, turmas de ate 6 alunos e reavaliacao a cada 3 semanas.',
    stats: [
      { num: '45min', label: 'Por sessao' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que e a musculacao no Studio Livel',
    whatIsCards: [
      { icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7', title: 'Periodizacao em 3 semanas', text: 'Ciclos forca, hipertrofia e resistencia com reavaliacao obrigatoria ao final de cada mesociclo.' },
      { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', title: 'Maximo 6 alunos', text: 'Turmas reduzidas com acompanhamento individual em cada exercicio. Sem academias de volume.' },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Progressao documentada', text: 'Carga, volume e esforco percebido registrados a cada sessao. Evolucao mensuravel por ciclo.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Metodo Livel', text: 'Metodologia propria formalizada em 2016. Aplicada na musculacao com RPE controlado por semana.' },
    ],
    howTitle: 'Como funciona uma sessao',
    howSteps: [
      { num: '01', title: 'Aula-Avaliacao gratuita', text: 'Primeiro contato de 45 minutos. O educador fisico mapeia historico, objetivos e define o programa.' },
      { num: '02', title: 'Aquecimento e ativacao', text: '10 minutos. Preparacao articular e muscular especifica para o ciclo da semana.' },
      { num: '03', title: 'Sessao principal', text: '30 minutos. Exercicios com carga, volume e RPE definidos pelo Metodo Livel. Correcao ativa.' },
      { num: '04', title: 'Reavaliacao periodica', text: 'A cada 3 semanas. Ajuste de cargas, intensidade e objetivos para o proximo ciclo.' },
    ],
    forWhomTitle: 'Para quem e a musculacao',
    forWhom: [
      { emoji: '🔰', title: 'Iniciantes', text: 'Quem nunca treinou ou voltou apos longo periodo de inatividade. Progressao segura e supervisionada.' },
      { emoji: '🧑', title: 'Adultos 30 a 60', text: 'Composicao corporal, saude metabolica e prevencao de sarcopenia com progressao documentada.' },
      { emoji: '👴', title: 'Silver Economy 60+', text: 'Manutencao de massa muscular, forca funcional e independencia com protocolo adaptado.' },
      { emoji: '⚖️', title: 'Emagrecimento', text: 'Combinacao de musculacao com outras modalidades do estudio para otimizar o gasto metabolico.' },
      { emoji: '🏃', title: 'Atletas e esportistas', text: 'Periodizacao complementar ao esporte principal. Forca especifica e prevencao de lesoes.' },
      { emoji: '♀️', title: 'Musculacao feminina', text: 'Hipertrofia e tonus com protocolo adaptado para as especificidades fisiologicas femininas.' },
    ],
    bairros: BAIRROS_MUSCULACAO,
    ctaLabel: 'Agendar Aula-Avaliacao',
  },

  pilates: {
    andar: '2 Andar · Studio Livel',
    cor: 'gold',
    overline: '2 Andar · Pilates · Studio Livel',
    heroIntroShort: 'Mobilidade, postura e ativacao profunda em equipamentos Reformer, Cadillac e Chair. Sessoes de 50 minutos com ate 6 alunos por professor.',
    stats: [
      { num: '50min', label: 'Por sessao' },
      { num: '6', label: 'Alunos max' },
      { num: '12', label: 'Bairros atendidos' },
      { num: '4.9', label: 'Google (782 aval.)' },
    ],
    whatIsTitle: 'O que e o Pilates no Studio Livel',
    whatIsCards: [
      { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Reformer', text: 'Cama deslizante com molas regulaveis. Forca, controle e mobilidade em diferentes posicoes.' },
      { icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z', title: 'Cadillac', text: 'Estrutura aerea com molas e barras. Ideal para reabilitacao e sub-publicos especificos.' },
      { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Chair', text: 'Forca de membros inferiores e estabilidade de tronco. Pedal com resistencia de molas.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Mat Pilates', text: 'Trabalho de solo com os seis principios: concentracao, controle, centro, fluidez, precisao, respiracao.' },
    ],
    howTitle: 'Como e uma sessao de 50 minutos',
    howSteps: [
      { num: '01', title: 'Aula-Avaliacao gratuita', text: 'Primeiro contato. Mapeamento de historico de lesoes, mobilidade e objetivos.' },
      { num: '02', title: 'Aquecimento articular', text: '8 minutos. Preparacao das articulacoes e ativacao do core profundo.' },
      { num: '03', title: 'Sequencia principal', text: '35 minutos. Rotacao pelos equipamentos com correcao ativa em cada exercicio.' },
      { num: '04', title: 'Fechamento', text: '7 minutos. Alongamento ou trabalho respiratorio para integracao final.' },
    ],
    forWhomTitle: 'Para quem e o Pilates',
    forWhom: [
      { emoji: '👴', title: 'Silver Economy 60+', text: 'Mobilidade, equilibrio e independencia funcional. Modalidade prioritaria para adultos acima dos 60 anos.' },
      { emoji: '🤰', title: 'Gestantes', text: 'A partir do 2 trimestre com liberacao do obstetra. Fortalecimento do assoalho pelvico.' },
      { emoji: '🏥', title: 'Pos-cirurgico', text: 'Ortopedico, cesarea, abdominal ou cardiaco. Protocolo em 5 fases com laudo medico.' },
      { emoji: '🦴', title: 'Dores de coluna', text: 'Hernia lombar, cervical, escoliose. Core profundo que estabiliza e protege.' },
      { emoji: '🔰', title: 'Iniciantes', text: 'Porta de entrada de baixo impacto. Turma reduzida reduz risco na fase inicial.' },
      { emoji: '🏋️', title: 'Complemento ao treino', text: 'Pilates + musculacao: mobilidade que sustenta a forca. Resultado consistente.' },
    ],
    bairros: BAIRROS_PILATES,
    ctaLabel: 'Agendar Aula de Pilates',
  },

  funcional: {
    andar: '3 Andar · Studio Livel',
    cor: 'orange',
    overline: '3 Andar · Funcional FitBox · Studio Livel',
    heroIntroShort: 'Circuitos funcionais em grupo com o Kit FitBox. 30 minutos de alta eficiencia. O mesmo protocolo disponivel no app para treinar em casa.',
    stats: [
      { num: '30min', label: 'Por sessao' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que e o Funcional FitBox',
    whatIsCards: [
      { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', title: 'Kit FitBox', text: 'Elasticos inteligentes, cintas, box, manoplas, bastao e colchonete. Sem maquinas tradicionais.' },
      { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Circuitos em grupo', text: 'Estacoes de exercicio com tempo controlado. Dinamica coletiva que eleva a motivacao.' },
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: '30 minutos', text: 'Sessao compacta de alta eficiencia. Formato pensado para quem tem agenda ocupada.' },
      { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'App Livel', text: 'O mesmo protocolo do estudio disponivel no aplicativo para continuar o treino em casa.' },
    ],
    howTitle: 'Como e uma sessao FitBox',
    howSteps: [
      { num: '01', title: 'Montagem das estacoes', text: '2 minutos. Cada aluno prepara o Kit FitBox no seu espaco marcado na sala.' },
      { num: '02', title: 'Aquecimento coletivo', text: '5 minutos. Ativacao articular e preparacao para os circuitos do dia.' },
      { num: '03', title: 'Circuito principal', text: '20 minutos. Rotacao pelas estacoes com tempo definido e descanso controlado.' },
      { num: '04', title: 'Recuperacao ativa', text: '3 minutos. Respiracao e alongamento para fechar a sessao com qualidade.' },
    ],
    forWhomTitle: 'Para quem e o Funcional FitBox',
    forWhom: [
      { emoji: '🔰', title: 'Todos os niveis', text: 'A intensidade e ajustada individualmente. Iniciantes treinam junto com avancados.' },
      { emoji: '⏱️', title: 'Agenda ocupada', text: '30 minutos de resultado real. Solucao para quem nao tem tempo para treinos longos.' },
      { emoji: '⚖️', title: 'Emagrecimento', text: 'Alta demanda metabolica em formato curto. Complemento ideal para Pilates ou Musculacao.' },
      { emoji: '🤸', title: 'Condicionamento fisico', text: 'Padroes motores naturais com carga portatil. Capacidade fisica ampla e variada.' },
      { emoji: '👥', title: 'Quem gosta de grupo', text: 'A dinamica coletiva eleva motivacao e consistencia. Aula nunca igual.' },
      { emoji: '📱', title: 'Treino hibrido', text: 'App Livel permite continuar o protocolo em casa. Estudio + casa com o mesmo metodo.' },
    ],
    bairros: BAIRROS_FUNCIONAL,
    ctaLabel: 'Agendar Aula FitBox',
  },

  yoga: {
    andar: 'Studio Livel · Prado, BH',
    cor: 'gray',
    overline: 'Yoga · Studio Livel · Prado, BH',
    heroIntroShort: 'Sistema codificado de posturas, respiracao e atencao. Pratica secular ensinada como ferramenta tecnica com mecanismos fisiologicos explicaveis.',
    stats: [
      { num: '60min', label: 'Por sessao' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que e o Yoga no Studio Livel',
    whatIsCards: [
      { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Asana', text: 'Posturas fisicas que desenvolvem forca, mobilidade e propriocepcao de forma progressiva.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Pranayama', text: 'Tecnicas de respiracao que regulam o sistema nervoso autonomo. Ferramenta clinica documentada.' },
      { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Atencao', text: 'Treinamento da capacidade de observacao sem julgamento. Base cientifica em neurociencia.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Metodo Livel', text: 'Progressao em ciclos de 3 semanas. Pratica secular sem conteudo religioso ou esoterico.' },
    ],
    howTitle: 'Como e uma sessao de Yoga',
    howSteps: [
      { num: '01', title: 'Aula-Avaliacao gratuita', text: 'Avaliacao de mobilidade, objetivos e experiencia previa com a pratica.' },
      { num: '02', title: 'Aquecimento e respiracao', text: '10 minutos. Pranayama inicial para centrar a atencao e preparar o corpo.' },
      { num: '03', title: 'Sequencia de asanas', text: '40 minutos. Posturas encadeadas com instrucao individual e correcao ativa.' },
      { num: '04', title: 'Savasana e fechamento', text: '10 minutos. Integracao da pratica com relaxamento profundo e observacao.' },
    ],
    forWhomTitle: 'Para quem e o Yoga',
    forWhom: [
      { emoji: '😤', title: 'Estresse elevado', text: 'Pranayama e atencao atuam diretamente no sistema nervoso. Resposta ao estresse mensuravel.' },
      { emoji: '🤸', title: 'Mobilidade', text: 'Recuperacao de amplitude articular perdida. Progresso consistente em 4 a 8 semanas.' },
      { emoji: '👴', title: 'Adultos 60+', text: 'Equilibrio, coordenacao e prevencao de quedas. Protocolo adaptado para cada condicao.' },
      { emoji: '🔰', title: 'Iniciantes', text: 'Nao e preciso ter flexibilidade previa. O Yoga desenvolve mobilidade gradualmente.' },
      { emoji: '💪', title: 'Complemento ao treino', text: 'Yoga + Musculacao ou Pilates. Mobilidade que sustenta a forca e melhora a recuperacao.' },
      { emoji: '🧘', title: 'Meditacao ativa', text: 'Para quem busca equilibrio fisico e mental sem abandono da pratica corporal.' },
    ],
    bairros: BAIRROS_YOGA,
    ctaLabel: 'Agendar Aula de Yoga',
  },

  'krav-maga': {
    andar: 'Studio Livel · Prado, BH',
    cor: 'red',
    overline: 'Krav Maga · Studio Livel · Prado, BH',
    heroIntroShort: 'Defesa pessoal civil com condicionamento fisico integrado. Tecnicas aplicaveis a situacoes reais. Aberto a iniciantes sem experiencia previa em artes marciais.',
    stats: [
      { num: '60min', label: 'Por sessao' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que e o Krav Maga no Studio Livel',
    whatIsCards: [
      { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Defesa pessoal civil', text: 'Tecnicas desenvolvidas para situacoes reais de risco. Sem rituais ou competicao. Pratico.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Condicionamento fisico', text: 'Cada sessao integra forca, agilidade, resistencia e coordenacao motora em formato real.' },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Progressao estruturada', text: 'Metodo Livel aplicado com ciclos de 3 semanas. Evolucao tecnica e fisica documentada.' },
      { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', title: 'Turma reduzida', text: 'Maximo 6 alunos. Correcao tecnica individual impossivel em turmas grandes.' },
    ],
    howTitle: 'Como e uma sessao de Krav Maga',
    howSteps: [
      { num: '01', title: 'Aula-Avaliacao gratuita', text: 'Nivel tecnico, condicao fisica e objetivos. Sem prerequisito de experiencia previa.' },
      { num: '02', title: 'Aquecimento funcional', text: '10 minutos. Ativacao muscular e preparacao articular especifica para o conteudo do dia.' },
      { num: '03', title: 'Tecnicas e simulacoes', text: '40 minutos. Bloqueios, saidas, contra-ataques e simulacoes de situacoes reais controladas.' },
      { num: '04', title: 'Condicionamento e fechamento', text: '10 minutos. Trabalho fisico integrado e revisao das principais tecnicas da sessao.' },
    ],
    forWhomTitle: 'Para quem e o Krav Maga',
    forWhom: [
      { emoji: '♀️', title: 'Mulheres', text: 'Tecnicas especificas para situacoes de risco enfrentadas por mulheres. Empoderamento real.' },
      { emoji: '🔰', title: 'Iniciantes', text: 'Sem experiencia previa em artes marciais necessaria. O curso comeca do zero.' },
      { emoji: '🧑', title: 'Adultos em geral', text: 'Condicao fisica e autoconfianca como objetivos secundarios ao aprendizado tecnico.' },
      { emoji: '👮', title: 'Profissionais de seguranca', text: 'Base tecnica civil com condicionamento especifico para demandas profissionais.' },
      { emoji: '🏋️', title: 'Complemento ao treino', text: 'Krav Maga + Musculacao ou Funcional. Combinacao que desenvolve forca aplicada.' },
      { emoji: '👨‍👩‍👧', title: 'Familias', text: 'Pais que querem que filhos adolescentes desenvolvam consciencia corporal e autodefesa.' },
    ],
    bairros: BAIRROS_KRAV,
    ctaLabel: 'Agendar Aula de Krav Maga',
  },
};
