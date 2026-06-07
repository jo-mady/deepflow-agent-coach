[README.md](https://github.com/user-attachments/files/28668340/README.md)
# DeepFlow

**An enterprise learning system that understands your cognitive load, adapts certification prep around your workday, and explains every decision out loud.**

Built for the Microsoft Agents League Hackathon — Battle #2: Reasoning Agents

---

## The Problem

Enterprise certification programs fail not because employees lack motivation, but because learning systems ignore cognitive reality. A developer with six hours of meetings doesn't have the mental bandwidth for a deep networking session. A manager assigning AZ-104 to eight engineers has no visibility into who can realistically start this week and who is drowning in sprint work.

Existing tools schedule study sessions into empty calendar slots. DeepFlow schedules them into moments when your brain can actually learn.

---

## What Makes DeepFlow Different

### Cognitive Load Awareness — The Core Innovation

DeepFlow scores every employee's cognitive state across two dimensions before making any learning decision:

**Schedule Pressure** — derived from daily meeting counts via Work IQ signals. Five-plus hours of meetings means your brain is in reactive mode, not learning mode.

**Topic Difficulty** — computed from prerequisite depth in the certification dependency graph. NSG requires VNet requires IAM — three levels deep means this topic demands a clear head.

These two dimensions produce a simple decision matrix that every agent in the system respects:

| | Easy Topic | Medium Topic | Hard Topic |
|---|---|---|---|
| **Light Day** | 25-min cruise | 40-min session | 45-min deep dive |
| **Moderate Day** | 20-min session | 30-min session | 30-min focused |
| **Heavy Day** | 20-min basics | 15-min light | 10-min review only |

This isn't scheduling. It's cognitive empathy encoded into a multi-agent system.

### Voice-Guided Reasoning — Thinking Out Loud

Every agent in DeepFlow explains its decisions in plain English. Not as log output for developers — as spoken explanations for the learner, delivered via browser-native Web Speech API.

When the Engagement Agent runs, you don't read a JSON trace. You hear:

> *"You have 5 hours of meetings today and NSG has 3 prerequisites, so I'm keeping it light — just a 10-minute VNet review."*

Three modalities, one reasoning output: see the pipeline animate, read the trace panel, hear the explanation. Zero extra backend work — the reasoning logs that power debugging also power the voice.

### Glass Box UI — Transparent Multi-Agent Collaboration

Most AI systems are black boxes. DeepFlow is a glass box. The UI renders every agent's activity in real time:

- **Left panel** — Agent pipeline with nodes that light up as each agent runs, showing status and data flowing between them
- **Right panel** — Live trace of agent decisions with plain English reasoning, timestamps, and Critic/Safety blocks visible
- **Bottom** — Natural language input with persona toggle between Employee and Manager views

Judges don't have to trust that multi-agent reasoning is happening. They watch it happen.

---
## 🌐 Interactive Preview

Click the image below to open the live, interactive app preview in Lovable:

[![Watch the demo](https://preview--deepflow-agent-coach.lovable.app/employee)


## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CriticSafetyAgent                       │
│     (wraps ALL agent outputs — input guard + output guard)  │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
┌───────▼──────────┐       ┌──────────▼──────────┐
│ Employee         │       │  Manager            │
│ Orchestrator     │       │  Orchestrator       │
├──────────────────┤       ├─────────────────────┤
│ PathCuratorAgent │       │ ManagerInsightsAgent│
│ StudyPlanGen     │       │  (gap analysis +   │
│ EngagementAgent  │       │   report +          │
│   (CORE)         │       │   cert suggestion)  │
│ AssessmentAgent  │       │                     │
└──────────────────┘       └─────────────────────┘
```

**Core architectural rules:**
- All state changes go through the respective Orchestrator — no agent updates state directly
- Every agent output passes through CriticSafetyAgent before reaching the UI
- Every agent includes a plain English reasoning sentence in its output
- Routing is deterministic Python logic, not LLM-driven
- Work IQ cognitive load is computed once by EngagementAgent, stored in state, consumed by all other agents

---

## Microsoft IQ Layer Integration

DeepFlow integrates all three Microsoft IQ intelligence layers:

### Work IQ — Central Feature

One data source feeds four of five agents. This is DeepFlow's signature:

| Agent | How It Uses Work IQ |
|---|---|
| EngagementAgent (CORE) | Computes cognitive load score from schedule pressure + topic difficulty |
| StudyPlanGenerator | Places hard topics on light days, easy topics on heavy days |
| AssessmentAgent | Defers assessment on high-pressure days |
| ManagerInsightsAgent | Adjusts timeline expectations for high-meeting-load employees |

### Foundry IQ — Grounded Knowledge

PathCuratorAgent and AssessmentAgent query a knowledge base of synthetic guidance documents. Every learning path recommendation and assessment question includes a citation to its source document. No ungrounded generation.

### Fabric IQ — Semantic Data Model

A structured semantic model defines relationships between learners, roles, certifications, skill gaps, prerequisites, and readiness thresholds. StudyPlanGenerator uses it for topic sequencing. ManagerInsightsAgent uses it for readiness scoring and risk classification.

---

## Observability & Telemetry

DeepFlow treats observability as a first-class feature, not an afterthought.

### Structured Logs
Every agent writes append-only JSONL logs with session ID prefixes. One file per agent, greppable by session:
```bash
grep "abc123" logs/assessment_agent.jsonl
```

### Reasoning Traces
Every agent writes a markdown reasoning entry explaining WHY it made each decision — in student-facing plain English, not developer jargon. Same file, session ID prefixed:
```bash
grep "abc123" reasoning/engagement_agent.md
```

### Live SSE Trace
Every state transition emits a Server-Sent Event consumed by the glass box UI. Judges see reasoning unfold in real time.

### Golden Set Evaluation
A curated test suite validates system correctness:
- **Assessment golden set** — verified Q&A pairs sourced from synthetic docs, validates that generated questions are accurate and properly cited
- **Critic golden set** — input/expected pairs proving the safety agent correctly blocks off-topic queries and passes valid ones

---

## Responsible AI

DeepFlow implements responsible AI at every layer:

- **CriticSafetyAgent** wraps all agent outputs with two-layer validation — RestrictToTopic on input, ToxicLanguage + DetectPII on output
- **Azure Content Safety** as primary safety layer with **guardrails-ai** as fully local fallback
- **Privacy boundaries** — employees see only their own data; managers see aggregates and individual gaps but never raw session state
- **Manager suggests, never enforces** — employees accept or decline cert suggestions; decline reasons are never shared with the manager
- **Human-in-the-loop gate** — system pauses at AWAITING_USER_CONFIRMATION before any assessment
- **Synthetic data only** — all employee data, schedules, and performance metrics are fabricated for demonstration
- **Full audit trail** — every agent decision logged and auditable via reasoning traces

---

## Dual Persona Design

### Employee View
- Receives cognitive-load-aware study plans
- Hears voice-guided reasoning for every decision
- Takes assessments only when the system determines they're in the right cognitive state
- Accepts or declines manager cert suggestions with full autonomy

### Manager View
- Sees team readiness scores and skill gap analysis
- Identifies at-risk employees (high meeting load + low study progress)
- Suggests certifications with reasoning visible in the trace
- Three internal reasoning steps visible in UI: gap analysis → report generation → suggestion delivery

**Hard privacy rule:** No employee can see another employee's data. Manager reads are aggregate-only. This boundary is enforced at the data layer, not the UI layer.

---

## Tech Stack

| Component | Technology |
|---|---|
| Framework | Microsoft Agent Framework (MAF) — local development |
| Language | Python 3.10+ |
| API | FastAPI + Server-Sent Events |
| UI | Vanilla HTML/JS + Web Speech API (no framework) |
| Safety | Azure Content Safety + guardrails-ai fallback |
| Knowledge Base | Foundry IQ via Azure AI Search + local fallback |
| Semantic Model | Fabric IQ via local JSON + Python logic |
| Work Signals | Work IQ via synthetic `work_activity_signals.json` |
| MCP | Microsoft Learn MCP server |
| Logging | JSONL (structured) + Markdown (reasoning) per agent |

---

## Synthetic Data

All data in this project is synthetic. No real employee information, names, emails, or PII are used anywhere.

**Synthetic guidance documents** (Foundry IQ knowledge base):
- `engineering_cert_guide.md` — role-to-certification mappings and study patterns
- `workload_insights.md` — meeting load correlations with study outcomes
- `team_learning_report.md` — quarterly team performance summary
- `az_104_study_guide.md` — certification-specific learning content
- `az_900_study_guide.md` — certification-specific learning content

**Structured synthetic data:**
- `work_activity_signals.json` — daily meeting counts, focus blocks, deadlines, energy patterns per employee
- `learner_performance.json` — practice scores, study hours, outcomes per learner
- `fabric_iq_seed.json` — role/cert/skill/prerequisite/threshold semantic model

Employee identifiers follow the pattern `EMP-001`, `TEAM-A`, `MGR-001`.

---

## What Is Mocked vs Real

| Component | Status | Note |
|---|---|---|
| MS Learn MCP | Real | With JSON cache fallback |
| Foundry IQ | Real | Azure AI Search with local fallback |
| Fabric IQ | Real | Local JSON + Python semantic model |
| Work IQ | Central feature (synthetic data) | Feeds 4 agents, cognitive load scoring |
| Azure Content Safety | Real if Azure setup succeeds | guardrails-ai fallback |
| PersonalizationAgent | Default profile | Ship if time permits |
| CalendarAgent | Ship if time permits | Mocked slots |
| Email notifications | Not implemented | Post-hackathon |

---

## Future Work

Items designed but deferred for time constraints. Each is documented in `context.md` with full specifications:

- **PersonalizationAgent** — quiz-based learning style profiling replacing the default profile
- **CalendarAgent** — Microsoft Graph API for real Outlook calendar booking (currently mocked)
- **Two-pass adaptive assessment** — easier/harder second round based on first-pass score
- **Post-assessment personal difficulty scoring** — weak topics from assessment results replace prerequisite-depth difficulty
- **Real Work IQ integration** — Microsoft Graph API for real-time calendar data replacing static JSON
- **SpacedRepWorker** — SM-2 algorithm for intelligent repetition scheduling
- **Knowledge graph SVG** — interactive skill tree visualization in the UI
- **48-hour cache refresh** — automated MS Learn content re-fetch
- **Student manual path override** — learner can add/swap curated paths
- **Full per-question difficulty tagging** — granular assessment difficulty levels
- **Email/Teams notification delivery** — real reminder system
- **Multi-language support**
- **Peer challenge system** — collaborative study and competitive assessments

---

## Project Structure

```
deepflow/
├── context.md                          # full architecture & decisions
├── README.md                           # this file
├── orchestrators/
│   ├── employee_orchestrator.py
│   └── manager_orchestrator.py
├── agents/
│   ├── path_curator_agent.py
│   ├── study_plan_generator.py
│   ├── engagement_agent.py             # CORE — cognitive load
│   ├── assessment_agent.py
│   ├── manager_insights_agent.py
│   └── critic_safety_agent.py
├── services/
│   ├── foundry_iq_service.py
│   └── fabric_iq_service.py
├── state/
│   ├── employee_session_state.py
│   ├── manager_session_state.py
│   ├── phase.py
│   └── suggestions.json
├── models/
│   ├── student_profile.py
│   ├── study_plan.py
│   ├── assessment_result.py
│   ├── cert_suggestion.py
│   ├── learning_path.py
│   ├── engagement_result.py            # includes CognitiveLoad
│   ├── manager_insights.py
│   └── critic_result.py
├── cache/
│   ├── az-900.json
│   └── az-104.json
├── synthetic/
│   ├── engineering_cert_guide.md
│   ├── workload_insights.md
│   ├── team_learning_report.md
│   ├── az_104_study_guide.md
│   ├── az_900_study_guide.md
│   ├── learner_performance.json
│   ├── work_activity_signals.json
│   └── fabric_iq_seed.json
├── golden/
│   ├── az_104_questions.json
│   ├── az_900_questions.json
│   └── critic_test_cases.json
├── api/
│   └── main.py
├── ui/
│   └── index.html
├── decisions/
│   ├── 00_employee_orchestrator.md
│   ├── 01_manager_orchestrator.md
│   ├── 02_critic_safety_agent.md
│   └── ... (one per component)
├── logs/                               # JSONL per agent
├── reasoning/                          # Markdown per agent
└── tests/
    ├── test_employee_orchestrator.py
    ├── test_manager_orchestrator.py
    ├── test_assessment_agent.py
    ├── test_critic_safety_agent.py
    └── test_golden_set.py
```

---

## How to Run

```bash
# 1. Clone and setup
git clone <repo>
cd deepflow
pip install -r requirements.txt

# 2. Configure environment
cp .env.example .env
# Fill in Azure credentials (see context.md Section 12)

# 3. Start the API server
python api/main.py

# 4. Open the UI
# Navigate to http://localhost:8000 in Chrome/Edge
# Enable voice output via the toggle button
```

---

## License

Built for the Microsoft Agents League Hackathon 2026. All synthetic data is fabricated for demonstration purposes.
