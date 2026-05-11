"use client";

import { forwardRef, useEffect, useState } from "react";

export const TERMINAL_W = 200;
export const TERMINAL_H = 120;

const SNIPPETS = [
  `graph = StateGraph(AgentState)
graph.add_node("classify", classify_intent)
graph.add_node("retrieve", retrieve_docs)
graph.compile()`,
  `@app.post("/query")
async def query(req: Query):
  result = await agent.invoke(req)
  return {"answer": result}`,
  `vectors = embedder.embed(chunks)
db.upsert(collection, vectors)
results = db.search(query, k=5)`,
  `model.fit(X_train, y_train)
preds = model.predict(X_test)
roc_auc_score(y_test, preds)`,
  `chain = (
  prompt
  | llm.with_structured_output(Schema)
  | parser
)`,
];

const TYPE_MS = 30;
const ERASE_MS = 15;
const HOLD_MS = 2000;

type Props = { snippetStart: number; startDelay?: number };

const TerminalCard = forwardRef<HTMLDivElement, Props>(function TerminalCard(
  { snippetStart, startDelay = 0 },
  ref,
) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let snippetIdx = snippetStart % SNIPPETS.length;
    let charIdx = 0;
    let phase: "typing" | "hold" | "erasing" = "typing";
    let timer: ReturnType<typeof setTimeout> | null = null;

    const step = () => {
      const snippet = SNIPPETS[snippetIdx];
      if (phase === "typing") {
        charIdx += 1;
        setDisplay(snippet.slice(0, charIdx));
        if (charIdx >= snippet.length) { phase = "hold"; timer = setTimeout(step, HOLD_MS); return; }
        timer = setTimeout(step, TYPE_MS);
      } else if (phase === "hold") {
        phase = "erasing";
        timer = setTimeout(step, ERASE_MS);
      } else {
        charIdx -= 1;
        setDisplay(snippet.slice(0, Math.max(0, charIdx)));
        if (charIdx <= 0) {
          snippetIdx = (snippetIdx + 1) % SNIPPETS.length;
          charIdx = 0;
          phase = "typing";
          timer = setTimeout(step, TYPE_MS * 4);
          return;
        }
        timer = setTimeout(step, ERASE_MS);
      }
    };

    timer = setTimeout(step, startDelay);
    return () => { if (timer) clearTimeout(timer); };
  }, [snippetStart, startDelay]);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: TERMINAL_W,
        height: TERMINAL_H,
        background: "rgba(15, 15, 15, 0.92)",
        borderRadius: 12,
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 16px 48px rgba(10, 10, 10, 0.18)",
        padding: 12,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 6, marginBottom: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF5F57" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FEBC2E" }} />
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#28C840" }} />
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          fontSize: 10,
          lineHeight: 1.45,
          color: "rgba(255, 255, 255, 0.85)",
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          height: TERMINAL_H - 12 - 8 - 12 - 8,
        }}
      >
        {display}
        <span style={{ opacity: 0.7 }}>▍</span>
      </div>
    </div>
  );
});

export default TerminalCard;
