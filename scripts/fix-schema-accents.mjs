/**
 * fix-schema-accents.mjs
 * Restaura acentos em strings dentro do campo `schema:` dos frontmatters MDX.
 * Aplica dicionário de palavras portuguesas do domínio fitness/saúde.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, '../src/content');

// Dicionário: [regex, replacement] — ordem importa (mais específico primeiro)
const DICT = [
  // ─── Terminações -ção / -ções ────────────────────────────────────────────
  [/\bmusculacao\b/gi,        'musculação'],
  [/\bcomposicao\b/gi,        'composição'],
  [/\bnutricao\b/gi,          'nutrição'],
  [/\bperiodizacao\b/gi,      'periodização'],
  [/\bprevencao\b/gi,         'prevenção'],
  [/\bpreparacao\b/gi,        'preparação'],
  [/\bavaliacao\b/gi,         'avaliação'],
  [/\bAula-Avaliacao\b/g,     'Aula-Avaliação'],
  [/\baula-avaliacao\b/g,     'aula-avaliação'],
  [/\brecuperacao\b/gi,       'recuperação'],
  [/\bativacao\b/gi,          'ativação'],
  [/\bestabilizacao\b/gi,     'estabilização'],
  [/\bprogression\b/gi,       'progressão'],
  [/\bprogressao\b/gi,        'progressão'],
  [/\bprotecao\b/gi,          'proteção'],
  [/\bfundamentacao\b/gi,     'fundamentação'],
  [/\bsupervisao\b/gi,        'supervisão'],
  [/\bmodificacao\b/gi,       'modificação'],
  [/\bfuncao\b/gi,            'função'],
  [/\bpuncao\b/gi,            'punção'],
  [/\binformacao\b/gi,        'informação'],
  [/\bIndicacao\b/g,          'Indicação'],
  [/\bindicacao\b/g,          'indicação'],
  [/\bcondicao\b/gi,          'condição'],
  [/\bcondicoes\b/gi,         'condições'],
  [/\bsituacao\b/gi,          'situação'],
  [/\bmeditacao\b/gi,         'meditação'],
  [/\bpraticao\b/gi,          'pratiçam'],   // edge case

  // ─── Terminações -ões ────────────────────────────────────────────────────
  [/\bsessoes\b/gi,           'sessões'],
  [/\bpadroes\b/gi,           'padrões'],
  [/\bdiretrizes\b/gi,        'diretrizes'],  // já correto mas incluso
  [/\bdirecoes\b/gi,          'direções'],
  [/\bocupacoes\b/gi,         'ocupações'],
  [/\bposicoes\b/gi,          'posições'],
  [/\bacoes\b/gi,             'ações'],
  [/\bextensoes\b/gi,         'extensões'],
  [/\bflexoes\b/gi,           'flexões'],
  [/\bpulicacoes\b/gi,        'publicações'],

  // ─── Terminações -ável / -íveis / -éis ──────────────────────────────────
  [/\bmensuravel\b/gi,        'mensurável'],
  [/\bperceptiveis\b/gi,      'perceptíveis'],
  [/\bvisiveis\b/gi,          'visíveis'],
  [/\bpossiveis\b/gi,         'possíveis'],
  [/\bacessiveis\b/gi,        'acessíveis'],
  [/\badaptavel\b/gi,         'adaptável'],
  [/\bsustentavel\b/gi,       'sustentável'],
  [/\bindispensavel\b/gi,     'indispensável'],
  [/\bcompativeis\b/gi,       'compatíveis'],
  [/\bdisponiveis\b/gi,       'disponíveis'],
  [/\bsensiveis\b/gi,         'sensíveis'],

  // ─── Palavras com acento agudo / grave / circunflexo ─────────────────────
  [/\bforca\b/gi,             'força'],
  [/\bforcas\b/gi,            'forças'],
  [/\btecnica\b/gi,           'técnica'],
  [/\btecnicas\b/gi,          'técnicas'],
  [/\btecnico\b/gi,           'técnico'],
  [/\btecnicos\b/gi,          'técnicos'],
  [/\bpratica\b/gi,           'prática'],
  [/\bpraticas\b/gi,          'práticas'],
  [/\bpratico\b/gi,           'prático'],
  [/\batletica\b/gi,          'atlética'],
  [/\bfisica\b/gi,            'física'],
  [/\bfisico\b/gi,            'físico'],
  [/\bfisicos\b/gi,           'físicos'],
  [/\bfisicas\b/gi,           'físicas'],
  [/\bdiastole\b/gi,          'diástole'],
  [/\bbasico\b/gi,            'básico'],
  [/\bbasicos\b/gi,           'básicos'],
  [/\bbasica\b/gi,            'básica'],
  [/\bbasicas\b/gi,           'básicas'],
  [/\bestagio\b/gi,           'estágio'],
  [/\bestomago\b/gi,          'estômago'],
  [/\bmusculos\b/gi,          'músculos'],
  [/\bmusculo\b/gi,           'músculo'],
  [/\bnumero\b/gi,            'número'],
  [/\bnumeros\b/gi,           'números'],
  [/\bindice\b/gi,            'índice'],
  [/\bodio\b/gi,              'ódio'],
  [/\borigem\b/gi,            'origem'],

  // ─── Palavras com -ê / -â ────────────────────────────────────────────────
  [/\bvoce\b/gi,              'você'],
  [/\bvoces\b/gi,             'vocês'],
  [/\baltere\b/gi,            'altere'],  // já correto
  [/\bancora\b/gi,            'âncora'],

  // ─── Palavras específicas fitness/saúde ──────────────────────────────────
  [/\bsarcopenia\b/gi,        'sarcopenia'],   // já correto
  [/\bhipertrofia\b/gi,       'hipertrofia'],  // já correto
  [/\bmetodo\b/gi,            'método'],
  [/\bMetodo\b/g,             'Método'],
  [/\bperıodo\b/gi,           'período'],
  [/\bperiodo\b/gi,           'período'],
  [/\bperiodos\b/gi,          'períodos'],
  [/\bhistorico\b/gi,         'histórico'],
  [/\bHistorico\b/g,          'Histórico'],
  [/\bmedico\b/gi,            'médico'],
  [/\bmedicos\b/gi,           'médicos'],
  [/\bmedica\b/gi,            'médica'],
  [/\bmedicas\b/gi,           'médicas'],
  [/\bortopedico\b/gi,        'ortopédico'],
  [/\bpelvico\b/gi,           'pélvico'],
  [/\bpelvica\b/gi,           'pélvica'],
  [/\bcronico\b/gi,           'crônico'],
  [/\bcronicas\b/gi,          'crônicas'],
  [/\bcronicos\b/gi,          'crônicos'],
  [/\bcontinuo\b/gi,          'contínuo'],
  [/\bcontinuos\b/gi,         'contínuos'],
  [/\bcontinua\b/gi,          'contínua'],
  [/\banerobio\b/gi,          'anaeróbio'],
  [/\baerobico\b/gi,          'aeróbico'],
  [/\baerobica\b/gi,          'aeróbica'],
  [/\bdisfuncao\b/gi,         'disfunção'],
  [/\bespasmo\b/gi,           'espasmo'],  // já correto
  [/\blesao\b/gi,             'lesão'],
  [/\blesoes\b/gi,            'lesões'],
  [/\bpostura\b/gi,           'postura'],   // já correto
  [/\bhernia\b/gi,            'hérnia'],
  [/\bcoluna\b/gi,            'coluna'],    // já correto
  [/\bnutricional\b/gi,       'nutricional'], // já correto
  [/\bprogressao\b/gi,        'progressão'],
  [/\bequipamento\b/gi,       'equipamento'], // já correto
  [/\bmobilidade\b/gi,        'mobilidade'],  // já correto
  [/\bsaude\b/gi,             'saúde'],
  [/\bSaude\b/g,              'Saúde'],

  // ─── Pronomes e palavras gramaticais ─────────────────────────────────────
  [/\bnao\b/g,                'não'],
  [/\bNao\b/g,                'Não'],
  [/\bsao\b/g,                'são'],
  [/\bSao Paulo\b/g,          'São Paulo'],   // cidade
  [/\bapos\b/g,               'após'],
  [/\bApos\b/g,               'Após'],
  [/\btambem\b/g,             'também'],
  [/\bTambem\b/g,             'Também'],
  [/\bporem\b/g,              'porém'],
  [/\bPorem\b/g,              'Porém'],
  [/\bate\b(?=\s)/g,          'até'],       // "até " — antes de espaço para evitar falsos positivos
  [/\bAte\b(?=\s)/g,          'Até'],
  [/\balcance\b/g,            'alcance'],   // já correto
  [/\bnutrientes\b/g,         'nutrientes'], // já correto
  [/\baderencia\b/g,          'aderência'],
  [/\bcompetencia\b/g,        'competência'],
  [/\bpresenca\b/g,           'presença'],
  [/\bPresenca\b/g,           'Presença'],
  [/\bfraqueza\b/g,           'fraqueza'],  // já correto
  [/\bcomecam\b/g,            'começam'],
  [/\bcomeca\b/g,             'começa'],
  [/\bcomeco\b/g,             'começo'],
  [/\bcomecando\b/g,          'começando'],
  [/\bcomecou\b/g,            'começou'],
  [/\btecido\b/g,             'tecido'],    // já correto
  [/\bsarcopenia\b/g,         'sarcopenia'], // já correto
  [/\bfuncional\b/g,          'funcional'],  // já correto
  [/\biniciantes\b/g,         'iniciantes'], // já correto
  [/\binicios\b/g,            'inícios'],
  [/\binicio\b/g,             'início'],
  [/\bInicio\b/g,             'Início'],
  [/\bpublico\b/g,            'público'],
  [/\bPublico\b/g,            'Público'],
  [/\bunicos\b/g,             'únicos'],
  [/\bunico\b/g,              'único'],
  [/\bultimo\b/g,             'último'],
  [/\bultima\b/g,             'última'],
  [/\bultimos\b/g,            'últimos'],
  [/\bultimas\b/g,            'últimas'],
  [/\bClassicos\b/g,          'Clássicos'],
  [/\bclassicos\b/g,          'clássicos'],
  [/\bclassico\b/g,           'clássico'],
  [/\btipico\b/g,             'típico'],
  [/\bdinamica\b/g,           'dinâmica'],
  [/\bdinamico\b/g,           'dinâmico'],
  [/\borganico\b/g,           'orgânico'],
  [/\benergetico\b/g,         'energético'],
  [/\benergetica\b/g,         'energética'],
  [/\bintervalo\b/g,          'intervalo'], // já correto
  [/\bfocado\b/g,             'focado'],    // já correto
  [/\bfoco\b/g,               'foco'],      // já correto
  [/\bgenetico\b/g,           'genético'],
  [/\bgenética\b/g,           'genética'],  // já correto
  [/\bdiagnostico\b/g,        'diagnóstico'],
  [/\bprognostico\b/g,        'prognóstico'],
  [/\bsistemico\b/g,          'sistêmico'],
  [/\bsistematico\b/g,        'sistemático'],
  [/\bproprios\b/g,           'próprios'],
  [/\bproprio\b/g,            'próprio'],
  [/\bpropria\b/g,            'própria'],
  [/\bproprias\b/g,           'próprias'],
  [/\bmiembro\b/g,            'membro'],    // já correto
  [/\bnutricional\b/g,        'nutricional'], // já correto
  [/\bmuscular\b/g,           'muscular'],  // já correto
  [/\bspecifica\b/g,          'específica'],
  [/\bespecifica\b/g,         'específica'],
  [/\bespecifico\b/g,         'específico'],
  [/\bespecificos\b/g,        'específicos'],
  [/\bespecificas\b/g,        'específicas'],
];

function applyAccents(text) {
  let result = text;
  for (const [pattern, replacement] of DICT) {
    result = result.replace(pattern, (match) => {
      // Preservar case original na primeira letra
      if (match[0] === match[0].toUpperCase() && replacement[0] !== replacement[0].toUpperCase()) {
        return replacement[0].toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }
  return result;
}

function fixSchemaInMdx(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Localizar o campo schema: '...' no frontmatter
  // O schema é um JSON serializado como string YAML (com aspas simples ou duplas)
  const schemaMatch = content.match(/^(schema:\s*')([\s\S]*?)(')\s*$/m);
  if (!schemaMatch) return false;

  const original = schemaMatch[2];
  const fixed = applyAccents(original);

  if (original === fixed) return false;

  const newContent = content.replace(
    /^(schema:\s*')([\s\S]*?)(')\s*$/m,
    (_, prefix, json, suffix) => `${prefix}${applyAccents(json)}${suffix}`
  );

  fs.writeFileSync(filePath, newContent, 'utf8');
  return true;
}

// Percorrer todos os MDX em src/content
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...walkDir(full));
    else if (e.name.endsWith('.mdx')) files.push(full);
  }
  return files;
}

const files = walkDir(SRC);
let fixed = 0, skipped = 0;

for (const f of files) {
  const changed = fixSchemaInMdx(f);
  if (changed) { fixed++; console.log(`FIXED: ${path.relative(SRC, f)}`); }
  else skipped++;
}

console.log(`\nTotal: ${files.length} arquivos | Corrigidos: ${fixed} | Sem alteracao: ${skipped}`);
