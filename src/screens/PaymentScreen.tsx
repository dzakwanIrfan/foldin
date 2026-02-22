import { C, F } from "../constants";
import { Hdr, Btn } from "../components";
import type { NavigableProps } from "../types";

export function PaymentScreen({ go }: NavigableProps) {
  const transactions = [
    { t: "Nasi Goreng Fest", a: "-IDR 75,000", c: C.r, d: "Feb 22" },
    {
      t: "Hosting Revenue",
      a: "+IDR 1,350,000",
      s: "90% of ticket sales",
      c: C.g,
      d: "Feb 21",
    },
    { t: "Top Up · GoPay", a: "+IDR 500,000", c: C.g, d: "Feb 19" },
  ];

  return (
    <div style={{ height: "100%", overflow: "auto", background: C.bg }}>
      <Hdr title="💳 Wallet" onBack={() => go("profile")} />

      <div style={{ padding: "10px 12px" }}>
        {/* Balance card */}
        <div
          style={{
            padding: "14px",
            borderRadius: 14,
            background: `linear-gradient(135deg,${C.o},${C.p})`,
            marginBottom: 10,
            color: C.w,
          }}
        >
          <div
            style={{
              fontSize: 8,
              fontWeight: 700,
              opacity: 0.7,
              fontFamily: F,
            }}
          >
            BALANCE
          </div>
          <div style={{ fontSize: 22, fontWeight: 900, fontFamily: F }}>
            IDR 450,000
          </div>
          <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
            <Btn
              ch="+ Top Up"
              sm
              sty={{
                background: "rgba(255,255,255,.2)",
                color: C.w,
                border: "none",
              }}
            />
            <Btn
              ch="↗ Withdraw"
              sm
              sty={{
                background: "rgba(255,255,255,.2)",
                color: C.w,
                border: "none",
              }}
            />
          </div>
        </div>

        {/* Transaction list */}
        {transactions.map((tx, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 10px",
              borderRadius: 10,
              background: C.w,
              border: `1px solid ${C.bd}`,
              marginBottom: 3,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: C.t,
                  fontWeight: 700,
                  fontSize: 10,
                  fontFamily: F,
                }}
              >
                {tx.t}
              </div>
              <div style={{ color: C.tL, fontSize: 7, fontFamily: F }}>
                {tx.s || ""} {tx.d}
              </div>
            </div>
            <span
              style={{
                color: tx.c,
                fontWeight: 800,
                fontSize: 11,
                fontFamily: F,
              }}
            >
              {tx.a}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
