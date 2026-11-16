export function RagDiagram() {
  return (
    <svg
      viewBox="0 0 720 150"
      className="w-full h-auto text-ink"
      role="img"
      aria-label="RAG Workbench architecture: Query splits into Dense pgvector and Sparse tsvector, merges via Reciprocal Rank Fusion, reranks with Cross-Encoder, and outputs grounded answer with citations or abstains"
    >
      <defs>
        <marker
          id="arrow-rag"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      {/* Boxes */}
      <g fill="var(--color-surface-2)" stroke="var(--color-border)" strokeWidth="1.2">
        <rect x="8" y="50" width="88" height="48" rx="8" />
        <rect x="128" y="14" width="128" height="46" rx="8" />
        <rect x="128" y="88" width="128" height="46" rx="8" />
        <rect x="288" y="50" width="112" height="48" rx="8" />
        <rect x="432" y="50" width="126" height="48" rx="8" />
        <rect x="590" y="50" width="122" height="48" rx="8" />
      </g>

      {/* Connectors */}
      <g fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.4" markerEnd="url(#arrow-rag)">
        <path d="M 96 68 L 126 40" />
        <path d="M 96 80 L 126 108" />
        <path d="M 256 38 L 286 66" />
        <path d="M 256 110 L 286 82" />
        <path d="M 400 74 L 430 74" />
        <path d="M 558 74 L 588 74" />
      </g>

      {/* Labels */}
      <g fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">
        <text x="52" y="78" fontWeight="600">Query</text>
        <text x="192" y="34" fontWeight="600">Dense</text>
        <text x="192" y="49" fill="var(--color-muted)" fontSize="10">pgvector HNSW</text>
        <text x="192" y="108" fontWeight="600">Sparse</text>
        <text x="192" y="123" fill="var(--color-muted)" fontSize="10">tsvector RRF</text>
        <text x="344" y="71" fontWeight="600">RRF Merge</text>
        <text x="344" y="86" fill="var(--color-muted)" fontSize="10">k = 60</text>
        <text x="495" y="71" fontWeight="600">Cross-Encoder</text>
        <text x="495" y="86" fill="var(--color-muted)" fontSize="10">MiniLM Rerank</text>
        <text x="651" y="71" fontWeight="600">Cite / Abstain</text>
        <text x="651" y="86" fill="var(--color-muted)" fontSize="10">Threshold Gate</text>
      </g>
    </svg>
  );
}

export function SdlcDiagram() {
  return (
    <svg
      viewBox="0 0 720 120"
      className="w-full h-auto text-ink"
      role="img"
      aria-label="SDLC Agent Orchestrator architecture: Mock Backlog Ticket goes to Planner with Multi-LLM Fallback, executes Scoped MCP Tools on Sample React App, runs Vitest Verification, and waits at Human Approval Gate"
    >
      <defs>
        <marker
          id="arrow-sdlc"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      <g fill="var(--color-surface-2)" stroke="var(--color-border)" strokeWidth="1.2">
        <rect x="8" y="34" width="110" height="52" rx="8" />
        <rect x="148" y="34" width="124" height="52" rx="8" />
        <rect x="302" y="34" width="124" height="52" rx="8" />
        <rect x="456" y="34" width="114" height="52" rx="8" />
        <rect x="600" y="34" width="112" height="52" rx="8" />
      </g>

      <g fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.4" markerEnd="url(#arrow-sdlc)">
        <path d="M 118 60 L 146 60" />
        <path d="M 272 60 L 300 60" />
        <path d="M 426 60 L 454 60" />
        <path d="M 570 60 L 598 60" />
      </g>

      <g fill="currentColor" fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle">
        <text x="63" y="56" fontWeight="600">Ticket</text>
        <text x="63" y="72" fill="var(--color-muted)" fontSize="10">Mock Backlog</text>
        <text x="210" y="56" fontWeight="600">Planner</text>
        <text x="210" y="72" fill="var(--color-muted)" fontSize="10">LLM Fallback</text>
        <text x="364" y="56" fontWeight="600">MCP Tools</text>
        <text x="364" y="72" fill="var(--color-muted)" fontSize="10">Scoped Edits</text>
        <text x="513" y="56" fontWeight="600">Vitest</text>
        <text x="513" y="72" fill="var(--color-muted)" fontSize="10">Verify Suite</text>
        <text x="656" y="56" fontWeight="600">Approval</text>
        <text x="656" y="72" fill="var(--color-muted)" fontSize="10">Human Gate</text>
      </g>
    </svg>
  );
}
