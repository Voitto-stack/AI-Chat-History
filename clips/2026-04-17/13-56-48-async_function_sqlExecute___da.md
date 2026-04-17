---
date: 2026-04-17T13:56:48+08:00
source: clipboard
chars: 1846
---

async function sqlExecute({ dataSourceId, database, sql, userId, ip, page, pageSize, allowDml = false }: SqlExecuteParams) {
  const category = sqlParse(sql); // throws if SQL cannot be parsed
  if (category === "ddl") {
    throw new Error("DDL statements must go through the approval workflow");
  }
  if (category === "dml" && !allowDml) {
    throw new Error("DML statements must go through the approval workflow");
  }

  const pool = database
    ? await getPoolForDatabase(dataSourceId, database, config.encryptionKey)
    : await (async () => {
        const ds = await getDataSourceWithPassword(dataSourceId, config.encryptionKey);
        return ds ? getPool(ds) : null;
      })();
  if (!pool) throw new Error("Data source not found");

  if (category !== "select") {
    return sqlExecuteDml(pool, sql, { dataSourceId, userId, ip });
  }

  const trimmedSql = sql.replace(/;\s*$/, "");
  const hasLimit = /\bLIMIT\b/i.test(trimmedSql);
  const dataSql = hasLimit ? trimmedSql : `${trimmedSql} LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize}`;

  const end = sqlDuration.startTimer({ data_source_id: dataSourceId, sql_type: category });
  let rows: Record<string, unknown>[];
  let total: number;
  try {
    if (hasLimit) {
      rows = (await pool.execute(dataSql)) as Record<string, unknown>[];
      total = rows.length;
    } else {
      const [rawRows, count] = await Promise.all([pool.execute(dataSql), fetchCountQuery(pool, trimmedSql)]);
      rows = rawRows as Record<string, unknown>[];
      total = count;
    }
    end({ status: "success" });
  } catch (err) {
    end({ status: "failed" });
    throw err;
  }

  await writeAuditLog({
    userId,
    dataSourceId,
    action: "SELECT",
    sqlText: sql,
    resultSummary: `${total} total rows`,
    ipAddress: ip,
  });

  return { rows, total, page, pageSize };
}
