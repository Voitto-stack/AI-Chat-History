---
date: 2026-04-17T13:52:26+08:00
source: clipboard
chars: 610
---

async function sqlExecuteDml(pool: { execute(sql: string): Promise<unknown[]> }, sql: string, params: { dataSourceId: string; userId: string; ip: string }) {
  const end = sqlDuration.startTimer({ data_source_id: params.dataSourceId, sql_type: "dml" });
  try {
    await pool.execute(sql);
    end({ status: "success" });
  } catch (err) {
    end({ status: "failed" });
    throw err;
  }
  await writeAuditLog({ userId: params.userId, dataSourceId: params.dataSourceId, action: "DML", sqlText: sql, resultSummary: "executed", ipAddress: params.ip });
  return { rows: [], total: 0, page: 1, pageSize: 0 };
}
