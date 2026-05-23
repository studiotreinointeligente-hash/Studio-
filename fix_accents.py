import os
import re
import sys

CONTENT_DIR = r"C:\Users\User\Saquad de seo\studio-livel-astro\src\content"

# Each tuple: (pattern_with_word_boundary, replacement)
# Order matters: longer/more-specific first
REPLACEMENTS = [
    # --- Exact phrases (no word boundary needed) ---
    ("Metodo Livel",        "Método Livel"),
    ("metodo Livel",        "método Livel"),
    ("2o andar",            "2º andar"),
    ("2o pavimento",        "2º pavimento"),

    # --- Words ending in -cao / -cao ---
    (r"\bperiodizacao\b",   "periodização"),
    (r"\bPeriodizacao\b",   "Periodização"),
    (r"\bassimilacao\b",    "assimilação"),
    (r"\bAssimilacao\b",    "Assimilação"),
    (r"\bprogressao\b",     "progressão"),
    (r"\bProgressao\b",     "Progressão"),
    (r"\breducao\b",        "redução"),
    (r"\bReducao\b",        "Redução"),
    (r"\bmanutencao\b",     "manutenção"),
    (r"\bManutencao\b",     "Manutenção"),
    (r"\bprevencao\b",      "prevenção"),
    (r"\bPrevencao\b",      "Prevenção"),
    (r"\bativacao\b",       "ativação"),
    (r"\bAtivacao\b",       "Ativação"),
    (r"\bopcoes\b",         "opções"),
    (r"\bOpcoes\b",         "Opções"),
    (r"\bopcao\b",          "opção"),
    (r"\bOpcao\b",          "Opção"),
    (r"\bdefinicao\b",      "definição"),
    (r"\bDefinicao\b",      "Definição"),
    (r"\bdefinicoes\b",     "definições"),
    (r"\bDefinicoes\b",     "Definições"),
    (r"\boperacao\b",       "operação"),
    (r"\bOperacao\b",       "Operação"),
    (r"\bformatacao\b",     "formatação"),
    (r"\bFormacao\b",       "Formação"),
    (r"\bformacao\b",       "formação"),
    (r"\bsessoes\b",        "sessões"),
    (r"\bSessoes\b",        "Sessões"),
    (r"\bsessao\b",         "sessão"),
    (r"\bSessao\b",         "Sessão"),
    (r"\brelacao\b",        "relação"),
    (r"\bRelacao\b",        "Relação"),
    (r"\bcondicao\b",       "condição"),
    (r"\bCondicao\b",       "Condição"),
    (r"\bcondicoes\b",      "condições"),
    (r"\bCondicoes\b",      "Condições"),
    (r"\bposicao\b",        "posição"),
    (r"\bPosicao\b",        "Posição"),
    (r"\bposicoes\b",       "posições"),
    (r"\bPosicoes\b",       "Posições"),
    (r"\bevolucao\b",       "evolução"),
    (r"\bEvolucao\b",       "Evolução"),
    (r"\bsolucao\b",        "solução"),
    (r"\bSolucao\b",        "Solução"),
    (r"\bsolucoes\b",       "soluções"),
    (r"\bSolucoes\b",       "Soluções"),
    (r"\bavaliacao\b",      "avaliação"),
    (r"\bAvaliacao\b",      "Avaliação"),
    (r"\bavaliacoes\b",     "avaliações"),
    (r"\bAvaliacoes\b",     "Avaliações"),
    (r"\badaptacao\b",      "adaptação"),
    (r"\bAdaptacao\b",      "Adaptação"),
    (r"\bintegracao\b",     "integração"),
    (r"\bIntegracao\b",     "Integração"),
    (r"\bapresentacao\b",   "apresentação"),
    (r"\bApresentacao\b",   "Apresentação"),
    (r"\bnaturezacao\b",    "naturalização"),
    (r"\bconcentracao\b",   "concentração"),
    (r"\bConcentracao\b",   "Concentração"),
    (r"\bcompensacao\b",    "compensação"),
    (r"\bCompensacao\b",    "Compensação"),
    (r"\bastabilizacao\b",  "estabilização"),
    (r"\bconsolidacao\b",   "consolidação"),
    (r"\bConsolidacao\b",   "Consolidação"),
    (r"\bativacoes\b",      "ativações"),

    # --- Words ending in -ao (singular/plural) ---
    (r"\brespiracao\b",     "respiração"),
    (r"\bRespiracao\b",     "Respiração"),
    (r"\bcontracao\b",      "contração"),
    (r"\bContracao\b",      "Contração"),
    (r"\bcontracoes\b",     "contrações"),
    (r"\bContracoes\b",     "Contrações"),
    (r"\bmotivacao\b",      "motivação"),
    (r"\bMotivacao\b",      "Motivação"),
    (r"\bpreparacao\b",     "preparação"),
    (r"\bPreparacao\b",     "Preparação"),

    # --- Acute accent words ---
    (r"\bquilometros\b",    "quilômetros"),
    (r"\bquilometro\b",     "quilômetro"),
    (r"\bQuilometros\b",    "Quilômetros"),
    (r"\bQuilometro\b",     "Quilômetro"),
    (r"\bhorarios\b",       "horários"),
    (r"\bhorario\b",        "horário"),
    (r"\bHorarios\b",       "Horários"),
    (r"\bHorario\b",        "Horário"),
    (r"\bbasicos\b",        "básicos"),
    (r"\bbasicas\b",        "básicas"),
    (r"\bbasico\b",         "básico"),
    (r"\bbasica\b",         "básica"),
    (r"\bBasico\b",         "Básico"),
    (r"\bBasica\b",         "Básica"),
    (r"\bavancados\b",      "avançados"),
    (r"\bavancadas\b",      "avançadas"),
    (r"\bavancado\b",       "avançado"),
    (r"\bavancada\b",       "avançada"),
    (r"\bAvancado\b",       "Avançado"),
    (r"\bavanco\b",         "avanço"),
    (r"\bAvanco\b",         "Avanço"),
    (r"\bpraticas\b",       "práticas"),
    (r"\bpratica\b",        "prática"),
    (r"\bPraticas\b",       "Práticas"),
    (r"\bPratica\b",        "Prática"),
    (r"\bvestiario\b",      "vestiário"),
    (r"\bVestiario\b",      "Vestiário"),
    (r"\bterreo\b",         "térreo"),
    (r"\bTerreo\b",         "Térreo"),
    (r"\bespecificos\b",    "específicos"),
    (r"\bespecificas\b",    "específicas"),
    (r"\bespecifico\b",     "específico"),
    (r"\bespecifica\b",     "específica"),
    (r"\bEspecificos\b",    "Específicos"),
    (r"\bEspecifico\b",     "Específico"),
    (r"\bpropositos\b",     "propósitos"),
    (r"\bproposito\b",      "propósito"),
    (r"\bProposito\b",      "Propósito"),
    (r"\bexercicios\b",     "exercícios"),
    (r"\bexercicio\b",      "exercício"),
    (r"\bExercicios\b",     "Exercícios"),
    (r"\bExercicio\b",      "Exercício"),
    (r"\bperiodos\b",       "períodos"),
    (r"\bperiodo\b",        "período"),
    (r"\bPeriodos\b",       "Períodos"),
    (r"\bPeriodo\b",        "Período"),
    (r"\bmaximo\b",         "máximo"),
    (r"\bMaximo\b",         "Máximo"),
    (r"\bMaxima\b",         "Máxima"),
    (r"\bmaxima\b",         "máxima"),
    (r"\bminimo\b",         "mínimo"),
    (r"\bMinimo\b",         "Mínimo"),
    (r"\btipicos\b",        "típicos"),
    (r"\btipicas\b",        "típicas"),
    (r"\btipico\b",         "típico"),
    (r"\btipica\b",         "típica"),
    (r"\bTipico\b",         "Típico"),
    (r"\btambem\b",         "também"),
    (r"\bTambem\b",         "Também"),
    (r"\bpaginas\b",        "páginas"),
    (r"\bpagina\b",         "página"),
    (r"\bPaginas\b",        "Páginas"),
    (r"\bPagina\b",         "Página"),
    (r"\btecnicas\b",       "técnicas"),
    (r"\btecnica\b",        "técnica"),
    (r"\bTecnicas\b",       "Técnicas"),
    (r"\bTecnica\b",        "Técnica"),
    (r"\bprincipios\b",     "princípios"),
    (r"\bprincipio\b",      "princípio"),
    (r"\bPrincipios\b",     "Princípios"),
    (r"\bPrincipio\b",      "Princípio"),
    (r"\bhistoria\b",       "história"),
    (r"\bHistoria\b",       "História"),
    (r"\bhistorico\b",      "histórico"),
    (r"\bHistorico\b",      "Histórico"),
    (r"\bhistorica\b",      "histórica"),
    (r"\bHistorica\b",      "Histórica"),
    (r"\batravés\b",        "através"),   # already correct, skip
    (r"\batravés\b",        "através"),
    (r"\batravés\b",        "através"),
    (r"\batravess\b",       "através"),
    (r"\batraves\b",        "através"),
    (r"\bAtravés\b",        "Através"),
    (r"\bAtraves\b",        "Através"),
    (r"\balivio\b",         "alívio"),
    (r"\bAlivio\b",         "Alívio"),
    (r"\bpossivel\b",       "possível"),
    (r"\bPossivel\b",       "Possível"),
    (r"\bpossiveis\b",      "possíveis"),
    (r"\bPossiveis\b",      "Possíveis"),
    (r"\bprevisivel\b",     "previsível"),
    (r"\bPrevisivel\b",     "Previsível"),
    (r"\bflexivel\b",       "flexível"),
    (r"\bFlexivel\b",       "Flexível"),
    (r"\bdificil\b",        "difícil"),
    (r"\bDificil\b",        "Difícil"),
    (r"\bfacil\b",          "fácil"),
    (r"\bFacil\b",          "Fácil"),
    (r"\buteis\b",          "úteis"),
    (r"\butil\b",           "útil"),
    (r"\bUtil\b",           "Útil"),
    (r"\bsaude\b",          "saúde"),
    (r"\bSaude\b",          "Saúde"),
    (r"\bhernia\b",         "hérnia"),
    (r"\bHernia\b",         "Hérnia"),
    (r"\bmedico\b",         "médico"),
    (r"\bmedica\b",         "médica"),
    (r"\bmedicos\b",        "médicos"),
    (r"\bMedico\b",         "Médico"),
    (r"\bMedica\b",         "Médica"),
    (r"\bfisico\b",         "físico"),
    (r"\bfisica\b",         "física"),
    (r"\bfisicos\b",        "físicos"),
    (r"\bFisico\b",         "Físico"),
    (r"\bFisica\b",         "Física"),
    (r"\bunico\b",          "único"),
    (r"\bunica\b",          "única"),
    (r"\bUnico\b",          "Único"),
    (r"\bUnica\b",          "Única"),
    (r"\bcronicos\b",       "crônicos"),
    (r"\bcronico\b",        "crônico"),
    (r"\bcronica\b",        "crônica"),
    (r"\bCronico\b",        "Crônico"),
    (r"\bCronica\b",        "Crônica"),
    (r"\bclinicos\b",       "clínicos"),
    (r"\bclinico\b",        "clínico"),
    (r"\bclinica\b",        "clínica"),
    (r"\bClinico\b",        "Clínico"),
    (r"\bClinica\b",        "Clínica"),
    (r"\bclassicos\b",      "clássicos"),
    (r"\bclassico\b",       "clássico"),
    (r"\bClassico\b",       "Clássico"),
    (r"\bClassicos\b",      "Clássicos"),
    (r"\bclassica\b",       "clássica"),
    (r"\bClassica\b",       "Clássica"),
    (r"\bsequencia\b",      "sequência"),
    (r"\bSequencia\b",      "Sequência"),
    (r"\bsequencias\b",     "sequências"),
    (r"\bfrequencia\b",     "frequência"),
    (r"\bFrequencia\b",     "Frequência"),
    (r"\bfrequencias\b",    "frequências"),
    (r"\bexperiencia\b",    "experiência"),
    (r"\bExperiencia\b",    "Experiência"),
    (r"\bexperiencias\b",   "experiências"),
    (r"\beficiencia\b",     "eficiência"),
    (r"\bEficiencia\b",     "Eficiência"),
    (r"\bmetodos\b",        "métodos"),
    (r"\bmetodo\b",         "método"),
    (r"\bMetodos\b",        "Métodos"),
    (r"\bMetodo\b",         "Método"),
    (r"\bcritério\b",       "critério"),   # already correct
    (r"\bcriterios\b",      "critérios"),
    (r"\bcriterio\b",       "critério"),
    (r"\bCriterio\b",       "Critério"),
    (r"\bCriterios\b",      "Critérios"),
    (r"\bendereco\b",       "endereço"),
    (r"\bEndereco\b",       "Endereço"),
    (r"\benderecos\b",      "endereços"),
    (r"\bEnderecos\b",      "Endereços"),

    # --- More -cao / -coes ---
    (r"\bliberacoes\b",     "liberações"),
    (r"\bliberacao\b",      "liberação"),
    (r"\bLiberacao\b",      "Liberação"),
    (r"\bvariacoes\b",      "variações"),
    (r"\bvariacao\b",       "variação"),
    (r"\bVariacao\b",       "Variação"),
    (r"\bconstrucao\b",     "construção"),
    (r"\bConstrucao\b",     "Construção"),
    (r"\btransferencia\b",  "transferência"),
    (r"\bTransferencia\b",  "Transferência"),
    (r"\btransferencias\b", "transferências"),
    (r"\bcomposicao\b",     "composição"),
    (r"\bComposicao\b",     "Composição"),
    (r"\bcomposicoes\b",    "composições"),
    (r"\bregeneracao\b",    "regeneração"),
    (r"\bRecuperacao\b",    "Recuperação"),
    (r"\brecuperacao\b",    "recuperação"),
    (r"\bnutricao\b",       "nutrição"),
    (r"\bNutricao\b",       "Nutrição"),
    (r"\bproducao\b",       "produção"),
    (r"\bProducao\b",       "Produção"),
    (r"\bprotecao\b",       "proteção"),
    (r"\bProtecao\b",       "Proteção"),
    (r"\brotacao\b",        "rotação"),
    (r"\bRotacao\b",        "Rotação"),
    (r"\btensao\b",         "tensão"),
    (r"\bTensao\b",         "Tensão"),
    (r"\btensoes\b",        "tensões"),
    (r"\bcompensacao\b",    "compensação"),
    (r"\borganizacao\b",    "organização"),
    (r"\bOrganizacao\b",    "Organização"),
    (r"\bcomunicacao\b",    "comunicação"),
    (r"\bComunicacao\b",    "Comunicação"),

    # --- Circumflex ---
    (r"\bsabados\b",        "sábados"),
    (r"\bsabado\b",         "sábado"),
    (r"\bSabados\b",        "Sábados"),
    (r"\bSabado\b",         "Sábado"),
    (r"\bmedias\b",         "médias"),
    (r"\bmedia\b",          "média"),
    (r"\bMedias\b",         "Médias"),
    (r"\bMedia\b",          "Média"),
    (r"\bconvenio\b",       "convênio"),
    (r"\bConvenio\b",       "Convênio"),
    (r"\bconvenios\b",      "convênios"),
    (r"\bantecedencia\b",   "antecedência"),
    (r"\bcadencia\b",       "cadência"),
    (r"\bCadencia\b",       "Cadência"),

    # --- Acute (prévia, prévio) ---
    (r"\bprevias\b",        "prévias"),
    (r"\bprevia\b",         "prévia"),
    (r"\bPrevias\b",        "Prévias"),
    (r"\bPrevia\b",         "Prévia"),
    (r"\bprevios\b",        "prévios"),
    (r"\bprevio\b",         "prévio"),
    (r"\bPrevio\b",         "Prévio"),

    # --- Grave / circumflex ---
    (r"\batras\b",          "atrás"),
    (r"\bApos\b",           "Após"),
    (r"\bapos\b",           "após"),
    (r"\bAte\b",            "Até"),
    (r"\bate\b",            "até"),
    (r"\bTres\b",           "Três"),
    (r"\btres\b",           "três"),

    # Special: "estudio" (standalone Portuguese, not the brand "Studio")
    # "Studio Livel" stays, but "o estudio", "do estudio", "no estudio" etc.
    (r"\bestudio\b",        "estúdio"),
    (r"\bEstudio\b",        "Estúdio"),

    # "e" as verb "is" in context with " e " - too risky, skip
]

# Compile regex patterns
compiled = []
for pat, repl in REPLACEMENTS:
    if pat.startswith(r"\b") or pat.endswith(r"\b"):
        compiled.append((re.compile(pat), repl))
    else:
        compiled.append((re.compile(re.escape(pat)), repl))

def fix_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"  ERROR reading {filepath}: {e}")
        return False

    original = content
    for pattern, replacement in compiled:
        content = pattern.sub(replacement, content)

    if content != original:
        try:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        except Exception as e:
            print(f"  ERROR writing {filepath}: {e}")
            return False
    return False

# Walk all MDX files
changed = 0
total = 0
for root, dirs, files in os.walk(CONTENT_DIR):
    for fname in files:
        if fname.endswith('.mdx') or fname.endswith('.md'):
            total += 1
            fpath = os.path.join(root, fname)
            if fix_file(fpath):
                changed += 1
                print(f"  FIXED: {os.path.relpath(fpath, CONTENT_DIR)}")

print(f"\nDone: {changed}/{total} files updated.")
