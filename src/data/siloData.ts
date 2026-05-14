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
  { label: 'Califórnia', href: '/musculacao-em-california/' },
  { label: 'Calafate', href: '/musculacao-em-calafate/' },
  { label: 'Gutierrez', href: '/musculacao-em-gutierrez/' },
  { label: 'Nova Suíça', href: '/musculacao-em-nova-suica/' },
  { label: 'Padre Eustáquio', href: '/musculacao-em-padre-eustaquio/' },
  { label: 'Caiçara', href: '/musculacao-em-caicara/' },
  { label: 'Santo Agostinho', href: '/musculacao-em-santo-agostinho/' },
];

const BAIRROS_PILATES: SiloBairro[] = [
  { label: 'Prado', href: '/pilates-em-prado/' },
  { label: 'Barro Preto', href: '/pilates-em-barro-preto/' },
  { label: 'Barroca', href: '/pilates-em-barroca/' },
  { label: 'Alto Barroca', href: '/pilates-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/pilates-em-carlos-prates/' },
  { label: 'Califórnia', href: '/pilates-em-california/' },
  { label: 'Calafate', href: '/pilates-em-calafate/' },
  { label: 'Gutierrez', href: '/pilates-em-gutierrez/' },
  { label: 'Nova Suíça', href: '/pilates-em-nova-suica/' },
  { label: 'Padre Eustáquio', href: '/pilates-em-padre-eustaquio/' },
  { label: 'Caiçara', href: '/pilates-em-caicara/' },
  { label: 'Santo Agostinho', href: '/pilates-em-santo-agostinho/' },
];

const BAIRROS_FUNCIONAL: SiloBairro[] = [
  { label: 'Prado', href: '/treino-funcional-em-prado/' },
  { label: 'Barro Preto', href: '/treino-funcional-em-barro-preto/' },
  { label: 'Barroca', href: '/treino-funcional-em-barroca/' },
  { label: 'Alto Barroca', href: '/treino-funcional-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/treino-funcional-em-carlos-prates/' },
  { label: 'Califórnia', href: '/treino-funcional-em-california/' },
  { label: 'Calafate', href: '/treino-funcional-em-calafate/' },
  { label: 'Gutierrez', href: '/treino-funcional-em-gutierrez/' },
  { label: 'Nova Suíça', href: '/treino-funcional-em-nova-suica/' },
  { label: 'Padre Eustáquio', href: '/treino-funcional-em-padre-eustaquio/' },
  { label: 'Caiçara', href: '/treino-funcional-em-caicara/' },
  { label: 'Santo Agostinho', href: '/treino-funcional-em-santo-agostinho/' },
];

const BAIRROS_YOGA: SiloBairro[] = [
  { label: 'Prado', href: '/yoga-em-prado/' },
  { label: 'Barro Preto', href: '/yoga-em-barro-preto/' },
  { label: 'Barroca', href: '/yoga-em-barroca/' },
  { label: 'Alto Barroca', href: '/yoga-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/yoga-em-carlos-prates/' },
  { label: 'Califórnia', href: '/yoga-em-california/' },
  { label: 'Calafate', href: '/yoga-em-calafate/' },
  { label: 'Gutierrez', href: '/yoga-em-gutierrez/' },
  { label: 'Nova Suíça', href: '/yoga-em-nova-suica/' },
  { label: 'Padre Eustáquio', href: '/yoga-em-padre-eustaquio/' },
  { label: 'Caiçara', href: '/yoga-em-caicara/' },
  { label: 'Santo Agostinho', href: '/yoga-em-santo-agostinho/' },
];

const BAIRROS_KRAV: SiloBairro[] = [
  { label: 'Prado', href: '/krav-maga-em-prado/' },
  { label: 'Barro Preto', href: '/krav-maga-em-barro-preto/' },
  { label: 'Barroca', href: '/krav-maga-em-barroca/' },
  { label: 'Alto Barroca', href: '/krav-maga-em-alto-barroca/' },
  { label: 'Carlos Prates', href: '/krav-maga-em-carlos-prates/' },
  { label: 'Califórnia', href: '/krav-maga-em-california/' },
  { label: 'Calafate', href: '/krav-maga-em-calafate/' },
  { label: 'Gutierrez', href: '/krav-maga-em-gutierrez/' },
  { label: 'Nova Suíça', href: '/krav-maga-em-nova-suica/' },
  { label: 'Padre Eustáquio', href: '/krav-maga-em-padre-eustaquio/' },
  { label: 'Caiçara', href: '/krav-maga-em-caicara/' },
  { label: 'Santo Agostinho', href: '/krav-maga-em-santo-agostinho/' },
];

export const siloData: Record<string, SiloData> = {
  musculacao: {
    andar: '1 Andar · Studio Livel',
    cor: 'roxo',
    overline: '1 Andar · Studio · Musculação',
    heroIntroShort: 'Força, hipertrofia e composição corporal com periodização científica. Sessões de 45 minutos, turmas de até 6 alunos e reavaliação a cada 3 semanas.',
    stats: [
      { num: '45min', label: 'Por sessão' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que é a Musculação no Studio Livel.',
    whatIsCards: [
      { icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7', title: 'Periodização em 3 semanas', text: 'Ciclos força, hipertrofia e resistência com reavaliação obrigatória ao final de cada mesociclo.' },
      { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', title: 'Máximo 6 alunos', text: 'Turmas reduzidas com acompanhamento individual em cada exercício. Sem academias de volume.' },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Progressão documentada', text: 'Carga, volume e esforço percebido registrados a cada sessão. Evolução mensurável por ciclo.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Método Livel', text: 'Metodologia própria formalizada em 2016. Aplicada na musculação com RPE controlado por semana.' },
    ],
    howTitle: 'Como funciona uma sessão.',
    howSteps: [
      { num: '01', title: 'Aula-Avaliação gratuita', text: 'Primeiro contato de 45 minutos. O educador físico mapeia histórico, objetivos e define o programa.' },
      { num: '02', title: 'Aquecimento e ativação', text: '10 minutos. Preparação articular e muscular específica para o ciclo da semana.' },
      { num: '03', title: 'Sessão principal', text: '30 minutos. Exercícios com carga, volume e RPE definidos pelo Método Livel. Correção ativa.' },
      { num: '04', title: 'Reavaliação periódica', text: 'A cada 3 semanas. Ajuste de cargas, intensidade e objetivos para o próximo ciclo.' },
    ],
    forWhomTitle: 'Para quem é a Musculação.',
    forWhom: [
      { emoji: '🔰', title: 'Iniciantes', text: 'Quem nunca treinou ou voltou após longo período de inatividade. Progressão segura e supervisionada.' },
      { emoji: '🧑', title: 'Adultos 30 a 60', text: 'Composição corporal, saúde metabólica e prevenção de sarcopenia com progressão documentada.' },
      { emoji: '👴', title: 'Silver Economy 60+', text: 'Manutenção de massa muscular, força funcional e independência com protocolo adaptado.' },
      { emoji: '⚖️', title: 'Emagrecimento', text: 'Combinação de musculação com outras modalidades do estúdio para otimizar o gasto metabólico.' },
      { emoji: '🏃', title: 'Atletas e esportistas', text: 'Periodização complementar ao esporte principal. Força específica e prevenção de lesões.' },
      { emoji: '♀️', title: 'Musculação feminina', text: 'Hipertrofia e tônus com protocolo adaptado para as especificidades fisiológicas femininas.' },
    ],
    bairros: BAIRROS_MUSCULACAO,
    ctaLabel: 'Agendar Aula-Avaliação',
  },

  pilates: {
    andar: '2 Andar · Studio Livel',
    cor: 'gold',
    overline: '2 Andar · Pilates · Studio Livel',
    heroIntroShort: 'Mobilidade, postura e ativação profunda em equipamentos Reformer, Cadillac e Chair. Sessões de 50 minutos com até 6 alunos por professor.',
    stats: [
      { num: '50min', label: 'Por sessão' },
      { num: '6', label: 'Alunos max' },
      { num: '12', label: 'Bairros atendidos' },
      { num: '4.9', label: 'Google (782 aval.)' },
    ],
    whatIsTitle: 'O que é o Pilates no Studio Livel.',
    whatIsCards: [
      { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Reformer', text: 'Cama deslizante com molas reguláveis. Força, controle e mobilidade em diferentes posições.' },
      { icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z', title: 'Cadillac', text: 'Estrutura aérea com molas e barras. Ideal para reabilitação e sub-públicos específicos.' },
      { icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', title: 'Chair', text: 'Força de membros inferiores e estabilidade de tronco. Pedal com resistência de molas.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Mat Pilates', text: 'Trabalho de solo com os seis princípios: concentração, controle, centro, fluidez, precisão, respiração.' },
    ],
    howTitle: 'Como é uma sessão de 50 minutos.',
    howSteps: [
      { num: '01', title: 'Aula-Avaliação gratuita', text: 'Primeiro contato. Mapeamento de histórico de lesões, mobilidade e objetivos.' },
      { num: '02', title: 'Aquecimento articular', text: '8 minutos. Preparação das articulações e ativação do core profundo.' },
      { num: '03', title: 'Sequência principal', text: '35 minutos. Rotação pelos equipamentos com correção ativa em cada exercício.' },
      { num: '04', title: 'Fechamento', text: '7 minutos. Alongamento ou trabalho respiratório para integração final.' },
    ],
    forWhomTitle: 'Para quem é o Pilates.',
    forWhom: [
      { emoji: '👴', title: 'Silver Economy 60+', text: 'Mobilidade, equilíbrio e independência funcional. Modalidade prioritária para adultos acima dos 60 anos.' },
      { emoji: '🤰', title: 'Gestantes', text: 'A partir do 2º trimestre com liberação do obstetra. Fortalecimento do assoalho pélvico.' },
      { emoji: '🏥', title: 'Pós-cirúrgico', text: 'Ortopédico, cesárea, abdominal ou cardíaco. Protocolo em 5 fases com laudo médico.' },
      { emoji: '🦴', title: 'Dores de coluna', text: 'Hérnia lombar, cervical, escoliose. Core profundo que estabiliza e protege.' },
      { emoji: '🔰', title: 'Iniciantes', text: 'Porta de entrada de baixo impacto. Turma reduzida reduz risco na fase inicial.' },
      { emoji: '🏋️', title: 'Complemento ao treino', text: 'Pilates + musculação: mobilidade que sustenta a força. Resultado consistente.' },
    ],
    bairros: BAIRROS_PILATES,
    ctaLabel: 'Agendar Aula de Pilates',
  },

  funcional: {
    andar: '3 Andar · Studio Livel',
    cor: 'orange',
    overline: '3 Andar · Funcional FitBox · Studio Livel',
    heroIntroShort: 'Circuitos funcionais em grupo com o Kit FitBox. 30 minutos de alta eficiência. O mesmo protocolo disponível no app para treinar em casa.',
    stats: [
      { num: '30min', label: 'Por sessão' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que é o Funcional FitBox.',
    whatIsCards: [
      { icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z', title: 'Kit FitBox', text: 'Elásticos inteligentes, cintas, box, manoplas, bastão e colchonete. Sem máquinas tradicionais.' },
      { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', title: 'Circuitos em grupo', text: 'Estações de exercício com tempo controlado. Dinâmica coletiva que eleva a motivação.' },
      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', title: '30 minutos', text: 'Sessão compacta de alta eficiência. Formato pensado para quem tem agenda ocupada.' },
      { icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064', title: 'App Livel', text: 'O mesmo protocolo do estúdio disponível no aplicativo para continuar o treino em casa.' },
    ],
    howTitle: 'Como é uma sessão FitBox.',
    howSteps: [
      { num: '01', title: 'Montagem das estações', text: '2 minutos. Cada aluno prepara o Kit FitBox no seu espaço marcado na sala.' },
      { num: '02', title: 'Aquecimento coletivo', text: '5 minutos. Ativação articular e preparação para os circuitos do dia.' },
      { num: '03', title: 'Circuito principal', text: '20 minutos. Rotação pelas estações com tempo definido e descanso controlado.' },
      { num: '04', title: 'Recuperação ativa', text: '3 minutos. Respiração e alongamento para fechar a sessão com qualidade.' },
    ],
    forWhomTitle: 'Para quem é o Funcional FitBox.',
    forWhom: [
      { emoji: '🔰', title: 'Todos os níveis', text: 'A intensidade é ajustada individualmente. Iniciantes treinam junto com avançados.' },
      { emoji: '⏱️', title: 'Agenda ocupada', text: '30 minutos de resultado real. Solução para quem não tem tempo para treinos longos.' },
      { emoji: '⚖️', title: 'Emagrecimento', text: 'Alta demanda metabólica em formato curto. Complemento ideal para Pilates ou Musculação.' },
      { emoji: '🤸', title: 'Condicionamento físico', text: 'Padrões motores naturais com carga portátil. Capacidade física ampla e variada.' },
      { emoji: '👥', title: 'Quem gosta de grupo', text: 'A dinâmica coletiva eleva motivação e consistência. Aula nunca igual.' },
      { emoji: '📱', title: 'Treino híbrido', text: 'App Livel permite continuar o protocolo em casa. Estúdio + casa com o mesmo método.' },
    ],
    bairros: BAIRROS_FUNCIONAL,
    ctaLabel: 'Agendar Aula FitBox',
  },

  yoga: {
    andar: 'Studio Livel · Prado, BH',
    cor: 'gray',
    overline: 'Yoga · Studio Livel · Prado, BH',
    heroIntroShort: 'Sistema codificado de posturas, respiração e atenção. Prática secular ensinada como ferramenta técnica com mecanismos fisiológicos explicáveis.',
    stats: [
      { num: '60min', label: 'Por sessão' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que é o Yoga no Studio Livel.',
    whatIsCards: [
      { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Asana', text: 'Posturas físicas que desenvolvem força, mobilidade e propriocepção de forma progressiva.' },
      { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: 'Pranayama', text: 'Técnicas de respiração que regulam o sistema nervoso autônomo. Ferramenta clínica documentada.' },
      { icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z', title: 'Atenção', text: 'Treinamento da capacidade de observação sem julgamento. Base científica em neurociência.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Método Livel', text: 'Progressão em ciclos de 3 semanas. Prática secular sem conteúdo religioso ou esotérico.' },
    ],
    howTitle: 'Como é uma sessão de Yoga.',
    howSteps: [
      { num: '01', title: 'Aula-Avaliação gratuita', text: 'Avaliação de mobilidade, objetivos e experiência prévia com a prática.' },
      { num: '02', title: 'Aquecimento e respiração', text: '10 minutos. Pranayama inicial para centrar a atenção e preparar o corpo.' },
      { num: '03', title: 'Sequência de asanas', text: '40 minutos. Posturas encadeadas com instrução individual e correção ativa.' },
      { num: '04', title: 'Savasana e fechamento', text: '10 minutos. Integração da prática com relaxamento profundo e observação.' },
    ],
    forWhomTitle: 'Para quem é o Yoga.',
    forWhom: [
      { emoji: '😤', title: 'Estresse elevado', text: 'Pranayama e atenção atuam diretamente no sistema nervoso. Resposta ao estresse mensurável.' },
      { emoji: '🤸', title: 'Mobilidade', text: 'Recuperação de amplitude articular perdida. Progresso consistente em 4 a 8 semanas.' },
      { emoji: '👴', title: 'Adultos 60+', text: 'Equilíbrio, coordenação e prevenção de quedas. Protocolo adaptado para cada condição.' },
      { emoji: '🔰', title: 'Iniciantes', text: 'Não é preciso ter flexibilidade prévia. O Yoga desenvolve mobilidade gradualmente.' },
      { emoji: '💪', title: 'Complemento ao treino', text: 'Yoga + Musculação ou Pilates. Mobilidade que sustenta a força e melhora a recuperação.' },
      { emoji: '🧘', title: 'Meditação ativa', text: 'Para quem busca equilíbrio físico e mental sem abandono da prática corporal.' },
    ],
    bairros: BAIRROS_YOGA,
    ctaLabel: 'Agendar Aula de Yoga',
  },

  'krav-maga': {
    andar: 'Studio Livel · Prado, BH',
    cor: 'red',
    overline: 'Krav Maga · Studio Livel · Prado, BH',
    heroIntroShort: 'Defesa pessoal civil com condicionamento físico integrado. Técnicas aplicáveis a situações reais. Aberto a iniciantes sem experiência prévia em artes marciais.',
    stats: [
      { num: '60min', label: 'Por sessão' },
      { num: '6', label: 'Alunos max' },
      { num: '3', label: 'Semanas por ciclo' },
      { num: '38+', label: 'Anos no Prado' },
    ],
    whatIsTitle: 'O que é o Krav Maga no Studio Livel.',
    whatIsCards: [
      { icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', title: 'Defesa pessoal civil', text: 'Técnicas desenvolvidas para situações reais de risco. Sem rituais ou competição. Prático.' },
      { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Condicionamento físico', text: 'Cada sessão integra força, agilidade, resistência e coordenação motora em formato real.' },
      { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', title: 'Progressão estruturada', text: 'Método Livel aplicado com ciclos de 3 semanas. Evolução técnica e física documentada.' },
      { icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0', title: 'Turma reduzida', text: 'Máximo 6 alunos. Correção técnica individual impossível em turmas grandes.' },
    ],
    howTitle: 'Como é uma sessão de Krav Maga.',
    howSteps: [
      { num: '01', title: 'Aula-Avaliação gratuita', text: 'Nível técnico, condição física e objetivos. Sem pré-requisito de experiência prévia.' },
      { num: '02', title: 'Aquecimento funcional', text: '10 minutos. Ativação muscular e preparação articular específica para o conteúdo do dia.' },
      { num: '03', title: 'Técnicas e simulações', text: '40 minutos. Bloqueios, saídas, contra-ataques e simulações de situações reais controladas.' },
      { num: '04', title: 'Condicionamento e fechamento', text: '10 minutos. Trabalho físico integrado e revisão das principais técnicas da sessão.' },
    ],
    forWhomTitle: 'Para quem é o Krav Maga.',
    forWhom: [
      { emoji: '♀️', title: 'Mulheres', text: 'Técnicas específicas para situações de risco enfrentadas por mulheres. Empoderamento real.' },
      { emoji: '🔰', title: 'Iniciantes', text: 'Sem experiência prévia em artes marciais necessária. O curso começa do zero.' },
      { emoji: '🧑', title: 'Adultos em geral', text: 'Condição física e autoconfiança como objetivos secundários ao aprendizado técnico.' },
      { emoji: '👮', title: 'Profissionais de segurança', text: 'Base técnica civil com condicionamento específico para demandas profissionais.' },
      { emoji: '🏋️', title: 'Complemento ao treino', text: 'Krav Maga + Musculação ou Funcional. Combinação que desenvolve força aplicada.' },
      { emoji: '👨‍👩‍👧', title: 'Famílias', text: 'Pais que querem que filhos adolescentes desenvolvam consciência corporal e autodefesa.' },
    ],
    bairros: BAIRROS_KRAV,
    ctaLabel: 'Agendar Aula de Krav Maga',
  },
};
